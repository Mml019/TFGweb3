from rest_framework import serializers
from apps.quiz.models import *

# The intermediary classes don't have a serializer

class DimensionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dimension
        fields = '__all__'

class InterestAreaSerializer(serializers.ModelSerializer):
    dimension = DimensionSerializer
    class Meta:
        model = InterestArea
        fields ='__all__'

class CoreContentSerializer(serializers.ModelSerializer):
    int_area = InterestAreaSerializer
    class Meta:
        model = CoreContent
        fields = '__all__'

class OptionSerializer(serializers.ModelSerializer):
    # question = QuestionSerializer

    class Meta:
        model = Option
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    option = OptionSerializer
    
    class Meta:
        model = Question
        fields = '__all__'
        extra_kwargs = {'solution':{'write_only' : True}}

# User Serializer
class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = (
            #'id',
            'username',
            'password',
            'is_staff'
        )
        extra_kwargs = {'password': {'write_only': True} }

class MyUserSerializerRegistration(serializers.ModelSerializer):
    # password1 = serializers.CharField(write_only= True)
    # password2 = serializers.CharField(write_only= True)

    class Meta:
        model = MyUser
        fields = (
            # 'id',
            'username',
            'password',
            'is_staff'
        )
        extra_kwargs = {'password': {'write_only': True} }

    # def validate(self, attrs):
    #     if attrs['password1'] != attrs['password2']:
    #         return serializers.ValidationError("Password don't match")
    #     if attrs['username'] is None or ' ':
    #         return serializers.ValidationError("Username can't be empty")
    #     return True
    
    # def create(self, validated_data):
    #     password = validated_data.pop['password1']
    #     validated_data.pop['password2']
    #     return MyUser.objects.create(password=password, is_staff=True, **validated_data)
    
    # def update(self, instance, validated_data):
    #     if validated_data['password1'] != validated_data['password2']:
    #         return serializers.ValidationError("Password don't match")
    #     return super().update(instance, password=validated_data['password1'], **validated_data)

# class InterviewerSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Interviewer
#         field = '__all__'

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