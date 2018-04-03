from PIL import Image
from django.db import models
from category.models import Category


# Create your models here.
class Banner(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    uid = models.CharField(max_length=256)
    title = models.CharField(max_length=256)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='category/')

    def save(self):

        if not self.id and not self.image:
            return

        super(Banner, self).save()

        maxWidth = 1600
        maxHeight = 800

        image = Image.open(self.image)
        (width, height) = image.size

        widthFactor = maxWidth / width
        heightFactor = maxHeight / height

        if widthFactor < 1 or heightFactor < 1:
            if (widthFactor < heightFactor):
                size = ( width / widthFactor, height / widthFactor)
            else:
                size = ( width / heightFactor, height / heightFactor)

            image.resize(size, Image.ANTIALIAS)
            image.save(self.image.path)

    class Meta:
        db_table = "banners"
        ordering = ['-id']
        permissions = (
            ("view_banner_list", "Can view banner list"),
            ("view_banner_detail", "Can view banner detail"),
        )
