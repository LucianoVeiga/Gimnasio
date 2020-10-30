import firebase from "@firebase/app";
import '@firebase/storage';
import '@firebase/auth';
import '@firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyCpJH0N6gYqDt_jnaFurWFfvItpoOcAw7I",
  authDomain: "g-y-m-dc043.firebaseapp.com",
  databaseURL: "https://g-y-m-dc043.firebaseio.com",
  projectId: "g-y-m-dc043",
  storageBucket: "g-y-m-dc043.appspot.com",
  messagingSenderId: "153415910234",
  appId: "1:153415910234:web:706edc7cd6b0ab1e4a6963",
  measurementId: "G-3BHWG3LT78"
};
  
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const firestore = firebase.firestore();
  
export { storage, firestore, firebase as default };