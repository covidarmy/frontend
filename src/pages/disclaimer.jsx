import * as React from "react"
import Footer from "~/components/Footer"
import Navbar from "~/components/Navbar"

const DisclaimerPage = ({ disclaimer }) => {
  return (
    <div className="w-screen">
      <Navbar />
      <div className="container mx-auto py-10 px-4 lg:px-0">
        <h1 className="font-bold text-5xl mb-6">Disclaimer</h1>
        {disclaimer.split("\n").map((x) => (
          <p className="my-8">{x}</p>
        ))}
      </div>
      <Footer />
    </div>
  )
}

export const getStaticProps = async () => {
  const disclaimer = require("fs").readFileSync("seeds/disclaimer.txt", "utf8")
  return { props: { disclaimer } }
}

export default DisclaimerPage
