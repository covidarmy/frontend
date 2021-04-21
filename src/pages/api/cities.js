import NextCors from "nextjs-cors"
import { isProduction } from "~/constants"
import { store } from "~/lib/firebase-admin"

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
