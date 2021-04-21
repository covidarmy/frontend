require("dotenv").config()
const { store } = require("../src/lib/firebase-admin")
const { getTweets } = require("../src/lib/scrape")

const resources = {
  Remdesivir: "(remdesivir OR redesvir)",
  "Oxygen Bed": "oxygen bed",
  Oxygen: "(oxygen OR oxygen cylinder)",
  Fabiflu: "fabiflu",
  Tocilizumab: "Tocilizumab",
  Favipiravir: "Favipiravir",
}

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
  const newTweets = await getTweets(cities, resources, filterAccounts)
  const docRef = store.doc("main/tweets")
  await docRef.set(newTweets, {
    merge: true,
  })
})()
