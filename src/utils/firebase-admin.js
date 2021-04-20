import * as firebaseAdmin from "firebase-admin"
import { projectId } from "./firebase"

const privateKey = process.env.FB_PRIVATE_KEY
const clientEmail = process.env.FB_CLIENT_EMAIL

if (!privateKey || !clientEmail || !projectId) {
  console.log(
    `Failed to load Firebase credentials. Follow the instructions in the README to set your Firebase credentials inside environment variables.`
  )
}

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: privateKey,
      clientEmail,
      projectId,
    }),
    databaseURL: `https://${projectId}.firebaseio.com`,
  })
}

export { firebaseAdmin }
