from django.shortcuts import render, reverse


class MixinViews:
    template = None
    context = None

    def get(self, request):
        return render(request, self.template, self.context)
