from django.contrib import admin
from .models import Monument, Category, TestMonument,UserMonument


# Регистрация модели памяток в админке
@admin.register(Monument)
class MonumentAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "longtitude", "latitude", "image", "category")
    list_display_links = ["title"]
    list_filter = ["category"]
    search_fields = ["title", "id"]
    save_on_top = True


# Регистрация модели категорий в админке
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    list_display_links = ["name"]
    search_fields = ["name", "id"]
    save_on_top = True


# Регистрация модели памяток юзера в админке
@admin.register(TestMonument)
class MonumentAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "longtitude", "latitude", "category")
    list_display_links = ["title",  "id"]
    list_filter = ["category"]
    search_fields = ["title", "id"]
    save_on_top = True

# Регистрация модели корзины памяток юзера в админке
@admin.register(UserMonument)
class MonumentAdmin(admin.ModelAdmin):
    list_display = ("id",)
    list_display_links = ["id"]
    list_filter = ["id"]
    search_fields = ["id"]
    save_on_top = True
