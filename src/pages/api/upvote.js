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
      return await voteTweet(tweetId, false)
    }
    default:
      res.status(405).end()
  }
}
