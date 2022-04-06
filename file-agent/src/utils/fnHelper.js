import axios from 'axios';
import global from '@/config/globals.js';

export default {
    getFileExtension(filename) {
        return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
    },
    getFilingCategory() {
        var result = ['Admin', 'Artwork', 'Hardcoded'];     // 預設數值
        axios
            .get( global.apiBaseUrl + "/fileAgent/filingCategory" )
            .then(({
                data
            }) => {
                window.console.log("getFilingCategory 成功：" + data);
                result= data;
            })
            .catch( err => {
                window.console.log("getFilingCategory 失敗：" + err);
            });
        window.console.log("THIS HOSTNAME: " + this.$hostname);
        return result;
    }
}