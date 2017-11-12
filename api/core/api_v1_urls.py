from django.conf.urls import include, url


urlpatterns = [
    url(
        r'^config/',
        include('config.urls', namespace='config'),
    ),
    url(
        r'^admin/',
        include('administrator.urls', namespace='administrator'),
    ),
    url(
        r'^permission/',
        include('c_permission.urls', namespace='c_permission'),
    ),
    url(
        r'^group/',
        include('c_group.urls', namespace='c_group'),
    ),
]
