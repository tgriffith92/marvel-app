from django.shortcuts import render
from rest_framework import viewsets
from .serializers import MovieSerializer, ComicSerializer, CharacterSerializer
from .models import Movie, Comic, Character

class MovieViewSet(viewsets.ModelViewSet):
    queryset         = Movie.objects.all()
    serializer_class = MovieSerializer

class ComicViewSet(viewsets.ModelViewSet):
    queryset         = Comic.objects.all()
    serializer_class = ComicSerializer

class CharacterViewSet(viewsets.ModelViewSet):
    queryset         = Character.objects.all()
    serializer_class = CharacterSerializer    