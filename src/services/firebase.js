import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const apiKey = import.meta.env.VITE_REACT_APP_API_KEY; // Usa import.meta.env per Vite

const fbconfig = {
    apiKey: apiKey,
    authDomain: "cv-app-preview.firebaseapp.com",
    projectId: "cv-app-preview",
    storageBucket: "cv-app-preview.appspot.com",
    messagingSenderId: "40818603084",
    appId: "1:40818603084:web:13c493b7079b6997bb30e9"
};

const app = initializeApp(fbconfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage }; 
