import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const apiKey = import.meta.env.VITE_REACT_APP_API_KEY; // Usa import.meta.env per Vite

const fbconfig = {
    apiKey: apiKey,
    authDomain: "cv-app-1faf1.firebaseapp.com",
    projectId: "cv-app-1faf1",
    storageBucket: "cv-app-1faf1.appspot.com",
    messagingSenderId: "382177596464",
    appId: "1:382177596464:web:03f124741dcbc3506c89f5"
};

const app = initializeApp(fbconfig);
const db = getFirestore(app);

export { db };
