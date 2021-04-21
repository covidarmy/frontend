require("dotenv").config()
const { store, firebaseAdmin } = require("../src/lib/firebase-admin")

;(async () => {
  const doc = store.doc("main/tweets")
  const data = (await doc.get()).data()
  const filtered = {}
  store.doc("main/old").set(data)
  doc.set(
    {},
    {
      merge: false,
    }
  )
})()
