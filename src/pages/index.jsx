import { useRouter } from "next/router"
import { Dashboard } from "~/components/Dashboard"
import Navbar from "~/components/Navbar"

const IndexPage = ({ tweets, resources, cities }) => {
  return (
    <div className="w-screen">
      <Navbar />
      <Dashboard
        data={{
          tweets,
          resources,
          cities,
          city: null,
          resource: null,
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
  const { scrape } = require("../lib/scrape")
  await connectToDatabase()
  const TweetModel = require("../schemas/tweet")
  const cities = Object.keys(require("seeds/cities.json"))
  const resources = Object.keys(require("seeds/resources.json"))

  if (!global.isScraped && process.env.NODE_ENV === "production") {
    await scrape({})
    //global.isScraped = true
  }

  /* if (!global.tweets) */ global.tweets = await TweetModel.find({})
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
    revalidate: 120,
  }
}

export default IndexPage
