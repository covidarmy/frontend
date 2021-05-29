import { useRouter } from "next/router"
import * as React from "react"
import Link from "next/link"
import Navbar from "~/components/Navbar"
import BackIcon from "~/assets/arrow-left.svg"
import RightIcon from "~/assets/chevron-right.svg"
import { useAuth } from "~/context/auth"
import LoadingPage from "~/components/LoadingPage"
import { auth, fb } from "~/lib/firebase"
import FaceBookIcon from "~/assets/facebook.svg"
import GoogleIcon from "~/assets/google.svg"

const LoginPage: React.FC = () => {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/dashboard")
    }
  }, [loading, isAuthenticated])

  if (loading) return <LoadingPage />

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex flex-col items-center justify-center rounded-lg p-4 sm:p-8 gap-5 mx-auto max-w-xl">
        <div className="w-full px-6 py-6 bg-white rounded-md shadow-md sm:px-10">
          <div className="flex items-center">
            <Link href="/">
              <a aria-label="Back Button">
                <BackIcon />
              </a>
            </Link>
            <div className="w-full">
              <p className="font-semibold text-center">Welcome to covid.army</p>
            </div>
          </div>
          <hr className="mt-6" />
          <p className="mt-7 text-gray-400">
            Hello Superhero, hope you are doing good!
          </p>
          <h2 className="text-xl font-bold mt-8">Please log in using</h2>
          <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center mt-9">
            <button
              className="inline-flex items-center justify-center py-3 px-7 rounded-lg"
              style={{ background: "#EFEFEF" }}
              onClick={() => {
                auth
                  .signInWithPopup(new fb.auth.GoogleAuthProvider())
                  .then((user) => {
                    router.push("/dashboard")
                  })
              }}
            >
              <GoogleIcon />
              <div className="text-xl font-semibold ml-2">Google</div>
            </button>
            <p className="text-center">or</p>
            <button
              className="inline-flex items-center justify-center py-3 px-7 rounded-lg"
              style={{ background: "#EFEFEF" }}
              onClick={() => {
                auth
                  .signInWithPopup(new fb.auth.FacebookAuthProvider())
                  .then((user) => {
                    router.push("/dashboard")
                  })
              }}
            >
              <FaceBookIcon />
              <div className="text-xl font-semibold ml-2">Facebook</div>
            </button>
          </div>
        </div>

        <div className="w-full px-6 py-6 bg-white rounded-lg shadow-md sm:px-10">
          <div className="flex items-center justify-between text-blue-500 cursor-pointer hover:underline">
            <div>Volunteer FAQs</div>
            <RightIcon />
          </div>
        </div>
      </main>
    </div>
  )
}

export default LoginPage
