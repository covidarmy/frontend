require("dotenv").config()

const mongoose = require("mongoose")

const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/covid_app"

mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ Databse Connected!")
  })

const fetch = require("node-fetch")

const TweetSchema = mongoose.Schema(
  {
    id: String,
    show: { type: Boolean, default: true },
    url: String,
    postedAt: String,
    authorId: String,
    retweetCount: Number,
    replyCount: Number,
    status: mongoose.Schema.Types.Mixed,
    location: mongoose.Schema.Types.Mixed,
    resource: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
)

const Tweet = mongoose.model("Tweet", TweetSchema)

const cities = {
  Jabalpur: true,
  Surat: true,
  Hyderabad: true,
  Indore: true,
  Bihar: true,
  Dehradun: true,
  Haryana: true,
  Gurgaon: true,
  Kanpur: true,
  Lucknow: true,
  Faridabad: true,
  Coimbatore: true,
  Mumbai: true,
  Pune: true,
  Chandigarh: true,
  Ranchi: true,
  Gorakhpur: true,
  Noida: true,
  Thane: true,
  Chennai: true,
  Nagpur: true,
  Patna: true,
  Bangalore: true,
  Jharkhand: true,
  Kolkata: true,
  Nashik: true,
  Bhopal: true,
  Allahbad: true,
  Ahmedabad: true,
  Ghaziabad: true,
  Jaipur: true,
  Delhi: true,
  Varanasi: true,
  Agra: true,
}

const resources = {
  Bed: "bed OR beds",
  Remdesivir: "remdesivir OR redesvir",
  Favipiravir: "Favipiravir",
  Fabiflu: "fabiflu",
  Oxygen: '"oxygen" OR "oxygen cylinder" OR "oxygen bed"',
  Ventilator: '"ventilator" OR "ventilator bed" -"no ventilator"',
  Plasma: '"plasma" OR "plasma donor"',
  Tocilizumab: "Tocilizumab",
}

const MAX_RESULTS = 10
const NUM_CYCLES = 1

const fetchTweets = async (newestID = null) => {
  //Ref URL:
  //https://api.twitter.com/2/tweets/search/recent?query=verified mumbai (bed OR beds OR icu OR oxygen OR ventilator OR ventilators OR fabiflu OR remdesivir OR favipiravir OR tocilizumab OR plasma OR tiffin) -"not verified" -"unverified" -"needed" -"required" -"urgent" -"urgentlyrequired" -"help"&max_results=10&tweet.fields=created_at

  baseUrl = newestID
    ? `https://api.twitter.com/2/tweets/search/recent?since_id=${newestID}&query=`
    : `https://api.twitter.com/2/tweets/search/recent?query=`

  let fetchedTweets = 0

  for (let i = 0; i < NUM_CYCLES; i++) {
    for (city in cities) {
      for (resourceKey in resources) {
        url =
          baseUrl +
          `verified ${city} (${resources[resourceKey]}) -"not verified" -"unverified" -"needed" -"required" -"urgent" -"urgentlyrequired" -"help"&max_results=${MAX_RESULTS}&tweet.fields=created_at,public_metrics&expansions=author_id`
        console.log("======")
        console.log("Newest ID:", newestID)
        console.log("Total Fetched Tweets:", fetchedTweets)
        console.log("Fetching:", url)
        console.log("======")
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: process.env.BEARER_TOKEN,
          },
        })
        try {
          resJson = await response.json()

          for (tweet of resJson.data) {
            const tweetObj = {
              id: tweet.id,
              authorId: tweet.author_id,
              url: `https:www.twitter.com/${tweet.author_id}/status/${tweet.id}`,
              retweetCount: tweet.public_metrics.retweet_count,
              replyCount: tweet.public_metrics.reply_count,
              postedAt: tweet.created_at,
              status: {
                busy: 0,
                invalid: 0,
                working: 1,
              },
              location: {
                [city]: true,
              },
              resource: {
                [resourceKey]: true,
              },
            }
            const newTweet = new Tweet(tweetObj)
            newTweet.save((err) => {
              if (err) console.log(err)
              console.log("Tweet Saved!")
              fetchedTweets++
            })
          }
          newestID = resJson.meta.newest_id
        } catch (error) {
          console.log(`\n===Error!===\n${error}\n`)
          console.log("Response:", resJson)
        }
      }
    }
  }
  return { newestId, fetchedTweets }
}

fetchTweets()
