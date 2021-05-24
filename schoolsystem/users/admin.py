from django.contrib import admin
from .models import Student, User, Teacher, Absence
# Register your models here.

admin.site.register(Student)
admin.site.register(Teacher)
admin.site.register(User)
admin.site.register(Absence)