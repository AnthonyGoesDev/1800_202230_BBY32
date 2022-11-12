//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
const firebaseConfig = {
    apiKey: "AIzaSyC36081VdmOMLodgdnYZy8wZdm62PlqUsU",
    authDomain: "comp1800-202230-bbb8d.firebaseapp.com",
    projectId: "comp1800-202230-bbb8d",
    storageBucket: "comp1800-202230-bbb8d.appspot.com",
    messagingSenderId: "753888624067",
    appId: "1:753888624067:web:81aeaf91b2239f7edfd176"
};
//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
