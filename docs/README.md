<p align="center"><img src="./images/logo_125x86.png" title="Marche Logo" /></p>

<p align="center" style="text-align:center;font-size:20pt;font-weight:bold;">eDMS</p>

先睇結構圖:

<p align="center"><img src="./images/edms_structure.png" title="Marche Logo" /></p>

------

2022.02.15 paulus: 改用 Proxmox 代替 ESXi

------

個底層係隻 DELL C6100 其中 1 隻 Node，有 64 GB RAM 任用，目前分配：16GB 俾 Win10，32GB 俾 Docker，Storage 暫時 Docker 用 Synology 得 1TB，隻 Win10 用咗 local 200GB 嘅 SSD，可以快啲爽啲。

- Portainer
  用嚟 mon 住隻 docker
- nginx
  用嚟做 reverse proxy，保住其他 containers，唔好咁易俾人撞到啲 servers
- Let's Encrypt
  用嚟做 SSL Certification，如果用到 SSL 就唔使年年俾 SSL 牌照錢
- Postgres
  又叫 PostgreSQL，係 database，裝住 NextCloud 所有 data，可以改用 MySQL，不過 postgres 係首選
- NextCloud
  係主角，開源 dms
- ElasticSearch
  係男二，負責做 content search，allocate 咗 16GB RAM 俾佢用（係隻 docker 嘅一半 memory，可知佢幾重要）

如果全部都用 VM 就會比較麻煩，裝機都裝到手軟，而且`第一輪注定要推倒重來`，用 Docker 加 docker-compose 可以快捷好多。仲欠幾隻 VM，遲啲先出場，到時再介紹。
