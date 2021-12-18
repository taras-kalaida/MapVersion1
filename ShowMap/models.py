from django.db import models
from django.shortcuts import reverse


# Модель категорий
class Category(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    name = models.CharField(max_length=50, unique=True)
    slug = models.CharField(max_length=50, unique=True)
    icon = models.FileField(upload_to="images/monuments_icon")

    def __str__(self):
        return self.name

    def get_url(self):
        return reverse("show_category_map", kwargs={"slug": self.slug})


# Модель памяток
class Monument(models.Model):
    id = models.AutoField(primary_key=True, unique=True, )
    title = models.CharField(max_length=50)
    description = models.TextField()
    image = models.ImageField(upload_to="images/monuments_image")
    wiki = models.CharField(max_length=100)
    longtitude = models.FloatField(blank=False)
    latitude = models.FloatField(blank=False)
    icon = models.FileField(upload_to="images/monuments_icon")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, blank=True, related_name="category")

    def __str__(self):
        return self.title


# Модель корзины памяток юзера
class UserMonument(models.Model):
    id = models.IntegerField(primary_key=True, unique=True)

    def __str__(self):
        return str(self.id)


# Модель памяток юзера
class TestMonument(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    title = models.CharField(max_length=50)
    image = models.ImageField(upload_to="images/monuments_image")
    wiki = models.CharField(max_length=100)
    slug = models.PositiveIntegerField(unique=True)
    longtitude = models.FloatField(blank=False)
    latitude = models.FloatField(blank=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, blank=True, related_name="test_category")
    user = models.ForeignKey(UserMonument, on_delete=models.CASCADE, blank=True, related_name="user")

    def __str__(self):
        return self.title
