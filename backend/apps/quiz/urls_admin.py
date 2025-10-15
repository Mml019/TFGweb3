from django.urls import path
from .views_admin import *

# Django Endpoint is quiz-admin/
urlpatterns = [
    path('login/', LoginView.as_view(), name='login-admin'),
    path('logout/', LogoutView.as_view(), name='logoutn-admin'),
    # path('register/', Registration.as_view(), name='register-admin'),
    path('quizes/', QuizViews.as_view(), name='show-quizes')
]