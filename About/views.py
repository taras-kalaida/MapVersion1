import LastVersionDjango as Home
from django.views import View


class ShowAbout(Home.MixinViews, View):
    template = "about.html"
    context = {"title": "About", "path": "css/about.css"}
