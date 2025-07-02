"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include , re_path
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings
from .settings import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('quiz/', include('apps.quiz2.urls')),
    path('quiz-admin/', include('apps.quiz2.urls_admin'))
] 

# include this is you want see static files(images, etc) content in development
#  static(STATIC_URL, document_root=STATIC_ROOT)
#
#

# to put react into Django
#urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='frontend/index.html'))]