# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-06-27 10:29
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Config',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uid', models.CharField(max_length=60, unique=True)),
                ('value', models.CharField(max_length=250)),
            ],
            options={
                'db_table': 'configs',
                'ordering': ['-id'],
            },
        ),
    ]
