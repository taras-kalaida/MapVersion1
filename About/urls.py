from django.urls import path
from .views import ShowAbout

# Регистрация путей для About
urlpatterns = [path("", ShowAbout.as_view(), name="show_about"), ]
