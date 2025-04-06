from rest_framework.viewsets import ModelViewSet
from .models import Exercise, Workout, WorkoutExercise, WorkoutLogs
from .serializers import ExerciseSerializer, WorkoutSerializer, WorkoutLogSerializer
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated
from django.contrib.auth.models import User
from rest_framework import status, permissions
from rest_framework_simplejwt.tokens import RefreshToken


class ExerciseViewSet(ModelViewSet):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
    permission_classes = [IsAuthenticatedOrReadOnly] 


class WorkoutViewSet(ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = WorkoutSerializer    

    def get_queryset(self):
        return Workout.objects.prefetch_related('workoutexercise_set__exercise').filter(user=self.request.user)
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    

    def create(self, req, *args, **kwargs):
        user = req.user
        name = req.data.get("name")
        exercises = req.data.get("exercises", [])
        total_duration = req.data.get("duration", 30)
        workout_id = req.data.get('id', None)

        if not name or not exercises:
            return Response({"error": "name and exercises are required"}, status=status.HTTP_400_BAD_REQUEST)
        
        print(user, name, workout_id)
        print("workout_id:", workout_id)
        if workout_id:
            print("here")
            try:
                workout = Workout.objects.get(id=workout_id, user = user)
                WorkoutExercise.objects.filter(workout=workout).delete()
                if not name or not exercises:
                    return Response({"error": "name and exercises are required"}, status=status.HTTP_400_BAD_REQUEST)
                workout.name = name
                workout.duration = total_duration
                workout.date = timezone.now()
                workout.save()
                for ex in exercises:
                    try:
                        exercise = Exercise.objects.get(id=ex["id"])
                        WorkoutExercise.objects.create(
                            workout=workout,
                            exercise=exercise,
                            num_reps=ex.get("numReps    ", 1),
                            duration=ex.get("duration", 0),
                            rest_time=ex.get("rest", 30),
                        )
                    except Exercise.DoesNotExist:
                        return Response({"error": f"Exercise with ID {ex["id"]} not found"}, status=status.HTTP_404_NOT_FOUND)

                return Response({"message": "Workout updated successfully", "workout_id": workout.id}, status=status.HTTP_200_OK)
            
            except Workout.DoesNotExist:
                return Response({"error": "Workout not found"}, status=status.HTTP_404_NOT_FOUND)

        else:
            workout = Workout.objects.create(user=user, name=name, duration=total_duration, date=timezone.now())

            for ex in exercises:
                try:
                    exercise = Exercise.objects.get(id=ex["id"])
                    WorkoutExercise.objects.create(
                        workout=workout,
                        exercise=exercise,
                        num_reps=ex.get("numReps", 1),
                        duration=ex.get("duration", 0),
                        rest_time=ex.get("rest", 30),
                    )
                except Exercise.DoesNotExist:
                    return Response({"error": f"Exercise with ID {ex['id']} not found"}, status=status.HTTP_404_NOT_FOUND)

            return Response({"message": "Workout created successfully", "workout_id": workout.id}, status=status.HTTP_201_CREATED)
        
    def destroy(self, req, *args, **kwargs):
        workout_id = kwargs.get("pk")
        print(workout_id)
        try:
            workout = Workout.objects.get(id=workout_id, user=req.user)
            workout.delete()
            # WorkoutExercise.objects.filter(workout=workout).delete() automatic
            return Response({"message": "Workout deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Workout.DoesNotExist:
            return Response({"error": "Workout not found"}, status=status.HTTP_404_NOT_FOUND)

# User Register 
class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, req):
        username = req.data.get('username')
        password = req.data.get('password')
        email = req.data.get('email')
        if not username or not email or not password:
            return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)
        
        if len(password) < 6:
            return Response({"error": "Password must be at least 6 characters."}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already exists."}, status=status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.create_user(username=username, password=password, email=email)
        return Response({"message": "User created successfully!"}, status=status.HTTP_201_CREATED)

class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, req):
        try:
            refresh_token = req.data.get("refresh_token")
            if not refresh_token:
                return Response({"error": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Logged out successfully!"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class WorkoutLogsViewSet(ModelViewSet):
    serializer_class = WorkoutLogSerializer 
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return WorkoutLogs.objects.filter(user=self.request.user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)