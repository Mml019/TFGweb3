from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from .models import Respuesta, Question

# permissions are created before running the server 
# with python manage.py shell or in readys method apps.py config

def create_group(type):
    type, bool = Group.objects.get_or_create(name=type)
    
    if bool:
        type_permissions = [create_permissions(type)]
        if type == 'interviewer':
            type.permissions.remove(type_permissions)
        else: type.permissions.add(type_permissions)
    
    return type    

def create_permissions(type):
    answer_perms = get_codename(model=Respuesta)
    question_perms = get_codename(model=Question)
    permissions = []

    if type == 'respondant':
        permissions.append(
            answer_perms['add_respuesta'],
            question_perms['view_question'],
        )
    # is staff so only i remove the permissions add and change respuesta
    elif type == 'interviewer':
        permissions.append(
            answer_perms['add_respuesta'],
            answer_perms['change_respuesta']
        )
        
    return permissions 

    
def get_codename(model):
    permissions = Permission.objects.filter(ContentType.objects.model(model))
    result = {}
    for perm in permissions:
        result[perm] = perm.codename
    return result