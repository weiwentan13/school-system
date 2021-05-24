from django.db import models, transaction
from django.db.models import F, Max
from users.models import User, Student, Teacher

class Assignment(models.Model):
    STATUS_CHOICES = [
        (1, 'draft'),
        (2, 'published'),
    ]
    YEAR_CHOICES = [
        (1, 'Grade 1'),
        (2, 'Grade 2'),
        (3, 'Grade 3'),
        (4, 'Grade 4'),
        (5, 'Grade 5'),
        (6, 'Grade 6'),
    ]
    code = models.CharField(max_length=50, primary_key=True)
    title = models.CharField(max_length=100)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    status = models.SmallIntegerField(choices=STATUS_CHOICES, default=1)
    year = models.SmallIntegerField(choices=YEAR_CHOICES, default=1)
    deadline = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    submitted = models.SmallIntegerField(default=0)

    def __str__(self):
        return self.code + ' ' + self.title

    @property   
    def question_count(self):
        return self.questions.count()

class GradedAssignment(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    assignment = models.ForeignKey(Assignment, related_name="graded", on_delete=models.CASCADE)
    mark = models.SmallIntegerField(default=-1)

    def __str__(self):
        return self.student.id

    class Meta:
        unique_together = ['student', 'assignment']

    @property   
    def grade(self):
        if(self.mark <= 40):
            return 'D'
        if(self.mark <= 60):
            return 'C'
        if(self.mark <= 80):
            return 'B'
        return 'A'

class Choice(models.Model):
    title = models.CharField(max_length=500, unique=True)

    def __str__(self):
        return self.title

class QuestionManager(models.Manager):
    def create(self, **kwargs):
        instance = self.model(**kwargs)

        with transaction.atomic():
            # Get our current max order number
            results = self.filter(
                assignment=instance.assignment
            ).aggregate(
                Max('order')
            )

            # Increment and use it for our new object
            current_order = results['order__max']
            if current_order is None:
                current_order = 0

            value = current_order + 1
            instance.order = value
            instance.save()
            return instance

    def move(self, obj, new_order):
        qs = self.get_queryset()

        with transaction.atomic():
            if obj.order > int(new_order):
                qs.filter(
                    assignment=obj.assignment,
                    order__lt=obj.order,
                    order__gte=new_order,
                ).exclude(
                    pk=obj.pk
                ).update(
                    order=F('order') + 1,
                )
            else:
                qs.filter(
                    assignment=obj.assignment,
                    order__lte=new_order,
                    order__gt=obj.order,
                ).exclude(
                    pk=obj.pk,
                ).update(
                    order=F('order') - 1,
                )
            obj.order = new_order
            obj.save()

class Question(models.Model):
    TYPE_CHOICES = [
        (1, 'radio'),
        (2, 'checkbox'),
        (3, 'text')
    ]
    title = models.CharField(max_length=500)
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name='questions', blank=True, null=True)
    order = models.SmallIntegerField()
    choices = models.ManyToManyField(Choice)
    answer = models.ForeignKey(Choice, on_delete=models.CASCADE, related_name='answer', blank=True, null=True)
    question_type = models.SmallIntegerField(choices=TYPE_CHOICES, default=1)

    objects = QuestionManager()

    class Meta:
        index_together = ('assignment', 'order')

    def __str__(self):
        return self.title

class StudentAnswer(models.Model):
    graded_assignment = models.ForeignKey(GradedAssignment, related_name="answers", on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.ForeignKey(Choice, on_delete=models.CASCADE, blank=True, null=True)
