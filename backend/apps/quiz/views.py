import random
from django.db import transaction
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

# I can't use create apiview cause is a personalize creation
class RespondantViews(CreateAPIView):
    
    def post(self, request):
        # generate_random_id()
        data = request.data
        # return Response({request.data}, HTTP_200_OK)
        with transaction.atomic():
            try:
                #sas_values = [data.happy_sas, data.calm_sas, data.active_sas, data.fresh_sas, data.interest_sas]
                questions = {
                    "Me he sentido alegre y de buen humor": int(data["happy_sas"]),
                    "Me he sentido tranquilo/a y relajado/a": int(data["calm_sas"]),
                    "Me he sentido activo/a y enérgico/a": int(data["active_sas"]),
                    "Me he sentido fresco/a y renovado/a": int(data["fresh_sas"]),
                    "Me he sentido interesado/a y motivado/a": int(data["interest_sas"])
                }
            
                prof_list=[]
                for p in data['profarea']:
                    profarea, _ = ProfesionalArea.objects.get_or_create(profarea=p)
                    prof_list.append(profarea)
               
                env_list=[]
                for e in data['enviroment']:
                    env, _ = Enviroment.objects.get_or_create(enviroment=e)
                env_list.append(env)
                
                sec_list=[]
                for s in data['sector']:
                    sector, _ = Sector.objects.get_or_create(sector=s)
                sec_list.append(sector)
                
                act_list=[]
                for a in data['activity']:
                    activity, _ =Activity.objects.get_or_create(activity=a)
                    act_list.append(activity)

                academic_level = AcademicLevel(
                    academic_lvl=data['academic_level'], 
                    description=None, 
                    year=int(data['year_academic_lvl']))
                
                if(data['academic_level'] == 'Máster'):
                    academic_level.description = data['description']
                    academic_level.save()
                
                satisfation_list=[]
                for question, val in self.questions.items():
                    
                    satisfation, _ = Satisfation.objects.get_or_create(
                        questionS=question,
                        value = int(val)
                    )
                    satisfation_list.append(satisfation)
                
                myuser = MyUser.objects.create()
                respondant, _ = Respondant.objects.create(
                    myuser=myuser,
                    age=int(data['age']),
                    sex=data['sex'],
                    nationality=data['nationality'],
                    city=data['city'],
                    region=data['province'],
                    level_PBE=int(data['level_PBE']),
                    PBE_knownledge=bool(data['PBE_knownledge']),
                    PBE_training=data['PBE_training'],
                    speciality=['speciality'],
                    academic_level=academic_level,

                    grade=int(data['satisfation']),

                    question=None,
                    profarea=prof_list,
                    satisfation=satisfation_list,
                )

                if(data['profile']=='Profesional'):
                    profesional = Profesional.objects.create(
                        profesional=respondant,
                        supervisor=bool(data['supervisor']),
                        dedicationW=int(data['dedicationW']),
                        years=int(data['years']),

                        actvities=act_list,
                        sectors=sec_list,
                        enviroments =env_list
                    )
                    
                for index, a in enumerate(data['activity']):
                    activity, _ =Activity.objects.get_or_create(activity=a)
                    dedication = Dedication.objects.create(
                        profesional=profesional, 
                        activity=a, 
                        percentatge=float(data[f'activity_val_{index}'])
                )
                    
                # return user    
                respondant_serial = RespondantSerializer(respondant_serial)

            except ValidationError(e):
                return Response({'error': f'{e}'}, HTTP_400_BAD_REQUEST)
            return Response(respondant_serial.data, HTTP_201_CREATED)
        




        


    



# def RespondantView(APIView):
    
