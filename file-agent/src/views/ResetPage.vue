<script>
  import {localeMixin} from '@/utils/locale-mixin'
  
  export default {
    mixins: [localeMixin],
    
    data() {
      return {
        snackbar: false,
      }
    },

    computed: {

    },

    methods: {
      /**
       * Try to log the user in with the username and password provided.
       */
      onResetClick () {
        localStorage.clear();

        this.snackbar = true;

        setTimeout(() => {

        this.$router.push({ name: 'home' });

        location.reload();        //? HACK: refresh 個 browser 先見你到隻 mdi-account·icon
        }, 0);
 
      },
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
        {{ $t('reset.title') }}
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container>
        <v-banner two-line >
          <v-avatar slot="icon" color="error" size="40" >
            <v-icon icon="mdi-bell-alert" color="white" >
              mdi-bell-alert
            </v-icon>
          </v-avatar>
          {{ $t( 'reset.warning' ) }}
          <template v-slot:actions>
            <v-layout justify-end mr-3 mb-3>
              <v-btn mid-width="80" color="error" @click="onResetClick" >
                {{ $t('reset.reset') }}
              </v-btn>
            </v-layout>
          </template>
        </v-banner>

        <!-- 當 login failed，彈出 snackbar -->
        <v-snackbar
          v-model="snackbar"
          >
          {{ $t('reset.done') }}
          <v-btn
            color="pink"
            text
            @click="snackbar = false"
            >
            {{ $t('close') }}
          </v-btn>
        </v-snackbar>
      </v-container>
    </v-content>
  </v-app>
</template>

