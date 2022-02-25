import uaParser from 'ua-parser-js'
import Fingerprint2 from 'fingerprintjs2'

export default {
    storeUserAgent() {
        /**
         * 攞個 Browser 嘅 User Agent 資料，用嚟登記 dbo.UserNotification
         * 參考：https://github.com/faisalman/ua-parser-js
         */
        const ua = uaParser(navigator.userAgent)
        window.console.log('User Agent: ', ua)

        /**
         * 搵個 browser fingerprint 做 device id
         * 參考：https://github.com/Valve/fingerprintjs2
         */
        let deviceId = '';
        if (window.requestIdleCallback) {
            requestIdleCallback(function () {
                Fingerprint2.get(function (components) {
                    deviceId = Fingerprint2.x64hash128(components.map(function (pair) {
                        return pair.value
                    }).join(), 31)
                })
            })
        } else {
            setTimeout(function () {
                Fingerprint2.get(function (components) {
                    deviceId = Fingerprint2.x64hash128(components.map(function (pair) {
                        return pair.value
                    }).join(), 31)
                })
            }, 500)
        }

        /**
         * 準備 FCM json data，要 timeout 一下，等埋隻 fingerprint
         */
        setTimeout(function () {
            var fcmData = {
                Id: deviceId,
                Model: `${ua.browser.name} ${ua.browser.major}`,
                Platform: ua.os.name,
                Version: ua.os.version
            }
            window.console.log('json data: ', JSON.stringify(fcmData))

            localStorage.setItem('device-id', deviceId);
            localStorage.setItem('device-model', `${ua.browser.name} ${ua.browser.major}`);
            localStorage.setItem('device-platform', ua.os.name);
            localStorage.setItem('device-version', ua.os.version);
        }, 1000)
    },

    clearUserAgent() {
        localStorage.removeItem('device-id');
        localStorage.removeItem('device-model');
        localStorage.removeItem('device-platform');
        localStorage.removeItem('device-version');
    }
}