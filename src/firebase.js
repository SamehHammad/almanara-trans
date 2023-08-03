import "firebase/app";
import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, GoogleAuthProvider, getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBW_tC1D2HAKMjg1QpcdeDJylCjYMHCjL8",
  authDomain: "clone-8dc55.firebaseapp.com",
  projectId:"clone-8dc55",
  storageBucket: "clone-8dc55.appspot.com",
  messagingSenderId: "655560134592",
  appId: "1:655560134592:web:90c1ba412b02c0efbe8225",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db =getFirestore(app);
const storage = getStorage(app);
const gProvider = new GoogleAuthProvider();
const fProvider = new FacebookAuthProvider();

export { auth, db, storage,gProvider,fProvider };
