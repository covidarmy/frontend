import * as React from "react"
import { useProtectedRoute } from "~/context/auth"

const DashboardPage: React.FC = () => {
  useProtectedRoute()

  return null
}

export default DashboardPage
