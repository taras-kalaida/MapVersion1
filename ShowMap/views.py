from django.views import View
from LastVersionDjango.views import MixinViews, MixinNeededView
from .models import Monument, Category, TestMonument
from django.core import serializers
from django.shortcuts import redirect


# Отображение страницы Map
class ShowMap(MixinViews, View):
    template = "map.html"
    new = serializers.serialize("json", Monument.objects.all())
    context = {"path": "css/map.css", "title": "Map", "data": new, "categories": Category.objects.all()}

    def post(self, request):
        data = {i: j for i, j in request.POST.items() if i != 'csrfmiddlewaretoken' and i != "test_category"}
        id = Category.objects.get(name=request.POST.get("test_category"))
        TestMonument.objects.get_or_create(**data, category=id, slug=TestMonument.objects.count())
        return redirect("show_map")


# Отображение страницы Map за категорией
class ShowCategoryMap(MixinNeededView, View):
    template = "map.html"
    context = {"categories": Category.objects.all(), "title": "Category", "path": "css/map.css"}
    name = "objcts"
    model = Category
