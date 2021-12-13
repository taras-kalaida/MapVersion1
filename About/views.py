from LastVersionDjango.views import MixinViews
from django.views import View

# Отображение страницы About
class ShowAbout(MixinViews, View):
    template = "about.html"
    context = {"title": "About", "path": "css/about.css"}


