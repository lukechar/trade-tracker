// React

import React, { useState } from 'react';

// Firebase config

import { firebaseConfig } from './firebaseConfig';

// Project Components

import Navbar from './components/Navbar';
import Trades from './components/Trades';
import EditTrade from './components/EditTrade';
import NewTrade from './components/NewTrade';

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

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();
const auth = firebase.auth();

function App() {

  const [user] = useAuthState(auth);

  const [action, setAction] = useState(null);
  const [selectedTradeId, setSelectedTradeId] = useState(null);

  if (user) {
    return (
      <div className="App">
        <Navbar user={user} logoutFunc={logout} />
        { 
          (action === 'new') ? 
          <NewTrade uid={user.uid} db={db} setAction={setAction} />
        : (action === 'edit') ?
          <EditTrade uid={user.uid} db={db} tradeId={selectedTradeId} />
        :
          <Trades uid={user.uid} db={db} setAction={setAction} setSelectedTradeId={setSelectedTradeId} />
        }
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