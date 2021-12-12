from django.db import models


class Monuments(models.Model):
    id = models.IntegerField(primary_key=True, unique=True)
    title = models.CharField(max_length=50)
    description = models.TextField()
    image = models.ImageField(upload_to="images/monuments_image")
    wiki = models.CharField(max_length=100)
    slug = models.IntegerField( unique=True)
