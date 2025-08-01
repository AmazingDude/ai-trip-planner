// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAChWKZmv7ir29wTau6Urrvl8xQUreCE6M",
	authDomain: "ai-trip-planner-f9b72.firebaseapp.com",
	projectId: "ai-trip-planner-f9b72",
	storageBucket: "ai-trip-planner-f9b72.firebasestorage.app",
	messagingSenderId: "775612952896",
	appId: "1:775612952896:web:c6565f586cab9a42260aa5",
	measurementId: "G-HXEHHBDXD6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
