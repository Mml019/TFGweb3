from rest_framework import serializers
from rest_framework.serializers import ValidationError
from apps.quiz.models import *

import re
from datetime import datetime, time


# The intermediary classes don't have a serializer
class DimensionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dimension
        fields = ["idD", "orden", "dimension"]

    def validate(self, attrs):
        return super().validate(attrs)

    # Dimensions are between 1 to 5 and are Integer in DB
    def validate_orden(self, value):
        # Only permits level between 1 and 5
        if value < 1 or value > 5:
            return ValidationError(" Debe seleccionar un valor del 1 al 5 ")
        return value


class InterestAreaSerializer(serializers.ModelSerializer):
    idD = DimensionSerializer

    class Meta:
        model = InterestArea
        fields = "__all__"

    # InterestArea are CharField
    def validate_orden(self, value):
        data = self.idD.data

        pattern = r"(?<![\.\w])\d+\.\d+(?![\.\w])"  # solo se aceptan n.n ej: 1.1
        area_int = re.search(pattern, value)

        area_dimension = str.split(area_int, ".")
        if area_int is None or []:
            return ValidationError(" Formato no permitido debe ser número . número ej: 1.1 ")

        if str(data.orden) != area_dimension[1]:
            return ValidationError("Area de interés no coincide con su dimensión")
        return value


class CoreContentSerializer(serializers.ModelSerializer):
    int_area = InterestAreaSerializer

    class Meta:
        model = CoreContent
        fields = "__all__"


class OptionSerializer(serializers.ModelSerializer):
    # question = QuestionSerializer

    class Meta:
        model = Option
        fields = ["idO", "option"]  # without list of question


class OptionQuestionSerializer(serializers.ModelSerializer):
    idO = OptionSerializer

    # idP = QuestionSerializer
    class Meta:
        model = Question
        fields = ["idP", "idO", "motive", "pk"]


class QuestionSerializer(serializers.ModelSerializer):
    idD = DimensionSerializer()
    idA = InterestAreaSerializer()
    idC = CoreContentSerializer()
    idO = OptionSerializer(source="question_values.all", many=True, read_only=True)

    class Meta:
        model = Question
        fields = [
            "idP",
            "numero",
            "statement",
            "time",
            "difficult_level",
            "version",
            "date",
            "idD",
            "idA",
            "idC",
            "idO",
        ]


