import { Dashboard } from "~/components/Dashboard"
import Navbar from "~/components/Navbar"
import { NextSeo } from "next-seo"
import { useRouter } from "next/router"
import { camelize } from "~/lib/utils"

const CityPage = ({ tweets, resources, cities, city, resource }) => {
  const router = useRouter()
  const { slug } = router.query
  const title = Array.isArray(slug)
    ? slug
        .map((i) => {
          return i[0].toUpperCase() + i.slice(1)
        })
        .join(" - ")
    : ""

  return (
    <>
      <NextSeo
        title={`Covid.army${title !== "" ? ` - ${title}` : ""}`}
        openGraph={{
          title: `Covid.army${title !== "" ? ` - ${title}` : ""}`,
          description: `Covid Resources Leads${
            title !== "" ? ` For ${title}` : ""
          }`,
          images: [
            {
              url: "/static/og.png",
            },
          ],
        }}
      />
      <div className="w-screen overflow-x-hidden">
        <Navbar />
        <Dashboard
          data={{
            tweets,
            resources,
            cities,
            city,
            resource,
          }}
        />
      </div>
    </>
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
  let slug0type = "city"

  if (!global.tweets) global.tweets = await TweetModel.find({})
  /** @type {Object[]} */
  let tweets = global.tweets

  tweets = tweets.map((item) => {
    const { _id, __v, createdAt, updatedAt, ...doc } = item._doc
    return doc
  })

  // /city route
  if (slug.length === 1) {
    if (cities.map((i) => i.toLowerCase()).includes(slug[0])) {
      tweets = tweets.filter((tweet) => {
        const keys = Object.keys(tweet.location).map((i) => i.toLowerCase())
        return keys.includes(slug[0])
      })
    }

    if (resources.map((i) => i.toLowerCase()).includes(slug[0])) {
      slug0type = "resource"
      tweets = tweets.filter((tweet) => {
        const keys = Object.keys(tweet.resource).map((i) => i.toLowerCase())
        return keys.includes(slug[0])
      })
    }
  }

  // Nested /city/resource route
  if (slug.length === 2) {
    tweets = tweets.filter((tweet) => {
      const locationArr = Object.keys(tweet.location).map((i) =>
        i.toLowerCase()
      )
      const resourceArr = Object.keys(tweet.resource).map((i) =>
        i.toLowerCase()
      )
      return locationArr.includes(slug[0]) && resourceArr.includes(slug[1])
    })
  }

  return {
    props: {
      tweets,
      resources,
      cities,
      city: slug0type === "city" ? camelize(slug[0]) : null,
      resource:
        slug0type === "resource"
          ? camelize(slug[0])
          : typeof slug[1] === "string"
          ? camelize(slug[1])
          : null,
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

  if (!global.isScraped && process.env.NODE_ENV === "production") {
    await scrape({})
    global.isScraped = true
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
