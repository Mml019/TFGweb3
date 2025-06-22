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

class Option(serializers.ModelSerializer):
    class Meta:
        model = Option
        field