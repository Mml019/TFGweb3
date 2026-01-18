# from django.contrib.auth.models import Group, Permission
# from django.db import transaction
# from django.dispatch import receiver
# from django.db.models.signals import post_migrate


def assign_permissions(type):

    permissions = []

    if type == "interviewer":
        try:
            permissions.extend(
                [
                    Permission.objects.get(codename="add_quiz"),
                    Permission.objects.get(codename="view_quiz"),
                    Permission.objects.get(codename="change_quiz"),
                    Permission.objects.get(codename="delete_quiz"),
                    Permission.objects.get(codename="add_question"),
                    Permission.objects.get(codename="view_question"),
                    Permission.objects.get(codename="change_question"),
                    Permission.objects.get(codename="delete_question"),
                    Permission.objects.get(codename="add_option"),
                    Permission.objects.get(codename="view_option"),
                    Permission.objects.get(codename="change_option"),
                    Permission.objects.get(codename="delete_option"),
                    Permission.objects.get(codename="add_dimension"),
                    Permission.objects.get(codename="change_dimension"),
                    Permission.objects.get(codename="delete_dimension"),
                    Permission.objects.get(codename="view_dimension"),
                    Permission.objects.get(codename="add_interestarea"),
                    Permission.objects.get(codename="view_interestarea"),
                    Permission.objects.get(codename="change_interestarea"),
                    Permission.objects.get(codename="delete_interestarea"),
                    Permission.objects.get(codename="add_corecont"),
                    Permission.objects.get(codename="view_corecont"),
                    Permission.objects.get(codename="change_corecont"),
                    Permission.objects.get(codename="delete_corecont"),
                    Permission.objects.get(codename="add_apperancequiz"),
                    Permission.objects.get(codename="view_apperancequiz"),
                    Permission.objects.get(codename="delete_apperancequiz"),
                    Permission.objects.get(codename="view_respuesta"),
                    Permission.objects.get(codename="delete_respuesta"),
                    Permission.objects.get(codename="add_respondant"),
                    Permission.objects.get(codename="view_respondant"),
                    Permission.objects.get(codename="delete_respondant"),
                    Permission.objects.get(codename="add_optionquestion"),
                    Permission.objects.get(codename="view_optionquestion"),
                    Permission.objects.get(codename="change_optionquestion"),
                    Permission.objects.get(codename="delete_optionquestion"),
                ]
            
            )
        except Permission.DoesNotExist as e:
            return print(f'Permission not exist {e} for type {type}')

    if type == "respondant":
        try:
            permissions.extend(
                [
                    Permission.objects.get(codename="view_question"),
                    Permission.objects.get(codename="view_option"),
                    Permission.objects.get(codename="view_dimension"),
                    Permission.objects.get(codename="view_interestarea"),
                    Permission.objects.get(codename="view_corecontent"),
                    Permission.objects.get(codename="view_enviroment"),
                    Permission.objects.get(codename="add_enviroment"),
                    Permission.objects.get(codename="add_envprof"),
                    Permission.objects.get(codename="view_activity"),
                    Permission.objects.get(codename="add_dedication"),
                    Permission.objects.get(codename="view_dimension"),
                    Permission.objects.get(codename="view_sector"),
                    Permission.objects.get(codename="add_sector"),
                    Permission.objects.get(codename="add_secprof"),
                    Permission.objects.get(codename="view_profesionalarea"),
                    Permission.objects.get(codename="add_profesionalarea"),
                    Permission.objects.get(codename="view_academiclevel"),
                    Permission.objects.get(codename="add_yearacademiclevel"),
                    Permission.objects.get(codename="view_satisfation"),
                    Permission.objects.get(codename="add_satisfationres"),
                    Permission.objects.get(codename="add_respuesta"),
                ]
            )
        except Permission.DoesNotExist as e:
            return print(f'Permission not exist {e} for type {type}')
    try:
        group = Group.objects.get(name=type)
        group.permissions.set(permissions)
        group.save()
        print(f'Group {type} assigned permissions: {permissions}')
        return permissions
    except Group.DoesNotExist:
        return f"Grupo {type} no existe. No puede asignarsele permisos."


# @receiver(post_migrate)
# def create_groups_and_permissions(sender, **Kwargs):
#     try:
#         group, bool = Group.objects.get_or_create(name="interviewer")
#         # has been before created return False
#         if bool:
#             print(f'Interviewer {bool}')
#             assign_permissions("interviewer")

#         group, bool = Group.objects.get_or_create(name="respondant")
#         if bool:
#             print(f'Respondant {bool}')
#             assign_permissions("respondant")

#     except Exception as e:
#         return f"Error creating group {type}. Error: {e}"


# #         return create_group(apps, schema_editor, 'interviewer')

# #     def create_group_respondant(apps, schema_editor):
# #         return create_group(apps, schema_editor, 'respondant')
# 
from django.contrib.auth.models import Group, Permission
from django.db.models.signals import post_save
from django.dispatch import receiver
from apps.quiz.models import MyUser 

# def assign_permissions(type):
#     """Función para asignar permisos según el grupo""" 
#     permissions = [] 
#     if type == "interviewer": 
#         permissions.extend([
#             Permission.objects.get(codename="add_quiz"),
#             Permission.objects.get(codename="view_quiz"),
#               Permission.objects.get(codename="change_quiz"), 
#               Permission.objects.get(codename="delete_quiz"), 
#               # Agrega los permisos adicionales para 'interviewer' 
#             ]) 
#     elif type == "respondant": 
#         permissions.extend([ 
#             Permission.objects.get(codename="view_question"),
#               Permission.objects.get(codename="view_option"), 
#               # Agrega los permisos adicionales para 'respondant' 
#             ]) 
#     group = Group.objects.get(name=type) 
#     group.permissions.set(permissions) 
#     group.save() 

@receiver(post_save, sender=MyUser) 
def create_group_and_permissions_after_user_creation(sender, instance, created, **kwargs):
    """Asignar permisos cuando se crea un nuevo usuario""" 
    if created: 
        print(f"Usuario {instance.username} creado, asignando permisos...") 
        # Asignamos el grupo 'respondant' o 'interviewer' según el tipo de usuario 
        if instance.is_staff or instance.is_superuser:
            type = "interviewer"
        else: 
            type = "respondant" 
        group, bool = Group.objects.get_or_create(name=type) 
        # Asignamos permisos al grupo 
        if bool:
           perm = assign_permissions(type) 
           instance.user_permissions.add(perm) 
        # Agregamos el usuario al grupo correspondiente 
        instance.groups.add(group)
        instance.save() 
        # Guarda el usuario nuevamente si es necesario 
        print(f"Permisos asignados al grupo {type} para el usuario {instance.username}") 
