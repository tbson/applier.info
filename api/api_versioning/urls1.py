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
        include('c_permission.urls', namespace='c_permission'),
    ),
    path(
        'group/',
        include('c_group.urls', namespace='c_group'),
    ),
]

