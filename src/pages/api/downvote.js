import { statusDownvote } from "~/lib/db"

/**
 * @type {import("next").NextApiHandler}
 */
export default async (req, res) => {
  switch (req.method) {
    case "POST": {
      const { id } = req.body
      return res.status(200).send(await statusDownvote(id))
    }
    default:
      res.status(405).end()
  }
}
