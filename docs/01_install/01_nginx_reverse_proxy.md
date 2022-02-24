### [nginx-reverse-proxy](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/)

裝一隻獨立嘅 nginx VM 做 [revese proxy](https://www.cloudflare.com/learning/cdn/glossary/reverse-proxy/)，用嚟準備日後一個 Static IP 指去 multiple servers，目前得一隻 server (Edms Marche)，將來會多幾隻，例如：Web App﹑Mobile App﹑API﹑WebDAV﹑REST﹑GraphQL﹑SSL，又或者整多一套俾另一間公司。

### 教學短片：

#### 1. nginx reverse proxy（上）

 [![nginx reverse proxy（上）](https://img.youtube.com/vi/BHvDrI0AnxQ/0.jpg)](https://www.youtube.com/watch?v=BHvDrI0AnxQ)

#### 2. nginx reverse proxy（下）

 [![nginx reverse proxy（下）](https://img.youtube.com/vi/HciLLGQU1g4/0.jpg)](https://www.youtube.com/watch?v=HciLLGQU1g4)

### Installation：

#### 1. Install & Setup Nginx

```bash
sudo apt update

sudo apt install nginx

# 設定隻 firewall ufw
sudo ufw status
sudo ufw enable

sudo ufw app list
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'

sudo ufw delete allow 'Nginx HTTP'

systemctl status nginx    # show 隻 nginx 狀況
```

#### 2. Install LetsEncrypt

```bash
sudo apt install certbot python3-certbot-nginx    # 安裝 python 版 certbot

sudo certbot --nginx certonly --standalone -d edms.marche.com.hk    # request a SSL

certbot renew --dry-run    # cretificates renewal test
```

#### 3. 設定 HTTP conf

```nginx
server {
    listen 80;
    listen [::]:80;

    server_name edms.marche.com.hk;

    location / {
        proxy_pass http://192.168.1.30;     # eDMS server IP#
    }
}
```

#### 4. 如果會用 SSL，設定 HTTPS conf

```nginx
## Handle http:// connections 將所有 http 轉為 https
server  {
    listen          80;
    server_name     edms.marche.com.hk;

    return 301 https://$server_name$request_uri;
}

## Handle https:// connections
server  {
    listen          443 ssl;
    server_name     edms.marche.com.hk;

    #access_log     /var/log/nginx/edms.marche.access.log;
    #error_log      /var/log/nginx/edms.marche.error.log debug;

    ##
    # SSL Settings
    ##
    # ssl            on;

    # Set cert locations
    ssl_certificate             /etc/letsencrypt/live/edms.marche.com.hk/fullchain.pem;
    ssl_certificate_key         /etc/letsencrypt/live/edms.marche.com.hk/privkey.pem;

    ssl_session_cache           shared:SSL:10m;
    ssl_session_timeout         10m;
    ssl_protocols               SSLv3 TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers                 RC4:HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers   on;

    keepalive_timeout           60;

    location / {
        ##
        # Proxy settings
        ##

        proxy_pass          http://192.168.1.30;

        # Convert all inbound request into http:// request to upstream server
        proxy_redirect      http:// $scheme://;

        proxy_set_header    Accept-Encoding "";
        proxy_set_header    Host $host;
        proxy_set_header    X-Real-IP $remote_addr;
        proxy_set_header    X-Forwarded-For $remote_addr;
        proxy_set_header    X-Forwarded-Proto $scheme;

        add_header          Front-End-Https         on;

        proxy_max_temp_file_size        0;
        proxy_connect_timeout           3600;
        proxy_send_timeout              3600;
        proxy_read_timeout              3600;
        send_timeout                    36000;

        proxy_buffer_size               4k;
        proxy_buffers                   4 32k;
        proxy_busy_buffers_size         64k;
        proxy_temp_file_write_size  64k;

        client_max_body_size        2048m;
        client_body_buffer_size         2048k;

        ##
        # Filter response settings
        ##

        # Filter all response content with http://jb5.yorkprint.com.hk into https://jb5.yorkprintt.com.hk
        sub_filter      http://edms.marche.com.hk/      https://edms.marche.com.hk/;
        sub_filter      http://192.168.1.30/            https://edms.marche.com.hk/;

        # Filter not only response type text/html but also text/css and text/xml
        sub_filter_types    text/css text/xml;

        # Filter all response
        sub_filter_once    off;
    }
}
```
