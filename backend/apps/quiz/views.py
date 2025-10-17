import random
from rest_framework.status import *
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import *

from rest_framework.decorators import action

from .models import *
from api.serializers import *

class QuizViews(APIView):

    """Get a random list of ids from Quiz model and the  first quiz"""
    def get(self, request):
        # obtain all the ids, id list
        ids = list(Quiz.objects.values_list("idQ", flat=True))

        if ids is None:
            return Response({"error": "Any Quiz exits to get one of them random"})

        random.shuffle(ids)
        quiz = Quiz.objects.get(idQ=ids[0])
        quiz_serial = QuizSerializer(quiz)

        # quit id from the list
        ids.pop(0)
        return Response({"ids": ids, 'quiz':quiz_serial.data}, status=HTTP_200_OK)
        #return Response({"ids": ids_list, 'quiz': quiz}, status=HTTP_200_OK)

class QuizDetailViews(APIView):
    ''' Get specific quiz with question and options in order'''
    def get(self, request, pk=None):
        
        if pk not in list(Quiz.objects.values_list("idQ", flat=True)):
            return Response({"error" : "Not found any quiz by this id"}, status=HTTP_404_NOT_FOUND)
        
        quiz = Quiz.objects.get(pk=pk)
        # this can't happend in any moment
        if quiz is None:
            return Response({"error": f"Any quiz find by this id {pk}"}, status=HTTP_404_NOT_FOUND)
        quiz_serial = QuizSerializer(quiz)
        
        return Response({'quiz': quiz_serial.data}, status=HTTP_200_OK)

# Viewset includes list, create, retrieve, update, partial-update, destroy
class QuestionViewSet(ModelViewSet):
    queryset = Question.objects.all()
    serializer_class= QuestionSerializer
    
    '''Get all disorganized questions of one quiz passing quiz by param'''
    @action(detail=False, methods=['get'])
    def listByQuiz(self, request):

        quiz = request.query_params.get('quiz')
        questions = Question.objects.filter(
             idP__in=AppearanceQuiz.objects.filter(quiz=quiz).values('question')
        ).order_by('?')

        if questions is not None:
            questions_serializers = QuestionSerializer(questions, many=True)
            return Response({'questions' : questions_serializers.data}, status=HTTP_200_OK)
        else:
            return Response({'error': f"There isn't any question in this quiz {id}"}, status=HTTP_404_NOT_FOUND)

# class ApperanceView(ModelViewSet):


class RespondantViews(CreateAPIView):
    pass
    # def post(self, request):
    #     generate_random_id()
    #     try:
    #         respondant = Respondant.objects.create(

    #         )
    #     except ValidationError:
        




        


    



# def RespondantView(APIView):
    
