from django.contrib import admin
from .models import *

# Register your models here.
# Models with composite key or abstract can't be registered 

admin.site.register(Dimension)
admin.site.register(InterestArea)
admin.site.register(CoreContent)

class QuestionAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Question._meta.fields]
admin.site.register(Question, QuestionAdmin)

admin.site.register(Option)
admin.site.register(Quiz)

class MyUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'password', 'is_staff','is_superuser')
admin.site.register(MyUser, MyUserAdmin)

admin.site.register(Respondant)
admin.site.register(ProfesionalArea)


class SatisfationAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Satisfation._meta.fields]
admin.site.register(Satisfation, SatisfationAdmin)

class ProfesionalAdmin(admin.ModelAdmin):
    list_display = ('profesional', 'supervisor', 'dedicationW', 'years')
admin.site.register(Profesional, ProfesionalAdmin)

admin.site.register(Enviroment)
admin.site.register(Activity)
admin.site.register(Sector)

# CompositePrimaryKey 
# admin.site.register(OptionQuestion)
# admin.site.register(AppearanceQuiz)
# admin.site.register(SatisfationArea)
# admin.site.register(SatisfationGrade)
# admin.site.register(Respuesta)
# admin.site.register(Dedication)
# admin.site.register(Envprof)
# admin.site.register(Secprof)





