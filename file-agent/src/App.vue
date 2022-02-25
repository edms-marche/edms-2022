<template>
    <div id="app-root" v-cloak>
        <keep-alive exclude="">
            <router-view :key="$route.fullPath" />
        </keep-alive>
        <notifications group="custom-template"
            :duration="5000"
            animation-name="v-fade-left"
            width= "100%"
            position="top left">
            <template slot="body" slot-scope="props">
                <div class="custom-template">
                <div class="custom-template-icon">
                    <v-icon large>mdi-cloud-upload</v-icon>
                </div>
                <div class="custom-template-content">
                    <div class="custom-template-title">
                    {{props.item.title}}
                    </div>
                    <div class="custom-template-text"
                        v-html="props.item.text"></div>
                </div>
                <div class="custom-template-close"
                    @click="props.close">
                    <v-icon medium>mdi-close</v-icon>
                </div>
                </div>
            </template>
        </notifications>
    </div>
</template>

<script>
import { initializeFirebase } from '@/utils/firebase'
import firebase from 'firebase/app';
import 'firebase/messaging';
import 'firebase/functions';
import uaHelper from '@/utils/uaHelper';

export default {
    name: 'App',

    data: () => ({
        darkMode: JSON.parse(localStorage.getItem('darkMode')) === true,
    }),

    created() {
        window.getApp = this;

        /**
         * native notification 唔 work，改用 vue-notification
         */
        window.getApp.$on('showNotification', (payload) => {
            window.console.log("showNotification：", payload);

            this.$notify({
                group: 'custom-template',
                title: payload.data.title,
                text: payload.data.body,
                type: 'success',
                duration: -1,
                position: 'top left'
            });
        })


        /**
         * 轉換 light or dark theme，用 cookie 記住目前嘅選擇
         */
        window.getApp.$on('APP_DARK_THEME_TOGGLED', () => {

            this.darkMode = !this.darkMode;
            localStorage.setItem('darkMode', JSON.stringify(this.darkMode));

            window.console.log("darkMode: ", localStorage.getItem('darkMode'));

            this.$vuetify.theme.dark = this.darkMode;
        })

        /**
         * check 下有冇 notification 嘅 permission，依家冇咩用，日後睇下點
         * firebase 都係叫你用 Notification.permission 去 check
         * 參考：https://juejin.im/post/59ed37f5f265da431e15eaac
         */
        if (Notification.permission === 'granted') {
            console.log('用户允许通知');
        } else if (Notification.permission === 'denied') {
            console.log('用户拒绝通知');
        } else {
            console.log('用户还没选择，去向用户申请权限吧');
        }

        /**
         * init Firebase，問 user 准唔准收 push notifications？
         */
        initializeFirebase();

        const messaging = firebase.messaging();

        // Get Instance ID token. Initially this makes a network call, once retrieved
        // subsequent calls to getToken will return from cache.
        messaging.getToken().then((currentToken) => {
            if (currentToken) {
                // 收到 FCM token，即係有 push notifications permission
                window.console.log('Permisson already granted.');
                window.console.log('FCM Token: ', currentToken) // 3. Receiver Token to use in the notification

                localStorage.setItem('user-fcm-token', currentToken);
                uaHelper.storeUserAgent();
            } else {
                // 冇 FCM token，問 user 攞 permission，然後再去攞 FCM token
                window.console.log('No Instance ID token available. Request permission to generate one.');

                this.askUserPermission();
            }
        }).catch((err) => {
            window.console.log('An error occurred while retrieving token. ', err);
        });

        /**
         * 參考：https://www.sentinelstand.com/article/handling-firebase-notification-messages-in-your-web-app
         * Messages received. Either because the app is running in the foreground, or
         * because the notification was clicked.
         * `payload` will contain your data.
         */
        messaging.onMessage(function(payload) {
            window.console.log('Receiving foreground message', payload);

            // Customize notification here
            // const firebaseUid = '772018130355';
            // if (payload.from !== firebaseUid) {
            var notificationTitle = payload.data.title; //'CometChat Pro Notification';
            var notificationOptions = {
                body: payload.data.body, //.data.alert,
                icon: '/img/favicon-32x32.png', // sender.data.entities.sender.entity.avatar,
                requireInteraction: true
            };
            /** native notification localhost 唔 work 嘅 ，要用 showNotification 代替
            var notification = new Notification(notificationTitle, notificationOptions);
            notification.onclick = function(event) {
                notification.close();
                window.console.log(event);
            };
            */

            window.getApp.$emit('showNotification', payload);

            navigator.serviceWorker.ready.then(registration => {
                registration.showNotification(notificationTitle, notificationOptions);
            });

            // }
            // ...
        });
        /** End */
    },

    mounted() {
        //vuetify 2.x 冇再用 v-app dark prop，改用 this.$vuetify.theme.dark 嚟 toggle dark
        window.console.log("Mounted: ", this.darkMode);
        this.$vuetify.theme.dark = this.darkMode;
    },

    methods: {
        askUserPermission() {
            const messaging = firebase.messaging();
            messaging
                .requestPermission() // 1. Ask user to Allow push notifications
                .then(() => firebase.messaging().getToken()) // 2. Permission granted. Ask Firebase for FCM Token
                .then((token) => {
                    window.console.log('Permisson granted.');
                    window.console.log('FCM Token: ', token) // 3. Receiver Token to use in the notification

                    localStorage.setItem('user-fcm-token', token)
                    uaHelper.storeUserAgent();

                })
                .catch(function(err) {
                    window.console.log("Unable to get permission to notify.", err);

                    localStorage.removeItem('user-fcm-token');
                    uaHelper.removeUserAgent();
                });

        },

        showNotification() {
            this.$notify('something to tell', 'success');
        }
    }
};
</script>

<style lang="scss">
.custom-template {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  text-align: left;
  font-size: 16px;
  font-family: arial;
  margin: 5px;
  margin-bottom: 0;
  align-items: center;
  justify-content: center;

  &, & > div {
    box-sizing: border-box;
  }

  background: #E8F9F0;
  border: 2px solid #D0F2E1;


  .custom-template-icon {
    flex: 0 1 auto;
    color: #15C371;
    font-size: 32px;
    padding: 0 10px;
  }

  .custom-template-close {
    flex: 0 1 auto;
    padding: 0 20px;
    font-size: 16px;
    opacity: 0.2;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }

  .custom-template-content {
    padding: 10px;
    flex: 1 0 auto;

    .custom-template-title {
      letter-spacing: 1px;
      text-transform: uppercase;
      font-size: 18px;
      font-family: arial;
      font-weight: 400;
    }
  }
}

.v-fade-left-enter-active,
.v-fade-left-leave-active,
.v-fade-left-move {
  transition: all .5s;
}

.v-fade-left-enter,
.v-fade-left-leave-to {
  opacity: 0;
  transform: translateX(-500px) scale(0.2);
}
</style>