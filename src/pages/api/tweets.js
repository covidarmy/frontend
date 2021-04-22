import NextCors from "nextjs-cors"
import { isProduction } from "~/constants"
import { store } from "~/lib/firebase-admin"
import { getCities, getTweets } from "~/lib/db"

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
    case "GET": {
      const city = req.query?.city
      const resource = req.query?.resource
      let tweets = Object.values(await getTweets())
      if (typeof city === "string") {
        const cities = await getCities()
        if (typeof cities[city])
          tweets = tweets.filter(
            (tweet) => typeof tweet.location[city] !== "undefined"
          )
      }
      if (typeof resource === "string") {
        tweets = tweets.filter(
          (tweet) =>
            typeof tweet.for[resource] === "boolean" &&
            tweet.for[resource] === true
        )
      }
      return res.status(200).send(tweets.sort())
    }
    default:
      res.status(405).end()
  }
}
