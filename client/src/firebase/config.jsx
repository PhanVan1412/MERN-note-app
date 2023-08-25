// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBSpHRGnluHGEalTP4l7l3ScgJqtRC1n_4',
  authDomain: 'note-app-3eae4.firebaseapp.com',
  projectId: 'note-app-3eae4',
  storageBucket: 'note-app-3eae4.appspot.com',
  messagingSenderId: '205515856911',
  appId: '1:205515856911:web:c0f3e08038e8774ab9177a',
  measurementId: 'G-FL5R5PR4D5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
