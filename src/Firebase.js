// import * as firebase from 'firebase';
// import firestore from 'firebase/firestore'
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage'

// const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyCnTkmxyA8-h138Ph-CJLuCf30WGheKgiY",
    authDomain: "friendly-33b9e.firebaseapp.com",
    databaseURL: "https://friendly-33b9e.firebaseio.com",
    projectId: "friendly-33b9e",
    storageBucket: "friendly-33b9e.appspot.com",
    messagingSenderId: "973846768554",
    appId: "1:973846768554:web:f04ece764b400eddd099d3",
    measurementId: "G-W4KCS5D2RN"
};
firebase.initializeApp(config);


// firebase.firestore().settings(settings);
// const provider = new firebase.auth.GoogleAuthProvider()
// const auth = firebase.auth()

// module.exports = {
//   firebase,
//   provider
// }

export default firebase;