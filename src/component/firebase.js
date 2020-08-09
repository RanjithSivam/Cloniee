import firebase from 'firebase';
import 'firebase/firebase-firestore';
import 'firebase/firebase-auth';
const firebaseConfig = {
  apiKey: 'AIzaSyDvZT9eG_EwJq4e_3khSUetFDhUUbJBc3A',
  authDomain: 'messager-c6d4a.firebaseapp.com',
  databaseURL: 'https://messager-c6d4a.firebaseio.com',
  projectId: 'messager-c6d4a',
  storageBucket: 'messager-c6d4a.appspot.com',
  messagingSenderId: '526935630387',
  appId: '1:526935630387:web:16b34744888ad3522cb946',
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
let auth = firebase.auth();

export { db, auth };
