require("dotenv").config()
const { connectToDatabase } = require("../src/lib/mongo")
const Tweet = require("../src/schemas/tweet")
const City = require("../src/schemas/resource")
const Resource = require("../src/schemas/city")
const cities = require("./cities.json")
const tweets = require("./tweets.json")

;(async () => {
  const db = await connectToDatabase()
  for (const { tweetId: id } of Object.values(tweets)) {
  }
  console.log(Object.keys(tweets).length)
})()
