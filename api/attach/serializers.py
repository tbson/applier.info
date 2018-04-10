from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import SerializerMethodField
from django.utils.text import slugify
from .models import Attach
from category.models import Category


class AttachBaseSerializer(ModelSerializer):

    class Meta:
        model = Attach
        exclude = ()
        read_only_fields = ('id',)
        extra_kwargs = {
            'title': {'required': False},
        }

