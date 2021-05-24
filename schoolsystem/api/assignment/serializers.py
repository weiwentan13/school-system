from rest_framework import serializers
from users.models import User
from .models import Assignment, Question, Choice, GradedAssignment, StudentAnswer
from django.core.exceptions import ObjectDoesNotExist
from schoolsystem.util import unique_code_generator

class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value

class ChoiceField(serializers.ChoiceField):
    def to_representation(self, obj):
        return self._choices[obj]

    def to_internal_value(self, data):
        for key, val in self._choices.items():
            if val == data:
                return key
        self.fail('invalid_choice', input=data)

class CreateableStringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        try:
            return Choice.objects.get_or_create(title=value)[0]
        except (TypeError, ValueError):
            self.fail('invalid')

class CreatableSlugRelatedField(serializers.SlugRelatedField):
    def to_internal_value(self, data):
        try:
            return self.get_queryset().get_or_create(**{self.slug_field: data})[0]
        except (TypeError, ValueError):
            self.fail('invalid')

class QuestionSerializerWithoutAnswer(serializers.ModelSerializer):
    choices = CreateableStringSerializer(many=True)
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Question
        fields = ['id', 'order', 'title', 'choices', 'question_type']

class QuestionSerializer(QuestionSerializerWithoutAnswer):
    answer = CreatableSlugRelatedField(slug_field='title', queryset=Choice.objects.all())

    class Meta:
        model = Question
        fields = ['id', 'order', 'title', 'choices', 'answer', 'question_type']

# Assignment

class StudentAssignmentListSerializer(serializers.ModelSerializer):
    teacher = StringSerializer()
    deadline = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    mark = serializers.SerializerMethodField()
    
    def get_mark(self, obj):
        graded = GradedAssignment.objects.filter(assignment=obj, student=self.context['request'].user.student).first()
        if graded == None:
            return -1
        else:
            return graded.mark

    class Meta:
        model = Assignment
        fields = ['code', 'title', 'teacher', 'deadline', 'mark']

class StudentAnswerSerializer(serializers.ModelSerializer):
    answer = CreatableSlugRelatedField(slug_field='title', queryset=Choice.objects.all())
    real_answer = serializers.SerializerMethodField()

    def get_real_answer(self, obj):
        return obj.question.answer.title

    class Meta:
        model = StudentAnswer
        fields = ['question', 'answer', 'real_answer']

class StudentAssignmentDetailSerializer(StudentAssignmentListSerializer):
    questions = QuestionSerializerWithoutAnswer(many=True)
    answers = serializers.SerializerMethodField()
    question_count = serializers.SerializerMethodField()

    def get_question_count(self, obj):
        return obj.question_count

    def get_answers(self, obj):
        graded = GradedAssignment.objects.filter(assignment=obj, student=self.context['request'].user.student).first()
        if graded == None:
            return StudentAnswerSerializer([], many=True).data
        else:
            return StudentAnswerSerializer(graded.answers.all(), many=True).data

    class Meta:
        model = Assignment
        fields = ['code', 'title', 'teacher', 'deadline', 'question_count', 'questions', 'mark', 'answers']

class TeacherAssignmentListSerializer(serializers.ModelSerializer):
    deadline = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    submitted = serializers.SerializerMethodField()
    
    def get_submitted(self, obj):
        return obj.submitted

    class Meta:
        model = Assignment
        fields = ['code', 'title', 'status', 'year', 'question_count', 'deadline', 'submitted', 'created_at']


class TeacherAssignmentDetailSerializer(TeacherAssignmentListSerializer):
    questions = QuestionSerializer(many=True)
    status = ChoiceField(choices=Assignment.STATUS_CHOICES)
    year = ChoiceField(choices=Assignment.YEAR_CHOICES)
    question_count = serializers.SerializerMethodField()

    def get_question_count(self, obj):
        return obj.question_count

    class Meta:
        model = Assignment
        fields = ['code', 'title', 'status', 'year', 'question_count', 'deadline', 'submitted', 'created_at', 'questions']

    def create(self, validated_data):
        user = self.context['request'].user
        assignment_data = {
            'code': unique_code_generator(),
            'title': validated_data.get('title'),
            'year': validated_data.get('year'),
            'deadline': validated_data.get('deadline'),
            'teacher': user.teacher
        }
        assignment = Assignment.objects.create(**assignment_data)

        return assignment

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.status = validated_data.get('status', instance.status)
        instance.year = validated_data.get('year', instance.year)
        instance.deadline = validated_data.get('deadline', instance.deadline)
        instance.save()

        questions_data = validated_data.get('questions')

        for i in Question.objects.filter(assignment=instance):
            if not any(i.id == question.get('id')  for question in questions_data):
                i.delete()

        if questions_data:
            for i in questions_data:
                id = i.get('id')
                if id == None:
                    question = Question.objects.create(assignment=instance)
                    question.order = i.get('order')
                else:
                    question = Question.objects.get(id=i.get('id'))
                    Question.objects.move(question, i.get('order', question.order))

                question.title = i.get('title', question.title)
                choices = i.get('choices')
                if choices:
                    for index in range(len(choices)):
                        title = choices[index]
                        if not question.choices.filter(title=title).exists():
                            newC, _ = Choice.objects.get_or_create(title=title)
                            question.choices.add(newC)
                    for k in question.choices.all():
                        if not any(str(choice) == str(k.title) for choice in choices):
                            question.choices.remove(k)

                answer = i.get('answer', question.answer)
                question.answer = Choice.objects.filter(title=answer).first()
                question.save()
        
        return instance

# End Assignment

# Graded Assignment

class GradedAssignmentSerializer(serializers.ModelSerializer):
    answers = StudentAnswerSerializer(many=True)
    grade = serializers.SerializerMethodField()

    def get_grade(self, obj):
        return obj.grade

    class Meta:
        model = GradedAssignment
        fields = ['assignment', 'grade', 'answers']

    def create(self, validated_data):
        user = self.context['request'].user
        graded_assignment = GradedAssignment.objects.create(assignment=validated_data['assignment'], student=user.student)
        answers = validated_data.get('answers')
        answered_correct_count = 0
        for i in answers:
            question = i.get('question')
            answer = i.get('answer')
            StudentAnswer.objects.create(graded_assignment=graded_assignment, question=question, answer=answer)
            if str(question.answer.title) == str(answer):
                answered_correct_count += 1

        mark = answered_correct_count / graded_assignment.assignment.question_count * 100
        graded_assignment.mark = round(mark, 0)
        graded_assignment.save()
        return graded_assignment

    def update(self, instance, validated_data):
        instance.mark = validated_data.get('mark', instance.mark)

        return instance

class GradedAssignmentListSerializer(serializers.ModelSerializer):
    grade = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()

    def get_grade(self, obj):
        return obj.grade

    def get_title(self, obj):
        return obj.assignment.title

    class Meta:
        model = GradedAssignment
        fields = ['assignment', 'title', 'grade', 'student', 'mark']

# end Graded Assignment