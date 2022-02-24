### NextCloud 要安裝呢幾個 plugins：

1. Full Text Search
2. Full Text Search - ElasticSearch Platform
3. Full Text Search - Files
4. Full Text Search - Tessera (optinal)

第 4 隻係 OCR，可以唔裝

### Reindex Intervals

隻 Ubuntu 嘅 Cron Job 要設定： [*“At every 5th minute.”*](https://crontab.guru/#*/5_*_*_*_*) 做一下 re-index，command 如下：

```bash
crontab -l
crontab -e
*/5 * * * * docker exec -u www-data app-server php occ fulltextsearch:index
```

### OCC commands to remember (需要登入 app-server):

```bash
./occ fulltextsearch:check        # 測試 NextCloud/ElasticSearch 設定
./occ fulltextsearch:reset        # 清空 ElasticSearch index
./occ fulltextsearch:index        # index the NextCloud files
```

### 測試 FullTextSearch 是否正常運作

如果 `fulltextsearch:index` 順利完成，NextCloud database 嘅 table ``oc_appconfig`` 內 fields，

```text
appid: fulltextsearch
configkey: provider_indexed
```

嘅 configvalue 會係咁：

```text
appid             configkey            configvalue
fulltextsearch    provider_indexed     {"files":"1"}
```

如果 index 期間有 error 中斷咗就會唔同，咁亦會影響 full text search 個 UI，因為 NextCloud 會誤以為冇 full text search 功能。

### memory_limit 參數

我試過新增一個 user，然後發覺 full text search 失效，查 log file 發現有個古怪嘅 error

```bash
Allowed memory size 999999999 exhausted
```

呢個係 php error，Google 搵倒嘅解決方法

```bash
docker exec --user www-data app-server php -d memory_limit=512M occ fulltextsearch:index
```

我其實改咗 ini 俾咗 2GB RAM php 用，由 512M 增至 1G，再增至 2G，個 error 依然出現，index 咗好耐，一樣有同一個 error，淨係個 memory size 唔同。

```bash
PHP Fatal error:  Allowed memory size of 536870912 bytes exhausted (tried to allocate 107108624 bytes) in /var/www/html/custom_apps/fulltextsearch_elasticsearch/vendor/elasticsearch/elasticsearch/src/Elasticsearch/Connections/Connection.php on line 608
```

例子：淨係 index 一個 user Billy

```bash
./occ fulltextsearch:index "{\"user\": \"billy\"}"
```

快啲慳啲時間，不過一樣有同一 error，最後，狂增至 8G，過咗一晚，第二日發覺部機 reboot 咗（原因係 Windows 10 半夜自己做 windows update），冇哂畫面，check user Full Text Search，居然有料到，好似搞掂咗。
我再改 ``/usr/local/etc/php/conf.d/nextcloud.ini`` 再試，結論係用：

```bash
memory_limit=8G
```
