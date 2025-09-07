from rest_framework.response import Response
from rest_framework.status import *
from rest_framework.views import APIView
from rest_framework.generics import *
from rest_framework.viewsets import ModelViewSet
from rest_framework.parsers import MultiPartParser, FileUploadParser

from django.http.response import HttpResponse

from django.contrib.auth import login, logout, authenticate

from api.serializers import *
from apps.quiz.permissions import *
from .pagination import SmallPageNumberPagination

# imports to Normalize and clean data
import openpyxl as xl
import pandas as pd
import re
import io
import re
from unicodedata import normalize

import random

# -------- USER FUNTIONS -----------
class LoginView(APIView):

    # login
    def post(self, request):
            user = authenticate(request, username=request.POST['username'], password=request.POST['password'])
            
            if user is not None:
                login(request, user)
                return Response({'success' : user}, status=HTTP_200_OK)
            
            return Response({'error': 'Request method not allowed', 'user' : user}, status=HTTP_400_BAD_REQUEST)
         
class LogoutView(APIView):    
    #logout
    def post(self, request):
        logout(request)
        return Response('logout',status=HTTP_200_OK)
    
# class Registration(CreateAPIView):

    # register
    def post(self, request):
        # this serializer adds user with is_staff = True
        serializer = MyUserSerializerRegistration(data=request.data)
        if serializer.is_valid():
            user =  serializer.save()
            
        # user = MyUser.objects.create_user(username=request.POST['username'],password=request.POST['password'], is_staff=True)
        # print(user)
        #user = MyUser.objects.get(username=request.data['username'])
            if user is not None:                
                # add all permissions except add or change answers       
                group = create_group('interviewer')
                user.groups.add(group)

                # when user admin is created obtain the token access

            else: return Response({'error': 'User not found '+ user }, status=HTTP_404_NOT_FOUND)
            return Response({'success': serializer.data, 'user': user}, status=HTTP_201_CREATED)
        return Response({'error': serializer.errors}, status=HTTP_400_BAD_REQUEST)
        
#class Password(APIView):

    # change password
    def put(self, request, user_id):
        
        user = MyUser.objects.get(user_id)
        # if user.DoesNotExist:
        try:         
            serializer = MyUserSerializerRegistration(user, request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'success': serializer.data}, status=HTTP_200_OK)   
            return Response({'error': serializer.data}, status=HTTP_400_BAD_REQUEST)
        except:
            return Response({'error': user}, status=HTTP_404_NOT_FOUND)  
    
    # forgot password
    def get(self, request):
        try:
            user = MyUser.objects.get(username=request.data['username'])
            serializer = MyUserSerializerRegistration(user)
            serializer.update()
            return Response({'success': serializer.data['password']}, status=HTTP_200_OK)
        except:
            return Response({'error': user}, status=HTTP_404_NOT_FOUND) 

# ----------- QUIZ APP----------------

