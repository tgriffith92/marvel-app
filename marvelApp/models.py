from django.db import models

class Movie(models.Model):
    title = models.CharField(max_length=50)
    year  = models.DateField()

class Comic(models.Model):
    title  = models.CharField(max_length=50)
    rating = models.PositiveSmallIntegerField()
    review = models.TextField()

class Character(models.Model):
    name        = models.CharField(max_length=30)
    ability     = models.PositiveSmallIntegerField()
    affiliation = models.CharField(max_length=10)
    reason      = models.TextField()