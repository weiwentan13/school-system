from rest_framework import viewsets
from rest_framework import permissions
from .models import Student, Absence, Teacher, User
from .serializers import StudentProfileSerializer, TeacherProfileSerializer, AbsenceSerializer, StudentListSerializer, AvatarSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import UpdateModelMixin, CreateModelMixin, RetrieveModelMixin

### viewset ###

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentProfileSerializer
    serializer_action_classes = {
        'retrieve': StudentProfileSerializer,
        'list': StudentListSerializer
    }
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['year']

    def get_serializer_class(self):
        try:
            return self.serializer_action_classes[self.action]
        except(KeyError, AttributeError):
            return super().get_serializer_class()

class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherProfileSerializer
    serializer_action_classes = {
        'retrieve': TeacherProfileSerializer
    }
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        try:
            return self.serializer_action_classes[self.action]
        except(KeyError, AttributeError):
            return super().get_serializer_class()

class AbsenceViewSet(viewsets.ModelViewSet):
    queryset = Absence.objects.filter()
    serializer_class = AbsenceSerializer
    http_method_names = ['get', 'post', 'delete']
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['date', 'student__year']
    permission_classes = [permissions.IsAuthenticated]

    @action(methods=['delete'], detail=False)
    def multiple_delete(self, request, *args, **kwargs):
        date = request.query_params.get('date', None)
        delete_id = request.query_params.get('id', None)
        if not delete_id:
            return Response(status=status.HTTP_404_NOT_FOUND)
        for i in delete_id.split(','):
            Absence.objects.filter(date=date, student=i).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(methods=['post'], detail=False)
    def multiple_create(self, request, *args, **kwargs):
        for data in request.data:
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
        return Response(status=status.HTTP_204_NO_CONTENT)

    # date=datetime.today().strftime('%Y-%m-%d')
    # def get_queryset(self):
    #     user = self.request.user
    #     if not user.is_anonymous:
    #         if user.is_superuser:
    #             return super().get_queryset()
    #         if user.is_student:
    #             return Assignment.objects.filter(year_in_school=user.student.year_in_school, is_draft=False)
    #         if user.is_teacher:
    #             return Assignment.objects.filter(teacher=user)
    #     return Assignment.objects.none()

    # def get_permissions(self):
    #     if self.action not in ['list', 'retrieve']:
    #         self.permission_classes = [IsTeacherOnly, ]
    #     return super(self.__class__, self).get_permissions()

### end viewset ###

# class AvatarUpdateView(GenericAPIView, CreateModelMixin):
#     queryset = User.objects.all()
#     serializer_class = AvatarSerializer
#     permission_classes = [permissions.AllowAny]

#     def post(self, request):
#         file_uploaded = request.FILES.get('file_uploaded')
#         self.request.user.avatar = file_uploaded
#         self.request.user.save()
#         print(request.user.first_name)
#         print(request.FILES.get('file_uploaded'))
#         return Response(status=status.HTTP_204_NO_CONTENT)

class AvatarUpdateView(GenericAPIView, UpdateModelMixin, RetrieveModelMixin):
    queryset = User.objects.all()
    serializer_class = AvatarSerializer
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)