修改 config.php，路徑 File Path

1. Portainer
   
   Volumns > edms_marche_app_data > Mount point 就係 app_data 喺 Ubuntu 上的 file path，可以直接喺 Ubuntu 做 edit：
   
   ```bash
   sudo nano /var/lib/docker/volumes/edms_marche_app_data/_data/config/config.php
   ```

2. 也可以 Login Container app-server
   
   喺個 VM（App Server）內 edit：
   
   ```bash
   docker exec -it app-server bash    # login a container
   cd config
   nano config.php
   ```
   
   如果 nano 唔 work，要先行安裝：
   
   ```bash
   apt update
   apt install nano
   ```

3. [如何增添 Trusted Domains](https://help.nextcloud.com/t/howto-add-a-new-trusted-domain/26)
   
   修改一下 config.php，如下：
   
   ```bash
   'trusted_domains' =>
   array (
     0 => '192.168.0.29',
   ),
   ```
   
   modified as:
   
   ```bash
   'trusted_domains' =>
   array (
     0 => 'app-server',
     1 => 'nginx-servr',
     2 => 'onlyoffice-server',
     3 => 'edms.marche',
     4 => 'edms.marche.com.hk',
   ),
   ```

4. DNS/ Host Names
   
   我隻 Firewall 係 ``Endian`` ，加一個 Host Name：
   
   * Modify Endian, Endian > Network > Edit host > Add a Host
   
   ```text
   Host IP address: 192.168.1.30
   Hostname: edms
   Domain name: marche
   ```
   
   即係 edms.marche = 192.168.1.30
   
   * 記得 LAN PCs 都要改 Network DNS record 如下：
   
   ```text
   add 192.168.1.1 and move it to the Top, looks like
   
   192.168.1.1
   8.8.8.8
   8.8.4.4
   ```
   
   * Verify from Command Prompt
   
   ```text
   ping edms.marche
   returns 192.168.1.30
   ```

To access edms:

內網：http://edms.marche/
外網：http://edms.marche.com.hk

<mark>補充：</mark>
如果你隻 Firewall 支持 <mark>Service-NAT</mark>，你可以加個 S-NAT Rule 去 loopback 內網嘅 web request，又叫 [hairpinning](https://www.cnblogs.com/dream397/p/14522392.html)（你可以去 Google 一下），咁你就唔使設定 edms.marche 而係內網同埋外網都係用 <mark>edms.marche.com.hk</mark>，當內網有人 request edms.marche.com.hk S-NAT 就會出手將個 response 正確咁 route 俾 LAN 嘅 IP。
