// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBOLWGsXlH_0URUSRYN9CNPySTUtbnFgVQ",
    authDomain: "employeetask-2ea8b.firebaseapp.com",
    projectId: "employeetask-2ea8b",
    storageBucket: "employeetask-2ea8b.appspot.com",
    messagingSenderId: "516124698444",
    appId: "1:516124698444:web:000a745b09a7fbca6d51e9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);