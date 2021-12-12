from django.db import models


class Category(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    name = models.CharField(max_length=50, unique=True)
    slug = models.PositiveIntegerField(unique=True)

    def __str__(self):
        return self.name

class Monument(models.Model):
    id = models.AutoField(primary_key=True, unique=True, )
    title = models.CharField(max_length=50)
    description = models.TextField()
    image = models.ImageField(upload_to="images/monuments_image")
    wiki = models.CharField(max_length=100)
    slug = models.PositiveIntegerField(unique=True)
    longtitude = models.IntegerField(blank=False)
    latitude = models.IntegerField(blank=False)
    icon = models.FileField(upload_to="images/monuments_icon")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, blank=True, related_name="category")

    def __str__(self):
        return self.title
print(Monument.__dict__)