// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: import.meta.env.VITE_GOOGLE_API_KEY || "",
	authDomain:
		import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
		"ai-trip-planner-f9b72.firebaseapp.com",
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ai-trip-planner-f9b72",
	storageBucket:
		import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
		"ai-trip-planner-f9b72.firebasestorage.app",
	messagingSenderId:
		import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "775612952896",
	appId:
		import.meta.env.VITE_FIREBASE_APP_ID ||
		"1:775612952896:web:c6565f586cab9a42260aa5",
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-HXEHHBDXD6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
