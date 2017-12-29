from django.http import Http404
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    RetrieveUpdateAPIView,
    RetrieveDestroyAPIView,
)
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Administrator
from .serializers import (
    AdministratorBaseSerializer,
    AdministratorCreateSerializer,
    AdministratorUpdateSerializer,
)
from utils.common_classes.custom_permission import CustomPermission
from django.contrib.auth.hashers import make_password
from django.utils import timezone
from django.conf import settings
from utils.helpers.res_tools import getToken
from utils.helpers.tools import Tools


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


class ResetPasswordView(APIView):
    authentication_classes = ()
    permission_classes = (AllowAny,)

    def get_object(self, queryStr, type="username"):
        try:
            if type == "username":
                return Administrator.objects.get(user__username=queryStr)
            elif type == "reset_password_token":
                return Administrator.objects.get(reset_password_token=queryStr)
            elif type == "change_password_token":
                return Administrator.objects.get(change_password_token=queryStr)
            else:
                raise Http404
        except Administrator.DoesNotExist:
            raise Http404

    # Reset password confirm
    def get(self, request, format=None):
        token = self.request.GET.get("token", "")
        item = self.get_object(token, "reset_password_token")
        user = item.user
        if item.reset_password_token == "":
            raise Http404
        user.password = item.reset_password_tmp
        item.reset_password_tmp = ""
        item.reset_password_token = ""
        item.reset_password_created = None
        user.save()
        item.save()
        return Response(user.email)

    # Reset password
    def post(self, request, format=None):
        params = self.request.data
        item = self.get_object(params["username"])
        user = item.user

        token = Tools.getUuid()

        item.reset_password_token = token
        item.reset_password_tmp = make_password(params["password"])
        item.reset_password_created = timezone.now()
        item.save()
        
        url = settings.BASE_URL + "admin/reset-password/" + str(token)
        subject = "Rest set password for %s %s" % (user.first_name, user.last_name)
        body = "Reset password confirm link: %s" % (url)
        to = user.email
        
        Tools.sendEmail(subject, body, to)
        return Response(user.email)

