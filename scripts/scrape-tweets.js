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

  await getTweets(
    process.env.CITY ? { [process.env.CITY]: true } : cities,
    resources,
    filterAccounts
  )
})()
