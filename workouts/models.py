from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone

class Exercise(models.Model):
    name = models.CharField(max_length=255)
    difficulty = models.TextField(default= "none")
    target_muscle = models.TextField(default= "none") 
    primary_classification = models.TextField(default= "none")
    body_region = models.TextField(default= "none") 
    primary_equipment = models.TextField(default= "none")
    short_demo = models.TextField(default= "none")  # youtube shorts
    demo = models.TextField(default="No demo available")  # youtube 

    def __str__(self):
        return self.name

class Workout(models.Model): # A group of exercises 
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(default=timezone.now)
    name = models.CharField(max_length=255)
    exercises = models.ManyToManyField(Exercise,  related_name="workouts")
    duration = models.IntegerField(default=30)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.user.username}"

class WorkoutExercise(models.Model):
    workout = models.ForeignKey(Workout, on_delete=models.CASCADE)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    duration = models.IntegerField()  
    num_reps = models.IntegerField()  
    rest_time = models.IntegerField(default=0) 

    def __str__(self):
        return f"{self.exercise.name} in {self.workout.name}"
    
class WorkoutLogs(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    workout = models.ForeignKey(Workout, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    duration = models.IntegerField()
    exercises_done = models.JSONField(default=list)  # NEW!

    def __str__(self):
        return f"Log: {self.user.username} - {self.workout.name}"

