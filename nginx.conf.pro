server {
    listen 443;
    server_name my.domain;
    charset utf-8;
    root /resource/public/applier;
    index index.html;

    ssl on;
    # ssl_certificate /resource/ssl/applier/cer.crt;
    # ssl_certificate_key /resource/ssl/applier/rsa.key;

    ssl_certificate /resource/ssl/applier/fullchain.pem;
    ssl_certificate_key /resource/ssl/applier/privkey.pem;

    location / {
        proxy_pass https://applier_api:8001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /public {
        try_files $uri $uri/ /index.html;
        rewrite ^/public(/.*)$ $1 break;
        add_header Access-Control-Allow-Origin *;
    }

    location /admin {
        root /resource/public/applier/clients;
        try_files $uri $uri/ /admin/index.html =404;
        add_header Access-Control-Allow-Origin *;
    }
    location /user {
        root /resource/public/applier/clients;
        try_files $uri $uri/ /user/index.html =404;
        add_header Access-Control-Allow-Origin *;
    }
}
