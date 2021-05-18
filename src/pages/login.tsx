import { useRouter } from "next/router"
import * as React from "react"
import Link from "next/link"
import Navbar from "~/components/Navbar"
import { auth, fb } from "~/lib/firebase"

import BackIcon from "../assets/arrow-left.svg"
import FacebookIcon from "../assets/facebook.svg"
import TwitterIcon from "../assets/twitter.svg"
import RightIcon from "../assets/chevron-right.svg"

const LoginPage: React.FC = () => {
  const router = useRouter()

  const handleAuth = () => {
    auth.signInWithPopup(new fb.auth.GoogleAuthProvider()).then((user) => {
      router.push("/dashboard")
    })
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <main className="flex flex-col items-center justify-center rounded-lg p-4 sm:p-8">
        <div
          className="bg-white py-6 px-6 sm:px-10 w-full "
          style={{ maxWidth: "32rem" }}
        >
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
          <p className="mt-7">Hello Superhero, hope you are doing good!</p>
          <h2 className="font-bold text-2xl pt-10">Please log in using</h2>
          <div className="sm:flex items-center justify-between mt-9">
            <button
              className="inline-flex rounded-lg py-3 px-7"
              style={{ background: "#EFEFEF" }}
              onClick={handleAuth}
            >
              <FacebookIcon />
              <div className="ml-2">Facebook</div>
            </button>
            <p>or</p>
            <button
              className="inline-flex rounded-lg py-3 px-7"
              style={{ background: "#EFEFEF" }}
            >
              <TwitterIcon />
              <div className="ml-2">Twitter</div>
            </button>
          </div>
        </div>

        <div
          className="shadow-md w-full bg-white py-6 px-6 sm:px-10 rounded-lg mt-5"
          style={{ maxWidth: "32rem" }}
        >
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
