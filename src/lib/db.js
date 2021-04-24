const { connectToDatabase } = require("./mongo")
const TweetModel = require("../schemas/tweet.js")
const CityModel = require("../schemas/city.js")
const ResModel = require("../schemas/resource.js")

/**
 * @param {string} city
 */
module.exports.addCity = async (city) => {
  await connectToDatabase()
}

/**
 * @param {string} tweetId
 */
module.exports.statusUpvote = async (tweetId) => {
  await connectToDatabase()
  return await TweetModel.findOneAndUpdate(
    {
      id: tweetId,
    },
    {
      $inc: {
        status: 1,
      },
    }
  )
}

/**
 * @param {string} tweetId
 */
module.exports.statusDownvote = async (tweetId) => {
  await connectToDatabase()
  return await TweetModel.findOneAndUpdate(
    {
      id: tweetId,
    },
    {
      $inc: {
        status: -1,
      },
    }
  )
}

module.exports.getTweets = async (city, resource) => {
  await connectToDatabase()
  var query = {}
  if (typeof city === "string" && typeof resource === "string") {
    let key1 = "location." + city
    query[key1] = true

    let key2 = "for." + resource
    query[key2] = true
  } else if (typeof city === "string") {
    let key = "location." + city
    query[key] = true
  } else if (typeof resource === "string") {
    let key = "for." + resource
    query[key] = true
  }

  return await TweetModel.find(query).exec()
}

module.exports.getAllTweets = async () => {
  await connectToDatabase()
  var query = {}
  return await TweetModel.find(query).exec()
}

module.exports.getCities = async () => {
  return await CityModel.find({})
}

module.exports.getResources = async () => {
  return await ResModel.find({})
}

module.exports.getCityResources = async () => {
  //return (await store.doc("main/city_resources").get()).data()
  return {}
}
