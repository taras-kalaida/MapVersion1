from django.contrib import admin
from .models import Monument, Category


@admin.register(Monument)
class MonumentAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "longtitude", "latitude", "image", "category")
    list_display_links = ["title"]
    list_filter = ("category",)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    list_display_links = ["name"]
