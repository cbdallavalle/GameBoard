import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBDU0_Pa8xdAWKmtKKfo3QkbrtR56cl024",
  authDomain: "dallavalle-gameboard.firebaseapp.com",
  databaseURL: "https://dallavalle-gameboard.firebaseio.com",
  projectId: "dallavalle-gameboard",
  storageBucket: "",
  messagingSenderId: "250758219123"
};

if(!firebase.apps.length) {
  firebase.initializeApp(config)
}

const auth = firebase.auth();

export {
  auth,
}