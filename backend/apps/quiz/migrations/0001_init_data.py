from django.db import migrations

def load_data(apps, schema_editor):
    Profarea = apps.get_model("quiz", "ProfesionalArea")
    Satisfation = apps.get_model("quiz", "Satisfation")
    Sector = apps.get_model("quiz", "Sector")
    Enviroment = apps.get_model("quiz", "Enviroment")
    Activity = apps.get_model("quiz", "Activity")

    profs = [
        "Psicología",
        "Enfermería",
        "Fisioterapia",
        "Medicina",
        "Terapia Ocupacional",
        "Logopedia",
        "Veterinaria",
        "Farmacia",
        "Biología",
        "Dietética y Nutrición",
    ]

    sectors = [
        "Público",
        "Privado",
        "Centro concertado o mixto",
        # "Otros"
    ]

    enviroments = [
        "Atención especializada",
        "Atención Primaria/ domiciliaria",
        "Centro sociosanitario",
        "Sistema escolar",
        "Universidad",
        "Consulta propia",
        # "Otros"
    ]

    activities = ["Asistencial", "Investigacion", "Docencia", "Administracion", "Otra"]

    sas = [
        "Me he sentido alegre y de buen humor",
        "Me he sentido tranquilo/a y relajado/a",
        "Me he sentido activo/a y enérgico/a",
        "Me he sentido fresco/a y renovado/a",
        "Me he sentido interesado/a y motivado/a",
    ]

    # the other classes are dinamic cause depends on selection and the year
    for p in profs:
        Profarea.objects.get_or_create(profarea=p)

    for s in sas:
        for i in range(6):
            Satisfation.objects.get_or_create(questionS=s, value=i)

    for s in sectors:
        Sector.objects.get_or_create(sector=s)

    for env in enviroments:
        Enviroment.objects.get_or_create(enviroment=env)

    for a in activities:
        Activity.objects.get_or_create(activity=a)

class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(load_data),
    ]