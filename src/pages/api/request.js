import { firebaseAdmin } from "~/utils/firebase-admin"

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async (req, res) => {
  return res.status(200).end()
}
