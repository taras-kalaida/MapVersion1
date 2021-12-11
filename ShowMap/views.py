
from django.views import View
import LastVersionDjango as Home

class ShowMap(Home.MixinViews, View):
    template = "map.html"
    context = {"path": "css/map.css", "title": "Map"}
