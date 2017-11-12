from django.http import Http404
from rest_framework.generics import (
	ListAPIView,
	RetrieveAPIView,
	RetrieveUpdateAPIView,
	DestroyAPIView,
)
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import Permission
from .serializers import (
	CPermissionBaseSerializer,
)


class ListView(ListAPIView):
	# permissions = ['_custom_view_list_permission']
	queryset = Permission.objects.filter(codename__startswith='_custom')
	serializer_class = CPermissionBaseSerializer
	pagination_class = None
	search_fields = ['codename', 'name']


class DetailView(RetrieveAPIView):
	# permissions = ['_custom_view_detail_permission']
	queryset = Permission.objects.filter(codename__startswith='_custom')
	serializer_class = CPermissionBaseSerializer


class UpdateView(RetrieveUpdateAPIView):
	# permissions = ['_custom_edit_permission']
	queryset = Permission.objects.filter(codename__startswith='_custom')
	serializer_class = CPermissionBaseSerializer


class DeleteView(DestroyAPIView):
	# permissions = ['_custom_delete_permission']
	queryset = Permission.objects.filter(codename__startswith='_custom')
	serializer_class = CPermissionBaseSerializer

	def get_object(self, pk):
		pk = [int(pk)] if pk.isdigit() else map(lambda x: int(x), pk.split(','))
		result = Permission.objects.filter(pk__in=pk)
		if result.count():
			return result
		raise Http404

	def delete(self, request, pk, format=None):
		object = self.get_object(pk)
		object.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)
