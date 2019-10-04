from rest_framework import routers
from . import views
from django.urls import include, path

router = routers.DefaultRouter()
router.register('movie', views.MovieViewSet)
router.register('comic', views.ComicViewSet)
router.register('character', views.CharacterViewSet)
router.register('suggestion', views.CharacterViewSet)

urlpatterns = [
    path('', include(router.urls))
]