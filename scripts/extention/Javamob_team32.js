//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyDP1_4bWe2eF7OSG86k2j6RkkJLwWeqwag",
  authDomain: "javamobsroadclose.firebaseapp.com",
  projectId: "javamobsroadclose",
  storageBucket: "javamobsroadclose.appspot.com",
  messagingSenderId: "317257908602",
  appId: "1:317257908602:web:1678f425f9c4d6fd2896c3"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();