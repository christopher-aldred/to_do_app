import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

async function app() {
  // console.log("** PROD environment **");
  return initializeApp({
    apiKey: "AIzaSyAZQkh1CImrGhz16LAyJzpRT2UwXa9x1Qs",
    authDomain: "to-do-app-fd1c0.firebaseapp.com",
    projectId: "to-do-app-fd1c0",
    storageBucket: "to-do-app-fd1c0.appspot.com",
    messagingSenderId: "546532290074",
    appId: "1:546532290074:web:ac08936688238af91b6ba3",
  });
}

const db = getFirestore(await app());
export default db;
