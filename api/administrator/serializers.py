from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import SerializerMethodField
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from django.contrib.auth.models import Group
from .models import Administrator


class AdministratorBaseSerializer(ModelSerializer):

    class Meta:
        model = Administrator
        fields = [
            'id',
            'username',
            'user_id',
            'email',
            'first_name',
            'last_name',
            'fullname',
            'groups',
            'fingerprint',
        ]

    username = serializers.CharField(
        source='user.username',
    )
    email = serializers.EmailField(
        source='user.email',
    )

    first_name = serializers.CharField(
        source='user.first_name'
    )
    last_name = serializers.CharField(
        source='user.last_name'
    )

    fullname = SerializerMethodField()
    groups = SerializerMethodField()

    def get_fullname(self, obj):
        return obj.user.first_name + ' ' + obj.user.last_name

    def get_groups(self, obj):
        result = [];
        for group in obj.user.groups.all():
            result.append(str(group.id))
        return ','.join(result)


class AdministratorCreateSerializer(ModelSerializer):

    username = serializers.CharField(
        source='user.username',
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    email = serializers.EmailField(
        source='user.email',
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(
        source='user.password',
        allow_blank=True,
        style={'input_type': 'password'}
    )
    first_name = serializers.CharField(
        source='user.first_name'
    )
    last_name = serializers.CharField(
        source='user.last_name'
    )

    fullname = SerializerMethodField()

    def get_fullname(self, obj):
        return obj.user.first_name + ' ' + obj.user.last_name

    class Meta:
        model = Administrator
        fields = [
            'id',
            'username',
            'email',
            'password',
            'first_name',
            'last_name',
            'fullname',
        ]
        read_only_fields = ('id', 'fullname')

    def create(self, validated_data):
        groups = []
        for group in self.initial_data['groups'].split(','):
            if group.isdigit():
                groups.append(int(group))
        data = validated_data['user']
        user = User.objects.create_superuser(
            data.get('username', ''),
            data.get('email', ''),
            data.get('password', ''),
            first_name=data.get('first_name', ''),
            last_name=data.get('last_name', '')
        )

        if len(list(groups)):
            groupList = Group.objects.filter(id__in=groups)
            for group in groupList:
                group.user_set.add(user)

        return Administrator.objects.create(user=user)


class AdministratorUpdateSerializer(ModelSerializer):

    username = serializers.CharField(
        source='user.username'
    )
    email = serializers.EmailField(
        source='user.email'
    )
    """
    password = serializers.CharField(
        source='user.password',
        required=False,
        style={'input_type': 'password'}
    )
    """
    first_name = serializers.CharField(
        source='user.first_name'
    )
    last_name = serializers.CharField(
        source='user.last_name'
    )

    fullname = SerializerMethodField()

    def get_fullname(self, obj):
        return obj.user.first_name + ' ' + obj.user.last_name

    class Meta:
        model = Administrator
        fields = [
            'id',
            'username',
            'email',
            # 'password',
            'first_name',
            'last_name',
            'fullname',
        ]
        read_only_fields = ('id', 'fullname')

    def update(self, instance, validated_data):
        groups = []
        for group in self.initial_data['groups'].split(','):
            if group.isdigit():
                groups.append(int(group))
        user = instance.user
        data = validated_data.get('user', {})

        # Check duplicate username
        try:
            if data.get('username', None):
                User.objects.exclude(pk=user.pk).get(username=data.get('username'))
                raise serializers.ValidationError({'username': ['Duplicate username']})
        except User.DoesNotExist:
            pass

        # Check duplicate email
        try:
            if data.get('email', None):
                User.objects.exclude(pk=user.pk).get(email=data.get('email'))
                raise serializers.ValidationError({'email': ['Duplicate email']})
        except User.DoesNotExist:
            pass

        """
        # No password update here
        if data.get('password', None):
            user.set_password(data.get('password'))
        """

        user.username = user.username if not data.get('username', None) else data['username']
        user.email = user.email if not data.get('email', None) else data['email']
        user.first_name = user.first_name if not data.get('first_name', None) else data['first_name']
        user.last_name = user.last_name if not data.get('last_name', None) else data['last_name']
        user.save()

        for group in user.groups.all():
            group.user_set.remove(user)

        if len(list(groups)):
            groupList = Group.objects.filter(id__in=groups)
            for group in groupList:
                group.user_set.add(user)

        instance.user = user
        return instance

