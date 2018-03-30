from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import Group


class CGroupBaseSerializer(ModelSerializer):

    class Meta:
        model = Group
        fields = [
            'id',
            'name'
        ]
        read_only_fields = ('id',)
