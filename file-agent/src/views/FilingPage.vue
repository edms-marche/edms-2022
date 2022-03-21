<script>
  import i18nHelper from '@/utils/i18nHelper'
  import fnHelper from '@/utils/fnHelper'

  export default {
    data() {
      return {
        chkPositive: true,
        chkNegative: false,
        chkEmulsionUp: true,
        chkEmulsionDown: false,
        chkColorSeparation: false,

        fileRecords: [],
        loading: false,
        cmdUpload: 1,
        snackbar: false,
        snackbarMessage: null,

        categories: ['Admin', 'Artwork'],
      };
    },

    computed: {
      getSizeErrorText () {
        return i18nHelper.getText('uploader.upload-size-error');
      },
    },

    /**
     * 由 localStorage 攞番上次嘅選擇出嚟
     */
    mounted() {
      this.chkPositive = JSON.parse(localStorage.getItem('film-positive')) === true;
      this.chkNegative = JSON.parse(localStorage.getItem('film-negative')) === true;
      this.chkEmulsionUp = JSON.parse(localStorage.getItem('film-emulsion-up')) === true;
      this.chkEmulsionDown = JSON.parse(localStorage.getItem('film-emulsion-down')) === true;
      this.chkColorSeparation = JSON.parse(localStorage.getItem('film-color-separation')) === true;
    },
    methods: {
      onOptionChanged(val, tag) {
        window.console.log(val, tag, this.checkbox)
        if (val === null || val.length === 0) {
          window.console.log('Unchecked')
        } else {
          window.console.log('Checked')
        }
        switch (tag) {
          case "chkPositive":
            localStorage.setItem('film-positive', JSON.stringify(this.chkPositive));
            if (val === null || val.length === 0) {
              this.chkNegative = true;
            } else {
              this.chkNegative = false;
            }
            localStorage.setItem('film-negative', JSON.stringify(this.chkNegative));
            break;
          case "chkNegative":
            localStorage.setItem('film-negative', JSON.stringify(this.chkNegative));
            if (val === null || val.length === 0) {
              this.chkPositive = true;
            } else {
              this.chkPositive = false;
            }
            localStorage.setItem('film-positive', JSON.stringify(this.chkPositive));
            break;
          case "chkEmulsionUp":
            localStorage.setItem('film-emulsion-up', JSON.stringify(this.chkEmulsionUp));
            if (val === null || val.length === 0) {
              this.chkEmulsionDown = true;
            } else {
              this.chkEmulsionDown = false;
            }
            localStorage.setItem('film-emulsion-down', JSON.stringify(this.chkEmulsionDown));
            break;
          case "chkEmulsionDown":
            localStorage.setItem('film-emulsion-down', JSON.stringify(this.chkEmulsionDown));
            if (val === null || val.length === 0) {
              this.chkEmulsionUp = true;
            } else {
              this.chkEmulsionUp = false;
            }
            localStorage.setItem('film-emulsion-up', JSON.stringify(this.chkEmulsionUp));
            break;
          case "chkColorSeparation":
            localStorage.setItem('film-color-separation', JSON.stringify(this.chkColorSeparation));
            break;
        }
      },
      filesSelected(val) {
        window.console.log('Selected: ', val);
      },
      fileDeleted(val) {
        window.console.log('Deleted: ', val);
      },
      /**
       * uploadFiles: on Upload button click
       */
      uploadFilesOneByOne() {
        window.console.log("Uploading...");
        this.loading = true;      // 顯示進度條

        for (const fileRecord of this.fileRecords) {
          window.console.log(fileRecord.file);
          window.console.log("File Type: ", fnHelper.getFileExtension(fileRecord.file.name).toLowerCase());

          this.uploadOneFile( fileRecord );  // 續個檔案上傳
        }
        
        window.console.log("Upload...done");
        this.snackbarMessage = this.$t( 'upload.succeed' );
        this.snackbar = true;     // 題示用戶
        this.loading = false;     // 收起進度條
        this.fileRecords = [];    // 清理 uploader
        this.cmdUpload++;         // 復完 上傳 button
      },
      /** 
       * uploadFile: 正式上傳檔案
       */
      uploadOneFile( fileRecord ) {
        const suffix = fnHelper.getFileExtension(fileRecord.file.name).toLowerCase();

        // 用 FormData 傳送 client 資料去 server
        const formData = new FormData();
          formData.append( "positive", this.chkPositive );
          formData.append( "negative", this.chkNegative );
          formData.append( "emulsion-up", this.chkEmulsionUp );
          formData.append( "emulsion-down", this.chkEmulsionDown );
          formData.append( "eolor-separation", this.chkColorSeparation );
          formData.append( "upload-file", fileRecord.file );                    // attach the file

        var _UploadUrl = 'https://rest.directoutput.com.hk/api/fileAgent/film/' ;

        window.console.log( "Endpoint: ", _UploadUrl );

        /**
         * 參考：https://javascript.info/xmlhttprequest
         */
        const xhr = new XMLHttpRequest();                                       // 1. Create a new XMLHttpRequest object

          xhr.open( "POST", _UploadUrl, true );                                 // 2. Configure it: async ＝ true

          // xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' ); 講明係 Form-Data 反而唔 work，取消，交俾 browser 決定
          xhr.setRequestHeader( 'Accept', suffix == "pdf" ? 'application/pdf' : 'application/postscript' );
          xhr.setRequestHeader( 'Authorization', `Bearer "${localStorage.getItem('user-jwt-token')}"` );

          xhr.onprogress = function(progressEvent) {
            if (progressEvent.lengthComputable) {
              const percentCompleted = (progressEvent.loaded * 100) / progressEvent.total;
              fileRecord.progress(percentCompleted);    // will update the preview UI 
            }
          };
          xhr.timeout = 60 * 60 * 1000;   // Set timeout to 60 * 60 * 1 seconds (1 hour)
          xhr.ontimeout = function () { alert("Timed out!!!"); }

          xhr.send( formData ) ;                                                // 3. Send the request over the network
          
          xhr.onload = function() {                                             // 4. This will be called after the response is received
            if (xhr.status != 200) { // analyze HTTP status of the response
              window.console.log(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
            } else { // show the result
              window.console.log(`Done, got ${xhr.response.length} bytes`); // responseText is the server
            }
          };

          xhr.onprogress = function( progressEvent ) {
            if (progressEvent.lengthComputable) {
              const percentCompleted = (progressEvent.loaded * 100) / progressEvent.total;
              fileRecord.progress( percentCompleted );    // will update the preview UI 

              window.console.log(`Received ${progressEvent.loaded} of ${progressEvent.total} bytes`);
            } else {
              window.console.log(`Received ${progressEvent.loaded} bytes`); // no Content-Length
            }
          };

          xhr.onerror = function() {
            window.console.log("Request failed");
            
            this.snackbarMessage = this.$t( 'upload.failed' );
            this.snackbar = true;
          };          
      },
      /** 
       * uploadAllFiles: 一次過，上傳哂所有檔案
       */
      uploadAllFiles ( ) {
        // const suffix = getFileExtension(fileRecord.file.name).toLowerCase();

        // 用 FormData 傳送 client 資料去 server
        const formData = new FormData();
          formData.append( "positive", this.chkPositive );
          formData.append( "negative", this.chkNegative );
          formData.append( "emulsion-up", this.chkEmulsionUp );
          formData.append( "emulsion-down", this.chkEmulsionDown );
          formData.append( "color-separation", this.chkColorSeparation );

          for (const fileRecord of this.fileRecords) {
            formData.append( "upload-file", fileRecord.file );                  // attach the file
          }

        var _UploadUrl = 'https://rest.directoutput.com.hk/api/fileAgent/film/' ;

        window.console.log( "Endpoint: ", _UploadUrl );

        /**
         * 參考：https://javascript.info/xmlhttprequest
         */
        const xhr = new XMLHttpRequest();                                       // 1. Create a new XMLHttpRequest object

          xhr.upload.addEventListener("loadstart", function (e) {
            window.console.log( 'Upload started', e.total );

            window.getApp.$emit('APP_WAITING_ON');  //! 開始，顯示 waiting screen

          }, false);

          xhr.open( "POST", _UploadUrl, true );                                 // 2. Configure it: async ＝ true

          // xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' ); 講明係 Form-Data 反而唔 work，取消，交俾 browser 決定
          // xhr.setRequestHeader( 'Accept', suffix == "pdf" ? 'application/pdf' : 'application/postscript' );
          xhr.setRequestHeader( 'Accept', '*/*' );
          xhr.setRequestHeader( 'Authorization', `Bearer "${localStorage.getItem('user-jwt-token')}"` );
          
          xhr.timeout = 60 * 60 * 1000;   // Set timeout to 60 * 60 * 1 seconds (1 hour)
          xhr.ontimeout = function () { alert( "Timed out!!!" ); }

          xhr.send( formData ) ;                                                // 3. Send the request over the network

          xhr.onload = function() {                                             // 4. This will be called after the response is received
            if (xhr.status != 200) { // analyze HTTP status of the response
              window.console.log(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
            } else { // show the result
              window.console.log( `Done, got ${xhr.response.length} bytes` ); // responseText is the server
            }
            window.getApp.$emit('APP_WAITING_OFF'); //! 完，取消 waiting screen
          };

          xhr.onerror = function() {
            window.console.log("Request failed");

            window.getApp.$emit('APP_WAITING_OFF'); //! 完，取消 waiting screen
            this.snackbarMessage = this.$t( 'upload.failed' );
            this.snackbar = true;
          };          

        this.fileRecords = [];    // 清理 uploader
        this.cmdUpload++;         // 復完 上傳 button
      },
      isLetterNumberDashDotUnderscoreNoSpace(e) {
        let char = String.fromCharCode(e.keyCode);
        if (/^[A-Za-z0-9-._]+$/.test(char)) return true;
        else e.preventDefault();
      },
      isLetterNumberDashDotUnderscoreSlashNoSpace(e) {
        let char = String.fromCharCode(e.keyCode);
        if (/^[A-Za-z0-9-._/]+$/.test(char)) return true;
        else e.preventDefault();
      },
    },
  }
</script>

<template>
  <v-content>
    <v-container>
      <v-layout text-center>
        <v-flex>
          <v-alert text >
            {{ $t('filing.name') }}
          </v-alert>
        </v-flex>
      </v-layout>
      <v-row no-gutters align="center">
        <v-col class="d-flex" cols="6" sm="6">
          <v-select v-model="selectedCategory" prepend-icon="mdi-folder-outline" :items="categories" :label="$t('filing.category')" required></v-select>
        </v-col>
        <v-col class="d-flex" cols="6" sm="6">
          <v-subheader v-text="''"></v-subheader>
        </v-col>
      </v-row>
      <v-row no-gutters align="center">
        <!-- 檔案號碼 -->
        <v-text-field name="fileFolder" prepend-icon="mdi mdi-folder-plus" :label="$t('filing.folder-optional')" v-model="username" @keypress="isLetterNumberDashDotUnderscoreSlashNoSpace($event)"></v-text-field>
      </v-row>
      <v-row no-gutters align="center">
        <!-- 檔案號碼 -->
        <v-text-field name="fileNumber" prepend-icon="mdi-alpha-f-box-outline" :label="$t('filing.file-number-required')" v-model="username" @keypress="isLetterNumberDashDotUnderscoreNoSpace($event)" required></v-text-field>
      </v-row>

      <!-- File Uploader -->
      <VueFileAgent ref="vueFileAgent" :theme="'list'" :multiple="true" :deletable="true" :meta="true"
        :accept="'.pdf,.ps'" :maxSize="'512MB'" :maxFiles="10" 
        :helpText="$t('uploader.upload-help-text')"
        :errorText="{
            type: this.$t('uploader.upload-type-error'),    //? 兩種方法都淨係出英文
            size: this.getSizeErrorText,                    //? 奇怪？
          }" 
        @select="filesSelected($event)" @delete="fileDeleted($event)" v-model="fileRecords">
      </VueFileAgent>
      <v-layout justify-end>
        <v-btn class="ma-2" outlined @click.once="uploadAllFiles" :key="cmdUpload" >{{ $t('uploader.upload') }}</v-btn>
      </v-layout>

      <!-- 上傳檔案，進行中，進度條 -->
      <v-progress-linear
        :active="loading"
        :indeterminate="true"
        class="ma-0"
        height="4"
        style="top: -2px;"
      ></v-progress-linear>

      <!-- 當 upload failed，彈出 snackbar -->
      <v-snackbar
        v-model="snackbar"
        >
        {{ this.snackbarMessage }}
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
</template>
