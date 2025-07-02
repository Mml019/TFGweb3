from rest_framework import serializers
from apps.quiz2.models import *

# The intermediary classes don't have a serializer

class DimensionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dimension
        fields = '__all__'

class InterestAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterestArea
        fields ='__all__'

class CoreContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreContent
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'
        extra_kwargs = {'solution':{'write_only' : True}}

class OptionSerializer(serializers.ModelSerializer):
    # question = QuestionSerializer

    class Meta:
        model = Option
        fields = '__all__'


# User Serializer
class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = (
            'id',
            'username',
            'password',
            'is_staff'
        )
        extra_kwargs = {'password': {'write_only': True} }

class InterviewerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interviewer
        field = '__all__'

class RespondantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Respondant
        field = '__all__'

class ProfesionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profesion
        field = [
            'profesion'
        ]

class RespuestaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Respuesta
        field = '__all__'

class Stu_GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stu_Grade
        field = '__all__'

class Stu_MasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stu_Master
        field = '__all__'

class Stu_DoctoradoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stu_Doctorado
        field = '__all__'

class ProfesionalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profesional
        field = '__all__'

class EnvironSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enviroment
        field = [
            'enviroment'
        ]

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        field = [
            'activity'
        ]

class SectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sector
        field = [
            'sector'
        ]