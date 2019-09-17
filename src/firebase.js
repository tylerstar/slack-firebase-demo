import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyACkn3vQrExXLLmo5rZv0mNhlhQMc0pEnE",
  authDomain: "react-slack-clone-ff728.firebaseapp.com",
  databaseURL: "https://react-slack-clone-ff728.firebaseio.com",
  projectId: "react-slack-clone-ff728",
  storageBucket: "gs://react-slack-clone-ff728.appspot.com/",
  messagingSenderId: "755416450754",
  appId: "1:755416450754:web:1786bb681d2f7e8e675d5b"
};
firebase.initializeApp(firebaseConfig);

export default firebase;