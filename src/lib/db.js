const { connectToDatabase } = require("./mongo")
const TweetModel = require("../schemas/tweet")

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
  const query = {}
  if (typeof city === "string" && typeof resource === "string") {
    let key1 = "location." + city
    query[key1] = true
    let key2 = "resource." + resource
    query[key2] = true
  } else if (typeof city === "string") {
    let key = "location." + city
    query[key] = true
  } else if (typeof resource === "string") {
    let key = "resource." + resource
    query[key] = true
  }

  const result = await TweetModel.find(query).exec()
  return result.map((item) => {
    const { _id, __v, createdAt, updatedAt, ...doc } = item._doc
    return doc
  })
}

module.exports.getAllTweets = async () => {
  await connectToDatabase()
  const result = await TweetModel.find({})
  return result.map((item) => {
    const { _id, __v, createdAt, updatedAt, ...doc } = item._doc
    return doc
  })
}

module.exports.getCityResources = async () => {
  //return (await store.doc("main/city_resources").get()).data()
  return {}
}
