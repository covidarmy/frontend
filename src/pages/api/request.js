import { requestCity } from "~/lib/db"

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async (req, res) => {
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
