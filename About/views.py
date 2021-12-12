from LastVersionDjango.views import MixinViews
from django.views import View


class ShowAbout(MixinViews, View):
    template = "about.html"
    context = {"title": "About", "path": "css/about.css"}


