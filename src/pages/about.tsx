import { GetStaticProps } from "next"
import Image from "next/image"

// COMPONENTS
import Navbar from "~/components/Navbar"
import Footer from "~/components/Footer"

// ICONS
import {
  TiSocialTwitter,
  TiSocialDribbble,
  TiSocialLinkedin,
} from "react-icons/ti"
import { HiGlobeAlt as HiGlobe } from "react-icons/hi"

interface ObjectLiteral {
  [key: string]: any
}

const icons: ObjectLiteral = {
  twitter: TiSocialTwitter,
  dribbble: TiSocialDribbble,
  linkedin: TiSocialLinkedin,
}

interface IPartner {
  id: string
  url: string
  imageFileName: string
  description?: string
  name: string
}

interface IVolunteer {
  id: string
  image: string
  social_link: string
  social_type: string
  name: string
}

interface Props {
  partnerData: IPartner[]
  volunteerData: IVolunteer[]
}

const About: React.FC<Props> = (props) => {
  const { partnerData, volunteerData } = props

  return (
    <div>
      <Navbar />

      <section className="p-6 bg-coolGray-100 text-coolGray-800">
        <div className="container p-4 mx-auto text-center">
          <h3 className="text-2xl text-[#4f46ef] mb-6 font-medium">
            Our Partners
          </h3>
        </div>
        <div className="container flex flex-wrap justify-center mx-auto text-coolGray-600">
          {partnerData.map((partner) => (
            <div
              className="flex justify-center w-1/2 p-6 align-middle md:w-1/3 xl:w-1/4"
              key={partner.id}
              title={partner?.description ?? partner.name}
            >
              <a
                href={partner.url}
                target="_blank"
                referrerPolicy="no-referrer"
              >
                <Image
                  src={`/static/assets/partners/${partner.imageFileName}`}
                  height={150}
                  width={150}
                />
              </a>
            </div>
          ))}
        </div>
      </section>

      <section id="team" className="container section-team mx-auto">
        <div className="row justify-center flex text-center my-20">
          <div className="md:col-span-8 lg:col-span-6">
            <div className="mb-12">
              <h3 className="text-2xl text-[#4f46ef] mb-6 font-medium">
                Our Volunteers
              </h3>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-2 mb-8 mt-8">
          {volunteerData.map((element) => {
            const SocialIcon = icons[element.social_type] ?? HiGlobe

            return (
              <div
                key={element.id}
                className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4"
              >
                <div className="flex items-center justify-center">
                  <div className="bg-white mt-10 py-12 px-8 md:px-16 text-center rounded-md shadow-lg mx-auto">
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
      <Footer />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const partnerData: IPartner[] = await fetch(
    "https://notion-api.splitbee.io/v1/table/2dbc2f82b58944909448f24756debbef",
    { method: "get" }
  ).then((res) => res.json())

  const volunteerData: IVolunteer[] = await fetch(
    "https://notion-api.splitbee.io/v1/table/16b6dd8733794d7fbd6bfa77f7d361da",
    { method: "get" }
  ).then((res) => res.json())

  return {
    props: { volunteerData, partnerData },
    revalidate: 60,
  }
}

export default About
