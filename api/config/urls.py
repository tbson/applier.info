import os
from django.urls import path
from .views import (
	ListView,
	CreateView,
	DetailView,
	UpdateView,
	DeleteView,
)


app_name = os.getcwd().split(os.sep)[-1]
urlpatterns = [
	path('', ListView.as_view(), name='list'),  # GET
	path('create/', CreateView.as_view(), name='create'),  # POST
    path('<int:pk>/', DetailView.as_view(), name='detail'),  # GET
    path('<int:pk>/edit/', UpdateView.as_view(), name='edit'),  # PUT
    path('<str:pk>/delete/', DeleteView.as_view(), name='delete'),  # DELETE
]
