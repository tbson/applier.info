from django.db import models
from django.conf import settings


# Create your models here.
class Administrator(models.Model):

	user = models.OneToOneField(
            settings.AUTH_USER_MODEL,
            on_delete=models.CASCADE
    )
	fingerprint = models.CharField(max_length=250, blank=True)

	class Meta:
		db_table = "administrators"
		ordering = ['-id']
		permissions = (
			("_custom_view_list_administrator", "Can view list administrators"),
			("_custom_view_detail_administrator", "Can view detail administrator"),
			("_custom_view_profile_administrator", "Can view profile administrator"),
			("_custom_create_administrator", "Can create administrator"),
			("_custom_edit_administrator", "Can edit administrator"),
			("_custom_delete_administrator", "Can delete administrator"),
		)
