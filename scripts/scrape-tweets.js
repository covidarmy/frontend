require("dotenv").config()

const { store } = require("../src/lib/firebase-admin")
const { getTweets } = require("../src/lib/scrape")

const filterAccounts = [
  "IndiaToday",
  "LiveLawIndia",
  "ANI",
  "PTI_NEWS",
  "TOIMumbai",
  "BDUTT",
  "VtvGujarati",
]

;(async () => {
  /** @type {import("../src/types").Cities} */
  const cities = (await store.doc("main/cities").get()).data()
  const resources = (await store.doc("main/resources").get()).data()

  await getTweets(
    process.env.CITY ? { [process.env.CITY]: true } : cities,
    resources,
    filterAccounts
  )
})()
