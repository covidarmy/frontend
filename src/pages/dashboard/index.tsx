import { useRouter } from "next/router"
import * as React from "react"
import LoadingPage from "~/components/LoadingPage"
import Navbar from "~/components/Navbar"
import { useAuth } from "~/context/auth"

const DashboardPage: React.FC = () => {
  const { isAuthenticated, user, loading } = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, loading])

  if (loading) return <LoadingPage />

  return (
    <div className="w-screen h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center w-full"></div>
    </div>
  )
}

export default DashboardPage
