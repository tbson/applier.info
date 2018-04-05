import uuid
import os
from PIL import Image
from django.db import models
from utils.helpers.tools import Tools
from category.models import Category

def image_destination(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4(), ext)
    return os.path.join('banner', filename)

# Create your models here.
class Banner(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    uid = models.CharField(max_length=256)
    title = models.CharField(max_length=256)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to=image_destination)

    def save(self):

        if not self.id and not self.image:
            return

        super(Banner, self).save()

        size = (1600, 800)
        thumbnailSize = (300, 300)
        Tools.scaleImage(size, self.image.path)
        Tools.createThumbnail(thumbnailSize, self.image.path)

    def delete(self, *args, **kwargs):
        if os.path.isfile(self.image.path):
            thumbnail = Tools.getThumbnail(self.image.path)
            os.remove(self.image.path)
            if os.path.isfile(thumbnail):
                os.remove(thumbnail)
        super(Banner, self).delete(*args,**kwargs)

    class Meta:
        db_table = "banners"
        ordering = ['-id']
        permissions = (
            ("view_banner_list", "Can view banner list"),
            ("view_banner_detail", "Can view banner detail"),
        )