class QuizSerializerBasic(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ["idQ", "file", "fechaC", "fechaA", "question"]


# This serializer displays all the questions that belong to a quiz
class QuizSerializer(serializers.ModelSerializer):
    question = QuestionSerializer(many=True)

    class Meta:
        model = Quiz
        fields = ["idQ", "file", "fechaC", "fechaA", "question"]


# User Serializer
class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = "__all__"
        extra_kwargs = {"password": {"write_only": True}}


# class MyUserSerializerRegistration(serializers.ModelSerializer):
#     # password1 = serializers.CharField(write_only= True)
#     # password2 = serializers.CharField(write_only= True)

#     class Meta:
#         model = MyUser
#         fields = (
#             # 'id',
#             'username',
#             'password',
#             'is_staff'
#         )
#         extra_kwargs = {'password': {'write_only': True} }

#     # def validate(self, attrs):
#     #     if attrs['password1'] != attrs['password2']:
#     #         return serializers.ValidationError("Password don't match")
#     #     if attrs['username'] is None or ' ':
#     #         return serializers.ValidationError("Username can't be empty")
#     #     return True

#     # def create(self, validated_data):
#     #     password = validated_data.pop['password1']
#     #     validated_data.pop['password2']
#     #     return MyUser.objects.create(password=password, is_staff=True, **validated_data)

#     # def update(self, instance, validated_data):
#     #     if validated_data['password1'] != validated_data['password2']:
#     #         return serializers.ValidationError("Password don't match")
#     #     return super().update(instance, password=validated_data['password1'], **validated_data)


class ProfesionalAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfesionalArea
        fields= "__all__"


class SatisfationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Satisfation
        fields= "__all__"

    def validate_value(self, value):
        if value < 0 or value > 5:
            return ValidationError("La puntuación debe ser entre 0 y 5")
        return value


class YearAcademicLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = YearAcademicLevel
        fields= "__all__"


class AcademicLevelSerializer(serializers.ModelSerializer):
    year = YearAcademicLevelSerializer

    class Meta:
        model = AcademicLevel
        fields= "__all__"

        def validate_year(self, value):
            # if attrs['tittle'] not in TITTLE_CHOICES:
            #     return ValidationError(f'Debe ser una de las siguientes opciones: {TITTLE_CHOICES}')
            if value < (datetime.now.year - 70) or value >= datetime.now.year:
                return ValidationError(
                    f" No puede ser un año superior al actual o anterior a {datetime.now.year-70}"
                )


class RespondantSerializer(serializers.ModelSerializer):
    profarea = ProfesionalAreaSerializer
    question = QuestionSerializer
    satisfation = SatisfationSerializer
    academic_level = AcademicLevelSerializer

    class Meta:
        model = Respondant
        fields = [
            "respondant",
            "age",
            "sex",
            "nationality",
            "city",
            "region",
            "level_PBE",
            "PBE_knownledge",
            "PBE_training",
            "academic_level",
            "speciality",
            "question",
            "profarea",
            "satisfation",
        ]

    def validate(self, attrs):
        # TITTLE_CHOICES = ['Grado', 'Máster en investigación', 'Máster oficial', 'Master no oficial en investigación', 'Máster no oficial, profesionalizante', 'Doctorado']
        if attrs["age"] < 16 or attrs["age"] > 90:
            return ValidationError("La edad no puede ser  menor a 16 ni mayor a 90")
        if attrs["level_PBE"] < 1 or attrs["level_PBE"] > 5:
            return ValidationError("El nivel de conocimiento en PBE solo está entre 1 a 5")
        if attrs["PBE_knownledge"] != True or attrs["PBE_knownledge"] != False:
            return ValidationError("Debe seleccionar si tiene conocimientos previos en PBE")

        return super().validate(attrs)

class RespuestaSerializer(serializers.ModelSerializer):

    option = serializers.PrimaryKeyRelatedField(
        queryset=Option.objects.all(),
        source="answer",
        write_only=True
    )
    question = serializers.PrimaryKeyRelatedField(
        queryset=Question.objects.all(),
        write_only=True
    )
    user = serializers.UUIDField(
        source="respondant",
        write_only=True
    )
    time = serializers.IntegerField(write_only=True)

    def validate_time(self, value):
        seconds = int(value)

        # Calculate hours, minutes and seconds
        hours = seconds // 3600
        minutes = (seconds % 3600) // 60
        seconds = seconds % 60
        
        # Create object 'time' 
        value = time(hour=hours, minute=minutes, second=seconds)
        return value        

    class Meta:
        model = Respuesta
        fields = ['option', 'time', 'user', 'question', 'is_correct']# is_correct, pk]
        read_only_fields = ["is_correct"]

    # Validate if answer exists before or not by this user
    def validate(self, attrs):
        if Respuesta.objects.filter(
            respondant_id=attrs["respondant"],
            question=attrs["question"]
        ).exists():
            raise serializers.ValidationError(
                f"El usuario {attrs["respondant"]} ya respondió esa pregunta {attrs["question"]}."
            )
        return attrs

    def create(self, validated_data):
        user_uuid = validated_data['respondant']
        respondant = Respondant.objects.get(respondant_id=user_uuid)
        validated_data['respondant'] = respondant

        validated_data['is_correct'] = OptionQuestion.solutions.filter(
        idO=validated_data['answer'],
        idP=validated_data['question']
        ).exists()
        
        return super().create(validated_data)

class EnviromentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enviroment
        fields= ["idEnv", "enviroment"]


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields= ["idAct", "activity"]


class SectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sector
        fields= ["idSec", "sector"]


class ProfesionalSerializer(serializers.ModelSerializer):
    profesional = RespondantSerializer
    activities = ActivitySerializer
    sectors = SectorSerializer
    enviroments = EnviromentSerializer

    class Meta:
        model = Profesional
        fields= [
            "profesional",
            "supervisor",
            "dedicationW",
            "years",
            "activities",
            "sectors",
            "enviroments",
        ]


class DedicationSerializer(serializers.ModelSerializer):
    # profesional = ProfesionalSerializer
    # activity = ActivitySerializer
    class Meta:
        model = Sector
        fields= ["profesional", "activity", "percentatge", "pk"]
