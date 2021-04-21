require("dotenv").config()
const { store, firebaseAdmin } = require("../src/lib/firebase-admin")
const {
  default: {
    firestore: { Timestamp },
  },
} = require("firebase")

;(async () => {
  const doc = store.doc("main/tweets")
  const data = (await doc.get()).data()
  const filtered = {}
  for (const [id, metadata] of Object.entries(data)) {
    console.log(typeof metadata.createdAt)
  }
  //   doc.update(filtered)
  //   console.log((await doc.get()).data())
})()
