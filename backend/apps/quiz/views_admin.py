from rest_framework.response import Response
from rest_framework.status import *
from rest_framework.views import APIView
from rest_framework.generics import *

from django.http.response import HttpResponse

from django.contrib.auth import login, logout, authenticate

from api.serializers import *
from apps.quiz.permissions import *



class LoginView(APIView):

    # login
    def post(self, request):
            user = authenticate(request, username=request.POST['username'], password=request.POST['password'])
            
            if user is not None:
                login(request, user)
                return Response({'success' : user}, status=HTTP_200_OK)
            
            return Response({'error': "Request method not allowed", 'user' : user}, status=HTTP_400_BAD_REQUEST)
         
class LogoutView(APIView):    
    #logout
    def post(self, request):
        logout(request)
        return Response('logout',status=HTTP_200_OK)
    
class Registration(CreateAPIView):

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
        
class Password(APIView):

    # change password
    def put(self, request):
        try: 

            user = MyUser.objects.get_(username=request.data['username'])

            serializer = MyUserSerializerRegistration(user, request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'success': serializer.data}, status=HTTP_200_OK)   
            return Response({'error': serializer.data}, status=HTTP_400_BAD_REQUEST)
        except:
            return Response({'error': user}, status=HTTP_404_NOT_FOUND)  
    
    # # forgot password
    # def get(self, request):
    #     try:
    #         user = MyUser.objects.get(username=request.data['username'])
    #         serializer = MyUserSerializerRegistration(user)
    #         serializer.update()
    #         return Response({'success': serializer.data['password']}, status=HTTP_200_OK)
    #     except:
    #         return Response({'error': user}, status=HTTP_404_NOT_FOUND) 


class QuizView(ListCreateAPIView):
    # post
    def create(self, request, *args, **kwargs):

        return super().create(request, *args, **kwargs)
    
    # list
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

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
