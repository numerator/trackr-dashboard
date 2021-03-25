import firebase from 'firebase';
import '@firebase/firestore';

import { firebaseConfig } from './Secrets.js';

class DataStore {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    let db = firebase.firestore();
    this.usersRef = db.collection('users');
    this.reportConfigs = [];
    this.reports = [];
    this.currentUser = undefined;
  }

  setCurrentUser = async (cUser) => {
    this.currentUser = cUser;
    this.currentUserDocRef = this.usersRef.doc(cUser.id);
    this.currentUserDoc = await this.currentUserDocRef.get();
    if (!this.currentUserDoc.exists) {
      this.usersRef.doc(cUser.id).set({displayName: cUser.displayName});
    } else {
      this.dName = this.currentUserDoc.data()['displayName'];
    }
    // let configs = this.currentUserDoc.data()['configs'];
    // if (configs !== undefined) {
    //   console.log('found saved config, using it');
    //   this.reportConfigs = configs;
    // } else {
    //   console.log('no saved config, using default');
    //   await this.setCurrentUserConfig(configData.reports);
    // }
    // console.log('after login, currentUserDName:', this.dName);
  }

  unsetCurrentUser = () => {
    this.currentUser = undefined;
  }
}

// Singleton Pattern. There can only be one DataStore!
let theDataStore = undefined;

export function getDataStore() {
  if (!theDataStore) {
    theDataStore = new DataStore();
  }
  return theDataStore;
}