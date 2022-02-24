// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-messaging.js');

if (firebase.messaging.isSupported()) {
    // Initialize the Firebase app in the service worker by passing in
    // your app's Firebase config object.
    // https://firebase.google.com/docs/web/setup#config-object
    const config = {
        apiKey: 'AIzaSyCA0X5oGhPZPKLo-1c8lnilI7esk2y_NbU',
        authDomain: "scanner-agent.firebaseapp.com",
        databaseURL: "https://x5-2018.firebaseio.com",
        projectId: "scanner-agent",
        storageBucket: "scanner-agent.appspot.com",
        messagingSenderId: "772018130355",
        appId: "1:772018130355:web:22e514161e30434a0bcfc6"
    };

    firebase.initializeApp(config);

    // Retrieve an instance of Firebase Messaging so that it can handle background
    // messages.
    const messaging = firebase.messaging();

    // Get Instance ID token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    messaging.getToken()
        .then(function(currentToken) {
            if (currentToken) {
                console.log("getToken", currentToken);
            } else {
                // Show permission request.
                console.log('getToken: No Instance ID token available. Request permission to generate one.');
            }
        })
        .catch(function(err) {
            console.log('getToken: An error occurred while retrieving token. ', err);
    });

    // Callback fired if Instance ID token is updated.
    // messaging.onTokenRefresh(function() {
    //     messaging.getToken()
    //     .then(function(refreshedToken) {
    //         console.log('onTokenRefresh getToken Token refreshed.');
    //         console.log('onTokenRefresh getToken', refreshedToken);
    //     })
    //     .catch(function(err) {
    //         console.log('onTokenRefresh getToken Unable to retrieve refreshed token ', err);
    //     });
    // });


    // 顯示個收到嘅 message
    // refer: https://www.cometchat.com/tutorials/vue-chat-push-notifications
    messaging.setBackgroundMessageHandler(function (payload) {
        console.log('firebase-messaging-sw.js] Received background message ', payload);
        // var sender = JSON.parse(payload.data.message);
        var notificationTitle = payload.data.title;
        var notificationOptions = {
            body: payload.data.body,
            icon: '/img/favicon-32x32.png',
        };
        return self.registration.showNotification(
            notificationTitle,
            notificationOptions
        );
    });

    self.addEventListener('notificationclick', function (event) {
        event.notification.close();
        //handle click event onClick on Web Push Notification
    });
}