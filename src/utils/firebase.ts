import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAaS6GgIpTiDDmQ2G15doQFoKJjIDuIJDA",
  authDomain: "homestyle-catering-c1aaf.firebaseapp.com",
  projectId: "homestyle-catering-c1aaf",
  storageBucket: "homestyle-catering-c1aaf.firebasestorage.app",
  messagingSenderId: "235419209340",
  appId: "1:235419209340:web:54e723fb20bddd94c3c3f9",
  measurementId: "G-GH0FK0C54B"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Analytics (only on client side and if supported)
let analytics: any;

if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics, auth, db };
