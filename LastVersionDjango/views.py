from django.shortcuts import render, get_object_or_404
from django.core import serializers


class MixinViews:
    template = None
    context = None

    def get(self, request):
        return render(request, self.template, self.context)


class MixinNeededView:
    template = None
    context = None
    model = None
    name = None

    def get(self, request, slug):
        data = get_object_or_404(self.model, slug=slug)
        new = serializers.serialize("json", data.category.all())
        self.context["data"] = new

        return render(request, self.template, self.context)
