from django.db import models


# Create your models here.
class Config(models.Model):
	uid = models.CharField(max_length=60, unique=True)
	value = models.CharField(max_length=250)

	class Meta:
		db_table = "configs"
		ordering = ['-id']
		permissions = (
			("_custom_view_list_config", "Can view list configs"),
			("_custom_view_detail_config", "Can view detail config"),
			("_custom_create_config", "Can create config"),
			("_custom_edit_config", "Can edit config"),
			("_custom_delete_config", "Can delete config"),
		)
