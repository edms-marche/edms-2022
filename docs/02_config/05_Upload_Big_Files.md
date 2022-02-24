### [官方說明 Upload Big Files](https://docs.nextcloud.com/server/latest/admin_manual/configuration_files/big_file_upload_configuration.html)

修改喺 app-server 之內嘅檔案：

```text
/usr/local/etc/php/conf.d/nextcloud.ini
```

改為：

```ini
#memory_limit=${PHP_MEMORY_LIMIT}
#upload_max_filesize=${PHP_UPLOAD_LIMIT}
#post_max_size=${PHP_UPLOAD_LIMIT}
memory_limit=8G
upload_max_filesize=2048M
post_max_size=2048M
max_input_time=3600
max_execution_time=3600
```

除咗官方嘅說明，如果你用 nginx reverse proxy 就要改埋隻 conf 檔案：

```bash
client_max_body_size            2048m;    # 2GB 其實 1GB 已經好合理
client_body_buffer_size         2048k;    # 2GB
```
