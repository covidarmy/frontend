import * as React from "react"

const context = React.createContext({
  user: undefined,
  isAuthenticated: false,
})

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState(undefined)
  const [isAuthenticated, setAuthenticated] = React.useState(false)

  React.useEffect(() => {}, [])

  return (
    <context.Provider value={{ isAuthenticated, user }}>
      {children}
    </context.Provider>
  )
}
