require("dotenv").config()
const { store, firebaseAdmin } = require("../src/lib/firebase-admin")
const {
  default: {
    firestore: { Timestamp },
  },
} = require("firebase")
const fs = require("fs")
const path = require("path")

;(async () => {
  const ref = store.doc("main/tweets")
  const tweets = (await ref.get()).data()
  fs.writeFileSync(path.resolve(__dirname, "../tweets"), tweets, {
    encoding: "utf-8",
  })
})()
