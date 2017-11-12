from django.http import Http404
from rest_framework.generics import (
	ListAPIView,
	RetrieveAPIView,
	CreateAPIView,
	RetrieveUpdateAPIView,
	DestroyAPIView,
)
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import Group
from .serializers import (
	CGroupBaseSerializer,
)


class ListView(ListAPIView):
	# permissions = ['_custom_view_list_group']
	queryset = Group.objects.all()
	serializer_class = CGroupBaseSerializer
	pagination_class = None
	search_fields = ['name']


class DetailView(RetrieveAPIView):
	# permissions = ['_custom_view_detail_group']
	queryset = Group.objects.all()
	serializer_class = CGroupBaseSerializer


class CreateView(CreateAPIView):
	# permissions = ['_custom_create_group']
	queryset = Group.objects.all()
	serializer_class = CGroupBaseSerializer


class UpdateView(RetrieveUpdateAPIView):
	# permissions = ['_custom_edit_group']
	queryset = Group.objects.all()
	serializer_class = CGroupBaseSerializer


class DeleteView(DestroyAPIView):
	# permissions = ['_custom_delete_group']
	queryset = Group.objects.all()
	serializer_class = CGroupBaseSerializer

	def get_object(self, pk):
		pk = [int(pk)] if pk.isdigit() else map(lambda x: int(x), pk.split(','))
		result = Group.objects.filter(pk__in=pk)
		if result.count():
			return result
		raise Http404

	def delete(self, request, pk, format=None):
		object = self.get_object(pk)
		object.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)
