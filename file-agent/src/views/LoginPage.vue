<script>
import { localeMixin } from '@/utils/locale-mixin'
import { AUTH_REQUEST, AUTH_SUBSCRIBE_FCM } from "../store/actions/auth";

export default {
    mixins: [localeMixin],

    data() {
        return {
            e1: true, // true: 不顯示 password，false: 顯示
            isValid: false, // validate form inputs
            username: '',
            password: '',
            authError: null,
            tryingToLogIn: false,

            emailRules: [
                (v) => !!v || this.$t('login.email-required'),
                (v) => /.+@.+/.test(v) || this.$t('login.email-is-invalid'),
            ],
            passwordRules: [
                (v) => !!v || this.$t('login.password-required'),
            ],

            snackbar: false,
        }
    },

    computed: {

    },

    methods: {
        /**
         * Try to log the user in with the username and password provided.
         */
        tryToLogIn() {
            const { username, password, isValid } = this;
            this.tryingToLogIn = true;

            window.console.log("Valid: ", isValid);
            window.console.log("User Name: ", username);
            window.console.log("Password: ", password);
            if (isValid) {
                /**
                 * 參考：https://blog.sqreen.com/authentication-best-practices-vue/
                 * 第一級：login => jwt token，第二級：subscribe FCM notifications
                 * 留意：nested axios 要加 async wait，叫第一級等埋第二級先可以收工
                 */
                this.$store.dispatch(AUTH_REQUEST, { username, password })  // 1. login authentication
                    .then(async () => {
                        await this.$store.dispatch(AUTH_SUBSCRIBE_FCM)      // 2. subscribe FCM
                            .then(() => {
                                window.console.log('Subscribed');
                            })
                            .catch(error => {
                                window.console.log('Subscribe failed: ', error);
                            })

                        this.$router.push({ name: 'home' });
                        location.reload(); //? HACK: refresh 個 browser 先見你到隻 mdi-account·icon
                    })
                    .catch(err => {
                        this.snackbar = true;
                        this.tryingToLogIn = false;
                        window.console.log("Login failed: ", err);
                    });
            }
        },

        /**
         * 同 server 登記 FCM 資料
         */
        fcmRegister() {

        }
    },
}
</script>

<template>
    <v-app>
        <v-app-bar app>
            <!-- go Back icon button-->
            <v-btn icon @click="$router.go(-1)">
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-toolbar-title>
                {{ $t('login.title') }}
            </v-toolbar-title>
        </v-app-bar>
    
        <v-content>
            <v-container>
                <v-form v-model="isValid" @submit.prevent="isValid && tryToLogIn" @keyup.native.enter="isValid && tryToLogIn">
                    <!-- 用戶名稱 -->
                    <v-text-field name="username" prepend-icon="mdi-account-circle" :label="$t('login.username')" v-model="username" :rules="emailRules" required></v-text-field>
    
                    <!-- 用戶密碼 -->
                    <v-text-field name="password" prepend-icon="mdi-shield-lock-outline" :label="$t('login.password')" v-model="password" min="8" :append-icon="e1 ? 'mdi-eye-off' : 'mdi-eye'" @click:append="() => (e1 = !e1)" :type="e1 ? 'password' : 'text'" :rules="passwordRules"
                        counter required>
                    </v-text-field>
    
                    <!-- 登入按鍵 -->
                    <v-layout justify-end pt-5>
                        <v-btn min-width="80" @click="tryToLogIn" :color="this.$vuetify.theme.info" :class="{
                        disabled: !isValid,
                        }">
                            <v-icon v-if="tryingToLogIn">
                                fas fa-circle-notch fa-spin
                            </v-icon>
                            <span v-else>
                                {{ $t('login.login') }}
                            </span>
                        </v-btn>
                    </v-layout>
                </v-form>
    
                <!-- 當 login failed，彈出 snackbar -->
                <v-snackbar v-model="snackbar">
                    {{ $t('login.failed') }}
                    <v-btn color="pink" text @click="snackbar = false">
                        {{ $t('close') }}
                    </v-btn>
                </v-snackbar>
            </v-container>
        </v-content>
    </v-app>
</template>

