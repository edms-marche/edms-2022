<script>
  import i18nHelper from '@/utils/i18nHelper'
  import fnHelper from '@/utils/fnHelper'

  export default {
    data () {
      return {
        chkGreyscale: false,
        chkBlackOverprint: false,
        chkSpotToCMYK: false,
        chkDotGain50: true,
        chkDotGain43: false,
        chkDotGain40: false,

        fileRecords: [],
        loading: false,
        cmdUpload: 1,
        snackbar: false,
        snackbarMessage: null,
      }
    },

    computed: {
      getSizeErrorText () {
        return i18nHelper.getText('uploader.upload-size-error');
      },
    },

    mounted() {
      /**
       * 由 localStorage 攞番上次嘅選擇出嚟
       */
      this.chkGreyscale = JSON.parse( localStorage.getItem( 'plate-greyscale' )) === true;
      this.chkBlackOverprint = JSON.parse( localStorage.getItem( 'plate-black-overprint' )) === true;
      this.chkSpotToCMYK = JSON.parse( localStorage.getItem( 'plate-spot-to-cmyk' )) === true;
      this.chkDotGain50 = JSON.parse( localStorage.getItem( 'plate-dot-gain-50' )) === true;
      this.chkDotGain43 = JSON.parse( localStorage.getItem( 'plate-dot-gain-43') ) === true;
      this.chkDotGain40 = JSON.parse( localStorage.getItem( 'plate-dot-gain-40' )) === true;
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
          case "chkGreyscale":
            localStorage.setItem( 'plate-greyscale', JSON.stringify( this.chkGreyscale ));
            break;
          case "chkBlackOverprint":
            localStorage.setItem( 'plate-black-overprint', JSON.stringify( this.chkBlackOverprint ));
            break;
          case "chkSpotToCMYK":
            localStorage.setItem( 'plate-spot-to-cmyk', JSON.stringify( this.chkSpotToCMYK ));
            break;
          case "chkDotGain50":
            localStorage.setItem( 'plate-dot-gain-50', JSON.stringify( this.chkDotGain50 ));
            if (val === null || val.length === 0) {
              //this.chkPositive = true;
            } else {
              this.chkDotGain43 = false;
              this.chkDotGain40 = false;
            }
            localStorage.setItem( 'plate-dot-gain-43', JSON.stringify( this.chkDotGain43 ));
            localStorage.setItem( 'plate-dot-gain-40', JSON.stringify( this.chkDotGain40 ));
            break;
          case "chkDotGain43":
            localStorage.setItem( 'plate-dot-gain-43', JSON.stringify( this.chkDotGain43 ));
            if (val === null || val.length === 0) {
              //this.chkEmulsionDown = true;
            } else {
              this.chkDotGain50 = false;
              this.chkDotGain40 = false;
            }
            localStorage.setItem( 'plate-dot-gain-50', JSON.stringify( this.chkDotGain50 ));
            localStorage.setItem( 'plate-dot-gain-40', JSON.stringify( this.chkDotGain40 ));
            break;
          case "chkDotGain40":
            localStorage.setItem( 'plate-dot-gain-40', JSON.stringify( this.chkDotGain40 ));
            if (val === null || val.length === 0) {
              //this.chkEmulsionUp = true;
            } else {
              this.chkDotGain50 = false;
              this.chkDotGain43 = false;
            }
            localStorage.setItem( 'plate-dot-gain-50', JSON.stringify( this.chkDotGain50 ));
            localStorage.setItem( 'plate-dot-gain-43', JSON.stringify( this.chkDotGain43 ));
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
       * uploadFilesOneByOne: on Upload button click
       */
      uploadFilesOneByOne () {
        // var okay = typeof emptyArray != "undefined" && this.fileRecords != null && this.fileRecords.length != null && this.fileRecords.length > 0
        // if (!okay) return;

        window.console.log("Uploading...", this.fileRecords.length);
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
          formData.append( "greyscale", this.chkGreyscale );
          formData.append( "black-overprint", this.chkBlackOverprint );
          formData.append( "spot-to-cmyk", this.chkSpotToCMYK );
          formData.append( "dot-gain-50", this.chkDotGain50 );
          formData.append( "dot-gain-43", this.chkDotGain43 );
          formData.append( "dot-gain-40", this.chkDotGain40 );
          formData.append( "upload-file", fileRecord.file );                    // attach the file

        var _UploadUrl = 'https://rest.marche.com.hk/api/fileAgent/jb5/' ;

        window.console.log( "Endpoint: ", _UploadUrl );

        /**
         * 參考：https://javascript.info/xmlhttprequest
         */
        const xhr = new XMLHttpRequest();                                       // 1. Create a new XMLHttpRequest object

          //! 開始，顯示 waiting screen
          xhr.upload.addEventListener("loadstart", function (e) {
            window.console.log( 'Upload started', e.total );

            window.getApp.$emit('APP_WAITING_ON');

          }, false);

          //! 完成，取消 waiting screen
          xhr.upload.addEventListener("loadend", function (e) {
            window.console.log( 'Upload ended', e.total );

            window.getApp.$emit('APP_WAITING_OFF');

          }, false);
          
          xhr.open( "POST", _UploadUrl, true );                                 // 2. Configure it: async ＝ true

          // xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' ); 講明係 Form-Data 反而唔 work，取消，交俾 browser 決定
          xhr.setRequestHeader( 'Accept', suffix == "pdf" ? 'application/pdf' : 'application/postscript' );
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
          formData.append( "greyscale", this.chkGreyscale );
          formData.append( "black-overprint", this.chkBlackOverprint );
          formData.append( "spot-to-cmyk", this.chkSpotToCMYK );
          formData.append( "dot-gain-50", this.chkDotGain50 );
          formData.append( "dot-gain-43", this.chkDotGain43 );
          formData.append( "dot-gain-40", this.chkDotGain40 );

          for (const fileRecord of this.fileRecords) {
            formData.append( "upload-file", fileRecord.file );                  // attach the file
          }

        var _UploadUrl = 'https://rest.marche.com.hk/api/fileAgent/jb5/' ;

        window.console.log( "Endpoint: ", _UploadUrl );

        /**
         * 參考：https://javascript.info/xmlhttprequest
         */
        const xhr = new XMLHttpRequest();                                       // 1. Create a new XMLHttpRequest object

          xhr.upload.addEventListener("loadstart", function (e) {
            window.console.log( 'Upload started', e.total );

            window.getApp.$emit('APP_WAITING_ON');    //! 開始，顯示 waiting screen

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
      isLetterNumber(e) {
        let char = String.fromCharCode(e.keyCode);
        if (/^[A-Za-z0-9]+$/.test(char)) return true;
        else e.preventDefault();
      },
      isLetterNumberDashNoSpace(e) {
        let char = String.fromCharCode(e.keyCode);
        if (/^[A-Za-z0-9-]+$/.test(char)) return true;
        else e.preventDefault();
      },
    }
  }
</script>

<template>
  <v-content>
    <v-container>
      <v-layout text-center>
        <v-flex>
          <v-alert text >
            {{ $t('jb5.name') }}
          </v-alert>
        </v-flex>
      </v-layout>
      <v-row no-gutters align="center">
        <!-- 工單號碼 -->
        <v-text-field name="jobNumber" prepend-icon="mdi-numeric-5-box" :label="$t('jb5.job-number-required')" v-model="jobNumber" @keypress="isLetterNumberDashNoSpace($event)" required></v-text-field>
      </v-row>

      <!-- File Uploader -->
      <VueFileAgent 
        ref="vueFileAgent"
          :theme="'list'"
          :multiple="true"
          :deletable="true"
          :meta="true"
          :accept="'.pdf,.ps'"
          :maxSize="'512MB'"
          :maxFiles="14"
          :helpText="$t('uploader.upload-help-text')"
          :errorText="{
            type: this.$t('uploader.upload-type-error'),    //? 兩種方法都淨係出英文
            size: this.getSizeErrorText,                    //? 奇怪？
          }"
        @select="filesSelected($event)"
        @delete="fileDeleted($event)"
        v-model="fileRecords"
        label="vueFileAgent">
      </VueFileAgent>
      <v-layout justify-end>
        <v-btn class="ma-2" outlined @click.once="uploadAllFiles" :key="cmdUpload" >{{ $t('uploader.upload') }}</v-btn>
      </v-layout>
      
      <!-- 上傳檔案，進行中，進度條 -->
      <v-row no-gutters justify-center >
      <v-col cols="12">
      <v-progress-linear
        :active="loading"
        :indeterminate="true"
        class="ma-0"
        height="10"
        style="top: -2px;"
      ></v-progress-linear>
      </v-col>
      </v-row>

    </v-container>

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

  </v-content>
</template>
