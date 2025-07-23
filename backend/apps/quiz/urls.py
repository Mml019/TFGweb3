from django.urls import path
from  .views import *

# Django Endpoint is quiz/
urlpatterns = [
    path('home/', view=index, name='bienvenida'),
    #path('quiz-part1/', view=part1, name='register-user')

]
