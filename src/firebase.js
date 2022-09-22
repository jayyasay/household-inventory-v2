// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyAT6xI_5uI6rxaKfX3wi0YUqV6k4x6AfG8',
	authDomain: 'household-inventory-v2.firebaseapp.com',
	projectId: 'household-inventory-v2',
	storageBucket: 'household-inventory-v2.appspot.com',
	messagingSenderId: '144275038288',
	appId: '1:144275038288:web:cd9dcd74c3a2a051b3b155',
	measurementId: 'G-DJY3F0KFNV'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
// const analytics = getAnalytics(app);
export { db }
