# Map

# Описание
- Приложение для справочной информации о близлежащих обьектах на карте

# Стуркутура Сайта
- Главная страница
  - Карта
  - Всплывающее меню с информацией об обьекте
  - Список обьектов относительно позиции камеры
- Информация
  - Список источников данных
  - Слои карты
# Структура проекта  
- MapVersion1  


  - About  
    - templates (для страницы about)  
    - __init__.py  
    - apps.py  
    - test.py  
    - urls.py  
    - views.py 


  - Map    
    - templates (для страницы Map)  
    - __init__.py  
    - apps.py  
    - test.py  
    - models.py  
    - views.py  
    - admin.py  


   - LastVersionDjango (Главный файл с настройками сервера)  
     - __init__.py  
     - urls.py (включает все остальные пути)  
     - views.py (содержит mixin класс для других views.py)  
     - settings.py (настройки сервера)  
     - asgi.py  
     - wsgi.py  
  
  - templates (для head, body, header, footer)  
  
  - static  
    - js  
    - css  
    - img  

  - requirments.txt 

  - .gitignore  

  - db.sqlite3 

  - manage.py 
  



