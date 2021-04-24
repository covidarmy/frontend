const { connectToDatabase } = require("./mongo")
const Tweet = require("~/schemas/tweet")

if (!process.env.VERCEL) {
  const fetch = require("node-fetch")
}

/**
 * @param {Object} params
 * @param {import("~/types").Cities} params.cities
 * @param {import("~/types").Resources} params.resources
 * @param {string[]} params.filterAccounts
 * @param {any} params.newestID
 * @returns {Promise<void>}
 */
module.exports.fetchTweets = async ({
  cities,
  resources,
  filterAccounts,
  newestID,
}) => {
  const MAX_RESULTS = 10
  const NUM_CYCLES = 1
  const db = connectToDatabase()
  //Ref URL:
  //https://api.twitter.com/2/tweets/search/recent?query=verified mumbai (bed OR beds OR icu OR oxygen OR ventilator OR ventilators OR fabiflu OR remdesivir OR favipiravir OR tocilizumab OR plasma OR tiffin) -"not verified" -"unverified" -"needed" -"required" -"urgent" -"urgentlyrequired" -"help"&max_results=10&tweet.fields=created_at

  const baseUrl = newestID
    ? `https://api.twitter.com/2/tweets/search/recent?since_id=${newestID}&query=`
    : `https://api.twitter.com/2/tweets/search/recent?query=`

  for (let i = 0; i < NUM_CYCLES; i++) {
    for (const city in cities) {
      for (const resourceKey in resources) {
        const url =
          baseUrl +
          `verified ${city} ${resources[resourceKey]} -"not verified" -"unverified" -"needed" -"required" -"urgent" -"urgentlyrequired" -"help"&max_results=${MAX_RESULTS}&tweet.fields=created_at,public_metrics&expansions=author_id`
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: process.env.BEARER_TOKEN,
          },
        })

        const data = await response.json()

        try {
          for (const tweet of data) {
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
            })
          }
          newestID = data.meta.newest_id
        } catch (error) {
          console.log(`\n===Error!===\n${error}\n`)
          console.log("Response:", data)
        }
      }
    }
  }
}
