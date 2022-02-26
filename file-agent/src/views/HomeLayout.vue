<script>
import { localeMixin } from '@/utils/locale-mixin'

export default {
    mixins: [localeMixin],

    data() {
        return {
            sidebar: false,
            bottomNav: '',
            isLoggedIn: false,
            snackbar: false,
            waiting: false,
        }
    },

    mounted() {
        // 根據 localStorage 資料修正 isLoggedIn
        this.isLoggedIn = localStorage.getItem('user-jwt-token') === undefined ?
            false : localStorage.getItem('user-jwt-token') == null ?
            false : true;
        // 根據 localStorage.landing-page 數值修正 bottomNav，顯示 highlighted
        this.bottomNav = localStorage.getItem('landing-page') === undefined ?
            'jb5' : localStorage.getItem('landing-page');
        window.console.log('Home mounted');
    },

    computed: {
        currentLocale() {
            return this.$i18n.locale.toUpperCase();
        },

        userAlias() {
            return localStorage.getItem('user-alias') === undefined ? '' : localStorage.getItem('user-alias');
        },

    },

    mutations: {},

    methods: {
        changeLocale() {
            switch (this.currentLocale) {
                case 'EN':
                    this.$store.commit('SET_APP_LOCALE', 'hk')
                    break;
                case 'HK':
                    this.$store.commit('SET_APP_LOCALE', 'cn')
                    break;
                case 'CN':
                    this.$store.commit('SET_APP_LOCALE', 'en')
                    break;
            }
        },

        toggleTheme() {
            window.getApp.$emit('APP_DARK_THEME_TOGGLED');
        },

        logout() {
            localStorage.removeItem('user-jwt-token');
            this.isLoggedIn = false;
            this.snackbar = true;
        },

        setIsLoggedIn() {
            this.isLoggedIn = true;
        },

        /**
         * 當 bottomNav click 嘅時候，更新 landing-page
         */
        onBottomNavClick(val, tag) {
            window.console.log(val, tag, this.bottomNav);

            localStorage.setItem('landing-page', tag == 'btnJB5' ? 'jb5' : 'filing');
            this.bottomNav = tag == 'btnJB5' ? 'jb5' : 'filing';

            window.console.log(val, tag, this.bottomNav);
        }
    },

    created() {

        window.getApp.$on('APP_WAITING_ON', () => {
            //window.console.log("Before: ", this.$vuetify.theme.dark);

            this.waiting = true;

            window.console.log("Waiting is ON");
        })

        window.getApp.$on('APP_WAITING_OFF', () => {
            //window.console.log("Before: ", this.$vuetify.theme.dark);

            this.waiting = false;

            window.console.log("Waiting is OFF");
        })

        window.console.log('Home created');
    }
}
</script>

<template>
    <v-app>
    
        <!-- App menu -->
        <v-navigation-drawer v-model="sidebar" app>
            <v-list dense nav>
    
                <v-list-item link to="/login">
                    <v-list-item-icon>
                        <v-icon>mdi-login</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ $t('side-nav.login') }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
    
                <v-list-item link to="/reset">
                    <v-list-item-icon>
                        <v-icon>mdi-lock-reset</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ $t('side-nav.reset') }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
    
            </v-list>
        </v-navigation-drawer>
    
        <!-- App bar -->
        <v-app-bar dense app>
            <v-app-bar-nav-icon @click="sidebar = !sidebar" />
    
            <v-toolbar-title>
                {{ $t('app-title') }}
            </v-toolbar-title>
    
            <v-spacer/>

            <!-- 用戶登入 -->
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn icon @click="logout" v-on="on" v-if="isLoggedIn">
                        <v-icon>mdi-account</v-icon>
                    </v-btn>
                </template>
                <span>{{ $t('login.logout') }} {{ userAlias }}</span>
            </v-tooltip>
    
            <!-- 轉換語言 -->
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn text icon @click="changeLocale" v-on="on">
                        {{ currentLocale }}
                    </v-btn>
                </template>
                <span>{{ $t('lang') }}</span>
            </v-tooltip>
    
            <!-- 轉換風格 -->
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                <v-btn icon @click="toggleTheme" v-on="on">
                    <v-icon>mdi-circle-half-full</v-icon>
                </v-btn>
                </template>
                <span>{{ $t('theme') }}</span>
            </v-tooltip>
        </v-app-bar>

        <!-- 當 logout 完成，彈出 snackbar -->
        <v-snackbar
        v-model="snackbar"
        >
            {{ $t('login.loggedOut') }}
            <v-btn
                color="pink"
                text
                @click="snackbar = false"
                >
                {{ $t('close') }}
            </v-btn>
        </v-snackbar>

        <keep-alive>
            <router-view />
        </keep-alive>

        <!-- Bottom nav bar -->
        <v-bottom-navigation grow v-model="bottomNav" >
            <v-btn value="jb5" to="/jb5" @click="onBottomNavClick( $event, 'btnJB5' )" >
                <span>{{ $t('main-nav.jb5') }}</span>
                <v-icon>mdi-numeric-5-box</v-icon>
            </v-btn>
            <v-btn value="filing" to="/filing" @click="onBottomNavClick( $event, 'btnFiling' )" >
                <span>{{ $t('main-nav.filing') }}</span>
                <v-icon>mdi-alpha-f-box-outline</v-icon>
            </v-btn>
        </v-bottom-navigation>

        <!-- 上傳中：一個住屏 modal form -->
        <v-dialog v-model="waiting" fullscreen >
        <v-container fluid fill-height style="background-color: rgba(255, 255, 255, 0.5);">
            <v-layout justify-center align-center>
                <v-progress-circular
                    indeterminate
                    color="primary"
                    :size = "80">
                    {{ $t('upload.waiting') }}
                </v-progress-circular>
            </v-layout>
        </v-container>
        </v-dialog>

      </v-app>
</template>

<style scoped>
/*
 * 當第一次 load 嘅時候，我會自動選用上次嘅 page，
 * 個 bottomNav button 唔識 highlight，要加 CSS 叫佢轉色
 */

.theme--light .v-btn--active {
    background-color: #F5F5F5 !important;
}

.theme--dark .v-btn--active {
    background-color: #464646 !important;
}
</style>