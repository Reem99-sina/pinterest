// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8Ky90qARZ_DlEvfMuWoM0WJJNXaw5hRs",
  authDomain: "pinterest-2d306.firebaseapp.com",
  projectId: "pinterest-2d306",
  storageBucket: "pinterest-2d306.appspot.com",
  messagingSenderId: "485706365859",
  appId: "1:485706365859:web:c0f9ae29a863ca03f73816",
  measurementId: "G-ZNH1VF541G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app