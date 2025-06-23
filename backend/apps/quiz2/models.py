import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser, User
from .utils import *


# Create your models here.

# ------------- QUESTION CLASS --------------
class Dimension(models.Model):
    idD = models.PositiveSmallIntegerField(default=1, primary_key=True)
    dimension = models.CharField(max_length=30)

    def __str__(self):
        return str("ID " + self.id + " Dimension " + self.dimension)

class InterestArea(models.Model):
    idA = models.PositiveSmallIntegerField(primary_key=True)
    orden = models.PositiveSmallIntegerField(default=1)
    int_area = models.CharField(max_length=30)
    dimension = models.ForeignKey(Dimension, on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        indexes = [models.Index(fields=['int_area'])]

    def __str__(self):
        return str("ID " + self.id + " Orden "+ self.orden + " Área de Interés " + self.int_area + " Dimension " + self.dimension)
      
class CoreContent(models.Model):
    idC = models.PositiveSmallIntegerField(primary_key=True)
    core_cont = models.CharField(max_length=30)
    int_area = models.ForeignKey(InterestArea, on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        indexes = [models.Index(fields=['core_cont'])]
    
    def __str__(self):
        return str("ID " + self.id + " Contenido Nuclear " + self.core_cont + " Área de interés " + self.int_area)

class Question(models.Model):  
    id = models.PositiveIntegerField(default=1, primary_key=True)
    statement = models.CharField(max_length= 50, unique=True)  
    time = models.TimeField()
    difficult_level = models.PositiveSmallIntegerField(default=0)
    dimension = models.ForeignKey(Dimension, on_delete=models.CASCADE, null=True)

    class QuestManager(models.Manager):
        def get_queryset(self):
            return super().get_queryset()

    # class Meta:
    #     indexes = [models.Index(fields=['statement'])]
    #     constraints = [ models.UniqueConstraint(fields=['idP','version'], name='unique_version_per_question')]
    
    def __str__(self):
        return str("ID " + self.idP + " Enunciado " + self.statement + " Version "+ self.version)

# Class that represents the solution at all the options, relathinship many to one with question
class Option(models.Model):
    option = models.CharField(max_length=25)
    motive = models.TextField(max_length=250, blank=True, null=True)
    question_solution = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='solution')
    question = models.ManyToManyField(Question, through='Options', related_name='option_values')

    class Meta:
        indexes = [models.Index(fields=['option'])]    

    def __str__(self):
        return str("ID " + self.id + " Solución " + self.option + " Motivo " + self.motive)

class Options(models.Model): 
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='option_value_to_question')
    option = models.ForeignKey(Option, on_delete=models.CASCADE, related_name='option_value') # this id of the value
    pk = models.CompositePrimaryKey('question', 'option')

    def __str__(self):
        return str("Pregunta " + self.question + " Respuesta " + self.option)
    
# ------------- RESPONDANT AND INTERVIEWER CLASS --------------

# AbstractUser to adapt default User Django Class
class MyUser(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, max_length=12)
    username = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=20)

# class Interviewer(models.Model):
#     # As this relationship is OneToOne and primary key too shares id between interviewer and myuser class 
#     interviewer = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    
#     def __str__(self):
#        return str("ID: "+ self.id + "usuario: " + self.username)
        
# class Profesion(models.Model):
#     profesion = models.CharField(max_length=30, primary_key=True)
    
#     class Meta:
#         ordering = ['profesion']

#     def __str__(self):
#         return str("Profesion " + self.profesion)
            
# class Respondant(models.Model):

#     class Sex(models.TextChoices):
#         FEMALE = 'Femenino'
#         MALE = 'Masculino'

#     class Tittle(models.TextChoices):
#         STUDENT =  'Estudiante', 
#         GRADE = 'Grado/Licenciatura-Diplomatura',
#         MASTER = 'Master/Postgrado', 
#         DOCTORATE= 'Doctorado'

#     respondant = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    
#     age = models.PositiveSmallIntegerField()
#     sex = models.CharField(choices=Sex)
#     nationality = models.CharField(max_length=15)
#     city = models.CharField(max_length=25)
#     region =models.CharField(max_length=25)
#     level_PBE = models.PositiveSmallIntegerField()
#     title = models.CharField(choices=Tittle)
#     # blank True permits set blank in forms and null True permits set null in a database field
#     year_title = models.PositiveSmallIntegerField(blank=True, null=True, validators=[year])
#     PBE_knownledge = models.BooleanField(default=False)
#     PBE_training = models.CharField(max_length=30)
#     speciality = models.CharField(max_length=20, blank=True, null=True)
    
