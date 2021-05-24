import string
import random
from django.utils.text import slugify
import datetime
from users.models import Student, Teacher
from api.assignment.models import Assignment
  
# string.ascii_lowercase == "abcdefghijklmnopqrstuvwxyz"
# string.digits == "0123456789"
def random_string_generator(size = 10, chars = string.ascii_lowercase + string.digits): 
    # _ == conventional name for throwaway variables
    return ''.join(random.choice(chars) for _ in range(size)) 

def unique_slug_generator(instance, new_slug = None): 
    if new_slug is not None: 
        slug = new_slug 
    else: 
        slug = slugify(instance.title) 
    Klass = instance.__class__ 
    qs_exists = Klass.objects.filter(slug = slug).exists() 
    
    # iterate until unique
    if qs_exists: 
        new_slug = "{slug}-{randstr}".format( 
            slug = slug, randstr = random_string_generator(size = 4)) 
        return unique_slug_generator(instance, new_slug = new_slug) 
    return slug

def unique_ref_code_generator(instance, new_ref_code = None): 
    if new_ref_code is not None: 
        ref_code = new_ref_code 
    else: 
        ref_code = random_string_generator(size = 6)
    Klass = instance.__class__ 
    qs_exists = Klass.objects.filter(ref_code = ref_code).exists() 
    
    if qs_exists: 
        new_ref_code = random_string_generator(size = 6)
        return unique_ref_code_generator(instance, new_ref_code = new_ref_code) 
    return ref_code 

def unique_id_generator(instance):
    if instance.is_student:
        last = Student.objects.last()
        if last is not None:
            number = int(last.id[-5:]) + 1
            id = str(datetime.datetime.now().year)[2:] + "STU" + str(number).zfill(5)
            return id
        return str(datetime.datetime.now().year)[2:] + "STU00001"
    elif instance.is_teacher:
        last = Teacher.objects.last()
        if last is not None:
            number = int(last.id[-5:]) + 1
            id = str(datetime.datetime.now().year)[2:] + "TEA" + str(number).zfill(5)
            return id
        return str(datetime.datetime.now().year)[2:] + "TEA00001"

def unique_code_generator():
    last = Assignment.objects.last()
    if last is not None:
        number = int(last.code[-4:]) + 1
        id = "UECM" + str(number).zfill(4)
        return id
    return "UECM0001"