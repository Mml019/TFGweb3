from django.urls import path, include
from  .views import *
from rest_framework.routers import DefaultRouter

# SimpleRouter is also a good option but default router adds url of all api endpoints
router = DefaultRouter()
router.register(r'questions/',QuestionViewSet)

# Django Endpoint is quiz/
urlpatterns = [
    #path('quiz-part1/', view=part1, name='register-user')
    path('quiz/', include(router.urls))

]
