import * as React from "react"
import { Dashboard } from "~/components/Dashboard"
import Navbar from "~/components/Navbar"

const DisclaimerPage = ({ disclaimer }) => {
  return (
    <div className="w-screen">
      <Navbar />
      {disclaimer.split("\n").map(x => <p>{x}</p>)}
    </div>
  )
}

export const getStaticProps = async () => {
  const disclaimer = require("fs").readFileSync("seeds/disclaimer.txt", "utf8")

  return { props: { disclaimer } }
}

export default DisclaimerPage
