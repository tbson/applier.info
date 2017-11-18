import sys
from django.core.mail import EmailMultiAlternatives
from django.conf import settings


class Tools():

	def __init__(self):
		pass

	@staticmethod
	def returnException(e):
		exc_type, exc_obj, exc_tb = sys.exc_info()
		fileName = exc_tb.tb_frame.f_code.co_filename
		result = str(e) + ' => ' + fileName + ':' + str(exc_tb.tb_lineno)
		if settings.ENV == 'LOCAL':
			print(result)
		return result

	@staticmethod
	def sendEmail(subject, body, to):
		try:
			if settings.EMAIL_ENABLE is not True:
				return
			if type(to) is not list:
				to = [str(to)]
			email = EmailMultiAlternatives(
				subject,
				body,
				settings.DEFAULT_FROM_EMAIL,
				to
			)
			email.content_subtype = "html"
			email.attach_alternative(body, "text/html")
			email.send()
		except Exception as e:
			print(e);
			error = Tools.returnException(e)
