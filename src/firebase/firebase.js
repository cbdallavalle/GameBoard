import * as firebase from 'firebase';
import { oldConfig, newConfig } from './firebase-key';

if (!firebase.apps.length) {
  firebase.initializeApp(newConfig);
}

const auth = firebase.auth();
const db = firebase.database();

export {
  db,
  auth
};