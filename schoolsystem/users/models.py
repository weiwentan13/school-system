from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    GENDER_CHOICES = [
        (1, 'Male'),
        (2, 'Female'),
    ]
    RELIGION_CHOICES = [
        (1, 'Christian'),
        (2, 'Buddha'),
        (3, 'Muslim'),
        (4, 'Others'),
    ]
    RACE_CHOICES = [
        (1, 'Chinese'),
        (2, 'Indian'),
        (3, 'Malay'),
        (4, 'Others'),
    ]
    # default field: is_staff, first_name, last_name, email, pasword, username, date_joined
    is_student = models.BooleanField(default=True)
    is_teacher = models.BooleanField(default=False)
    age = models.SmallIntegerField(null=True)
    gender = models.SmallIntegerField(choices=GENDER_CHOICES, default=1)
    religion = models.SmallIntegerField(choices=RELIGION_CHOICES, default=1)
    race = models.SmallIntegerField(choices=RACE_CHOICES, default=1)
    avatar = models.ImageField(null=True, blank=True)
    address = models.CharField(max_length=100, null=True)
    contact_number = models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.first_name + ' ' + self.last_name

class Student(models.Model):
    STATUS_CHOICES = [
        (1, 'Active'),
        (2, 'Terminated'),
        (3, 'Suspended'),
    ]
    YEAR_CHOICES = [
        (1, 'Grade 1'),
        (2, 'Grade 2'),
        (3, 'Grade 3'),
        (4, 'Grade 4'),
        (5, 'Grade 5'),
        (6, 'Grade 6'),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    id = models.CharField(max_length=10, primary_key=True)
    status = models.SmallIntegerField(choices=STATUS_CHOICES, default=1)
    year = models.SmallIntegerField(choices=YEAR_CHOICES, default=1)

    def __str__(self):
        return self.id

class Teacher(models.Model):
    STATUS_CHOICES = [
        (1, 'Active'),
        (2, 'Terminated'),
        (3, 'Suspended'),
    ]
    YEAR_CHOICES = [
        (1, 'Grade 1'),
        (2, 'Grade 2'),
        (3, 'Grade 3'),
        (4, 'Grade 4'),
        (5, 'Grade 5'),
        (6, 'Grade 6'),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    id = models.CharField(max_length=10, primary_key=True)
    status = models.SmallIntegerField(choices=STATUS_CHOICES, default=1)
    year_handled = models.SmallIntegerField(choices=YEAR_CHOICES, null=True, blank=True)

    def __str__(self):
        return self.user.first_name + " " + self.user.last_name

class Absence(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    date = models.DateField()

    class Meta:
        unique_together = ['student', 'date']

    def __str__(self):
        return self.student.id + ' ' + str(self.date)