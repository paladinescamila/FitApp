const firebaseConfig = {
    apiKey: "AIzaSyDqj3-QL0NH92lEqGGCZRHiUTnfXdtV_W8",
    authDomain: "fitappsoft.firebaseapp.com",
    projectId: "fitappsoft",
    storageBucket: "fitappsoft.appspot.com",
    messagingSenderId: "979155495236",
    appId: "1:979155495236:web:c8bf225edbfcdfdcd00f11",
    measurementId: "G-797PJGJ085"
};
firebase.initializeApp(firebaseConfig);

// firebase 7.15.1
const db = firebase.firestore();

const usersRef = db.collection("users");
const infoRef = db.collection("info");