# ІВ-93 Калайда Тарас (<a href="https://github.com/Inspiration679">Inspiration679</a>), Кочерга Андрій(<a href="https://github.com/anrikolo">anrikolo</a>), Лінійчук Данило (<a href="https://github.com/JenyaVozduhaTochkaNet">JenyaVozduhaTochkaNet</a>)
# Map
 + [Описание](#Description);
 + [Структура Сайта](#Site_structure);
 + [Структура проекта](#Site_project);
 + [Доступно](#Available)
 + [Планы](#Plans);
 + [Примеры работы](#Example);


# <a name="Description"></a>Описание
- Приложение для справочной информации о близлежащих обьектах на карте

# <a name="Site_structure"></a>Структура Сайта
- Главная страница
  - Карта
  - Всплывающее меню с информацией об обьекте
  - Список обьектов относительно позиции камеры
- Информация
  - Список источников данных
  - Слои карты
# <a name="Site_project"></a>Структура проекта  
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

  - Dockerfile

  - docker-compose

  - .gitignore  

  - db.sqlite3 

  - manage.py 
  
# <a name="Available"></a>Доступно
- Отображение:
  -  карты с маркерами 
  -  текущего местоположения
  -  доступных маркеров относительно местоположения
  -  по категориям 
  -  маркера с информацией 
- Доступные категории:
  - Библиотека
  - Музей
  - Университет
  - Монумент
- Страничка "About"
- Регистрация/логин
- Добавление маркеров для зарегистрированных пользователей
- Построение маршрута
  
# <a name="Plans"></a>Планы
- Авто. заполнение бд
- Увеличить количество доступных маркеров и категорий
- Улучшить определение местоположения и отслеживание перемещения

# <a name="Example"></a>Примеры работы

## Местоположение с областью видимости и маркерами
<img src="static/Git_img/1.png">

## Если маркер не находиться в области видимости 
<img src="static/Git_img/2.png">

## Содержание маркера
<img src="static/Git_img/3.jpg" >

## Отобразить все доступные маркеры
<img src="static/Git_img/4.png" >

## Интерфейс зарегистрированного пользователя

<img src="static/Git_img/5.jpg" >

## Добавить метку от пользователя

<img src="static/Git_img/6.jpg" >

## Отображение маркеров пользователя

<img src="static/Git_img/7.jpg" >

## Построение маршрута

<img src="static/Git_img/8.jpg" >