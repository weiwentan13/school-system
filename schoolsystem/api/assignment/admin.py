from django.contrib import admin
from .models import Assignment, Question, Choice, GradedAssignment, StudentAnswer

admin.site.register(Assignment)
admin.site.register(Question)
admin.site.register(Choice)
admin.site.register(GradedAssignment)
admin.site.register(StudentAnswer)
