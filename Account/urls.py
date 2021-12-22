from django.urls import path
from .views import ShowLogin, ShowRegistration, logout

urlpatterns = [path("", ShowLogin.as_view(), name="show_login"),
               path("registration/", ShowRegistration.as_view(), name="show_registration"),
               path("logout/", logout, name="logout"), ]
