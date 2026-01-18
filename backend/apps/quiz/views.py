import random
from datetime import time
import uuid

from api.serializers import *
from django.db import transaction, IntegrityError
from rest_framework.decorators import action
from rest_framework.generics import *
from rest_framework.response import Response
from rest_framework.status import *
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from .models import *


class QuizViews(APIView):
    """Get a random Quizzes and returns them"""

    def get(self, request):

        if Quiz.objects.all().exists:
            quizzes_ids = list(Quiz.objects.all().values_list("idQ", flat=True))
            random.shuffle(quizzes_ids)

            quizzes = []

            for q in quizzes_ids:
                quiz = Quiz.objects.get(pk=q)
                quiz_serializer = QuizSerializerBasic(quiz)
                quizzes.append(quiz_serializer.data)
            return Response({"quizzes": quizzes}, status=HTTP_200_OK)
        else:
            return Response(
                {"error": "Any Quiz exits to get one of them random"}, status=HTTP_404_NOT_FOUND
            )


class QuizDetailViews(APIView):
    """Get specific quiz with question and options in order"""

    def get(self, request, pk=None):

        if pk not in list(Quiz.objects.values_list("idQ", flat=True)):
            return Response({"error": "Not found any quiz by this id"}, status=HTTP_404_NOT_FOUND)

        quiz = Quiz.objects.get(pk=pk)
        # this can't happend in any moment
        if quiz is None:
            return Response({"error": f"Any quiz find by this id {pk}"}, status=HTTP_404_NOT_FOUND)
        quiz_serial = QuizSerializer(quiz)

        return Response({"quiz": quiz_serial.data}, status=HTTP_200_OK)


