import Navbar from "@/components/Navbar"

const Coming = () => {
  return (
    <>
      <Navbar lastUpdated={"6"} />
      <div className="h-screen text-center flex items-center justify-center sm:mx-10 sm:px-8">
        <div className="grid grid-cols-1 sm:mx-10">
          <span className="text-5xl pb-5 col-span-1 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            Under development. Coming Soon.
          </span>
          <button className="col-span-1 pt-10">
            <a
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-10 "
              href="/"
            >
              Go to Home
            </a>
          </button>
        </div>
      </div>
    </>
  )
}

export default Coming
