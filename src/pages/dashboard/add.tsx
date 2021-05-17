import * as React from "react"
import { useProtectedRoute } from "~/context/auth"

const AddResourcePage: React.FC = () => {
  useProtectedRoute()

  return null
}

export default AddResourcePage
