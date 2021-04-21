const admin = require("firebase-admin")

const projectId = process.env.FB_PROJECT_ID
const privateKey = process.env.FB_PRIVATE_KEY
const clientEmail = process.env.FB_CLIENT_EMAIL

if (!privateKey || !clientEmail || !projectId) {
  console.log(
    `Failed to load Firebase credentials. Follow the instructions in the README to set your Firebase credentials inside environment variables.`
  )
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: privateKey,
      clientEmail,
      projectId,
    }),
    projectId,
    databaseURL: `https://${projectId}.firebaseio.com`,
  })
}

const store = admin.firestore()

module.exports.firebaseAdmin = admin
module.exports.store = store
