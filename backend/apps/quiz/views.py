from rest_framework.status import *
from rest_framework.response import Response
from rest_framework.request import Request

from django.http.response import HttpResponse

# Create your views here.
def index(request):
    return HttpResponse('Bienvenido')

def QuestionViewSet():
    pass

class Quiz()