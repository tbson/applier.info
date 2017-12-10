import os
from django.urls import path
from .views import (
	ListView,
	DetailView,
	CreateView,
	UpdateView,
	DeleteView,
)


app_name = os.getcwd().split(os.sep)[-1]
urlpatterns = [
	path('', ListView.as_view(), name='list'),
	path('create/', CreateView.as_view(), name='create'),
	path('<int:pk>/', DetailView.as_view(), name='detail'),
	path('<int:pk>/edit/', UpdateView.as_view(), name='edit'),
	path('<int:pk>/delete/', DeleteView.as_view(), name='delete')
]
