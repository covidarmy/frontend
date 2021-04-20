import { store } from "~/utils/firebase-admin"
import uuid from "uuid"
import { requestCity } from "~/utils/db"

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async (req, res) => {
  const city = /** @type {string} */ (req.body.city)
  await requestCity(city)
  return res.status(204).end()
}
