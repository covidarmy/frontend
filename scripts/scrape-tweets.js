require("dotenv").config()
const { store } = require("../src/lib/firebase-admin")
const { getTweets } = require("../src/lib/scrape")

const resources = {
  Remdesivir: "(remdesivir OR redesvir)",
  Oxygen: '("oxygen" OR "oxygen cylinder" OR "oxygen bed")',
  Ventilator: '("ventilator" OR "ventilator bed")',
  Fabiflu: "fabiflu",
  Tocilizumab: "Tocilizumab",
  Favipiravir: "Favipiravir",
  Plasma: '("plasma" OR "plasma donor")',
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
  for (const city of Object.keys(cities)) {
    const filtered = Object.entries(newTweets).reduce((acc, [id, data]) => {
      if (cur.location[city] === true) {
        acc[id] = data
      }
      return acc
    }, {})
    await store.doc("data/" + city).set(filtered, {
      merge: true,
    })
  }
})()
