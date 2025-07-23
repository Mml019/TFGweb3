from django.contrib.auth.models import Group, Permission

# permissions are created before running the server 
# with python manage.py shell or in readys method apps.py config using signals

def create_group(type):
    try :
        type, bool = Group.objects.get_or_create(name=type)  
        if bool:
            permissions = [create_permissions(type)]
            # if type == 'interviewer':
            #     type.permissions.remove(no_permissions)
            type.permissions.add(permissions)
        return type 
    except:
        return None   
    
def create_permissions(type):
    permissions = [] 
    #no_permissions =[]

    if type == 'respondant':
        permissions.append(
            Permission.objects.get(codename='add_respuesta'),
            Permission.objects.get(codename='view_question')
        )
    # is staff so only i remove the permissions add and change respuesta
    elif type == 'interviewer':
        permissions.append(
            Permission.objects.get(codename='add_question'),
            Permission.objects.get(codename='view_question'),
            Permission.objects.get(codename='delete_question'),
            Permission.objects.get(codename='change_question'),
            Permission.objects.get(codename='add_option'),
            Permission.objects.get(codename='view_option'),
            Permission.objects.get(codename='delete_option'),
            Permission.objects.get(codename='change_option'),
            Permission.objects.get(codename='add_solution'),
            Permission.objects.get(codename='view_solution'),
            Permission.objects.get(codename='delete_solution'),
            Permission.objects.get(codename='change_solution'),
            
            Permission.objects.get(codename='view_respuesta'),
            Permission.objects.get(codename='delete_respuesta'),
            Permission.objects.get(codename='view_usuarios'),
            Permission.objects.get(codename='delete_usuarios'),
        )

        # no_permissions.append(
        #     Permission.objects.get(codename='add_respuesta'),
        #     Permission.objects.get(codename='change_respuesta')
        # )
        
    return permissions #, no_permissions
