# from rest_framework.response import Response
# from rest_framework.status import *
# from rest_framework.views import APIView
# from rest_framework.generics import CreateAPIView

# from models import *
# from api.serializers import *

# class LogView(APIView):
#     queryset = Interviewer.objects.all()
#     serializer = InterviewerSerializer()

#     def login(self, request):
#         if request.method == 'POST':
            

#             return Response('login',status=HTTP_200_OK)
        
    
#     def logout(self, request):
#         return Response('logout',status=HTTP_200_OK)
    
# class Registration(CreateAPIView):
#     def create(self, request):
#         if request.method == 'POST':
#             user = 
#         else return Response(, )
