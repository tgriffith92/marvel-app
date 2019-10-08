from rest_framework import serializers
from .models import Movie, Comic, Character, Suggestion

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Movie
        fields = [
            'id', 
            'title', 
            'year',
            'character'
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

class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Character
        fields = [
            'id', 
            'name', 
            'affiliation',
            'reason'
            ]

class SuggestionSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Suggestion
        fields = [
            'id', 
            'title', 
            'future_release',
            'related_movie',
            'plot'
            ]