import uuid
import os
from PIL import Image
from django.db import models
from utils.helpers.tools import Tools
from category.models import Category

def image_destination(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4(), ext)
    return os.path.join('article', filename)

def remove_file(path):
    if os.path.isfile(path):
        thumbnail = Tools.getThumbnail(path)
        os.remove(path)
        if os.path.isfile(thumbnail):
            os.remove(thumbnail)

# Create your models here.
class Article(models.Model):
    category = models.ForeignKey(Category, related_name="articles", on_delete=models.CASCADE)
    uid = models.CharField(max_length=256)
    title = models.CharField(max_length=256)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to=image_destination)
    content = models.TextField(blank=True)

    def save(self):

        if not self.id and not self.image:
            return

        if not self._state.adding and self.image:
            # Update: remove exist image
            image = Article.objects.get(pk=self.pk).image
            remove_file(image.path)

        super(Article, self).save()
        width = 1200;
        thumbnailWidth = 300
        Tools.scaleImage(width, self.image.path)
        Tools.createThumbnail(thumbnailWidth, self.image.path)

    def delete(self, *args, **kwargs):
        remove_file(self.image.path)
        super(Article, self).delete(*args,**kwargs)

    class Meta:
        db_table = "articles"
        ordering = ['-id']
        permissions = (
            ("view_article_list", "Can view article list"),
            ("view_article_detail", "Can view article detail"),
        )
