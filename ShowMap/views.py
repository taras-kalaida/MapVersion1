from django.views import View
from LastVersionDjango.views import MixinViews
from .models import Monuments
from django.core import serializers
import json

class ShowMap(MixinViews, View):

    template = "map.html"
    new=serializers.serialize("json", Monuments.objects.all())
    context = {"path": "css/map.css", "title": "Map","data":new}
# def ShowMap(request):
#     template = "map.html"
#     context = {"path": "css/map.css", "title": "Map", "monuments": Monuments.objects.all()}
#     return render(request, template, context)

