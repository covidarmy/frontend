import firebase from "firebase/app"
import "firebase/auth"
import "firebase/analytics"
import "firebase/firestore"

const config = Object.freeze({
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
  authDomain: process.env.NEXT_PUBLIC_FB_PROJECT_ID + ".firebaseapp.com",
  storageBucket: process.env.NEXT_PUBLIC_FB_PROJECT_ID + ".appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGING_ID,
  appId: process.env.NEXT_PUBLIC_FB_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FB_MEASUREMENT_ID,
})

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export const fb = firebase
export const auth = firebase.auth
