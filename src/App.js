// Project Components

import Navbar from './components/Navbar';
import Trades from './components/Trades';

// CSS Stylesheets

import './index.css'

// Material UI components

import Button from '@material-ui/core/Button';

// Firebase

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';


// Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBz1OC5jxn0X7DGnMQ2l5UScor6YJHu3BY",
  authDomain: "tradetracker-3e218.firebaseapp.com",
  projectId: "tradetracker-3e218",
  storageBucket: "tradetracker-3e218.appspot.com",
  messagingSenderId: "322748434766",
  appId: "1:322748434766:web:593bb92964707431bef61f",
  measurementId: "G-BKB3HRR8CC"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();
const auth = firebase.auth();

function App() {

  const [user] = useAuthState(auth);

  if (user) {
    return (
      <div className="App">
        <Navbar user={user} logoutFunc={logout} />
        <Trades uid={user.uid} db={db} />
      </div>
    );
  }
  else {
    return (
      <div className="App">
        <Login />
      </div>
    );
  }
}

function Login() {
  const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider)
      .then((user) => console.log(`User ${user.user.displayName} has logged in successfully with Google.`))
      .catch((error) => console.log(error.message, error.code));
  }

  return (
    <div className="login">
      <Button variant="contained" color="primary" onClick={signInWithGoogle}>Sign In with Google</Button>
    </div>
  );
}

function logout() {
  auth.signOut();
}

export default App;