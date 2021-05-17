import { useRouter } from "next/router"
import * as React from "react"
import LoadingPage from "~/components/LoadingPage"
import { useAuth } from "~/context/auth"

const DashboardPage: React.FC = () => {
  const { isAuthenticated, user, loading } = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [])

  if (loading) return <LoadingPage />

  return null
}

export default DashboardPage
