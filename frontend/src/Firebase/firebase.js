import firebase from "firebase"


const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyArGMAyTql2bmTxZaBLyjQSde-qWXg1efg",
  authDomain: "instagram-clone-3ca11.firebaseapp.com",
  databaseURL: "https://instagram-clone-3ca11-default-rtdb.firebaseio.com",
  projectId: "instagram-clone-3ca11",
  storageBucket: "instagram-clone-3ca11.appspot.com",
  messagingSenderId: "579070667538",
  appId: "1:579070667538:web:7fbf606f61d8247957a1cb",
  measurementId: "G-H1DXDE758J"

});

const db = firebaseConfig.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };