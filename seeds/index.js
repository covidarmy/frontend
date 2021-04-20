require("dotenv").config()
const { store } = require("../src/utils/firebase-admin")
const cities = require("./cities.json")
const requested = require("./requested.json")
const tweets = require("./tweets.json")

;(async () => {
  await store.doc("main/tweets").set(tweets)
  await store.doc("main/cities").set(cities)
  await store.doc("main/requested").set(requested)
})()
