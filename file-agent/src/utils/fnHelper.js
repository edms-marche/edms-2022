import axios from 'axios';
import global from '@/config/globals.js';

export default {
    getFileExtension(filename) {
        return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
    },
    async getFilingCategory() {
        return await new Promise((resolve, reject) => {
            var result = [];    //['Admin', 'Artwork', '萬智書架'];     // 預設數值

            const url = `${global.apiBaseUrl}/fileAgent/filingCategory/`;
            var token = localStorage.getItem('user-jwt-token');

            window.console.log("Auth: ", token);
            axios.defaults.headers.common['Authorization'] = `Bearer "${token}"`;
            axios({url: url, method: 'GET' })
            .then(resp => {
                window.console.log("getFilingCategory 成功：" + resp.data);
                resolve(resp.data);
            })
            .catch((err) => {
                window.console.log("getFilingCategory 失敗：" + err);
                resolve(result);    // 可以傳返個 default value
                reject(err);
            });
        });
    }
}