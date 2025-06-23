# This file contains extra validation field and declared permissions

from rest_framework.serializers import ValidationError
from datetime import datetime

# Only permits level between 1 and 5
def between1_5(value):
    if (value <= 0 or value > 5):
        return ValidationError(" Debe seleccionar un valor del 1 al 5 ") 

# Only permits years before actual year and before 
def year(value):
    if value < (datetime.now.year-70) or value >= datetime.now.year:
        return ValidationError(f" No puede ser un año superior al actual o anterior a {datetime.now.year-70}")

# Permissions
def assign_group():
   pass 
    