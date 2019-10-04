from rest_framework import serializers
from .models import Movie, Comic

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Movie
        fields = [
            'id', 
            'title', 
            'year'
            ]

class ComicSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Comic
        fields = [
            'id', 
            'title', 
            'rating',
            'review'
            ]