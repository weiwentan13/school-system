from allauth.account.adapter import get_adapter
from rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import User, Student, Teacher, Absence
from schoolsystem.util import unique_id_generator

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'username', 'is_student', 'is_teacher')

class UserProfileSerializer(serializers.ModelSerializer):
    gender = serializers.SerializerMethodField()
    religion = serializers.SerializerMethodField()
    race = serializers.SerializerMethodField()
    date_joined = serializers.SerializerMethodField()
    fullname = serializers.SerializerMethodField()

    def get_gender(self, obj):
        return obj.get_gender_display()

    def get_religion(self, obj):
        return obj.get_religion_display()

    def get_race(self, obj):
        return obj.get_race_display()

    def get_date_joined(self, obj):
        return obj.date_joined.date()

    def get_fullname(self, obj):
        return obj.first_name + ' ' + obj.last_name

    class Meta:
        model = User
        fields = ['fullname', 'email', 'date_joined', 'age', 'gender', 'religion', 'race', 'avatar', 'address', 'contact_number']

class UserListSerializer(serializers.ModelSerializer):
    gender = serializers.SerializerMethodField()
    fullname = serializers.SerializerMethodField()

    def get_gender(self, obj):
        return obj.get_gender_display()

    def get_fullname(self, obj):
        return obj.first_name + ' ' + obj.last_name

    class Meta:
        model = User
        fields = ['fullname', 'email', 'gender', 'avatar']

class CustomRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    is_student = serializers.BooleanField()
    is_teacher = serializers.BooleanField()
    age = serializers.IntegerField()
    gender = serializers.ChoiceField(choices = User.GENDER_CHOICES)
    religion = serializers.ChoiceField(choices = User.RELIGION_CHOICES)
    race = serializers.ChoiceField(choices = User.RACE_CHOICES)
    address = serializers.CharField(max_length=100)
    contact_number = serializers.CharField(max_length=100)
    
    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'email': self.validated_data.get('email', ''),
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', ''),
            'is_student': self.validated_data.get('is_student', ''),
            'is_teacher': self.validated_data.get('is_teacher', ''),
            'age': self.validated_data.get('age', ''),
            'gender': self.validated_data.get('gender', ''),
            'religion': self.validated_data.get('religion', ''),
            'race': self.validated_data.get('race', ''),
            'address': self.validated_data.get('address', ''),
            'contact_number': self.validated_data.get('contact_number', '')
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        user.is_student = self.cleaned_data.get('is_student')
        user.is_teacher = self.cleaned_data.get('is_teacher')
        user.first_name = self.cleaned_data.get('first_name')
        user.last_name = self.cleaned_data.get('last_name')
        user.age = self.cleaned_data.get('age')
        user.gender = self.cleaned_data.get('gender')
        user.religion = self.cleaned_data.get('religion')
        user.race = self.cleaned_data.get('race')
        user.address = self.cleaned_data.get('address')
        user.contact_number = self.cleaned_data.get('contact_number')
        adapter.save_user(request, user, self)
        self.custom_signup(request, user)
        if user.is_student:
            Student.objects.create(user=user, id=unique_id_generator(user))
        elif user.is_teacher:
            Teacher.objects.create(user=user, id=unique_id_generator(user))
        return user

class TokenSerializer(serializers.ModelSerializer):
    user_type = serializers.SerializerMethodField()
    id = serializers.SerializerMethodField()

    class Meta:
        model = Token
        fields = ('key', 'user', 'user_type', 'id')

    def get_user_type(self, obj):
        serializer_data = UserSerializer(
            obj.user
        ).data
        is_student = serializer_data.get('is_student')
        is_teacher = serializer_data.get('is_teacher')
        return {
            'is_student': is_student,
            'is_teacher': is_teacher
        }
    
    def get_id(self, obj):
        if hasattr(obj.user, 'teacher'):
            return obj.user.teacher.id
        elif hasattr(obj.user, 'student'):
            return obj.user.student.id
        return None

class StudentProfileSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer()
    status = serializers.SerializerMethodField()
    year = serializers.SerializerMethodField()

    def get_status(self, obj):
        return obj.get_status_display()

    def get_year(self, obj):
        return obj.get_year_display()

    class Meta:
        model = Student
        fields = ('__all__')

class StudentListSerializer(serializers.ModelSerializer):
    user = UserListSerializer()

    class Meta:
        model = Student
        fields = ['user', 'id', 'year']

class TeacherProfileSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer()
    year_handled = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()

    def get_year_handled(self, obj):
        return obj.get_year_handled_display()

    def get_status(self, obj):
        return obj.get_status_display()

    class Meta:
        model = Teacher
        fields = ('__all__')

class AbsenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Absence
        fields = ('__all__')

class AvatarSerializer(serializers.ModelSerializer):
    avatar = serializers.FileField()
    class Meta:
        model = User
        fields = ['avatar']

# class AvatarSerializer(serializers.Serializer):
#     avatar = serializers.FileField()
#     class Meta:
#         fields = ['avatar']