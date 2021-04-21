import uuid from "uuid"
import { store } from "./firebase-admin"

/**
 * @param {string} city
 */
export const requestCity = async (city) => {
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
export const voteTweet = async (tweetId, downvote) => {
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

export const getTweets = async () => {
  const ref = store.doc("main/tweets")
  const tweets = (await ref.get()).data()
  return Object.entries(tweets).reduce((acc, [id, metadata]) => {
    const createdAt = /** @type {import("firebase").default.firestore.Timestamp} */ (metadata.createdAt)
    acc[id] = {
      ...metadata,
      createdAt: createdAt.toDate().toISOString(),
    }
    return acc
  }, {})
}
