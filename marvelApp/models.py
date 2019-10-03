from django.db import models

class Movie(models.Model):
    title         = models.CharField(max_length=30)
    year          = models.DateField()
    fav_character = models.CharField(max_length=30)
