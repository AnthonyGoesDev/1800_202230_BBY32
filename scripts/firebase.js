// Our web app's Firebase configuration to link pages together

var firebaseConfig = {
    apiKey: "AIzaSyBr5lRJF2DYLpdGT2kScRKO6uPLpU-xD04",
    authDomain: "javamobs-c1c88.firebaseapp.com",
    projectId: "javamobs-c1c88",
    storageBucket: "javamobs-c1c88.appspot.com",
    messagingSenderId: "499546029111",
    appId: "1:499546029111:web:70374630d51d83068d53b2"
}

// Initialize the Firebase app
// Initialize Firebase data
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();