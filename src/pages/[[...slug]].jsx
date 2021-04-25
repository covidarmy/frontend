import { Dashboard } from "~/components/Dashboard"
import Navbar from "~/components/Navbar"
import TweetsList from "~/components/TweetsList"

const CityPage = ({ tweets, resources, cities }) => {
  return (
    <div>
      <Navbar />
      <Dashboard cities={cities} resources={resources} />
      <TweetsList data={tweets} />
    </div>
  )
}

/**
 * @type {import("next").GetStaticProps<{}, { slug: Array<string> }>}
 */
export const getStaticProps = async (ctx) => {
  const { connectToDatabase } = require("../lib/mongo")
  await connectToDatabase()
  const TweetModel = require("../schemas/tweet")
  const cities = Object.keys(require("seeds/cities.json"))
  const resources = Object.keys(require("seeds/resources.json"))
  const { slug } = ctx.params

  if (!global.tweets) await TweetModel.find({})
  /** @type {Object[]} */
  let tweets = global.tweets

  tweets = tweets.map((item) => {
    const { _id, __v, createdAt, updatedAt, ...doc } = item._doc
    return doc
  })

  if (typeof slug !== "undefined" && Array.isArray(slug)) {
    // /city route
    if (slug.length === 1 && slug[0] !== "/") {
      if (cities.map((i) => i.toLowerCase()).includes(slug[0])) {
        tweets = Object.values(tweets).filter((tweet) => {
          return typeof tweet.location[slug[0]] !== "undefined"
        })
      }

      if (resources.map((i) => i.toLowerCase()).includes(slug[0])) {
        tweets = Object.values(tweets).filter((tweet) => {
          return typeof tweet.location[slug[0]] !== "undefined"
        })
      }
    }

    // Nested /city/resource route
    if (slug.length === 2) {
      tweets = Object.values(tweets).filter((tweet) => {
        return (
          typeof tweet.resource[slug[1]] !== "undefined" &&
          typeof tweet.location[slug[0]] !== "undefined"
        )
      })
    }
  }

  return {
    props: {
      tweets,
      resources,
      cities,
    },
    revalidate: 180,
  }
}

/**
 * @type {import("next").GetStaticPaths}
 */
export const getStaticPaths = async () => {
  const { connectToDatabase } = require("../lib/mongo")
  const { scrape } = require("../lib/scrape")
  await connectToDatabase()
  const resources = Object.keys(require("seeds/resources.json"))
  const cities = Object.keys(require("seeds/cities.json"))
  const paths = []

  if (
    process.env.NODE_ENV === "production" &&
    typeof process.env.VERCEL !== "undefined"
  ) {
    await scrape({})
  }

  paths.push({ params: { slug: ["/"] } })

  cities.forEach((/** @type {string} */ item) => {
    paths.push({ params: { slug: [item.trim().toLowerCase()] } })
  })

  resources.forEach((item) => {
    paths.push({ params: { slug: [item.trim().toLowerCase()] } })
  })

  cities.forEach((/** @type {string} */ city) => {
    resources.map((resource) => {
      paths.push({
        params: {
          slug: [city.trim().toLowerCase(), resource.trim().toLowerCase()],
        },
      })
    })
  })

  return {
    paths,
    fallback: false,
  }
}

export default CityPage
