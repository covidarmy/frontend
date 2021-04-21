import NextCors from "nextjs-cors"
import { isProduction } from "~/constants"
import { voteTweet } from "~/lib/db"

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async (req, res) => {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: isProduction ? ["arnavgosain.com", "vercel.app"] : "localhost",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
  switch (req.method) {
    case "POST": {
      const tweetId = /** @type {string} */ (req.body.tweetId)
      return await voteTweet(tweetId, false)
    }
    default:
      res.status(405).end()
  }
}
