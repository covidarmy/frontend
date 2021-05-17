import * as React from "react"
import { auth } from "~/lib/firebase"
import firebase from "firebase/app"
import { useRouter } from "next/router"

type User = firebase.User | null

const context = React.createContext<{
  user: User
  isAuthenticated: boolean
  loading: boolean
}>({
  user: null,
  isAuthenticated: false,
  loading: true,
})

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<User>(null)
  const [isAuthenticated, setAuthenticated] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setLoading(true)
      if (user) {
        setUser(user)
        setAuthenticated(true)
      } else {
        setUser(null)
        setAuthenticated(false)
      }
      setLoading(false)
    })
  }, [])

  return (
    <context.Provider value={{ isAuthenticated, user, loading }}>
      {children}
    </context.Provider>
  )
}

export const useAuth = () => {
  const { isAuthenticated, user, loading } = React.useContext(context)
  const router = useRouter()

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login", {
        query: {
          message: "Please log in first.",
        },
      })
    }
  }, [])

  return { isAuthenticated, user, loading }
}

export default AuthProvider
