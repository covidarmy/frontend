import { voteTweet } from "~/utils/db"

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async (req, res) => {
  const tweetId = /** @type {string} */ (req.body.tweetId)
  const data = await voteTweet(tweetId, false)
  if (data) {
    return res.status(204).end()
  } else {
    return res.status(500).end()
  }
}
