"use client"

import React from 'react'
import { auth, googleAuthProvider, db } from '@/lib/firebase';
import { doc, setDoc } from "firebase/firestore"; 
import { signInWithPopup } from 'firebase/auth';

export const SignUp = () => {
  const signInWithGoogle = async () => {
    const userData = await signInWithPopup(auth, googleAuthProvider);
    await setDoc(doc(db, "users", userData.user.uid), {
      water: [],
      steps: [],
      weight: [],
      calories: [],
    });
  };

  return (
    <button onClick={signInWithGoogle}>
      Sign in with Google
    </button>
  );
}