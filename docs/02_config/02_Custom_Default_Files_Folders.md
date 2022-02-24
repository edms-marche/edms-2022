### 取消 NextCloud 送嘅 default files & folders

加呢句喺 config.php 入面：

```bash
'skeletondirectory' => '',
```

eDMS 唔使用呢啲嘢，所以一於取消，如果想要有共享嘅檔案同檔案夾我會改用 [Group Folders](https://apps.nextcloud.com/apps/groupfolders#:~:text=Folders%20can%20be%20configured%20from,folders%20is%20currently%20not%20supported.)，更加方便合理。



### 增減新 User 嘅 default files & folders

去改 ``/core/skeleton`` 內的 files & folders
