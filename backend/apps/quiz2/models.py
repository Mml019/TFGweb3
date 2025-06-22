import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.

# CLASSES AND RELATIONSHIP RELATED TO QUESTION CLASS
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
    idP = models.PositiveIntegerField(default=1)
    version = models.PositiveIntegerField(default=1)
    statement = models.CharField(max_length= 50, unique=True)  
    time = models.TimeField()
    difficult_level = models.PositiveSmallIntegerField(default=0)
    dimension = models.ForeignKey(Dimension, on_delete=models.CASCADE, null=True)

    class QuestManager(models.Manager):
        def get_queryset(self):
            return super().get_queryset()

    class Meta:
        indexes = [models.Index(fields=['statement'])]
        constraints = [ models.UniqueConstraint(fields=['idP','version'], name='unique_version_per_question')]
    
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
    pk = models.CompositePrimaryKey('question_id', 'option_id')
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='option_value_to_question')
    option = models.ForeignKey(Option, on_delete=models.CASCADE, related_name='option_value') # this id of the value

    def __str__(self):
        return str("Pregunta " + self.question + " Respuesta " + self.option)
    
#------ CLASSES AND RELATIONSHIP RELATED TO  CLASS ---------

# AbstractUser to adapt default User Django Class
class MyUser(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

class Interviewer(MyUser):
    interviewer_id = MyUser.id
   
    def __str__(self):
       return str("ID: "+ self.id + "usuario: " + self.username)

class Profesional_Area(models.Model):
    profesion = models.CharField(max_length=30, primary_key=True)
    
    class Meta:
        ordering = ['profesion']

    def __str__(self):
        return str("Profesion " + self.profesion)
    
class Respondant(MyUser):
    respondant_id = MyUser.id

    def __str__(self):
       return str("ID: "+ self.id)
