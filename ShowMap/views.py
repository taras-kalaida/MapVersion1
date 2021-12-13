from django.views import View
from LastVersionDjango.views import MixinViews, MixinNeededView
from .models import Monument, Category
from django.core import serializers
import json
from django.shortcuts import render


class ShowMap(MixinViews, View):
    template = "map.html"
    new = serializers.serialize("json", Monument.objects.all())
    context = {"path": "css/map.css", "title": "Map", "data": new, "categories": Category.objects.all()}



class ShowCategoryMap(MixinNeededView, View):
    template = "map.html"
    context = {"categories": Category.objects.all(),"title": "Category","path": "css/map.css"}
    name = "objcts"
    model = Category


