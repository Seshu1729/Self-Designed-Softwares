"""buzzer_round URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'^$', index),
    url(r'^validation/$', validation),
    url(r'^dashboard/$', dashboard),
    url(r'^unlock_question/$', unlock_question),
    url(r'^view_question/$', view_question),
    url(r'^submit_answer/$', submit_answer),
    url(r'^leader_board/$', leader_board),
]
