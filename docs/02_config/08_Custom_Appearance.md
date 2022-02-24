### Customize eDMS Look

參考 [NextCloud Doc](https://docs.nextcloud.com/server/stable/admin_manual/configuration_server/theming.html?highlight=login%20image) 改變一下 eDMS 個 look ``Settings > Theming``：

- Name
- Web Address
- Slogan
- Logo - 通常最重要係揀隻合適嘅 logo

### 安裝頭像 (Avata) SVG Library

```bash
docker exec -it app-server bash
apt update    # 因為 docker 全隔離嘅性質，要幫隻 container 更新一下個 package list
apt install vim -y    # linux 最簡單嘅 editor
apt install libmagickcore-6.q16-6-extra    # 頭像 SVG 要用嘅 library

vim ./user.ini
vim /usr/local/etc/php/conf.d/nextcloud.ini
vim ./config/config.php
```


