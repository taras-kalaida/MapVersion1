from django.views import View
from LastVersionDjango.views import MixinViews, MixinNeededView
from .models import Monument, Category, TestMonument, UserMonument
from django.core import serializers
from django.shortcuts import redirect
from django.shortcuts import render


# Отображение страницы Map
class ShowMap(View):
    template = "map.html"
    new = serializers.serialize("json", Monument.objects.all())
    context = {"path": "css/map.css", "title": "Map", "categories": Category.objects.all(), "data": new, }

    def get(self, request):
        print(request.user.is_authenticated)
        self.context["custom_data"] = ""
        self.context['user'] = False
        if request.user.is_authenticated:
            self.context["custom_data"] = serializers.serialize("json", TestMonument.objects.filter(
                user=UserMonument.objects.get_or_create(id=request.user.id)[0]))
            self.context['user'] = request.user.is_authenticated
        return render(request, self.template, self.context)

    def post(self, request):
        data = {i: j for i, j in request.POST.items() if i != 'csrfmiddlewaretoken' and i != "test_category"}
        TestMonument.objects.get_or_create(**data,
                                           category=Category.objects.get(name=request.POST.get("test_category")),
                                           slug=TestMonument.objects.count(),
                                           user=UserMonument.objects.get_or_create(id=request.user.id)[0])
        return redirect("show_map")


class ShowCategoryMap(MixinNeededView, View):
    template = "map.html"
    context = {"categories": Category.objects.all(), "title": "Category", "path": "css/map.css"}
    name = "objcts"
    model = Category
