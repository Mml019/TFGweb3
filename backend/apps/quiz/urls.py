from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import *

# SimpleRouter is also a good option but default router adds url of all api endpoints
router = DefaultRouter()
router.register(r"", QuestionViewSet)

# Django Endpoint is quiz/
urlpatterns = [
    # path('quiz-part1/', view=part1, name='register-user')
    path('questions/', include(router.urls)),
    path('quiz/', QuizViews.as_view(), name='show-random-quiz'),
    path('quiz/<int:pk>/', QuizDetailViews.as_view(), name='show-quiz'),
    path('user/', RespondantViews.as_view(), name='create-user'),
    path('respuestas/', RespuestaView.as_view(), name='create-answer'),
    path('options/', OptionQuestionView.as_view(), name='solutions')
#     path('userP/', RespondantViewPrueba.as_view(), name='create-user-prueba')
 ]
