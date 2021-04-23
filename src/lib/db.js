const uuid = require("uuid")
const { store } = require("./firebase-admin")

/**
 * @param {string} city
 */
const requestCity = async (city) => {
  const doc = store.doc("requested")
  const data = Object.values((await doc.get()).data())

  if (!data.filter((i) => i.city.toLowercase() === city.toLowerCase()).length) {
    return await doc.set(
      {
        [uuid.v4()]: {
          city,
          status: "requested",
        },
      },
      {
        merge: true,
      }
    )
  }
}

/**
 * @param {string} tweetId
 * @param {boolean} downvote
 */
const voteTweet = async (tweetId, downvote) => {
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

const getTweets = async () => {
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

const getCities = async () => {
  return (await store.doc("main/cities").get()).data()
}

const getResources = async () => {
  return (await store.doc("main/resources").get()).data()
}

const getCityResources = async () => {
  return (await store.doc("main/city_resources").get()).data()
}

module.exports = {
  getCities,
  getCityResources,
  getResources,
  getTweets,
  voteTweet,
  requestCity,
}
