import { store } from "~/utils/firebase-admin"

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async (req, res) => {
  switch (req.method) {
    case "GET": {
      const tweets = Object.entries(
        (await store.doc("main/tweets").get()).data()
      )
        .map(([id, metadata]) => {
          return {
            id,
            ...metadata,
          }
        })
        .filter((i) => i.show)
      if (tweets) {
        return res.status(204).send(tweets)
      } else {
        return res.end()
      }
    }
    default:
      res.status(405).end()
  }
}
