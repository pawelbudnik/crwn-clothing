import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCCje19xssctaXQze6BNWARFrT-ioZ66rA",
    authDomain: "crwn-db-e72de.firebaseapp.com",
    databaseURL: "https://crwn-db-e72de.firebaseio.com",
    projectId: "crwn-db-e72de",
    storageBucket: "crwn-db-e72de.appspot.com",
    messagingSenderId: "1048424534619",
    appId: "1:1048424534619:web:acf45c861977fc204ee57e",
    measurementId: "G-34LD5WXJVC"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;