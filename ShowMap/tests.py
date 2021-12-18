from django.test import SimpleTestCase, Client, TestCase
from .views import ShowMap, ShowCategoryMap
from django.urls import reverse, resolve
from .models import Category, Monument


# Тесты для urls.py
class TestUrls(SimpleTestCase):
    def setUp(self):
        self.show_map = reverse("show_map")
        self.show_category_map = reverse("show_category_map", args=["something"])

    def test_show_map_url_is_resolved(self):
        self.assertEquals(resolve(self.show_map).func.view_class, ShowMap)

    def test_show_category_map_url_is_resolved(self):
        self.assertEquals(resolve(self.show_category_map).func.view_class, ShowCategoryMap)


# Тесты для views.py
class TestViews(TestCase):
    def setUp(self):
        self.client = Client()
        self.show_map = reverse("show_map")
        self.show_category_map = reverse("show_category_map", args=["something"])
        self.something = Category.objects.create(name="something", icon="hey", slug="something")

    def test_show_map_GET(self):
        response = self.client.get(self.show_map)
        self.assertEquals(response.status_code, 200)
        self.assertTemplateUsed(response, "map.html")

    def test_show_category_mag_GET(self):
        response = self.client.get(self.show_category_map)
        self.assertEquals(response.status_code, 200)
        self.assertTemplateUsed(response, "map.html")


# Тесты для models.py
class TestModels(TestCase):
    def setUp(self):
        self.category = Category.objects.create(name="name", icon="icon.svg", slug="slug")
        self.title = Monument.objects.create(
            image="image.jpg",
            title="title",
            icon="icon.svg",
            longtitude=0,
            latitude=0,
            slug=0,
            wiki="ref",
            description="description",
            category=self.category
        )

    def test_monument_model(self):
        self.assertEquals(str(self.title), "title")
        self.assertEquals(Monument.objects.count(), 1)

    def test_category_model(self):
        self.assertEquals(str(self.category), "name")
        self.assertEquals(f"/{self.category.slug}", self.category.get_url())
        self.assertEquals(Category.objects.count(), 1)
