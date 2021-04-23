const uuid = require("uuid")
const { connectToDatabase } = require("./mongo")

/**
 * @param {string} city
 */
module.exports.addCity = async (city) => {
  const db = await connectToDatabase()
}

/**
 * @param {string} tweetId
 * @param {boolean} downvote
 */
module.exports.voteTweet = async (tweetId, downvote) => {
  const db = await connectToDatabase()
  const doc = store.doc("main/tweets")
  const data = (await doc.get()).data()
  const tweet = Object.entries(data).filter(
    ([id, metadata]) => metadata.tweetId === tweetId
  )[0]
  if (!tweet) {
    throw new Error("Tweet doesn't exist")
  } else {
    return await doc.set(
      {
        [tweet[0]]: {
          ...tweet[1],
          votes: downvote ? tweet[1].votes - 1 : tweet[1].votes + 1,
        },
      },
      {
        merge: true,
      }
    )
  }
}

module.exports.getTweets = async () => {
  const db = await connectToDatabase()
  const ref = await store.collection("tweets").get()
  const tweets = ref.docs.reduce((acc, doc) => {
    acc = {
      ...acc,
      ...doc.data(),
    }
    return acc
  }, {})
  return Object.entries(tweets).reduce((acc, [id, metadata]) => {
    /** @type {import("firebase").default.firestore.Timestamp} */
    const createdAt = metadata.createdAt
    /** @type {import("firebase").default.firestore.Timestamp} */
    const postedAt = metadata.postedAt
    acc[id] = {
      ...metadata,
      createdAt: createdAt.toDate().toISOString(),
      ...(postedAt
        ? {
            postedAt: postedAt.toDate().toISOString(),
          }
        : {}),
    }
    return acc
  }, {})
}

module.exports.getCities = async () => {
  return (await store.doc("main/cities").get()).data()
}

module.exports.getResources = async () => {
  return (await store.doc("main/resources").get()).data()
}

module.exports.getCityResources = async () => {
  return (await store.doc("main/city_resources").get()).data()
}
