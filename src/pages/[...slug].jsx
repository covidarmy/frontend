const CityPage = ({ tweets, resources, cities }) => {
  return <>{JSON.stringify(tweets)}</>
}

/**
 * @type {import("next").GetStaticProps<{}, { slug: Array<string> }>}
 */
export const getStaticProps = async (ctx) => {
  const { connectToDatabase } = require("../lib/mongo")
  await connectToDatabase()
  const TweetModel = require("../schemas/tweet")
  const cities = require("seeds/cities.json")
  const resources = require("seeds/resources.json")
  const { slug } = ctx.params
  /** @type {Object[]} */
  let tweets = await TweetModel.find({})

  tweets = tweets.map((item) => {
    const { _id, __v, createdAt, updatedAt, ...doc } = item._doc
    return doc
  })

  // /city route
  if (slug.length === 1) {
    tweets = Object.values(tweets).filter((tweet) => {
      return typeof tweet.location[slug[0]] !== "undefined"
    })
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

  return {
    props: {
      tweets,
      resources,
      cities,
    },
    revalidate: 60,
  }
}

/**
 * @type {import("next").GetStaticPaths}
 */
export const getStaticPaths = async () => {
  const resources = require("seeds/resources.json")
  const cities = require("seeds/cities.json")
  const paths = []

  Object.keys(cities).forEach((/** @type {string} */ item) => {
    paths.push({ params: { slug: [item.trim().toLowerCase()] } })
  })

  Object.keys(cities).forEach((/** @type {string} */ city) => {
    Object.keys(resources).map((resource) => {
      paths.push({
        params: {
          slug: [city.trim().toLowerCase(), resource.trim().toLowerCase()],
        },
      })
    })
  })

  return {
    paths,
    fallback: true,
  }
}

export default CityPage