class QuizByQuestionsView(APIView):
    parser_classes = [MultiPartParser] 

    '''Get a list of ids a random Quiz from all id quizzes'''
    def getRandomQuizzes(self, request):
        # obtain all the ids, id list
        ids = Quiz.objects.values_list('idQ',flat=True)
        random.shuffle(ids)

    ''' To get a quiz by id'''
    def get(self, request, id):
        id = request.query_params
     
        quiz = Quiz.objects.get(id)
        if quiz is None:
            return Response({'error': 'Not found or not exits'}, status=HTTP_404_NOT_FOUND)
        quiz_serial = QuizSerializer(quiz, many=True)
        return Response({'success': quiz_serial.data}, status=HTTP_200_OK)

    ''' To show all quizzes paginated by 20 size to teh admin'''
    def get(self, request):
        if Quiz.objects.exists() is False:
            return Response({'error': 'There are any quizzes'}, status=HTTP_204_NO_CONTENT)

        quizzes = Quiz.objects.all()
        quiz_serial = QuizSerializer(quizzes, many=True)
    
        paginator = SmallPageNumberPagination()
        quiz_serial_paginated = paginator.paginate_queryset(quiz_serial)

        # paginate the response 
        return paginator.get_paginated_response({'quizzes': quiz_serial_paginated.data})

    def post(self, request):

        try:
            file = request.FILES.get('file') 
        except:
            return Response({'error': 'Not file in request.FILES'}, status=HTTP_400_BAD_REQUEST)
          
        if file is None:
            return Response({'error': 'Not file added'}, status=HTTP_400_BAD_REQUEST)

        if not (file.name.endswith('.csv') or file.name.endswith('.xlsx')):
            return Response({'error': 'Incorrect Format, only .csv or Excel files permited'}, status=HTTP_400_BAD_REQUEST)
        
        # Garantizes CSV UTF-8 because accents interpreted errors
        memo_file=ensureDecode(file)
    
        # Dataframe to read and normalize
        if(file.name.endswith('csv')):
            df = pd.read_csv(memo_file, encoding='utf-8', delimiter=';')      
        elif(file.name.endswith('xlsx')):
            df = pd.read_excel(file)          
        else:
            return Response({'error': 'Incorrect Format, only CSV or XLSX files permited'}, status=HTTP_400_BAD_REQUEST)
        
        #df_normal= normalizeFile(df)

        
        return Response({'success': df}, status=HTTP_200_OK)

    def normalitation():
        print('hola')
    #     HEADER = ['Enunciado', 'Dimensión', 'Área de interés', 'Contenido nuclear', 'Nivel de dificultad a priori', 'Solución', 'Motivo', 'Opciones']
    #     # transform without accents
    #     HEADER_norm =normalize( 'NFC',  HEADER)
    #     NEW_header = ['enunciado', 'dimension','area', 'contenido','dificultad', 'solcuion', 'motivo', 'opciones'] 
        
    #     if df.isin(HEADER|HEADER_norm) :
    #         df.columns =  

    #     if (df.iloc[0].str.lower).to_list is HEADER.lower or  HEADER_norm.lower:
    #         df.iloc[0]= NEW_header
            
    #     df.columns = NEW_header
               
    #     # Normalize types
    #     df =  df.astype('string')
    #     df = df.apply(lambda x: )

    #     # Normalize

'''
Ensures right decode to CSV if is not a UTF-8 CSV, because accents can't be resolved corrected.
Returns a new csv file in memory to be decoded into a new utf-8 file.
'''
def ensureDecode(file):
    contenido_str = file.read().decode('latin-1')
    # To read text and not bytes in memory we need io library
    archivo_en_memoria = io.StringIO(contenido_str)        
    return(archivo_en_memoria)

def normalizeFile(file):
    # determine separator

    # delete blanks before and after each colum

    # NA values
    
    # Duplicados,
    
    # Guardar orden
    
    # Establecer columns
    return
    
# ModeliViewSet has already implemented to use create, retrieve, partial_update, update, destroy and list methods.
class QuestionView(ModelViewSet):
    pass

class ShowAnswersByRespondant(APIView):

    def get(self, request):
        answers = Respuesta.objects.select_related('respondant')
        answers_respondant=answers.annotate('respondant').values('respondant__id','question__id','statement','solution','answer','date', 'time')
        if answers_respondant.exists():
            serializer = RespuestaSerializer(answers_respondant, many=True)


            return Response({'success', serializer.data}, status=HTTP_200_OK)
        return Response({'error': answers}, status=HTTP_404_NOT_FOUND)
    
class ShowResultsByQuestion(APIView):

    def get(self, request):
            pass
        # answers = Respuesta.objects.
        # if answers.exists():
        #     serializer = RespuestaSerializer(answers, many=True)
        #     return Response({'success'})
        # return Response({'error': answers}, status=HTTP_404_NOT_FOUND)  
