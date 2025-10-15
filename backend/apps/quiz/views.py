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
    def getRandomQuizzes(self, request):
        # obtain all the ids, id list
        ids = Quiz.objects.values_list("idQ", flat=True)

        if ids is None:
            return Response({"error": "Any Quiz exits to get one of them random"})

        ids_list = random.shuffle(ids)
        quiz = Quiz.objects.get(ids_list[0])

        # quit id from the list
        ids_list.pop(0)
        return Response({"success": (ids_list, quiz)}, status=HTTP_200_OK)


# Viewset includes list, create, retrieve, update, partial-update, destroy
class QuestionViewSet(ModelViewSet):
    queryset = Question.objects.all()
    serializer_class= QuestionSerializer
    
    @action(detail=True, methods=['get'])
    def listByQuiz(self, request):
        return Response("Hola")
        # quiz = request.query_params.get('quiz')
        # questions = Question.objects.filter(idD=quiz).order_by('?')

        # if questions is not None:
        #     questions_serializers = QuestionSerializer(questions)
        #     return Response({'success' : questions_serializers.data}, status=HTTP_200_OK)
        # else:
        #     return Response({'error': f"There isn't any question in this quiz {id}"}, status=HTTP_404_NOT_FOUND)
        
class RespondantViews(CreateAPIView):
    
    def post(self, request):
        generate_random_id()
        try:
            respondant = Respondant.objects.create(
                
            )
        except ValidationError:
        




        


    



# def RespondantView(APIView):
    
