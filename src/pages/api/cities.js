import { store } from "~/utils/firebase-admin"

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async (req, res) => {
  switch (req.method) {
    case "GET": {
      const data = Object.keys((await store.doc("main/cities").get()).data())
      if (data) {
        return res.status(204).send(data)
      } else {
        return res.end()
      }
    }
    default:
      res.status(405).end()
  }
}
