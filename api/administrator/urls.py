import os
from django.urls import path
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
	ResetPasswordView,
	ChangePasswordView,
)


app_name = os.getcwd().split(os.sep)[-1]
urlpatterns = [
	path('token-auth/', obtain_jwt_token, name='login'),
	path('token-refresh/', refresh_jwt_token, name='refresh'),
	path('token-verify/', verify_jwt_token, name='verify'),

	path('', ListView.as_view(), name='list'),
	path('create/', CreateView.as_view(), name='create'),
	path('profile/', ProfileView.as_view(), name='profile'),
    path('<int:pk>/', DetailView.as_view(), name='detail'),
	path('<int:pk>/edit/', UpdateView.as_view(), name='edit'),
	path('<str:pk>/delete/', DeleteView.as_view(), name='delete'),
	path('reset-password/', ResetPasswordView.as_view(), name='resetPassword'),
	path('change-password/', ChangePasswordView.as_view(), name='changePassword'),
]
