from rest_framework.serializers import ModelSerializer
from .models import Banner


class BannerBaseSerializer(ModelSerializer):

    class Meta:
        model = Banner
        fields = [
            'id',
            'uid',
            'value'
        ]
        read_only_fields = ('id',)
