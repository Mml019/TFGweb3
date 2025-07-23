# This file contains extra validation field and declared permissions

from rest_framework.serializers import ValidationError
from datetime import datetime
import re
import hashlib

# Only permits level between 1 and 5
def between1_5(value):
    if (value <= 0 or value > 5):
        return ValidationError(" Debe seleccionar un valor del 1 al 5 ") 

# Only permits years before actual year and before 
def year(value):
    if value < (datetime.now.year-70) or value >= datetime.now.year:
        return ValidationError(f" No puede ser un año superior al actual o anterior a {datetime.now.year-70}")


def comprobar_dni(dni):
    LETRAS=['T','R','W','A','G','M','Y','F','P','D','X','B','N','J','Z','S','Q','V','H','L','C','K','E']
    DNIInvalidos = ['00000000T', '00000001R', '99999999R']
    
    if dni in DNIInvalidos:
        return False

    if re.match('[X-Z][0-9]{7}[A-Z]', dni):
        dic = {'X':0, 'Y':1, 'Z':2}
        print(dic[dni[0]])
        dni.replace(dni[0], dic[dni[0]])
    
    if not re.match('[0-9]{8}[A-Z]', dni):
        return False
    
    resto = int(dni[0:8]) % 23
    return dni[9] == LETRAS[resto]  