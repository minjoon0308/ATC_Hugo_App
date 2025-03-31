from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone

class Exercise(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    duration = models.IntegerField()  # Duration in minutes

    def __str__(self):
        return self.name

class Workout(models.Model): # A group of exercises 
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(default=timezone.now)
    name = models.CharField(max_length=255)
    exercises = models.ManyToManyField(Exercise,  related_name="workouts")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.user.username}"
