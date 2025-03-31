from rest_framework.viewsets import ModelViewSet
from .models import Exercise, Workout
from .serializers import ExerciseSerializer, WorkoutSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
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
        return Workout.objects.filter(user=self.request.user)

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