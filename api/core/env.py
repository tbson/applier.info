APP_NAME = 'DCMS'
PROTOCOL = 'http'
DOMAIN = 'dcms.dev'
ALLOWED_HOSTS = [DOMAIN, '127.0.0.1']
TIME_ZONE = 'Asia/Saigon'
EMAIL_ENABLE = True
ENV = 'LOCAL'  # 'LOCAL, PROD'

DATABASES = {
	'default': {
		'ENGINE': 'django.db.backends.postgresql',
		'NAME': 'dcms',
		'USER': 'tbson',
		'PASSWORD': 'Ronin!!*$1210',
		'HOST': '127.0.0.1',
		'PORT': '5432',
		'TEST': {
			'NAME': 'dcms_test',
		},
	},
}

FIRST_USER_USERNAME = 'admin'
FIRST_USER_PASSWORD = 'admin'
TEST_ADMIN = {
	'username': 'tbson',
	'email': 'tbson87@gmail.com',
	'password': '123456',
	'first_name': 'Son',
	'last_name': 'Tran'
}

EMAIL_FROM = '"Xivila Info"<info@xivila.com>'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587  # 587 - 465 for SSL
EMAIL_HOST_USER = 'info@xivila.com'
EMAIL_HOST_PASSWORD = 'Xivila!@#456'
EMAIL_USE_TLS = True