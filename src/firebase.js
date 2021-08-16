import firebase from 'firebase/app'
import "firebase/firestore"
import "firebase/auth"


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAID5-H3LXOXnvrSERY84xloeUokK5MEV4",
  authDomain: "netflix-clone-a25a9.firebaseapp.com",
  projectId: "netflix-clone-a25a9",
  storageBucket: "netflix-clone-a25a9.appspot.com",
  messagingSenderId: "814962813573",
  appId: "1:814962813573:web:75fb6be519f05d0e8917ec",
  measurementId: "G-GSV3RDQ4GV"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
  firebase.firestore().settings({ experimentalForceLongPolling: true })
} else {
  app = firebase.app()
  firebase.firestore().settings({ experimentalForceLongPolling: true })
}

const db = app.firestore()
const auth = firebase.auth()

export { db, auth }