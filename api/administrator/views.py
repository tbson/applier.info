from django.http import Http404
from rest_framework.generics import (
	ListAPIView,
	RetrieveAPIView,
	CreateAPIView,
	RetrieveUpdateAPIView,
	RetrieveDestroyAPIView,
)
from rest_framework.response import Response
from rest_framework import status
from .models import Administrator
from .serializers import (
	AdministratorBaseSerializer,
	AdministratorCreateSerializer,
	AdministratorUpdateSerializer,
)
from utils.common_classes.custom_permission import CustomPermission
from utils.helpers.res_tools import getToken


class ListView(ListAPIView):
	permissions = ['_custom_view_list_administrator']
	permission_classes = [CustomPermission]
	queryset = Administrator.objects.all()
	serializer_class = AdministratorBaseSerializer
	search_fields = ['user__username', 'user__email', 'user__first_name', 'user__last_name']


class DetailView(RetrieveAPIView):
	permissions = ['_custom_view_detail_administrator']
	permission_classes = [CustomPermission]
	queryset = Administrator.objects.all()
	serializer_class = AdministratorBaseSerializer


class ProfileView(RetrieveAPIView):
	permissions = ['_custom_view_profile_administrator']
	permission_classes = [CustomPermission]
	queryset = Administrator.objects.all()
	serializer_class = AdministratorBaseSerializer
	lookup_field = 'pk'

	def get_object(self):
		# return Administrator.objects.get(user_id=self.request.user.id)
		token = getToken(self.request.META)
		print(token)
		return self.request.user.administrator


class CreateView(CreateAPIView):
	permissions = ['_custom_create_administrator']
	permission_classes = [CustomPermission]
	queryset = Administrator.objects.all()
	serializer_class = AdministratorCreateSerializer


class UpdateView(RetrieveUpdateAPIView):
	permissions = ['_custom_edit_administrator']
	permission_classes = [CustomPermission]
	queryset = Administrator.objects.all()
	serializer_class = AdministratorUpdateSerializer


class DeleteView(RetrieveDestroyAPIView):
	permissions = ['_custom_delete_administrator']
	permission_classes = [CustomPermission]
	queryset = Administrator.objects.all()
	serializer_class = AdministratorBaseSerializer

	def get_object(self, pk):
		pk = [int(pk)] if pk.isdigit() else map(lambda x: int(x), pk.split(','))
		result = Administrator.objects.filter(pk__in=pk)
		if result.count():
			return result
		raise Http404

	def delete(self, request, pk, format=None):
		object = self.get_object(pk)
		object.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)
