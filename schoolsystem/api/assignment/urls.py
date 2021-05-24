from rest_framework.routers import DefaultRouter
from api.assignment.views import AssignmentViewSet, GradedAssignmentViewSet

router = DefaultRouter()
router.register(r'assignments', AssignmentViewSet)
router.register(r'graded-assignments', GradedAssignmentViewSet)
urlpatterns = router.urls