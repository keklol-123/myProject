import '@firebase/messaging'
var firebaseConfig = {
    // ...
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

console.log(firebase)
const messaging = firebase.messaging()