# Viewset includes list, create, retrieve, update, partial-update, destroy
class QuestionViewSet(ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    """Get all disorganized questions of one quiz passing quiz by param"""

    @action(detail=False, methods=["get"])
    def listByQuiz(self, request):

        quiz = request.query_params.get("quiz")
        questions = Question.objects.filter(
            idP__in=AppearanceQuiz.objects.filter(quiz=quiz).values("question")
        ).order_by("?")

        if questions is not None:
            questions_serializers = QuestionSerializer(questions, many=True)
            return Response({"questions": questions_serializers.data}, status=HTTP_200_OK)
        else:
            return Response(
                {"error": f"There isn't any question in this quiz {id}"}, status=HTTP_404_NOT_FOUND
            )


# class ApperanceView(ModelViewSet):


# I can't use create apiview cause is a personalize creation
class RespondantViews(CreateAPIView):
    serializer_class = RespondantSerializer
    schema = [
        "age",
        "sex",
        "nationality",
        "city",
        "province",
        "level_PBE",
        "profile",
        "PBE_knownledge",
        "PBE_training",
        "academic_level",
        "description",
        "year_academic_lvl",
        "speciality",
        "profarea",
        "active_sas",
        "calm_sas",
        "fresh_sas",
        "happy_sas",
        "interest_sas",
        "satisfation",
        "activity",
        "activity_val_0",
        "activity_val_1",
        "activity_val_2",
        "activity_val_3",
        "activity_val_4",
        "enviroment",
        "sector",
        "dedicationW",
        "supervisor",
        "years",
    ]

    def create(self, request):
        # generate_random_id()
        data = request.data

        for key in self.schema:
            if key not in data.keys():
                data[key] = None

        with transaction.atomic():
            try:

                # sas_values = [data.happy_sas, data.calm_sas, data.active_sas, data.fresh_sas, data.interest_sas]
                # Mapping satisfation and activity values
                questions = {
                    "Me he sentido alegre y de buen humor": int(data["happy_sas"]),
                    "Me he sentido tranquilo/a y relajado/a": int(data["calm_sas"]),
                    "Me he sentido activo/a y enérgico/a": int(data["active_sas"]),
                    "Me he sentido fresco/a y renovado/a": int(data["fresh_sas"]),
                    "Me he sentido interesado/a y motivado/a": int(data["interest_sas"]),
                }

                # activities_dic = {
                #     "Asistencial": float(data["activity_val_0"]),
                #     "Investigación": float(data["activity_val_1"]),
                #     "Docencia": float(data["activity_val_2"]),
                #     "Administración": float(data["activity_val_3"]),
                #     "Otra": float(data["activity_val_4"]),
                # }

                prof_list = []
                for p in data["profarea"]:
                    profarea, _ = ProfesionalArea.objects.get_or_create(profarea=p)
                    prof_list.append(profarea)
                    # profarea, _ = ProfesionalArea.objects.get(pk=p)

                env_list = []
                for e in data["enviroment"]:
                    env, _ = Enviroment.objects.get_or_create(enviroment=e)
                    env_list.append(env)

                # if i have other check
                if (
                    "other_env" in data
                    and data["other_env"] is not None
                    and len(data["other_env"]) > 0
                ):
                    arr_other = str(data["other_env"]).split(",")
                    for obj in arr_other:
                        obj_ok = obj.strip().capitalize()
                        env, _ = Enviroment.objects.get_or_create(enviroment=obj_ok)
                        env_list.append(env)

                sec_list = []
                for s in data["sector"]:
                    sector, _ = Sector.objects.get_or_create(sector=s)
                    sec_list.append(sector)

                # if i have other check
                if (
                    "other_sec" in data
                    and data["other_sec"] is not None
                    and len(data["other_sec"]) > 0
                ):
                    arr_other = str(data["other_sec"]).split(",")
                    for obj in arr_other:
                        obj_ok = obj.strip().capitalize()
                        sector, _ = Sector.objects.get_or_create(sector=obj_ok)
                        sec_list.append(sector)

                act_list = []
                for a in data["activity"]:
                    activity, _ = Activity.objects.get_or_create(activity=a)
                    act_list.append(activity)

                # academic_level = AcademicLevel(academic_lvl=None, description=None, year=YearAcademicLevel(year=2025))
                academic_level = None

                if data["year_academic_lvl"] is not None:
                    year, _ = YearAcademicLevel.objects.get_or_create(
                        year=int(data["year_academic_lvl"])
                    )

                    academic_level = AcademicLevel(
                        academic_lvl=data["academic_level"], description=None, year=year
                    )

                    if data["academic_level"] == "Máster":
                        academic_level.description = data["description"]
                    # create and save Academic level
                    academic_level.save()

                satisfation_list = []
                for question, val in questions.items():

                    satisfation, _ = Satisfation.objects.get_or_create(
                        questionS=question, value=int(val)
                    )
                    # satisfation, _ = Satisfation.objects.get(pk=)
                    satisfation_list.append(satisfation)

                myuser = MyUser.objects.create(
                    username=None, password=None, is_staff=False, is_superuser=False
                )
                # add group and perms to user 
                # group = Group.objects.get(name='respondant')              
                # myuser.groups.add(group)

                # pbe_training =None
                # # only if is true
                # if data["PBE_training"] == "Sí":
                #     pbe_training = data["PBE_training"]

                respondant = Respondant(
                    respondant=myuser,
                    age=int(data["age"]),
                    sex=data["sex"],
                    nationality=data["nationality"],
                    city=data["city"],
                    region=data["province"],
                    level_PBE=int(data["level_PBE"]),
                    PBE_knownledge=bool(data["PBE_knownledge"]),
                    PBE_training=data["PBE_training"],
                    speciality=data["speciality"],
                    academic_level=academic_level,
                    grade=int(data["satisfation"]),
                )
                respondant.save()

                # add many to many fields,
                respondant.profarea.set(prof_list)
                respondant.satisfation.set(satisfation_list)

                # If is profesional
                if data["profile"] == "Profesional":
                    profesional = Profesional.objects.create(
                        profesional=respondant,
                        supervisor=bool(data["supervisor"]),
                        dedicationW=int(data["dedicationW"]),
                        years=int(data["years"]),
                    )

                    # profesional.activities.set(act_list)
                    profesional.sectors.set(sec_list)
                    profesional.enviroments.set(env_list)

                    # Traverse activity array but is not equal activity_val index, map
                    for i, a in enumerate(act_list):
                        dedication, _ = Dedication.objects.get_or_create(
                            profesional=profesional,
                            activity=a,
                            percentatge=data[f"activity_val_{i}"],
                            # percentatge=activities_dic[a.activity],
                        )

                        # dedication.percentatge = float(data[f"activity_val_{index}"])
                        # dedication.save

                # return user serializable
                respondant_serial = RespondantSerializer(respondant)

            except ValidationError as e:
                return Response({"error": f"{e}"}, HTTP_400_BAD_REQUEST)
            return Response(respondant_serial.data, HTTP_201_CREATED)

class RespuestaView(CreateAPIView):
    serializer_class = RespuestaSerializer

    def create(self, request):
      
        answers = request.data["answers"]
        list_area = set()
        correct = 0
        total = len(answers)

        solutions = set(OptionQuestion.solutions.values_list("idP_id", "idO_id")) 
        if not answers:
            return Response(
                {"error": "No se enviaron respuestas"},
                status=HTTP_400_BAD_REQUEST
            )
    
        try:
            with transaction.atomic():

                for r in answers:
                
                    solution = (int(r["question"]), int(r["option"]))
              
                    serializer = RespuestaSerializer(data=r) 
                    if serializer.is_valid():
                        serializer.save() 
                            
                    if solution in solutions:
                        correct += 1
                    else:
                        list_area.add(InterestArea.objects.get(question__idP=r['question']).int_area)   
            return Response(
            {
                "success": {
                    "num_correct": correct,
                    "num_incorrect": total-correct,
                    "areas": list_area,
                }
            },
           status=HTTP_200_OK,
        )
        except ValidationError as ve:
            return Response(
                {"error": f"Error al crear las respuestas de {ve}"}, status=HTTP_400_BAD_REQUEST
            )

class OptionQuestionView(APIView):

    serializer_class = OptionQuestionSerializer

    def post(self, request):

        answers = request.data

        # list of tuples (question, option) transformed to a set
        solutions = set(OptionQuestion.solutions.values_list("idP_id", "idO_id"))
        # solution_ids = solutions.values_list('idP', flat=True)
        correct = 0
        total = len(answers)
        list_area = set()
        
        if not answers:
            return Response({"error": "No se enviaron respuestas"},status=HTTP_400_BAD_REQUEST)
   
        for r in answers:
            # create answer in BD
            solution = (r["question"], r["option"])
            try:
                # deserialize JSON to answer
                serializer = RespuestaSerializer(data=r) 
                if serializer.is_valid():
                    serializer.save()

            except Respuesta.DoesNotExist:
                return Response(
                    {"error": f"Error respuesta no encontrada {r['question']}"}, status=HTTP_400_BAD_REQUEST
                )

            if solution in solutions:
                correct += 1
            else:
                try:
                    area_serial = (InterestArea.objects.get(question__idP=r['question']))
                    list_area.add(area_serial.data['int_area'])  
                except InterestArea.DoesNotExist:
                    return Response({'error':f'La área de interés no existe de la pregunta{r['question']}'}, status=HTTP_404_NOT_FOUND) 
        return Response(
            {
                "success": {
                    "num_correct": correct,
                    "num_incorrect": total-correct,
                    "areas": list_area,
                }
            },
           status=HTTP_200_OK,
        )