from django.conf.urls import url
from rest_framework_jwt.views import (
	obtain_jwt_token,
	refresh_jwt_token,
	verify_jwt_token,
)
from .views import (
	ListView,
	DetailView,
	ProfileView,
	CreateView,
	UpdateView,
	DeleteView,
)

urlpatterns = [
	url(r'^token-auth/', obtain_jwt_token, name='login'),
	url(r'^token-refresh/', refresh_jwt_token, name='refresh'),
	url(r'^token-verify/', verify_jwt_token, name='verify'),

	url(r'^$', ListView.as_view(), name='list'),
	url(r'^create/$', CreateView.as_view(), name='create'),
	url(r'^profile/$', ProfileView.as_view(), name='profile'),
	url(r'^(?P<pk>\d+)/$', DetailView.as_view(), name='detail'),
	url(r'^(?P<pk>\d+)/edit/$', UpdateView.as_view(), name='edit'),
	url(r'^(?P<pk>\d+(,\d+)*)/delete/$', DeleteView.as_view(), name='delete')
]
