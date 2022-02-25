import firebase from 'firebase/app';
import 'firebase/messaging';
import 'firebase/functions';

/*
 * firebase init
 */
const initializeFirebase = () => {

    //? 有網友教用 .env 裝啲 data，例如：VUE_APP_FCM_API_KEY...，未決定跟唔跟
    const firebaseConfig = {
        apiKey: "AIzaSyCA0X5oGhPZPKLo-1c8lnilI7esk2y_NbU",
        authDomain: "file-agent.firebaseapp.com",
        databaseURL: "https://file-agent.firebaseio.com",
        projectId: "file-agent",
        storageBucket: "file-agent.appspot.com",
        messagingSenderId: "772018130355",
        appId: "1:772018130355:web:22e514161e30434a0bcfc6"
    }

    firebase.initializeApp(firebaseConfig);

    navigator.serviceWorker
        .register('service-worker.js')
        .then(function(registration){
            window.console.log('Service worker successfully registered.');
            return registration;
        })
        .then((registration) => {
            window.console.log('call firebase.messaging');
            firebase.messaging().useServiceWorker(registration);
        })
        .catch(function(e) {
            window.console.log('Unable to register service worker.', e);
        });
}

export {
    initializeFirebase
}