from django.db import models

class Movie(models.Model):
    title      = models.CharField(max_length=50)
    year       = models.DateField()

class Comic(models.Model):
    title  = models.CharField(max_length=50)
    rating = models.PositiveSmallIntegerField()
    review = models.TextField()
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='comics', default=True)


class Character(models.Model):

    Affiliation_In_Choices = [
        (True, 'Hero'),
        (False, 'Villain')
    ]

    name        = models.CharField(max_length=30)
    affiliation = models.CharField(max_length=7, choices=Affiliation_In_Choices,
    default=True)
    reason      = models.TextField()
    movie       = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='characters', default=True)

class Suggestion(models.Model):
    title            = models.CharField(max_length=50)
    future_release   = models.DateField()
    related_movie    = models.CharField(max_length=50)
    plot             = models.TextField()
    movie            = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='suggestions', default=True)
