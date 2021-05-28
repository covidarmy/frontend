import * as React from "react"
import { useRouter } from "next/router"
import AddLeadButton from "~/components/AddLeadButton"
import LoadingPage from "~/components/LoadingPage"
import Navbar from "~/components/Navbar"
import { useAuth } from "~/context/auth"

export default function DashboardPage() {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()
  const leads = []

  React.useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, loading])

  if (loading) return <LoadingPage />
  return (
    <div className="min-h-screen bg-gray-100 ">
      <Navbar />
      <main className="flex flex-col items-center justify-center p-4 pt-8 mx-auto rounded-lg lg:pt-12 md:pt-8 lg:px-0 lg:w-2/5">
        <div className="flex items-center justify-between w-full">
          <h1 className="mx-auto text-xl font-bold">Submitted leads</h1>
          {leads.length > 0 && <AddLeadButton />}
        </div>
        <div className="flex flex-col gap-12 mt-16">
          {leads.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-6">
              <span className="text-lg font-medium">No leads found.</span>
              <AddLeadButton />
            </div>
          ) : (
            <></>
          )}
        </div>
      </main>
    </div>
  )
}
