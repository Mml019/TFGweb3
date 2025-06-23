from django.urls import path
from  .views import *

urlpatterns = [
    path('admin/home', view=index, name='admin-home'),
]