import { voteTweet } from "~/lib/db"

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async (req, res) => {
  switch (req.method) {
    case "POST": {
      const tweetId = /** @type {string} */ (req.body.tweetId)
      const data = await voteTweet(tweetId, false)
      if (data) {
        return res.status(204).end()
      } else {
        return res.status(500).end()
      }
    }
    default:
      res.status(405).end()
  }
}
