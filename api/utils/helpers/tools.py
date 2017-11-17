import sys
from django.core.mail import EmailMultiAlternatives
from django.conf.settings import EVN, EMAIL_FROM, EMAIL_ENABLE


class Tools():

    def __init__(self):
        pass

	@staticmethod
    def returnException(e):
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fileName = exc_tb.tb_frame.f_code.co_filename
        result = str(e) + ' => ' + fileName + ':' + str(exc_tb.tb_lineno)
        if ENV == 'LOCAL':
            print(result['error'])
		return result

	@staticmethod
    def send_email(subject, body, to):
        try:
            if EMAIL_ENABLE is not True:
                return
            if type(to) is not list:
                to = [str(to)]
            email = EmailMultiAlternatives(
                subject,
                body,
                EMAIL_FROM,
                to
            )
            email.content_subtype = "html"
            email.attach_alternative(body, "text/html")
            email.send()
        except Exception as e:
            error = Tools.returnException(e)
            return error
