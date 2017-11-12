from django.conf.urls import url
from .views import (
	ListView,
	DetailView,
	UpdateView,
	DeleteView,
)

urlpatterns = [
	url(r'^$', ListView.as_view(), name='list'),
	url(r'^(?P<pk>\d+)/$', DetailView.as_view(), name='detail'),
	url(r'^(?P<pk>\d+)/edit/$', UpdateView.as_view(), name='edit'),
	url(r'^(?P<pk>\d+(,\d+)*)/delete/$', DeleteView.as_view(), name='delete')
]
