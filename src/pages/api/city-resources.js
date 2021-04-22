import NextCors from "nextjs-cors"
import { corsOptions } from "~/constants"
import { store } from "~/lib/firebase-admin"

/**
 * @type {import("next").NextApiHandler}
 */
export default async (req, res) => {
  await NextCors(req, res, corsOptions)
  switch (req.method) {
    case "GET": {
      const resources = (await store.doc("main/city_resources").get()).data()
      return res.send(resources)
    }
    default:
      res.status(405).end()
  }
}
