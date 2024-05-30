import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBzFFvwkgyMvdN-R0O0lPgb7Je3jzQNGtc",
    authDomain: "movie-25fd4.firebaseapp.com",
    projectId: "movie-25fd4",
    storageBucket: "movie-25fd4.appspot.com",
    messagingSenderId: "81550969081",
    appId: "1:81550969081:web:40195e67485d0b8785ba28",
    measurementId: "G-3J7XR5WEJ2"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export { auth, db };
