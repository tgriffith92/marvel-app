from django.db import models

class Movie(models.Model):
    title = models.CharField(max_length=50)
    year  = models.DateField()

class Comic(models.Model):
    title  = models.CharField(max_length=50)
    rating = models.PositiveSmallIntegerField()
    review = models.TextField()