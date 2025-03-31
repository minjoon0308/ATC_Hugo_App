import csv
from django.core.management.base import BaseCommand
from workouts.models import Exercise

class Command(BaseCommand):
    help = 'Load exercises from a CSV file'

    def handle(self, *args, **kwargs):

        Exercise.objects.all().delete()
        self.stdout.write("Deleted all existing exercises.")
        
        with open('data2_processed.csv', newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                Exercise.objects.create(
                    name=row['Exercise'],
                    difficulty=row['Difficulty_Level'], 
                    target_muscle= row['Target_Muscle_Group'],
                    primary_classification = row['Primary_Exercise_Classification'],
                    body_region = row['Body_Region'],
                    primary_equipment = row['Primary_Equipment'],
                    short_demo = row['Short_Youtube_Demonstration'], 
                    demo = row['In-Depth Youtube Explanation'],
                )
                self.stdout.write(f"Added {row['Exercise']}")