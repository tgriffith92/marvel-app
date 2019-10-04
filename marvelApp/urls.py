from rest_framework import routers
from . import views
from django.urls import include, path

router = routers.DefaultRouter()
router.register('movie', views.MovieViewSet)
router.register('comic', views.ComicViewSet)

urlpatterns = [
    path('', include(router.urls))
]