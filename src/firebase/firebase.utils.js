import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBc6ueUzJhyk3sYxEYbnLyNxXqqelQLyLo',
  authDomain: 'crwn-db-be653.firebaseapp.com',
  databaseURL: 'https://crwn-db-be653.firebaseio.com',
  projectId: 'crwn-db-be653',
  storageBucket: 'crwn-db-be653.appspot.com',
  messagingSenderId: '418342928987',
  appId: '1:418342928987:web:2d3a1894df5d544a48757e',
  measurementId: 'G-0M408MMF25'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
