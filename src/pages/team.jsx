import Navbar from "~/components/Navbar"
import {
  TiSocialTwitter,
  TiSocialDribbble,
  TiSocialLinkedin,
} from "react-icons/ti"

const icons = {
  twitter: TiSocialTwitter,
  dribbble: TiSocialDribbble,
  linkedin: TiSocialLinkedin,
}

const links = [
  {
    name: "Anshul Agarwala",
    social: { type: "twitter", link: "https://twitter.com/anshulagx" },
    image:
      "https://pbs.twimg.com/profile_images/1363831677542273026/Rfpa_d7M_400x400.jpg",
  },
  {
    name: "Apoorv Singal",
    social: { type: "twitter", link: "https://twitter.com/ApoorvSingal" },
    image:
      "https://pbs.twimg.com/profile_images/1364826453465067520/kXJIOwRo_400x400.jpg",
  },
  {
    name: "Arnav Gosain",
    social: { type: "twitter", link: "https://twitter.com/arn4v" },
    image:
      "https://pbs.twimg.com/profile_images/1345143364123938816/xyMaKHLe_400x400.jpg",
  },
  {
    name: "Jay Kapoor",
    social: { type: "twitter", link: "https://twitter.com/Jaykapoor24" },
    image:
      "https://pbs.twimg.com/profile_images/1382015514927538176/6WPx5Gbc_400x400.jpg",
  },
  {
    name: "Naveen Sahu",
    social: { type: "twitter", link: "https://twitter.com/heyNvN" },
    image:
      "https://pbs.twimg.com/profile_images/1042117866672156672/E3PKqgkg_400x400.jpg",
  },
  {
    name: "Neeraj Chouhan",
    social: { type: "twitter", link: "https://twitter.com/_neerajchouhan" },
    image:
      "https://pbs.twimg.com/profile_images/1361225951678357504/54aQSGQs_400x400.jpg",
  },
  {
    name: "Praneeth Margam",
    social: { type: "dribbble", link: "https://dribbble.com/praneethmargam" },
    image:
      "https://cdn.dribbble.com/users/4130730/avatars/normal/e419c928c5df1d4ad3cc9a8b19fc8e3f.jpg?1590754517",
  },
  {
    name: "Rahul Garg",
    social: { type: "twitter", link: "https://twitter.com/rgxai" },
    image:
      "https://pbs.twimg.com/profile_images/1367467814257360898/vBzZcuoX_400x400.jpg",
  },
  {
    name: "Rutvij Karkhanis",
    social: { type: "twitter", link: "https://twitter.com/rutvijkarkhanis" },
    image:
      "https://pbs.twimg.com/profile_images/1284193881169395712/46YQxUjO_400x400.jpg",
  },
  {
    name: "Sant Sharma",
    social: { type: "twitter", link: "https://twitter.com/sntksh" },
    image:
      "https://pbs.twimg.com/profile_images/1378521976084426755/AhwqNzgv_400x400.jpg",
  },
  {
    name: "Simran Sachdeva",
    social: { type: "twitter", link: "https://twitter.com/jr_sachdeva" },
    image:
      "https://pbs.twimg.com/profile_images/1378522840383692800/GGmMVUZx_400x400.jpg",
  },
  {
    name: "Swarnim Walavalkar",
    social: { type: "twitter", link: "https://twitter.com/SwarnimVW" },
    image:
      "https://pbs.twimg.com/profile_images/1334575215901175808/Vjpdyqf1_400x400.jpg",
  },
  {
    name: "Utkarsh Bhimte",
    social: { type: "twitter", link: "https://twitter.com/BhimteBhaisaab" },
    image:
      "https://pbs.twimg.com/profile_images/1284769236305338368/1QMpU-YP_400x400.jpg",
  },
  {
    name: "Vedant Kaushik",
    social: { type: "twitter", link: "https://twitter.com/VedantRusty" },
    image:
      "https://pbs.twimg.com/profile_images/1301086790451826690/64PaA8Mr_400x400.jpg",
  },
  {
    name: "Vishnu Singh Sengar",
    social: {
      type: "linkedin",
      link: "https://www.linkedin.com/in/contactvishnu",
    },
    image:
      "https://media-exp1.licdn.com/dms/image/C4D03AQFg98t4x72rSQ/profile-displayphoto-shrink_800_800/0/1600088800520?e=1625097600&v=beta&t=iiPSKVEo2x3Mb2In09Ka824KT3rX0P5SUZsw8OwRrN4",
  },
]

const Team = () => {
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
          {links.map((element) => {
            const SocialIcon = icons[element.social.type]

            return (
              <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
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
                      href={element.social.link}
                    >
                      <SocialIcon className="h-6 w-6" />
                      <span>{element.social.type}</span>
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

export default Team
