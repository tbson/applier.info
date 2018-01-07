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
from .models import Config
from .serializers import (
    ConfigBaseSerializer,
)
from utils.common_classes.custom_permission import CustomPermission


class ListView(ListAPIView):
    permissions = ['_custom_view_list_config']
    permission_classes = [CustomPermission]
    queryset = Config.objects.all()
    serializer_class = ConfigBaseSerializer
    search_fields = ['uid', 'value']


class DetailView(RetrieveAPIView):
    permissions = ['_custom_view_detail_config']
    permission_classes = [CustomPermission]
    queryset = Config.objects.all()
    serializer_class = ConfigBaseSerializer


class CreateView(CreateAPIView):
    permissions = ['_custom_create_config']
    permission_classes = [CustomPermission]
    queryset = Config.objects.all()
    serializer_class = ConfigBaseSerializer


class UpdateView(RetrieveUpdateAPIView):
    permissions = ['_custom_edit_config']
    permission_classes = [CustomPermission]
    queryset = Config.objects.all()
    serializer_class = ConfigBaseSerializer


class DeleteView(RetrieveDestroyAPIView):
    permissions = ['_custom_delete_config']
    permission_classes = [CustomPermission]
    queryset = Config.objects.all()
    serializer_class = ConfigBaseSerializer

    def get_object(self, pk):
        pk = [int(pk)] if pk.isdigit() else map(lambda x: int(x), pk.split(','))
        result = Config.objects.filter(pk__in=pk)
        if result.count():
            return result
        raise Http404

    def delete(self, request, pk, format=None):
        object = self.get_object(pk)
        object.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
