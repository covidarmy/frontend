require("dotenv").config()
const { getTweets, getCities, getResources } = require("../src/lib/db")
const fs = require("fs")
const path = require("path")
;(async () => {
  fs.writeFileSync(
    path.resolve(__dirname, "../tweets.json"),
    JSON.stringify(await getTweets(), null, 4)
  )
  fs.writeFileSync(
    path.resolve(__dirname, "../cities.json"),
    JSON.stringify(await getCities(), null, 4)
  )
  fs.writeFileSync(
    path.resolve(__dirname, "../resources.json"),
    JSON.stringify(await getResources(), null, 4)
  )
})()
