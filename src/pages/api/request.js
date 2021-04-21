import NextCors from "nextjs-cors"
import { corsOptions } from "~/constants"
import { requestCity } from "~/lib/db"

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async (req, res) => {
  await NextCors(req, res, corsOptions)
  switch (req.method) {
    case "POST": {
      const city = /** @type {string} */ (req.body.city)
      await requestCity(city)
      return res.status(204).end()
    }
    default:
      res.status(405).end()
  }
}
