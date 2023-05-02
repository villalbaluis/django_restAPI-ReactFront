# Django REST Framework y React CRUD

Este repositorio sale de la necesidad personal de aventurarme a dejar de limitar mis conocimientos en Python puro, y JS con Angular, y Express JS, de manera tal, que mediante el tutorial ofrecido por [Fazt Code,](https://github.com/fazt) en su canal de [YouTube](https://www.youtube.com/@FaztCode), donde nos explica a grosso modo, como utilizar estas dos herramientas para el desarrollo de una aplicación web del formato To Do.

En este repositorio se encontrarán las instrucciones necesarias para correr el proyecto en windows.


Para empezar, he desarrollado el proyecto con las siguientes versiones de Node y Python:

* Versión de Node:  v18.14.1
* Versión de Python: 3.11.3
* Versión de Django: 4.2


Dentro del mismo, y de Python, se ha instalado el manejador de entornor virtuales de Python, [venv, ](https://docs.python.org/3/library/venv.html)como herramienta de desarrolla, para ello, desde la consola, corremos el comando: **pip install virtualenv.** Luego de instalado el entorno virtual, debemos ejecutarlo, antes de la ejecución del código de la API, mediante el comando (Y estando parados en la carpeta del proyecto) ***python -m venv venv,* **podemos inicializar el entorno virtual.


En caso de no tener instalado Django, debemos instalarlo mediante el comando: ***pip install django.***

Luego de instalado Django, y estando parados en el entorno virtual y la carpeta de proyecto, correremos la API mediante el comando: ***python manage.py runserver***, el cual inicializará el proyecto en la dirección: ***http://127.0.0.1:8000.***

Luego procedemos a ejecutar las migraciones, para ello daremos el comando ***python manage.py migrate.***


- Ahora abriremos una nueva consola, dejando la primera con la API corriendo, y nos ubicaremos dentro de la carpeta ***client.***

  Una vez en la carpeta Cliente, ejecutamos el comando ***npm i,*** para instalar todas las dependencias de React, al finalizar, podremos ejecutar el comando ***npm run dev.* **para finalmente ejecutar la interfaz gráfica desde nuestro navegador.
