from django.test import SimpleTestCase, Client
from django.urls import resolve, reverse
from .views import ShowAbout


# Тесты для urls.py
class TestUrls(SimpleTestCase):
    def test_show_about_url_is_resolved(self):
        url = reverse('show_about')
        self.assertEquals(resolve(url).func.view_class, ShowAbout)


# Тесты для views.py
class TestViews(SimpleTestCase, Client):
    def setUp(self):
        self.client = Client()
        self.show_about_url = reverse("show_about")

    def test_show_about_GET(self):
        response = self.client.get(self.show_about_url)
        self.assertEquals(response.status_code, 200)
        self.assertTemplateUsed(response, "about.html")
