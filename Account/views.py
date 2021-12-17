from django.views import View
from django.contrib.auth.forms import AuthenticationForm
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth import logout as end
from .forms import SignUpForm
from django.contrib.auth.decorators import user_passes_test
from django.utils.decorators import method_decorator


def authentication(user):
    print(user.is_authenticated)
    return not user.is_authenticated


class ShowRegistration(View):
    template = "registration.html"

    @method_decorator(user_passes_test(authentication))
    def get(self, request):
        context = {"sign_up": SignUpForm(), "title": "Login", "path": "css/registration.css"}
        return render(request, self.template, context)

    def post(self, request):
        sign_up = SignUpForm(data=request.POST)

        if sign_up.is_valid():

            new_user = sign_up.save(commit=False)
            new_user.set_password(sign_up.cleaned_data['password'])
            new_user.save()
            print("da")
            return redirect("show_login")

        else:
            print("net")
            return self.get(request)


class ShowLogin(View):
    template = "login.html"

    @method_decorator(user_passes_test(authentication))
    def get(self, request):
        context = {"sign_in": AuthenticationForm(), "path": "css/login.css", }
        return render(request, self.template, context)

    def post(self, request):
        sign_in = AuthenticationForm(data=request.POST)
        if sign_in.is_valid():
            username = request.POST["username"]
            password = request.POST["password"]
            user = authenticate(username=username, password=password)

            if user is not None:
                login(request, user)
                return redirect("show_map")
        else:
            return self.get(request)


def logout(request):
    if request.user.is_authenticated:
        end(request)
    return redirect("show_map")
