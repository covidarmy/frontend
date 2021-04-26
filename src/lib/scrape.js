const { connectToDatabase } = require("./mongo")
const TweetModel = require("../schemas/tweet")
const fetch = require("node-fetch")

const fetchSearchResults = async (newestID, city, searchTerm) => {
  const MAX_RESULTS = 20
  const baseUrl = newestID
    ? `https://api.twitter.com/2/tweets/search/recent?since_id=${newestID}&query=`
    : `https://api.twitter.com/2/tweets/search/recent?query=`
  const url =
    baseUrl +
    `verified ${city} ${searchTerm} -"requirement" -"requirements" -"requires" -"require" -"required" -"needed" -"needs" -"need" -"seeking" -"seek" -"not verified" -"notverified" -"unverified" -"urgent" -"urgently" -"urgentlyrequired" -"urgently required" -"sending" -"send" -"help" -"dm" -"get" -"year" -"old" -"male" -"female" -"saturation" -is:retweet -is:reply -is:quote&max_results=${MAX_RESULTS}&tweet.fields=created_at,public_metrics&expansions=author_id`

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + process.env.BEARER_TOKEN,
    },
  })
  return response
}

/**
 * @param {Object} tweet
 */
const buildTweetObject = (tweet, city, resource) => {
  return {
    id: tweet.id,
    authorId: tweet.author_id,
    url: `https:www.twitter.com/${tweet.author_id}/status/${tweet.id}`,
    retweetCount: tweet.public_metrics.retweet_count,
    replyCount: tweet.public_metrics.reply_count,
    postedAt: tweet.created_at,
    location: {
      [city]: true,
    },
    resource: {
      ...(Array.isArray(resource)
        ? resource.reduce((acc, cur) => {
            acc[cur] = true
            return acc
          }, {})
        : {
            [resource]: true,
          }),
    },
  }
}

/**
 * @param {Object} params
 * @param {any} [params.newestID]
 * @returns {Promise<void>}
 */
const scrape = async ({ newestID = null }) => {
  const db = await connectToDatabase()
  let totalCalls = 0

  //Ref URL:
  //https://api.twitter.com/2/tweets/search/recent?query=verified mumbai (bed OR beds OR icu OR oxygen OR ventilator OR ventilators OR fabiflu OR remdesivir OR favipiravir OR tocilizumab OR plasma OR tiffin) -"not verified" -"unverified" -"needed" -"required" -"urgent" -"urgentlyrequired" -"help"&max_results=10&tweet.fields=created_at

  const cities = require("../../seeds/cities.json")
  const resources = require("../../seeds/resources.json")

  for (const city in cities) {
    const toSave = []
    let searchTerm = []

    for (let resourceKey in resources) {
      let _searchTerm = resources[resourceKey]
      if (_searchTerm.includes("(")) {
        _searchTerm = _searchTerm.replace(/[()]/g, "")
        if (_searchTerm.includes(" OR ")) {
          _searchTerm = resourceKey.split("OR").map((i) => i.trim())
        }
      }
      if (Array.isArray(_searchTerm)) {
        _searchTerm.forEach((i) => {
          searchTerm.push(i)
        })
      } else {
        searchTerm.push(_searchTerm)
      }
    }

    totalCalls++
    console.log(`Fetching tweets for ${city}\nTotal calls: ${totalCalls}`)
    const validSearchTerm = `(${searchTerm
      .map((i) => i.toLowerCase())
      .join(" OR ")})`
    const response = await fetchSearchResults(newestID, city, validSearchTerm)
    const json = await response.json()

    try {
      if (json.data) {
        console.log(`Found ${json.data.length} Tweets`)
        for (const tweet of json.data) {
          const retweetCount = tweet.public_metrics.retweet_count
          if (retweetCount >= 10) {
            const tweetResources = []
            for (const key of searchTerm) {
              tweet.text = tweet.text.replace(/#(S)/g, " ").toLowerCase().trim()
              if (tweet.text.includes(key.trim().toLowerCase())) {
                tweetResources.push(key.toLowerCase())
              }
            }
            const toSaveObject = buildTweetObject(tweet, city, tweetResources)
            if (toSaveObject) {
              if (Object.keys(toSaveObject.resource).length > 0) {
                toSave.push(toSaveObject)
              }
            }
          }
        }
      }
      newestID = json.meta.newest_id
    } catch (error) {
      console.log(`\n===Error!===\n${error}\n`)
      console.log("Response:", response)
    }
    try {
      let newTweets = 0
      for (const tweet of toSave) {
        // //Check if tweets with the same id exist in the db
        // const docs = await TweetModel.find({ id: tweet.id })
        // //If not, create and return a new obj to be saved in the db
        // if (!docs.length) {
        //   const newTweet = new TweetModel(tweet)
        //   await newTweet.save()
        // } else {
        //   //Iterate through all found tweets
        //   for (const tweetDoc of docs) {
        //     //Update the existing doc's resource object to match the new tweet's resources
        //     for (const res of Object.keys(tweet.resource)) {
        //       if (!tweetDoc.resource.hasOwnProperty(res)) {
        //         tweetDoc[res] = true
        //         await tweetDoc.save()
        //         console.log(
        //           "Existing Tweet Found, Updating resources object to match"
        //         )
        //       }
        //     }
        //   }
        // }
        await TweetModel.create([tweet])
        newTweets++
      }
      console.log(`Saved ${newTweets} Documents`)
    } catch {
      console.log("Error Saving the Documents")
    }
  }

  //Purge Duplicate documents

  return
}

module.exports = { scrape }
