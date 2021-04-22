import NextCors from "nextjs-cors"
import { corsOptions } from "~/constants"

/**
 * @type {import("next").NextApiHandler}
 */
export default async (req, res) => {
  await NextCors(req, res, corsOptions)
  switch (req.method) {
    case "POST": {
      return res.status(204).end()
    }
    default:
      res.status(405).end()
  }
}
