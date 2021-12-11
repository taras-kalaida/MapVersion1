from LastVersionDjango.views import MixinViews
from django.views import View


class ShowMap(MixinViews, View):
    template = "map.html"
    context = {"path": "map.css", "title": "Map"}
