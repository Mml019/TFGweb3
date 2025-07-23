import uuid

from django.contrib.auth.models import AbstractUser, AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db.models import Q
from django.db import models
from .utils import *


# Create your models here.

# ------------- QUESTION CLASS --------------
class Dimension(models.Model):
    idD =       models.PositiveSmallIntegerField(default=1, primary_key=True)
    orden =     models.CharField(max_length=4) 
    dimension = models.CharField(max_length=30)

    class Meta:
        indexes = [models.Index(fields=['dimension'])]
        ordering = ['orden']

    def __str__(self):
        return str("ID " + self.id + " Dimension " + self.dimension)

class InterestArea(models.Model):
    idA =       models.PositiveSmallIntegerField(primary_key=True)
    orden =     models.CharField(max_length=4)
    int_area =  models.CharField(max_length=30)
    dimension = models.ForeignKey(Dimension, on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        indexes = [models.Index(fields=['int_area'])]
        ordering = ['orden']

    def __str__(self):
        return str("ID " + self.id + " Orden "+ self.orden + " Área de Interés " + self.int_area + " Dimension " + self.dimension)
      
class CoreContent(models.Model):
    idC =       models.PositiveSmallIntegerField(primary_key=True)
    core_cont = models.CharField(max_length=30)
    int_area =  models.ForeignKey(InterestArea, on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        ordering = ['core_cont']
    
    def __str__(self):
        return str("ID " + self.id + " Contenido Nuclear " + self.core_cont + " Área de interés " + self.int_area)

class Question(models.Model): 
    class QuestionManager(models.Manager):
        def get_queryset(self):
            return super().get_queryset() 
    idP =               models.PositiveBigIntegerField(default=1, primary_key=True)
    numero =            models.PositiveIntegerField(default=1)
    statement =         models.CharField(max_length= 50, unique=True)  
    time =              models.TimeField()
    difficult_level =   models.PositiveSmallIntegerField(default=0)
    version =           models.PositiveBigIntegerField(default=1)
    date =              models.DateTimeField(auto_now=True)

    dimension =         models.ForeignKey(Dimension, on_delete=models.CASCADE, null=True)
    idQ =               models.ForeignKey('Quiz', on_delete=models.CASCADE)
    #solution =         models.ForeignKey('Option', on_delete=models.CASCADE, related_name='solution')

    class Meta:
        indexes = [models.Index(fields=['statement'])]
        
    def __str__(self):
        return str(f'ID: {self.idP}, Número: {self.numero}, Version: {self.version}, Enunciado: {self.statement}')

# Class that represents the solution at all the options, relathinship many to one with question
class Option(models.Model):
    idO =               models.PositiveIntegerField(default=1, primary_key=True)
    option =            models.CharField(max_length=25)
    question =          models.ManyToManyField(Question, through='OptionQuestion', related_name='option_values')

    class Meta:
        indexes = [models.Index(fields=['option'])]    

    def __str__(self):
        return str("ID " + self.id + " Solución " + self.option + " Motivo " + self.motive)

class OptionQuestion(models.Model): 
    
    class OptionQuestionManager(models.Manager):
        def get_queryset(self):
            return super().get_queryset().exclude(Q(motive__isnull=True)|Q(motive='')).values('question')
        
    question =  models.ForeignKey(Question, on_delete=models.CASCADE, related_name='option_value_to_question')
    option =    models.ForeignKey(Option, on_delete=models.CASCADE, related_name='option_value') # this id of the value
    motive =    models.TextField(max_length=250, blank=True, null=True)
    pk =        models.CompositePrimaryKey('question', 'option')

    objects =   models.Manager() #default
    solutions=  OptionQuestionManager() 
        
    def __str__(self):
        return str("Pregunta " + self.question + " Respuesta " + self.option)
    
# ------------- QUIZ CLASS --------------------
class Quiz(models.Model):
    idQ = models.PositiveIntegerField(default=1)
    fechaC = models.DateTimeField(auto_now_add=True)
    fechaA = models.DateTimeField(auto_now=True)

    def __str__(self):
       return str("ID: "+ + self.idQ + "fecha creación: " + self.fechaC + "fecha actualización:" + self.fechaA)
#----------- INTERVIEWER CLASS(is MyUser) ---------

# Create your models here.
# AbstractUser to adapt default User Django Class
class MyUser(AbstractBaseUser, PermissionsMixin):

    class MyUserManager(BaseUserManager):
                
        def create_user(self, username, password, is_staff):
            if username or password is None or ' ' or '':
                return None
            
            # comprobar letra dni es válida
            if comprobar_dni(username) is False:
                return None
            # al ser en principio DNI único espero funcione
            hash_username = hashlib.sha3_256(username)
            user = self.model(hash_username, is_staff)
            
            if is_staff == True:
                user.set_password(password)

            user.save()
            return user
        
        
        def create_superuser(self, username, password):
            
            user = self.create_user(username=username)
            
    id =        models.AutoField(primary_key=True, editable=False)
    username=   models.CharField(max_length=256, unique=True, editable=False)
    #username =  models.CharField(max_length=25, unique=True, blank=True, null=True)
    password =  models.CharField(max_length=256, blank=True, null=True, editable=False)
    is_staff =  models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    
    USERNAME_FIELD = 'username'

    def __str__(self):
       return str("ID: "+ + self.id + "usuario: " + self.username + "password:" + self.password)   

# class Interviewer(models.Model):
#     # As this relationship is OneToOne and primary key too shares id between interviewer and myuser class 
#     interviewer = models.OneToOneField(MyUser, on_delete=models.CASCADE, primary_key=True)

#     def __str__(self):
#        return str("ID: "+ + self.interviewer.id + "usuario: " + self.interviewer.username) 

# ------------- RESPONDANT --------------------

class Profesion(models.Model):
    profesion = models.CharField(max_length=30, primary_key=True)
    
    class Meta:
        ordering = ['profesion']

    def __str__(self):
        return str("Profesion " + self.profesion)
            
class Respondant(models.Model):

    class Sex(models.TextChoices):
        FEMALE = 'Femenino'
        MALE = 'Masculino'

    class Tittle(models.TextChoices):
        STUDENT =  'Estudiante', 
        GRADE = 'Grado/Licenciatura-Diplomatura',
        MASTER = 'Master/Postgrado', 
        DOCTORATE= 'Doctorado'

    respondant = models.OneToOneField(MyUser, on_delete=models.CASCADE, primary_key=True)
    
    age =               models.PositiveSmallIntegerField()
    sex =               models.CharField(choices=Sex)
    nationality =       models.CharField(max_length=15)
    city =              models.CharField(max_length=25)
    region =            models.CharField(max_length=25)
    level_PBE =         models.PositiveSmallIntegerField(validators=[between1_5])
    title =             models.CharField(choices=Tittle)
    # blank True permits set blank in forms and null True permits set null in a database field
    year_title =        models.PositiveSmallIntegerField(blank=True, null=True, validators=[year])
    PBE_knownledge =    models.BooleanField(default=False)
    PBE_training =      models.CharField(max_length=30)
    speciality =        models.CharField(max_length=20, blank=True, null=True)
    
    
    # if i change the name to reply or answer don't works but Resposta sí.
    questions =     models.ManyToManyField(Question, through='Respuesta', related_name='respondant_answer_to_question')
    profesions =    models.ManyToManyField(Profesion, through='Resprofs', related_name='profesional_area_user')
  
    def __str__(self):
       return str("ID: "+ self.respondant.id)
    
class Resprofs(models.Model):
    profesion =     models.ForeignKey(Profesion, on_delete=models.CASCADE)
    respondant =    models.ForeignKey(Respondant, on_delete=models.CASCADE)
    pk =            models.CompositePrimaryKey('profesion', 'respondant')

# ------------- ANSWER CLASS --------------
# The class name is in spanish cause django don't permit other
class Respuesta(models.Model):
    answer = models.CharField(max_length=25, editable=False, blank=False)
    time = models.TimeField(editable=False, blank=False)
    date = models.DateTimeField(auto_now_add=True)
    respondant = models.ForeignKey(Respondant, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    pk = models.CompositePrimaryKey('respondant','question')

    class Meta:
        ordering = ['-date']
    
    def __str__(self):
        return str("ID " + self.pk + " Enunciado " + self.answer)

# Students can be profesionals, students or both {M,OR} for that reason we don't have to fusionate them
#------------------- STUDENTS ------------------------
class  Student(models.Model):
    student =       models.OneToOneField(Respondant, on_delete=models.CASCADE, primary_key=True)
    academic_lvl =  models.PositiveSmallIntegerField()

    class Meta:
        abstract = True

# If is {M, XOR} inheritance, 3 splitted classes of students are created
class Stu_Master(Student):
    master = models.CharField(max_length=25)

    class Meta:
        indexes = [models.Index(fields=['academic_lvl'])]

    def __str__(self):
        return str("ID " + self.student + " Nivel Académico " + self.academic_lvl)
 
class Stu_Grade(Student):
    course = models.PositiveSmallIntegerField()

    class Meta:
       indexes = [models.Index(fields=['academic_lvl'])]

    def __str__(self):
        return str("ID " + self.student + " Nivel Académico " + self.academic_lvl)

class Stu_Doctorado(Student):
    
    class Meta:
        indexes = [models.Index(fields=['academic_lvl'])]  

    def __str__(self):
        return str("ID " + self.student + " Nivel Académico " + self.academic_lvl)

#------------------- PROFESIONALS --------------------          
class Enviroment(models.Model):
    enviroment = models.CharField(max_length=25, primary_key=True)

    def __str__(self):
        return str("environ " + self.environ)
    
class Sector(models.Model):
    sector = models.CharField(max_length=15, primary_key=True)

    def __str__(self):
        return str("sector " + self.sector)

class Activity(models.Model):
    activity = models.CharField(max_length=20, primary_key=True)

    def __str__(self):
        return str("activity " + self.activity)
    
class  Profesional(models.Model):
    profesional =   models.OneToOneField(Respondant, on_delete=models.CASCADE, primary_key=True)
    supervisor =    models.BooleanField(default=False)
    dedicationW =   models.PositiveSmallIntegerField(default=0)
    years =         models.PositiveSmallIntegerField(default=0)
    
#     activities =  models.ManyToManyField(Activity, through='Dedication', related_name='activities_by_profesional')
#     sectors =     models.ManyToManyField(Sector, through='Secprof', related_name='sectors_on_works')
#     enviroments = models.ManyToManyField(Enviroment, through='Envprof', related_name='enviroments_on_works')

# # Intermediate class between activity and profesional to show pecentatge of time that a profesional takes to do an activity
# class Dedication(models.Model):
#     profesional = models.ForeignKey(Profesional, models.CASCADE, related_name='id_between_activity_profesional')
#     activity =    models.ForeignKey(Activity, models.CASCADE)
#     percentatge = models.PositiveSmallIntegerField(default=0)
#     pk =          models.CompositePrimaryKey('profesional','activity')
        
# class  Envprof(models.Model):
#     profesional = models.ForeignKey(Profesional, on_delete=models.CASCADE)
#     enviroment =  models.ForeignKey(Enviroment, on_delete=models.CASCADE)
#     pk =          models.CompositePrimaryKey('profesional','enviroment')

# class  Secprof(models.Model): 
#     profesional = models.ForeignKey(Profesional, on_delete=models.CASCADE)
#     sector =      models.ForeignKey(Sector, on_delete=models.CASCADE)
#     pk =          models.CompositePrimaryKey('profesional','sector')