import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA8UD2fccBJnhITvpRMgj3aU_AiXhaTx5w",
  authDomain: "auth-project-53491.firebaseapp.com",
  projectId: "auth-project-53491",
  storageBucket: "auth-project-53491.appspot.com",
  messagingSenderId: "453688216402",
  appId: "1:453688216402:web:d274276b703d636e37488b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
