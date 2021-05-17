import { useRouter } from "next/router"
import * as React from "react"
import { useAuth } from "~/context/auth"

const AddResourcePage: React.FC = () => {
  const { isAuthenticated, user, loading } = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [])

  if (loading) return null

  return null
}

export default AddResourcePage
