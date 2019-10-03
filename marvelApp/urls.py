from rest_framework import routers
from . import views
from django.urls import include, path

router = routers.DefaultRouter()
router.register('movie', views.MovieViewSet)

urlpatterns = [
    path('', include(router.urls))
]