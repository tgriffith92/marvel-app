from django.db import models

class Movie(models.Model):
    title              = models.CharField(max_length=50)
    year               = models.DateField()
