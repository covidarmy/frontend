const CityPage = ({ tweets, resources, cities }) => {
  return <></>
}

/**
 * @type {import("next").GetStaticProps<{}, { city: string, resource: string }>}
 */
export const getStaticProps = async (ctx) => {
  console.log(ctx)
  const tweets = require("seeds/tweets.json")
  const resources = require("seeds/resources.json")
  const cities = require("seeds/cities.json")
  const { resource, city } = ctx.params
  const filtered = Object.values(tweets).filter(
    (tweet) =>
      typeof tweet.for[resource] !== "undefined" &&
      typeof tweet.location[city] !== "undefined"
  )
  return {
    props: {
      tweets: filtered,
      resources,
      cities,
    },
  }
}

/**
 * @type {import("next").GetStaticPaths}
 */
export const getStaticPaths = async (ctx) => {
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

  console.log(paths)

  return {
    paths,
    fallback: true,
  }
}

export default CityPage
