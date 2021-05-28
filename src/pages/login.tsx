import { useRouter } from "next/router"
import * as React from "react"
import Link from "next/link"
import Navbar from "~/components/Navbar"
import BackIcon from "~/assets/arrow-left.svg"
import RightIcon from "~/assets/chevron-right.svg"
import { APP_BASE_URL } from "~/constants"
import { useAuth } from "~/context/auth"
import LoadingPage from "~/components/LoadingPage"
import { auth } from "~/lib/firebase"

const LoginPage: React.FC = () => {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()
  const [email, setEmail] = React.useState<string>("")
  const [submitted, setSubmitted] = React.useState({
    done: false,
    email: "",
  })

  React.useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/dashboard")
    }
  }, [loading, isAuthenticated])

  if (loading) return <LoadingPage />

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex flex-col items-center justify-center rounded-lg p-4 sm:p-8 lg:w-[40rem] gap-5 w-4/5 mx-auto">
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
          <div className="mt-6">
            <h2 className="text-xl font-bold">
              Please enter your email and press submit.
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              You will be sent a login link to your email on submission.
            </p>
          </div>
          {!submitted.done && (
            <form
              className="flex flex-col items-center justify-between w-full mt-6"
              onSubmit={async (e) => {
                e.preventDefault()
                // await fetch(API_BASE_URL + "/volunteer/login", {
                //   method: "POST",
                //   body: JSON.stringify({ email }),
                // })
                console.log(email)
                await auth.sendSignInLinkToEmail(email, {
                  url: APP_BASE_URL + "/auth/success",
                  handleCodeInApp: true,
                })
                window.localStorage.setItem("emailForSignIn", email)
                setSubmitted({ done: true, email })
              }}
            >
              <div className="flex items-center justify-start w-full gap-8">
                <label className="sr-only">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-2 py-2 transition ease-in border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-offset-indigo-400"
                  required
                />
              </div>
              <div className="flex w-full mt-6">
                <button
                  type="submit"
                  className="w-32 py-2 text-sm font-medium text-white transition ease-in bg-indigo-500 rounded focus:outline-none focus:ring focus:ring-offset-indigo-400"
                >
                  Send login link
                </button>
              </div>
            </form>
          )}

          {submitted.done && (
            <div className="flex items-center justify-start w-full px-4 py-2 mt-6 text-sm text-green-800 bg-green-200 rounded">
              Sent login link to {submitted.email}. Refresh and submit form
              again if you haven't received an email.
            </div>
          )}
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
