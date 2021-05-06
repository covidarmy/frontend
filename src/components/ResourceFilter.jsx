import FilterButton from "./FilterButton"
import ResourceIcon from "../assets/Resource.svg"
import ResourceIconDeactivated from "../assets/ResourceDeactivated.svg"
import { useResources } from "~/hooks/useResources"
import Skeleton from "react-loading-skeleton"

export default function ResourceFilter({ city, resource }) {
  const { data, error } = useResources()

  if (error) return <div>failed to load</div>
  if (!data) return <Skeleton height={128} />

  const resources = Object.keys(data)

  if (city) {
    return (
      <div className="shadow-md border border-gray-200 rounded-md bg-white text-center box-border h-auto w-full my-2 p-3 lg:p-6">
        <div className="flex">
          <ResourceIcon />
          <p className="text-strong mt-0 ml-1 font-bold">Choose Resources</p>
        </div>
        <div className="mt-2 text-start text-left flex-wrap flex items-center justify-start">
          {resources.map((item) => {
            return (
              <FilterButton
                key={item}
                active={
                  typeof resource === "string" &&
                  item.toLowerCase() === resource.toLowerCase()
                }
                href={
                  city === null
                    ? `/${item.toLowerCase()}`
                    : `/${city}` + `/${item.toLowerCase()}`
                }
              >
                {item}
              </FilterButton>
            )
          })}
        </div>
      </div>
    )
  } else {
    return (
      <div className="shadow-md border border-gray-200 rounded-md bg-gray-100 text-center box-border h-auto w-full my-2 p-3 lg:p-6 cursor-not-allowed">
        <div className="flex">
          <ResourceIconDeactivated />
          <p className="text-strong mt-0 ml-1 font-bold text-gray-500">
            Please select city first
          </p>
        </div>
      </div>
    )
  }
}
