import LocationFilter from "./LocationFilter"

export const Dashboard = ({ cities, resources }) => {
  return (
    <div className="grid lg:grid-cols-2 sm:grid-col-1 gap-4 lg:mt-8 lg:mx-16 mx-4 mt-6">
      <div className="grid rounded-md grid-col-1 gap-4">
        <LocationFilter data={cities} />
        <div className="shadow-md border border-gray-200 rounded-md bg-white text-center box-border h-auto w-full p-6">
          <div className="flex">
            <svg
              className="mt-0.5"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 16.5C9 16.5 15 13.5 15 9V3.75L9 1.5L3 3.75V9C3 13.5 9 16.5 9 16.5Z"
                fill="#4F46EF"
              />
              <path
                d="M9 6V10"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7 8H11"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="text-strong mt-0 ml-1 font-bold">Choose Resources</p>
          </div>
          <div className="ml-0 mt-1 text-start text-left">
            {resources.map((item) => {
              return (
                <button className="bg-gray-200 hover:bg-blue-500 text-gray-700 font-semibold hover:text-white py-2 m-1 px-4 border-transparent hover:border-gray-500 rounded">
                  {item}
                </button>
              )
            })}
          </div>
        </div>
      </div>
      <div className=" shadow-lg text-center box-border h-auto w-100% p-6">
        3
      </div>
    </div>
  )
}
