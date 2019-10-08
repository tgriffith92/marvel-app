from django.db import models

class Comic(models.Model):
    title  = models.CharField(max_length=50)
    rating = models.PositiveSmallIntegerField()
    review = models.TextField()

class Character(models.Model):

    Affiliation_In_Choices = [
        (True, 'Hero'),
        (False, 'Villain')
    ]

    name        = models.CharField(max_length=30)
    affiliation = models.CharField(max_length=7, choices=Affiliation_In_Choices,
    default=True)
    reason      = models.TextField()

class Suggestion(models.Model):
    title            = models.CharField(max_length=50)
    future_release   = models.DateField()
    related_movie    = models.CharField(max_length=50)
    plot             = models.TextField()

class Movie(models.Model):
    title     = models.CharField(max_length=50)
    year      = models.DateField()
    character = models.ForeignKey(Character, on_delete=models.CASCADE, related_name='characters', default=True)