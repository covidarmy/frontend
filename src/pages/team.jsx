import Navbar from "~/components/Navbar"

const links = [
  {
    name: "Anshul Agarwala",
    social: "https://twitter.com/anshulagx",
    image:
      "https://pbs.twimg.com/profile_images/1363831677542273026/Rfpa_d7M_400x400.jpg",
  },
  {
    name: "Apoorv Singal",
    social: "https://twitter.com/ApoorvSingal",
    image:
      "https://pbs.twimg.com/profile_images/1364826453465067520/kXJIOwRo_400x400.jpg",
  },
  {
    name: "Arnav Gosain",
    social: "https://twitter.com/arn4v",
    image:
      "https://pbs.twimg.com/profile_images/1345143364123938816/xyMaKHLe_400x400.jpg",
  },
  {
    name: "Jay Kapoor",
    social: "https://twitter.com/Jaykapoor24",
    image:
      "https://pbs.twimg.com/profile_images/1382015514927538176/6WPx5Gbc_400x400.jpg",
  },
  {
    name: "Naveen Sahu",
    social: "https://twitter.com/heyNvN",
    image:
      "https://pbs.twimg.com/profile_images/1042117866672156672/E3PKqgkg_400x400.jpg",
  },
  {
    name: "Neeraj Chouhan",
    social: "https://twitter.com/_neerajchouhan",
    image:
      "https://pbs.twimg.com/profile_images/1361225951678357504/54aQSGQs_400x400.jpg",
  },
  {
    name: "Praneeth Margam",
    social: "https://dribbble.com/praneethmargam",
    image:
      "https://cdn.dribbble.com/users/4130730/avatars/normal/e419c928c5df1d4ad3cc9a8b19fc8e3f.jpg?1590754517",
  },
  {
    name: "Rahul Garg",
    social: "https://twitter.com/rgxai",
    image:
      "https://pbs.twimg.com/profile_images/1367467814257360898/vBzZcuoX_400x400.jpg",
  },
  {
    name: "Rutvij Karkhanis",
    social: "https://twitter.com/rutvijkarkhanis",
    image:
      "https://pbs.twimg.com/profile_images/1284193881169395712/46YQxUjO_400x400.jpg",
  },
  {
    name: "Sant Sharma",
    social: "https://twitter.com/sntksh",
    image:
      "https://pbs.twimg.com/profile_images/1378521976084426755/AhwqNzgv_400x400.jpg",
  },
  {
    name: "Simran Sachdeva",
    social: "https://twitter.com/jr_sachdeva",
    image:
      "https://pbs.twimg.com/profile_images/1378522840383692800/GGmMVUZx_400x400.jpg",
  },
  {
    name: "Swarnim Walavalkar",
    social: "https://twitter.com/SwarnimVW",
    image:
      "https://pbs.twimg.com/profile_images/1334575215901175808/Vjpdyqf1_400x400.jpg",
  },
  {
    name: "Utkarsh Bhimte",
    social: "https://twitter.com/BhimteBhaisaab",
    image:
      "https://pbs.twimg.com/profile_images/1284769236305338368/1QMpU-YP_400x400.jpg",
  },
  {
    name: "Vedant Kaushik",
    social: "https://twitter.com/VedantRusty",
    image:
      "https://pbs.twimg.com/profile_images/1301086790451826690/64PaA8Mr_400x400.jpg",
  },
  {
    name: "Vishnu Singh Sengar",
    social: "https://www.linkedin.com/in/contactvishnu",
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
                    <button className="rounded-md flex flex-row bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 text-xl text-white mt-6 px-12 py-1">
                      <a
                        target="_blank"
                        className="w-full flex flex-row gap-2"
                        href={element.social}
                      >
                        <span>Twitter</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="18"
                          height="18"
                          viewBox="0 0 172 172"
                          className="text-white mt-[5px]"
                        >
                          <g
                            fill="none"
                            fill-rule="nonzero"
                            stroke="none"
                            stroke-width="1"
                            stroke-linecap="butt"
                            stroke-linejoin="miter"
                            stroke-miterlimit="10"
                            stroke-dasharray=""
                            stroke-dashoffset="0"
                            font-family="none"
                            font-weight="none"
                            font-size="none"
                            text-anchor="none"
                            style={{ mixBlendMode: "normal" }}
                          >
                            <path d="M0,172v-172h172v172z" fill="none"></path>
                            <g fill="#ffffff">
                              <path d="M172,30.82226c-6.4388,2.85547 -12.9056,5.01107 -20.07226,5.73894c7.16667,-4.3112 12.9056,-11.47787 15.76107,-19.3724c-7.16667,4.31119 -14.33333,7.16667 -22.19988,8.6224c-7.16667,-7.16667 -16.48893,-11.47787 -26.51106,-11.47787c-19.3724,0 -35.13347,15.76107 -35.13347,35.10547c0,2.88346 0,5.73893 0.72786,7.89453c-29.39453,-1.42774 -55.17773,-15.06119 -72.39453,-36.56119c-3.58333,5.03906 -5.01107,11.47786 -5.01107,17.91667c0,12.20573 6.43881,22.95573 15.76107,29.39453c-5.73893,-0.72786 -11.44987,-2.1556 -15.76107,-4.31119c0,0 0,0 0,0.72786c0,17.18881 12.17774,31.52214 27.93881,34.4056c-2.85547,0.69988 -5.71094,1.42774 -9.29427,1.42774c-2.1556,0 -4.3112,0 -6.4668,-0.72786c4.31119,14.33333 17.2168,24.38346 32.97786,24.38346c-12.17773,9.32227 -27.23893,15.03321 -43.72786,15.03321c-2.85547,0 -5.73893,0 -8.5944,-0.69988c15.76107,10.02214 34.4056,15.76107 53.75,15.76107c65.22787,0 100.33333,-53.75 100.33333,-100.33333c0,-1.42774 0,-2.85547 0,-4.31119c7.16667,-5.01107 12.9056,-11.44988 17.91667,-18.61654"></path>
                            </g>
                          </g>
                        </svg>
                      </a>
                    </button>
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
