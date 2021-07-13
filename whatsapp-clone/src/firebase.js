import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBoBZULaEq8mSi4A5Ro1tGQ1Jt5nbCdyEA",
    authDomain: "whatsapp-mern-3108d.firebaseapp.com",
    projectId: "whatsapp-mern-3108d",
    storageBucket: "whatsapp-mern-3108d.appspot.com",
    messagingSenderId: "374660941399",
    appId: "1:374660941399:web:063583a9b21abdc3a98512"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export {auth,provider};
