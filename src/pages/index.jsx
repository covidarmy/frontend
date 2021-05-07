import { Dashboard } from "~/components/Dashboard"
import Navbar from "~/components/Navbar"

const IndexPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Navbar />
      <Dashboard />
    </div>
  )
}

export default IndexPage
