import uuid
import os
from PIL import Image
from django.db import models
from utils.helpers.tools import Tools
from article.models import Article

def file_destination(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4(), ext)
    return os.path.join('attach', filename)

# Create your models here.
class Attach(models.Model):
    parent_uuid = models.CharField(max_length=36)
    parent_table = models.CharField(max_length=64)
    title = models.CharField(max_length=256)
    attachment = models.FileField(upload_to=file_destination)

    def save(self, *args, **kwargs):
        if not self.id and not self.attachment:
            return
        if not self.title:
            self.title = self.attachment.path.split("/")[-1]
        if not self._state.adding and self.attachment:
            item = Attach.objects.get(pk=self.pk)
            if item.attachment != self.attachment:
                # Update: remove exist attachment
                Tools.removeFile(item.attachment.path)

        super(Attach, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        remove_file(self.attachment.path)
        super(Attach, self).delete(*args,**kwargs)

    class Meta:
        db_table = "attaches"
        ordering = ['-id']
        permissions = (
            ("view_attach_list", "Can view attach list"),
            ("view_attach_detail", "Can view attach detail"),
        )
