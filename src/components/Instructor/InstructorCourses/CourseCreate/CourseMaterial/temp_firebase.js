// firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDOZgO69Aga-KGlC8oYA3q9aMZgYP1Rahs",
    authDomain: "codeverse-7830f.firebaseapp.com",
    projectId: "codeverse-7830f",
    storageBucket: "codeverse-7830f.firebasestorage.app",
    messagingSenderId: "472228766715",
    appId: "1:472228766715:web:cb9901dd6f40fdaf10e15e",
    measurementId: "G-0VBXHV6F27"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
