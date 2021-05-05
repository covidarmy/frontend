import { Dashboard } from "~/components/Dashboard"
import Navbar from "~/components/Navbar"
import { NextSeo } from "next-seo"
import { useRouter } from "next/router"
import { camelize } from "~/lib/utils"
import { API_BASE_URL, fetchTweets, getCities, getResources } from "~/lib/api"

const CityPage = ({
  tweets,
  resources,
  cities,
  city,
  resource,
  lastUpdated,
}) => {
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
      <div className="w-screen h-screen flex flex-col">
        <Navbar lastUpdated={lastUpdated} />
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

export default CityPage
