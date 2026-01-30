from django.apps import AppConfig

class Quiz2Config(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.quiz"

    # def ready(self):
    #     # Llamar al método que crea los grupos y asigna los permisos
    #     print("Iniciando asignación de grupos y permisos...")
    #     self.create_groups_and_permissions()

    # def create_groups_and_permissions(self):
    #     from django.contrib.auth.models import Group, Permission
    #     try:
    #         group1, created1 = Group.objects.get_or_create(name="interviewer")
    #         if created1:
    #             print('Grupo "interviewer" creado.')
    #             self.assign_permissions("interviewer")

    #         group2, created2 = Group.objects.get_or_create(name="respondant")
    #         if created2:
    #             print('Grupo "respondant" creado.')
    #             self.assign_permissions("respondant")

    #     except Exception as e:
    #         print(f"Error al crear grupos y asignar permisos: {e}")
    
    # def assign_permissions(self, group_name):
    #     from django.contrib.auth.models import Group, Permission
    #     permissions = []
    #     if group_name == "interviewer":
    #         permissions.extend([
    #             Permission.objects.get(codename="add_quiz"),
    #             Permission.objects.get(codename="view_quiz"),
    #             # Agregar más permisos
    #         ])
    #     elif group_name == "respondant":
    #         permissions.extend([
    #             Permission.objects.get(codename="view_question"),
    #             # Agregar más permisos
    #         ])
        
    #     group = Group.objects.get(name=group_name)
    #     group.permissions.set(permissions)
    #     group.save()

    def ready(self):
        import apps.quiz.utils.signals
        
