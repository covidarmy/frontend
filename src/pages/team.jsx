import Navbar from "~/components/Navbar"
import {
  TiSocialTwitter,
  TiSocialDribbble,
  TiSocialLinkedin,
} from "react-icons/ti"
import { HiGlobeAlt as HiGlobe } from "react-icons/hi"

const icons = {
  twitter: TiSocialTwitter,
  dribbble: TiSocialDribbble,
  linkedin: TiSocialLinkedin,
}

const Team = ({ data }) => {
  return (
    <div>
      <Navbar />
      <section id="team" className="container section-team mx-auto">
        <div className="row justify-center flex text-center my-20">
          <div className="md:col-span-8 lg:col-span-6">
            <div className="mb-12">
              <h3 className="text-2xl text-[#4f46ef] mb-6 font-medium">
                Our Team
              </h3>
              <h2 className="title text-4xl font-bold">
                Let's meet with our team members
              </h2>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-2 mb-8 mt-8">
          {data.map((element) => {
            const SocialIcon = icons[element.social_type] ?? HiGlobe

            return (
              <div
                key={element.id}
                className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4"
              >
                <div className="flex items-center justify-center">
                  <div className="bg-white mt-10 py-12 px-16 text-center rounded-md shadow-lg transform -translate-y-20 sm:-translate-y-24 max-w-md mx-auto">
                    <img
                      className="w-28 h-28 object-cover rounded-full mx-auto shadow-lg"
                      src={element.image}
                      alt="Image"
                    />
                    <p className="capitalize text-xl mt-1">{element.name}</p>
                    <a
                      target="_blank"
                      className="rounded-md flex flex-row bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 text-lg capitalize text-white mt-6 px-12 py-1 items-center justify-center space-x-1"
                      href={element.social_link}
                    >
                      <SocialIcon className="h-6 w-6" />
                      <span>{element.social_type}</span>
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

/**
 * @type {import("next").GetStaticProps<{ data: Array<Object> }>}
 */
export const getStaticProps = async () => {
  const data = await fetch(
    "https://notion-api.splitbee.io/v1/table/16b6dd8733794d7fbd6bfa77f7d361da",
    { method: "get" }
  ).then((res) => res.json())

  return {
    props: { data },
    revalidate: 60,
  }
}

export default Team
