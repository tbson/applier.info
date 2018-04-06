from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import SerializerMethodField
from django.utils.text import slugify
from .models import Banner
from category.models import Category


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


class BannerCreateSerializer(BannerBaseSerializer):

    def create(self, validated_data):
        category = validated_data['category']
        if category.single is True:
            if Banner.objects.filter(category_id=category.id).count() >= 1:
                raise serializers.ValidationError({'detail': 'Can not add more item.'})
        validated_data['uid'] = slugify(validated_data['title'])
        banner = Banner(**validated_data)
        banner.save()
        return banner


class BannerUpdateSerializer(BannerBaseSerializer):

    class Meta(BannerBaseSerializer.Meta):
        extra_kwargs = {'image': {'required': False}}

