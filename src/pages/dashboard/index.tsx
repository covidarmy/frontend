import * as React from "react"
import { useAuth } from "~/context/auth"

const DashboardPage: React.FC = () => {
  const { isAuthenticated, user, loading } = useAuth()

  if (loading) return null

  return null
}

export default DashboardPage
