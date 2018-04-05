import os
import sys
import uuid
from PIL import Image
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
    def getUuid ():
        return uuid.uuid4()

    @staticmethod
    def getThumbnail (path):
        pathArr = path.split('.')
        pathArr.insert(-1, 'thumb')
        return '.'.join(pathArr)

    @staticmethod
    def scaleImage (size, path):
        maxWidth = size[0]
        maxHeight = size[1]

        image = Image.open(path)
        (width, height) = image.size

        widthFactor = maxWidth / width
        heightFactor = maxHeight / height
        if widthFactor < 1 or heightFactor < 1:
            if (widthFactor < heightFactor):
                size = ( int(width * widthFactor), int(height * widthFactor))
            else:
                size = ( int(width * heightFactor), int(height * heightFactor))
            image = image.resize(size, Image.ANTIALIAS)
            image.save(path)
        else:
            image.close()

    @staticmethod
    def createThumbnail (size, path):
        image = Image.open(path)
        image.thumbnail(size, Image.ANTIALIAS)
        image.save(Tools.getThumbnail(path))

    @staticmethod
    def sendEmail (subject, body, to):
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
