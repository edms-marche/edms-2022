import firebase from 'firebase/app';
import 'firebase/messaging';
import 'firebase/functions';

/*
 * firebase init
 */
const initializeFirebase = () => {

    //? 有網友教用 .env 裝啲 data，例如：VUE_APP_FCM_API_KEY...，未決定跟唔跟
    const firebaseConfig = {
        apiKey: "AIzaSyC-A0pzSXFX1wow2oXUqTFKhlAIZE4zmq4",
        authDomain: "jb5-2022.firebaseapp.com",
        databaseURL: "https://jb5-2022.firebaseio.com",
        projectId: "jb5-2022",
        storageBucket: "jb5-2022.appspot.com",
        messagingSenderId: "24728601823",
        appId: "1:24728601823:web:4ccf22ddce2f1dc752d56a",
        measurementId: "G-DJFJ7HGSX3"
    }

    firebase.initializeApp(firebaseConfig);

    navigator.serviceWorker
        .register('/service-worker.js')
        .then(function(registration){
            window.console.log('Service worker successfully registered.');
            return registration;
        })
        .then((registration) => {
            window.console.log('call firebase.messaging');
            firebase.messaging().useServiceWorker(registration);

            console.log('Registration successful, scope is:', registration.scope);
        })
        .catch(function(e) {
            window.console.log('Unable to register service worker.', e);
        });
}

export {
    initializeFirebase
}