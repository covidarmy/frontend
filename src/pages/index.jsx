import * as React from "react"
import { useRouter } from "next/router"
import { Dashboard } from "~/components/Dashboard"
import Navbar from "~/components/Navbar"

const IndexPage = ({ tweets, resources, cities }) => {
  const router = useRouter()

  React.useEffect(() => {
    router.push("/delhi")
  }, [])

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
  const fs = require("fs")
  
  /** @type {Object[]} */
  let tweets = await TweetModel.find({}) 

  tweets = tweets.map((item) => {
    const { _id, __v, createdAt, updatedAt, ...doc } = item._doc
    return doc
  })

  fs.writeFileSync("tweets.json", JSON.stringify(tweets))

  return {
    props: {
      tweets,
      resources,
      cities,
    },
    revalidate: 300,
  }
}

export default IndexPage
