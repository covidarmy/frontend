const { connectToDatabase } = require("./mongo")
const TweetModel = require("../schemas/tweet")
const fetch = require("node-fetch")

/**
 * @param {Object} params
 * @param {any} params.newestID
 * @returns {Promise<void>}
 */
const fetchTweets = async ({ newestID = null }) => {
  const MAX_RESULTS = 50
  await connectToDatabase()

  //Ref URL:
  //https://api.twitter.com/2/tweets/search/recent?query=verified mumbai (bed OR beds OR icu OR oxygen OR ventilator OR ventilators OR fabiflu OR remdesivir OR favipiravir OR tocilizumab OR plasma OR tiffin) -"not verified" -"unverified" -"needed" -"required" -"urgent" -"urgentlyrequired" -"help"&max_results=10&tweet.fields=created_at

  const cities = require("../../seeds/cities.json")
  const resources = require("../../seeds/resources.json")

  const baseUrl = newestID
    ? `https://api.twitter.com/2/tweets/search/recent?since_id=${newestID}&query=`
    : `https://api.twitter.com/2/tweets/search/recent?query=`

  for (const city in cities) {
    for (const resourceKey in resources) {
      const url =
        baseUrl +
        `verified ${city} ${resources[resourceKey]} -"requirement" -"needed" -"needs" -"need" -"not verified" -"unverified" -"required" -"urgent" -"urgentlyrequired" -"help"&max_results=${MAX_RESULTS}&tweet.fields=created_at,public_metrics&expansions=author_id`

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + process.env.BEARER_TOKEN,
        },
      })

      try {
        const json = await response.json()

        if (json.data)
          for (const tweet of json.data) {
            const retweetCount = tweet.public_metrics.retweet_count
            if (retweetCount >= 10) {
              const newTweet = new TweetModel({
                id: tweet.id,
                authorId: tweet.author_id,
                url: `https:www.twitter.com/${tweet.author_id}/status/${tweet.id}`,
                retweetCount,
                replyCount: tweet.public_metrics.reply_count,
                postedAt: tweet.created_at,
                location: {
                  [city]: true,
                },
                resource: {
                  [resourceKey]: true,
                },
              })
              await newTweet.save()
            }
          }
        newestID = json.meta.newest_id
      } catch (error) {
        console.log(`\n===Error!===\n${error}\n`)
        console.log("Response:", data)
      }
    }
  }
}

fetchTweets({ newestID: null })
module.exports.fetchTweets = fetchTweets
