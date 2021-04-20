import { getTweets } from "~/utils/puppeteer"

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async (req, res) => {
  switch (req.method) {
    case "POST": {
      await getTweets()
    }
    default:
      res.status(405).end()
  }
}
