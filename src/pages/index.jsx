import * as React from "react"
import { Dashboard } from "~/components/Dashboard"
import Navbar from "~/components/Navbar"

const IndexPage = ({ tweets, resources, cities, lastUpdated }) => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Navbar lastUpdated={lastUpdated} />
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
  const cities = Object.keys(require("seeds/cities.json"))
  const resources = Object.keys(require("seeds/resources.json"))

  /** @type {Object[]} */
  /*
  let tweets = await TweetModel.find({}) 

  tweets = tweets.map((item) => {
    const { _id, __v, createdAt, updatedAt, ...doc } = item._doc
    return doc
  })

  fs.writeFileSync("tweets.json", JSON.stringify(tweets))
  */
  return {
    props: {
      //tweets,
      resources,
      cities,
      lastUpdated: Date.now(),
    },
    revalidate: 300,
  }
}

export default IndexPage
