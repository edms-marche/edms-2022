# File Agent

借鏡 [demo-webapp-vuetify-i18n](https://medium.com/@hoangtuan151/a-scalable-vue2-pwa-boilerplate-with-vuetify-vue-i18n-966c42ad6048)，成隻 app 最後用 [@vue/cli-plugin-pwa](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa) 改成 PWA

Device Id 用咗 [fingerprintjs2](https://github.com/Valve/fingerprintjs2)，每個 browser 都有個 fingerprint。

Error Logging 用 [vuejs-logger](https://openbase.io/js/vuejs-logger)，代替 window.console.log，避免 eslint no-console 麻煩

收到 FCM 用 [vue-notification](https://github.com/euvl/vue-notification) 嚟顯示

Firebase data:

```bash
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCA0X5oGhPZPKLo-1c8lnilI7esk2y_NbU",
    authDomain: "file-agent.firebaseapp.com",
    databaseURL: "https://file-agent.firebaseio.com",
    projectId: "file-agent",
    storageBucket: "file-agent.appspot.com",
    messagingSenderId: "772018130355",
    appId: "1:772018130355:web:22e514161e30434a0bcfc6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
</script>
```

## Project setup

```
npm install
```

如果你部機未安裝 npm or node，去[官網](https://nodejs.org/en/)下載，我用嘅版本係 14.16.0 LTS，記得安裝嘅時候勾選埋 Tools，因為如果為咗慳啲 storage 你自己個別去安裝會幾麻煩嘅，俾個 installer 幫你一手一腳就係最佳選擇。

睇下，安裝咗幾多嘢！

```bash
 The upgrade of visualstudio2017-workload-vctools was successful.
  Software install location not explicitly set, could be in package or
  default install location if installer.

Chocolatey upgraded 17/17 packages.
 See the log for details (C:\ProgramData\chocolatey\logs\chocolatey.log).

Upgraded:
 - visualstudio2017buildtools v15.9.34.0
 - python v3.9.4
 - kb2919355 v1.0.20160915
 - kb3033929 v1.0.5
 - kb2999226 v1.0.20181019
 - chocolatey-core.extension v1.3.5.1
 - python3 v3.9.4
 - dotnetfx v4.8.0.20190930
 - chocolatey-visualstudio.extension v1.9.0
 - vcredist2015 v14.0.24215.20170201
 - visualstudio2017-workload-vctools v1.3.3
 - kb2919442 v1.0.20160915
 - visualstudio-installer v2.0.1
 - vcredist140 v14.28.29913
 - chocolatey-dotnetfx.extension v1.0.1
 - kb3035131 v1.0.3
 - chocolatey-windowsupdate.extension v1.0.4
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Ref

node v14.19.0
npm v6.14.16
- https://github.com/intlify/vue-i18n-loader
- https://vuetifyjs.com
- https://alligator.io/vuejs/vuex-persist-state
- https://github.com/safrazik/vue-file-agent
- https://github.com/faisalman/ua-parser-js
- https://github.com/julianshapiro/velocity
- https://github.com/fingerprintjs/fingerprintjs
- https://github.com/axios/axios