#     # if i change the name to reply or answer doe
#     questions = models.ManyToManyField(Question, through='Respuesta', related_name='respondant_answer_to_question')
#     profesions = models.ManyToManyField(Profesion, through='ResProfs', related_name='profesional_area_user')
    
#     def __str__(self):
#        return str("ID: "+ self.id)
    
# class ResProfs(models.Model):
#     pk = models.CompositePrimaryKey('profesion_id', 'respondant_id')
#     profesion = models.ForeignKey(Profesion, on_delete=models.CASCADE)
#     respondant = models.ForeignKey(Respondant, on_delete=models.CASCADE)

# # # ------------- ANSWER CLASS --------------
# # # The class name is in spanish cause django don't permit other
# class Respuesta(models.Model):
#     pk = models.CompositePrimaryKey('respondant_id','question_id')
#     respondant = models.ForeignKey(Respondant, on_delete=models.CASCADE)
#     question = models.ForeignKey(Question, on_delete=models.CASCADE)
#     answer = models.CharField(max_length=25, editable=False, blank=False)
#     time = models.TimeField(editable=False, blank=False)
#     date = models.DateTimeField(auto_now_add=True)
    
#     class Meta:
#         ordering = ['-date']
    
#     def __str__(self):
#         return str("ID " + self.pk + " Enunciado " + self.answer)

# # Students can be profesionals, students or both {M,OR} for that reason we don't have to fusionate them
# #------------------- STUDENTS ------------------------
# class  Student(models.Model):
#     student = models.OneToOneField(Respondant, on_delete=models.CASCADE, primary_key=True)
#     academic_lvl = models.PositiveSmallIntegerField()

#     class Meta:
#         abstract = True

# # If is {M, XOR} inheritance, 3 splitted classes of students are created
# class Stu_Master(Student):
#     master = models.CharField(max_length=25)

#     class Meta:
#         indexes = [models.Index(fields=['academic_lvl'])]

#     def __str__(self):
#         return str("ID " + self.student + " Nivel Académico " + self.academic_lvl)
 
# class Stu_Grade(Student):
#     course = models.PositiveSmallIntegerField()

#     class Meta:
#        indexes = [models.Index(fields=['academic_lvl'])]

#     def __str__(self):
#         return str("ID " + self.student + " Nivel Académico " + self.academic_lvl)

# class Stu_Doctorado(Student):
    
#     class Meta:
#         indexes = [models.Index(fields=['academic_lvl'])]  

#     def __str__(self):
#         return str("ID " + self.student + " Nivel Académico " + self.academic_lvl)

# #------------------- PROFESIONALS --------------------          
# class Enviroment(models.Model):
#     enviroment = models.CharField(max_length=25, primary_key=True)

#     def __str__(self):
#         return str("environ " + self.environ)
    
# class Sector(models.Model):
#     sector = models.CharField(max_length=15, primary_key=True)

#     def __str__(self):
#         return str("sector " + self.sector)

# class Activity(models.Model):
#     activity = models.CharField(max_length=20, primary_key=True)

#     def __str__(self):
#         return str("activity " + self.activity)
    
# class  Profesional(models.Model):
#     profesional = models.OneToOneField(Respondant, on_delete=models.CASCADE, primary_key=True)
#     supervisor = models.BooleanField(default=False)
#     dedicationW = models.PositiveSmallIntegerField(default=0)
#     years = models.PositiveSmallIntegerField(default=0)
    
#     #activities = models.ManyToManyField(Activity, through='Dedication', related_name='activities_by_profesional')
#     #sectors = models.ManyToManyField(Sector, through='sectors', related_name='sectors_on_works')
#     #enviroments = models.ManyToManyField(Enviroment, through='Envprof', related_name='enviroments_on_works')

# # Intermediate class between activity and profesional to show pecentatge of time that a profesional takes to do an activity
# class Dedication(models.Model):
#     pk = models.CompositePrimaryKey('profesional_id','activity_id')
#     profesional = models.ForeignKey(Profesional, models.CASCADE, related_name='id_between_activity_profesional')
#     activity = models.ForeignKey(Activity, models.CASCADE)
#     percentatge = models.PositiveSmallIntegerField(default=0)
        
# class  Envprof(models.Model):
#     pk = models.CompositePrimaryKey('profesional','enviroment_id')
#     enviroment = models.ForeignKey(Enviroment, on_delete=models.CASCADE)
#     profesional = models.ForeignKey(Profesional, on_delete=models.CASCADE)

# class  SecProf(models.Model):
#     pk = models.CompositePrimaryKey('profesional','sector_id')
#     enviroment = models.ForeignKey(Sector, on_delete=models.CASCADE)
#     profesional = models.ForeignKey(Profesional, on_delete=models.CASCADE)
    