from rest_framework import viewsets
from rest_framework import permissions
from .models import Assignment, GradedAssignment
from .serializers import (
    StudentAssignmentDetailSerializer, 
    StudentAssignmentListSerializer, 
    TeacherAssignmentListSerializer,
    TeacherAssignmentDetailSerializer, 
    GradedAssignmentSerializer,
    GradedAssignmentListSerializer
)

### permission ###

class IsTeacher(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and (request.user.is_superuser or request.user.is_teacher)

class IsSuperuser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_superuser

### end permission ###

### viewset ###

class AssignmentViewSet(viewsets.ModelViewSet):
    queryset = Assignment.objects.all()
    serializer_class = StudentAssignmentListSerializer
    student_serializer_action_classes = {
        'list': StudentAssignmentListSerializer,
        'retrieve': StudentAssignmentDetailSerializer
    }
    teacher_serializer_action_classes = {
        'list': TeacherAssignmentListSerializer,
        'retrieve': TeacherAssignmentDetailSerializer,
        'partial_update': TeacherAssignmentDetailSerializer,
        'create': TeacherAssignmentDetailSerializer,
    }
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        try:
            if self.request.user.is_student:
                return self.student_serializer_action_classes[self.action]
            if self.request.user.is_teacher or self.request.user.is_superuser:
                return self.teacher_serializer_action_classes[self.action]
        except(KeyError, AttributeError):
            return super().get_serializer_class()

    def get_queryset(self):
        user = self.request.user
        if not user.is_anonymous:
            if user.is_superuser:
                return super().get_queryset()
            if user.is_student:
                return Assignment.objects.filter(year=user.student.year, status=2)
            if user.is_teacher:
                return Assignment.objects.filter(teacher=user.teacher)
        return Assignment.objects.none()

    def get_permissions(self):
        if self.action not in ['list', 'retrieve']:
            self.permission_classes = [IsTeacher, ]
        return super(self.__class__, self).get_permissions()

class GradedAssignmentViewSet(viewsets.ModelViewSet):
    queryset = GradedAssignment.objects.all()
    serializer_class = GradedAssignmentListSerializer
    permission_classes = [permissions.IsAuthenticated]
    serializer_action_classes = {
        'list': GradedAssignmentListSerializer,
        'create': GradedAssignmentSerializer,
    }

    def get_serializer_class(self):
        try:
            return self.serializer_action_classes[self.action]
        except(KeyError, AttributeError):
            return super().get_serializer_class()

    def get_queryset(self):
        id = self.request.query_params.get('id', None)
        if id is not None:
            return GradedAssignment.objects.filter(student=id)
        return GradedAssignment.objects.none()

### end viewset ###