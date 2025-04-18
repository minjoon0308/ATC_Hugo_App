from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import ExerciseViewSet, WorkoutViewSet, WorkoutLogsViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register('exercises', ExerciseViewSet, basename='exercise')
router.register(r'workouts', WorkoutViewSet, basename='workouts')
router.register(r'workout-logs', WorkoutLogsViewSet, basename='workoutlogs' )

urlpatterns = [
    path('', include(router.urls)),
    path('register/', views.RegisterView.as_view(), name="register"), 
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Refresh token endpoint
    path('logout/', views.LogoutView.as_view(), name='logout'),
    

]
