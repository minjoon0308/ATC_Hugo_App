from rest_framework import serializers
from .models import Exercise, Workout, WorkoutExercise

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__'

class WorkoutExerciseSerializer(serializers.ModelSerializer):
    exercise = ExerciseSerializer()

    class Meta:
        model = WorkoutExercise
        fields = ['exercise', 'num_reps', 'duration', 'rest_time']

class WorkoutSerializer(serializers.ModelSerializer):
    workout_exercises = WorkoutExerciseSerializer(source='workoutexercise_set', many=True)

    class Meta:
        model = Workout
        fields = '__all__'

    
