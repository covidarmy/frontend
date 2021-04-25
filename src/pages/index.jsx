import { Dashboard } from "~/components/Dashboard"
import Navbar from "~/components/Navbar"

const IndexPage = ({ tweets, resources, cities }) => {
  return (
    <div className="container w-screen overflow-x-hidden lg:mx-16 mx-4">
      <Navbar />
      <Dashboard
        data={{
          tweets,
          resources,
          cities,
          city: undefined,
          resource: undefined,
        }}
      />
    </div>
  )
}

/**
 * @type {import("next").GetStaticProps<{}, {}>}
 */
export const getStaticProps = async () => {
  const { connectToDatabase } = require("../lib/mongo")
  await connectToDatabase()
  const TweetModel = require("../schemas/tweet")
  const cities = Object.keys(require("seeds/cities.json"))
  const resources = Object.keys(require("seeds/resources.json"))

  if (!global.tweets) await TweetModel.find({})
  /** @type {Object[]} */
  let tweets = global.tweets

  tweets = tweets.map((item) => {
    const { _id, __v, createdAt, updatedAt, ...doc } = item._doc
    return doc
  })

  return {
    props: {
      tweets,
      resources,
      cities,
    },
    revalidate: 180,
  }
}

export default IndexPage
