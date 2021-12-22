from django.shortcuts import render, get_object_or_404
from django.core import serializers


# Mixin class для всех views.py
class MixinViews:
    template = None
    context = None

    def get(self, request):
        return render(request, self.template, self.context)


