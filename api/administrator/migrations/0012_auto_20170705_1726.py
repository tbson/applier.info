# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-07-05 10:26
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('administrator', '0011_auto_20170705_1718'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='administrator',
            options={'ordering': ['-id'], 'permissions': (('_custom_view_list_administrator', 'Can view list administrators'), ('_custom_view_detail_administrator', 'Can view detail administrator'), ('_custom_view_profile_administrator', 'Can view profile administrator'), ('_custom_create_administrator', 'Can create administrator'), ('_custom_edit_administrator', 'Can edit administrator'), ('_custom_delete_administrator', 'Can delete administrator'))},
        ),
    ]
