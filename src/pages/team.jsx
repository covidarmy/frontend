import Navbar from "~/components/Navbar"

const Team = () => {
  var links = [
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
  return (
    <div>
      <Navbar lastUpdated={"6"} />
      <div>
        <section className="section-team overflow-x-hidden">
          <div className="container">
            <div className="row justify-center flex text-center my-20">
              <div className="md:col-span-8 lg:col-span-6">
                <div className="header-section">
                  <h3 className="small-title">Our Team</h3>
                  <h2 className="title">Let's meet with our team members</h2>
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
                        <p className="capitalize text-xl mt-1">
                          {element.name}
                        </p>
                        <button className="rounded-md flex flex-row bg-gradient-to-r from-blue-400 to-indigo-500 text-xl text-white mt-6  inline">
                          <a
                            target="_blank"
                            className="my-1 mx-12 w-full flex flex-row"
                            href={element.social}
                          >
                            Twitter
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              x="0px"
                              y="0px"
                              width="18"
                              height="18"
                              viewBox="0 0 172 172"
                              style={{
                                fill: "#000000",
                                marginLeft: "5px",
                                marginTop: "5px",
                              }}
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
                                <path
                                  d="M0,172v-172h172v172z"
                                  fill="none"
                                ></path>
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
            {/* <div className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
                            <div className="flex items-center justify-center">
                                <div className="bg-white mt-10 py-8 px-10 text-center rounded-md shadow-lg transform -translate-y-20 sm:-translate-y-24 max-w-xs mx-auto">
                                    <h2 className="font-semibold text-2xl mb-6">Start chatting</h2>
                                    <img className="w-20 h-20 object-cover rounded-full mx-auto shadow-lg" src="https://images.unsplash.com/photo-1611342799915-5dd9f1665d04?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="User avatar" />
                                    <p className="capitalize text-xl mt-1">essie walton</p>
                                    <button className="rounded-md bg-gradient-to-r from-blue-400 to-indigo-500 text-xl text-white pt-3 pb-4 px-8 inline">Send a message</button>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
                            <div className="flex items-center justify-center">
                                <div className="bg-white mt-10 py-8 px-10 text-center rounded-md shadow-lg transform -translate-y-20 sm:-translate-y-24 max-w-xs mx-auto">
                                    <h2 className="font-semibold text-2xl mb-6">Start chatting</h2>
                                    <img className="w-20 h-20 object-cover rounded-full mx-auto shadow-lg" src="https://images.unsplash.com/photo-1611342799915-5dd9f1665d04?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="User avatar" />
                                    <p className="capitalize text-xl mt-1">essie walton</p>
                                    <button className="rounded-md bg-gradient-to-r from-blue-400 to-indigo-500 text-xl text-white pt-3 pb-4 px-8 inline">Send a message</button>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
                            <div className="flex items-center justify-center">
                                <div className="bg-white mt-10 py-8 px-10 text-center rounded-md shadow-lg transform -translate-y-20 sm:-translate-y-24 max-w-xs mx-auto">
                                    <h2 className="font-semibold text-2xl mb-6">Start chatting</h2>
                                    <img className="w-20 h-20 object-cover rounded-full mx-auto shadow-lg" src="https://images.unsplash.com/photo-1611342799915-5dd9f1665d04?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="User avatar" />
                                    <p className="capitalize text-xl mt-1">essie walton</p>
                                    <button className="rounded-md bg-gradient-to-r from-blue-400 to-indigo-500 text-xl text-white pt-3 pb-4 px-8 inline">Send a message</button>
                                </div>
                            </div>
                        </div>
                    </div> */}

            {/* <div className="flex lg:flex-wrap lg:flex-row sm:flex-wrap">
                        {links.map(element => {
                        return(
                            <div className="id-container sm:col-span-6 lg:col-span-4 xl:col-span-3">
                                <div className="single-person">
                                    <div className="person-image ">
                                        <img src={element.image} alt="" />
                                        <span className="icon">
                                            <img className="" src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjQiIGhlaWdodD0iMjQiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iIzRmNDZlZiI+PHBhdGggZD0iTTE3MiwzMC44MjIyNmMtNi40Mzg4LDIuODU1NDcgLTEyLjkwNTYsNS4wMTEwNyAtMjAuMDcyMjYsNS43Mzg5NGM3LjE2NjY3LC00LjMxMTIgMTIuOTA1NiwtMTEuNDc3ODcgMTUuNzYxMDcsLTE5LjM3MjRjLTcuMTY2NjcsNC4zMTExOSAtMTQuMzMzMzMsNy4xNjY2NyAtMjIuMTk5ODgsOC42MjI0Yy03LjE2NjY3LC03LjE2NjY3IC0xNi40ODg5MywtMTEuNDc3ODcgLTI2LjUxMTA2LC0xMS40Nzc4N2MtMTkuMzcyNCwwIC0zNS4xMzM0NywxNS43NjEwNyAtMzUuMTMzNDcsMzUuMTA1NDdjMCwyLjg4MzQ2IDAsNS43Mzg5MyAwLjcyNzg2LDcuODk0NTNjLTI5LjM5NDUzLC0xLjQyNzc0IC01NS4xNzc3MywtMTUuMDYxMTkgLTcyLjM5NDUzLC0zNi41NjExOWMtMy41ODMzMyw1LjAzOTA2IC01LjAxMTA3LDExLjQ3Nzg2IC01LjAxMTA3LDE3LjkxNjY3YzAsMTIuMjA1NzMgNi40Mzg4MSwyMi45NTU3MyAxNS43NjEwNywyOS4zOTQ1M2MtNS43Mzg5MywtMC43Mjc4NiAtMTEuNDQ5ODcsLTIuMTU1NiAtMTUuNzYxMDcsLTQuMzExMTljMCwwIDAsMCAwLDAuNzI3ODZjMCwxNy4xODg4MSAxMi4xNzc3NCwzMS41MjIxNCAyNy45Mzg4MSwzNC40MDU2Yy0yLjg1NTQ3LDAuNjk5ODggLTUuNzEwOTQsMS40Mjc3NCAtOS4yOTQyNywxLjQyNzc0Yy0yLjE1NTYsMCAtNC4zMTEyLDAgLTYuNDY2OCwtMC43Mjc4NmM0LjMxMTE5LDE0LjMzMzMzIDE3LjIxNjgsMjQuMzgzNDYgMzIuOTc3ODYsMjQuMzgzNDZjLTEyLjE3NzczLDkuMzIyMjcgLTI3LjIzODkzLDE1LjAzMzIxIC00My43Mjc4NiwxNS4wMzMyMWMtMi44NTU0NywwIC01LjczODkzLDAgLTguNTk0NCwtMC42OTk4OGMxNS43NjEwNywxMC4wMjIxNCAzNC40MDU2LDE1Ljc2MTA3IDUzLjc1LDE1Ljc2MTA3YzY1LjIyNzg3LDAgMTAwLjMzMzMzLC01My43NSAxMDAuMzMzMzMsLTEwMC4zMzMzM2MwLC0xLjQyNzc0IDAsLTIuODU1NDcgMCwtNC4zMTExOWM3LjE2NjY3LC01LjAxMTA3IDEyLjkwNTYsLTExLjQ0OTg4IDE3LjkxNjY3LC0xOC42MTY1NCI+PC9wYXRoPjwvZz48L2c+PC9zdmc+'></img>
                                        </span>
                                    </div>
                                    <div className="person-info">
                                        <h3 className="full-name">{element.name}</h3>
                                        <a href={element.social} className="speciality"> {"@" + element.name}</a>
                                    </div>
                                </div>
                            </div>
                        )  
                        })}
                 </div> */}
          </div>
        </section>
        {/* <div className="bg-white mt-10 py-8 px-10 text-center rounded-md shadow-lg transform -translate-y-20 sm:-translate-y-24 max-w-xs mx-auto">
                <h2 className="font-semibold text-2xl mb-6">Start chatting</h2>
                <img className="w-20 h-20 object-cover rounded-full mx-auto shadow-lg" src="https://images.unsplash.com/photo-1611342799915-5dd9f1665d04?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="User avatar" />
                <p className="capitalize text-xl mt-1">essie walton</p>
                <button className="rounded-md bg-gradient-to-r from-blue-400 to-indigo-500 text-xl text-white pt-3 pb-4 px-8 inline">Send a message</button>
            </div> */}
      </div>
    </div>
  )
}

export default Team
