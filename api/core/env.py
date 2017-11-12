APP_NAME = 'DCMS'
PROTOCOL = 'http'
DOMAIN = 'dcms.dev'

ALLOWED_HOSTS = [DOMAIN, '127.0.0.1']

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

TIME_ZONE = 'Asia/Saigon'

ALLOW_CHARS = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ0123456789'
PAGE_SIZE = 25
MAX_UPLOAD_SIZE = 3145728
MAX_IMAGE_SIZE = 1680
GOLDEN_RATIO = 1.618

ERROR_CODES = {
	'OK': 200,
	'BAD_REQUEST': 400,
	'UNAUTHORIZED': 401,
	'FORBIDDEN': 403,
	'NOT_FOUND': 404,
	'METHOD_NOT_ALLOWED': 405,
	'INTERNAL_SERVER_ERROR': 500,
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
