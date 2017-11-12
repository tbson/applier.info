from django.conf.urls import url
from .views import (
	ListView,
	CreateView,
	DetailView,
	UpdateView,
	DeleteView,
)

urlpatterns = [
	url(r'^$', ListView.as_view(), name='list'),  # GET
	url(r'^create/$', CreateView.as_view(), name='create'),  # POST
	url(r'^(?P<pk>\d+)/$', DetailView.as_view(), name='detail'),  # GET
	url(r'^(?P<pk>\d+)/edit/$', UpdateView.as_view(), name='edit'),  # PUT
	url(r'^(?P<pk>\d+(,\d+)*)/delete/$', DeleteView.as_view(), name='delete'),  # DELETE
]
