import * as React from "react"
import LoadingPage from "~/components/LoadingPage"
import { useAuth } from "~/context/auth"

const DashboardPage: React.FC = () => {
  const { isAuthenticated, user, loading } = useAuth()

  if (loading) return <LoadingPage />

  return null
}

export default DashboardPage
