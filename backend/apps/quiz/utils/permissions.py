from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from django.db import transaction
from apps.quiz.models import *

# permissions are created before running the server
# with python manage.py shell or in readys method apps.py config using signals

# PERMISSION_INT = [Respuesta, Question, Option, Quiz, Dimension, InterestArea, CoreContent]
# PERMISSION_RES = [Respondant, Respuesta]

def create_group(apps, schema_editor, type):
    # Obtener los modelos históricos (no importarlos directamente)
    Group = apps.get_model("auth", "Group")
    try:
        group, bool = Group.objects.get_or_create(name=type)
        # assign_permissions(type=type)
        group.save()
        return group
        # if bool:
        #     permissions, no_permissions = assign_permissions_by_type(type)

        #     # use it * as split a list into items
        #     if type == 'interviewer':
        #         all_perm = Permission.objects.all()
        #         if all_perm is not None:
        #             # expected id value from permission not permission
        #             group.permissions.set(all_perm.values_list('id', flat=True))
        #             group.permissions.remove(*no_permissions)

        #         group.save()
        #         return group
        #     group.permissions.add(*permissions)
        #     group.save()

        # return group
    except Exception as e:
        print(f"Error creating group {type}: {e}")
        # return None

# def assign_permissions_by_type(type):
#     permissions = []
#     no_permissions = []
#     content_type_int = []
# #     content_type_res = []
# #     for p in PERMISSION_INT:
# #         content_type_int.append(ContentType.objects.get_for_model(p))
# #     for p in PERMISSION_INT:
# #         content_type_int.append(ContentType.objects.get_for_model(p))
#     if type == "respondant":
#         try:
#             permissions.extend(
#                 [
#                     Permission.objects.get_or_create(codename="add_respuesta")[0],
#                     Permission.objects.get_or_create(codename="view_question")[0],
#                     Permission.objects.get_or_create(codename="view_option")[0],
#                     Permission.objects.get_or_create(codename="view_quiz")[0],
#                     Permission.objects.get_or_create(codename="view_dimension")[0],
#                     Permission.objects.get_or_create(codename="view_interestarea")[0],
#                     Permission.objects.get_or_create(codename="view_corecontent")[0],
#                 ]
#             )
#         except Permission.DoesNotExist as p:
#             print(f"Error: permission not exist:{p} ")
#             # return None
#     # is staff so only i remove the permissions add and change respuesta
#     elif type == "interviewer":
#         try:
#             no_permissions.extend(
#                 [
#                     Permission.objects.get_or_create(codename="add_respuesta")[0],
#                     Permission.objects.get_or_create(codename="change_respuesta")[0],
#                     Permission.objects.get_or_create(codename="delete_respuesta")[0],
#                     Permission.objects.get_or_create(codename="add_respondant")[0],
#                     Permission.objects.get_or_create(codename="change_respondant")[0],
#                 ]
#             )
#         except Permission.DoesNotExist as p:
#             print(f"Error: permission not exist:{p} ")
#     return permissions, no_permissions

def assign_permissions(type):
    if type == 'interviewer':
        assign_permissions_to_group_by_model(type, 'question')
        assign_permissions_to_group_by_model(type, 'dimension')
        assign_permissions_to_group_by_model(type, 'interestarea')
        assign_permissions_to_group_by_model(type, 'corecontent')
        assign_permissions_to_group_by_model(type, 'appearancequiz')
        assign_permissions_to_group_by_model(type, 'option')
        assign_permissions_to_group_by_model(type, 'quiz')
        assign_permissions_to_group_by_model(type, 'respuesta')
        assign_permissions_to_group_by_model(type, 'respondant')

    elif type == 'respondant':
        assign_permissions_to_group_by_model(type, 'academiclevel')
        assign_permissions_to_group_by_model(type, 'activity')
        assign_permissions_to_group_by_model(type, 'dedication')
        assign_permissions_to_group_by_model(type, 'enviroment')
        assign_permissions_to_group_by_model(type, 'envprof')
        assign_permissions_to_group_by_model(type, 'profesional')
        assign_permissions_to_group_by_model(type, 'respondant')
        assign_permissions_to_group_by_model(type, 'satisfation')
        assign_permissions_to_group_by_model(type, 'secprof')
        assign_permissions_to_group_by_model(type, 'yearacademiclevel')
        assign_permissions_to_group_by_model(type, 'sector')
    
    if Group.objects.filter(name=type).exists():
        try:
            group = Group.objects.get(name=type)
            perm, no_perm = assign_permissions_by_type(type)
            if type == 'respondant':
                group.permissions.remove(*no_perm)
            group.permissions.add(*perm)
        except Exception as e:
            print(f"Error getting group from type {type}: {e}")
            # return None

def assign_permissions_to_group_by_model(group_name, model_name):
    try:
        with transaction.atomic():
            group = Group.objects.get(name=group_name)
            permissions = Permission.objects.filter(codename__icontains=model_name)
            group.permissions.set(permissions)
            group.save()
    except Group.DoesNotExist:
        print(f"Error: Group doesn't exist {group_name}")
        # return None
    except Permission.DoesNotExist:
        print(f"Error: Not having permissions to this model: {model_name}.")
        # return None
    except Exception as e:
        print(f"Error creating permission from {model_name} to {group_name}: {e}")
        # return None
