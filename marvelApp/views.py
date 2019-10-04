from django.shortcuts import render
from rest_framework import viewsets
from .serializers import MovieSerializer, ComicSerializer, CharacterSerializer, SuggestionSerializer
from .models import Movie, Comic, Character, Suggestion

class MovieViewSet(viewsets.ModelViewSet):
    queryset         = Movie.objects.all()
    serializer_class = MovieSerializer

class ComicViewSet(viewsets.ModelViewSet):
    queryset         = Comic.objects.all()
    serializer_class = ComicSerializer

class CharacterViewSet(viewsets.ModelViewSet):
    queryset         = Character.objects.all()
    serializer_class = CharacterSerializer  

class SuggestionViewSet(viewsets.ModelViewSet):
    queryset         = Suggestion.objects.all()
    serializer_class = SuggestionSerializer   