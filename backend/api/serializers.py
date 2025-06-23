from rest_framework import serializers
from apps.quiz2.models import *

class DimensionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dimension
        fields = '__all__'

class InterestAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterestArea
        fields = '__all__'

class CoreContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreContent
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

class OptionSerializer(serializers.ModelSerializer):
    # question = QuestionSerializer

    class Meta:
        model = Option
        field = '__all__'

class OptionsSerializer(serializers.ModelSerializer):
    question = QuestionSerializer
    option = OptionSerializer

    class Meta:
        model = Options
        field = [
            'pk',
            'question',
            'option'
        ]

# User Serializer
class MyUserSerializer():
    class Meta:
        model = MyUser
        field = [
            'id',
            'username',
            'password'
        ]

class InterviewerSerializer():
    class Meta:
        model = Interviewer
        field = '__all__'

class InterviewerSerializer():
    class Meta:
        model = Interviewer
        field = '__all__'
        