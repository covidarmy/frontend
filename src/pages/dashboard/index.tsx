import AddLeadButton from "~/components/AddLeadButton"
import Navbar from "~/components/Navbar"

export default function DashboardPage() {
  const leads = []
  return (
    <div className=" bg-gray-100 min-h-screen">
      <Navbar />
      <main className="flex flex-col items-center justify-center rounded-lg p-4 pt-8 lg:pt-12 md:pt-8 lg:px-0 lg:w-2/5 mx-auto">
        <div className="flex items-center justify-between w-full">
          <h1 className="font-bold text-xl mx-auto">Submitted leads</h1>
          {leads.length > 0 && <AddLeadButton />}
        </div>
        <div className="flex flex-col gap-12 mt-16">
          {leads.length === 0 ? (
            <div className="flex flex-col gap-6 items-center justify-center">
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
