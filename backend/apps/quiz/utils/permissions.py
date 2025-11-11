from django.contrib.auth.models import Group, Permission

# permissions are created before running the server 
# with python manage.py shell or in readys method apps.py config using signals

def create_group( apps, schema_editor, type):
    # Obtener los modelos históricos (no importarlos directamente)
    Group = apps.get_model('auth', 'Group')
    try :
        group, bool = Group.objects.get_or_create(name=type) 
        print(f'method {group} y  {bool}') 
    
        if bool:
            permissions, no_permissions = create_permissions(apps, schema_editor, type)
            print(f'perms {permissions} y  {no_permissions}') 
            # use it * as split a list into items
            if type == 'interviewer':
                all_perm = Permission.objects.all()
                print(all_perm)
                if all_perm is not None:
                    group.permissions.set(all_perm)
                    group.permissions.remove(*no_permissions)
                
                group.save()
                return group
            group.permissions.add(*permissions)
            group.save()
            
        return group 
    except Exception as e:
        print(f"Error creating group {type}: {e}")
        return None
    
def create_permissions(apps, schema_editor, type):
    permissions = [] 
    no_permissions =[]
    Permission = apps.get_model('auth', 'Permission')
    
    if type == 'respondant':
        permissions.extend([
            Permission.objects.get(codename='add_respuesta'),
            Permission.objects.get(codename='view_question'),
            Permission.objects.get(codename='change_question'),
            Permission.objects.get(codename='view_option')
        ])
    # is staff so only i remove the permissions add and change respuesta
    elif type == 'interviewer':

        no_permissions.extend([
            Permission.objects.get(codename='add_respuesta'),
            Permission.objects.get(codename='change_respuesta'),
            Permission.objects.get(codename='add_respondant'),
            Permission.objects.get(codename='change_respondant'),
        ])
        
    return permissions, no_permissions

