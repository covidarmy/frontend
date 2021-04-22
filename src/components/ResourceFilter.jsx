import clsx from "clsx"
import { useRouter } from "next/router"
import Link from "next/link"

export default function ResourceFilter({ filter, data }) {
  const router = useRouter()
  const { resource: _, ...query } = router.query

  return (
    <div className="flex flex-col mx-auto lg:w-4/5 lg:grid lg:grid-cols-6 items-center justify-center space-y-6 lg:space-y-0 lg:space-x-16">
      <div className="flex items-center justify-center space-x-6 lg:col-span-1">
        <span className="text-lg font-semibold">Resource Filter</span>
        <div className="h-8 border-r hidden lg:block border-gray-600" />
      </div>
      <span className="flex items-center justify-center gap-3 lg:gap-6 flex-wrap lg:col-span-5">
        <Link
          href={{
            pathname: "/",
            query,
          }}
        >
          <div
            className={clsx([
              "rounded-md px-4 py-1 flex items-center justify-center shadow-md border border-gray-200 select-none transition duration-100 ease-in-out font-medium",
              filter === "all"
                ? "bg-gray-600 text-white"
                : "bg-white hover:bg-gray-300",
            ])}
          >
            All
          </div>
        </Link>
        {Object.keys(data)
          .sort()
          .map((resource) => {
            return (
              <Link
                key={resource}
                href={{
                  pathname: "/#tweets",
                  query: {
                    resource,
                    ...query,
                  },
                }}
              >
                <div
                  className={clsx([
                    "rounded-md px-2 lg:px-4 py-1 flex items-center justify-center shadow-md border border-gray-200 select-none transition duration-100 ease-in-out font-medium cursor-pointer focus:outline-none",
                    filter === resource
                      ? "bg-gray-600 text-white"
                      : "bg-white hover:bg-gray-300",
                  ])}
                >
                  {resource}
                </div>
              </Link>
            )
          })}
      </span>
    </div>
  )
}
