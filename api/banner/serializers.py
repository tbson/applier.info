from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import SerializerMethodField
from django.utils.text import slugify
from .models import Banner


class BannerBaseSerializer(ModelSerializer):

    class Meta:
        model = Banner
        fields = (
            'id',
            'category',
            'category_title',
            'title',
            'description',
            'image',
        )
        read_only_fields = ('id',)

    category_title = SerializerMethodField()

    def get_category_title(self, obj):
        return obj.category.title

    def create(self, validated_data):
        validated_data['uid'] = slugify(validated_data['title']);
        banner = Banner(**validated_data)
        banner.save()
        return banner
