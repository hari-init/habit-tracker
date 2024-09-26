import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDBZI2XS72Ne-sNxRpd2VWGZDrRwT3BfLY',
  authDomain: 'habit-tracker-97ac8.firebaseapp.com',
  projectId: 'habit-tracker-97ac8',
  storageBucket: 'habit-tracker-97ac8.appspot.com',
  messagingSenderId: '213155356888',
  appId: '1:213155356888:web:c0bc0d757572c1fe8537ad',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };