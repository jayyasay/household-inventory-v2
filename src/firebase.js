// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyD52OFU2lKCo8QRyAgEdbwVfwfSkLH0pDg",
	authDomain: "household-inventory-v3.firebaseapp.com",
	projectId: "household-inventory-v3",
	storageBucket: "household-inventory-v3.appspot.com",
	messagingSenderId: "658793723629",
	appId: "1:658793723629:web:506c8d7b3140ec9fde7ee4",
	measurementId: "G-0LCL0Q745V"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
// const analytics = getAnalytics(app);
export { db }
