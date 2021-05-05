import { Dashboard } from "~/components/Dashboard"
import Navbar from "~/components/Navbar"
import { NextSeo } from "next-seo"
import { useRouter } from "next/router"
import { camelize } from "~/lib/utils"

const CityPage = () => {
  const router = useRouter()
  const { slug } = router.query

  if (slug === undefined) {
    return (
      <div className="w-screen h-screen flex flex-col">
        <Navbar />
        <Dashboard city={null} resource={null} />
      </div>
    )
  }

  const city = camelize(slug[0])
  const resource = typeof slug[1] === "string" ? camelize(slug[1]) : null

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
        <Navbar />
        <Dashboard city={city} resource={resource} />
      </div>
    </>
  )
}

export default CityPage
