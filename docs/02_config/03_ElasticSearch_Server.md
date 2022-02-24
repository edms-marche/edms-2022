## ElasticSearch Server

- 上載到 ES 的檔案要 index 先可以 search 倒，所以隻 ES 要 preset on: [*“At every 5th minute.”*](https://crontab.guru/#*/5_*_*_*_*) 做一下 re-index

- WiP for: XMP, office documents' properties (係 NextCloud 其中的一隻 Apps [Metadata](https://apps.nextcloud.com/apps/metadata))

- 要安裝 ES 附帶的 content search plugins
  
  ```bash
  ./bin/elasticsearch-plugin install ingest-attachment
  ./bin/elasticsearch-plugin install "https://api.beshu.tech/download/es?versions=7.11.0"
  ```

### [ElasticSearch](https://www.elastic.co/elasticsearch/) or [OpenDistro for ElasticSearch](https://opendistro.github.io/for-elasticsearch/)

* official ElasticSearch docker [guide](https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html)

* remember to set [Virtual Memory setting](https://www.elastic.co/guide/en/elasticsearch/reference/current/vm-max-map-count.html) otherwise the es-server will stop by itself

* install ElasticSearch required plugin (需要登入 es-server):
  
  ```bash
  ./bin/elasticsearch-plugin install --batch ingest-attachment
  ```

* [Maximum map count check](https://www.elastic.co/guide/en/elasticsearch/reference/master/_maximum_map_count_check.html)
  In order for ElasticSearch to run, the following setting must be made on the Docker host:
  
  ```bash
  sysctl -w vm.max_map_count=262144
  ```
  
  or
  
  ```bash
  nano /etc/sysctl.conf                # edit this file
  
  vm.max_map_count=262144              # add this line & save
  
  sysctl -p                            # reload the sysctl file
  
  sudo sysctl -a | grep max_map_count  # to confirm the changes
  
  vm.max_map_count=262144              # the system response
  ```
