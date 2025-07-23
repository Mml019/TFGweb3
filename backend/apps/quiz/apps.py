from django.apps import AppConfig
#from .permissions import create_groups

class Quiz2Config(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.quiz'

    # def ready(self):
    #     create_groups()
    #     return super().ready()