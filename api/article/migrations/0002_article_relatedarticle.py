# Generated by Django 2.0 on 2018-04-07 22:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('article', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='relatedArticle',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='relatedArticles', to='article.Article'),
        ),
    ]