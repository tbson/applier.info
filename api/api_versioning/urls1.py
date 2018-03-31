import os
from django.urls import path, include


app_name = os.getcwd().split(os.sep)[-1]
urlpatterns = [
    path(
        'config/',
        include('config.urls', namespace='config'),
    ),
    path(
        'admin/',
        include('administrator.urls', namespace='administrator'),
    ),
    path(
        'permission/',
        include('permission.urls', namespace='permission'),
    ),
    path(
        'group/',
        include('group.urls', namespace='group'),
    ),
]

