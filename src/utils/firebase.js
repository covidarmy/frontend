import firebase from "firebase/app"
import "firebase/analytics"

export const projectId = process.env.NEXT_PUBLIC_FB_PROJECT_ID

export const initFirebase = () => {
  if (typeof window !== undefined && !firebase.apps.length) {
    firebase.initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
      authDomain: projectId + ".firebaseapp.com",
      projectId: projectId,
      storageBucket: projectId + ".appspot.com",
      messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FB_APP_ID,
    })
  }
  return firebase
}
