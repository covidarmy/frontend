import NextCors from "nextjs-cors"
import { corsOptions } from "~/constants"
import { voteTweet } from "~/lib/db"

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async (req, res) => {
  await NextCors(req, res, corsOptions)
  switch (req.method) {
    case "POST": {
      const tweetId = /** @type {string} */ (req.body.tweetId)
      const test = await voteTweet(tweetId, false)
      if (test) {
        res.status(204).end()
      } else {
        res.status(500).end()
      }
    }
    default:
      res.status(405).end()
  }
}
