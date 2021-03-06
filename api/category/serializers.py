from rest_framework.serializers import ModelSerializer
from django.utils.text import slugify
from .models import Category


class CategoryBaseSerializer(ModelSerializer):

    class Meta:
        model = Category
        fields = (
            'id',
            'uid',
            'title',
            'type',
            'single',
        )
        extra_kwargs = {'uid': {'required': False}}
        read_only_fields = ('id',)

    def create(self, validated_data):
        validated_data['uid'] = slugify(validated_data['title']);
        category = Category(**validated_data)
        category.save()
        return category
