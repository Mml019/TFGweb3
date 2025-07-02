from django.contrib import admin
from .models import *

# Register your models here.
# Models with composite key or abstract can't be registered 

admin.site.register(Dimension)
admin.site.register(InterestArea)
admin.site.register(CoreContent)
admin.site.register(Question)
admin.site.register(Option)

admin.site.register(Quiz)

admin.site.register(MyUser)
admin.site.register(Interviewer)
admin.site.register(Respondant)
admin.site.register(Profesion)
admin.site.register(Profesional)
admin.site.register(Stu_Grade)
admin.site.register(Stu_Doctorado)
admin.site.register(Stu_Master)

admin.site.register(Enviroment)
admin.site.register(Activity)
admin.site.register(Sector)




