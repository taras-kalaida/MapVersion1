from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from ShowMap.views import ShowMap, ShowCategoryMap

# Регистрация путей
urlpatterns = [
                  path('admin/', admin.site.urls),
                  path("", ShowMap.as_view(), name="show_map"),
                  path("about/", include("About.urls")),
                  path("<slug:slug>", ShowCategoryMap.as_view(), name="show_category_map")
              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
