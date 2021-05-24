from rest_framework.routers import DefaultRouter
from .views import StudentViewSet, AbsenceViewSet, TeacherViewSet, AvatarUpdateView
from django.urls import path

router = DefaultRouter()
router.register(r'students', StudentViewSet)
router.register(r'teachers', TeacherViewSet)
router.register(r'absences', AbsenceViewSet)
# router.register(r'avatars', UploadViewSet, basename='Upload')

urlpatterns = [
    path('avatars/<int:pk>/', AvatarUpdateView.as_view()),
]

urlpatterns += router.urls

