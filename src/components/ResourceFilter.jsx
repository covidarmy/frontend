import * as React from "react"
import Link from "next/link"
import FilterButton from "./FilterButton"
import ResourceIcon from "../assets/Resource.svg"
import ResourceIconDeactivated from "../assets/ResourceDeactivated.svg" 

export default function ResourceFilter({ data, city, resource }) {

  const [changeResource, setChangeResource] = React.useState(false);

  const citySelected = () => {
    return (
      <div className="shadow-md border border-gray-200 rounded-md bg-white text-center box-border h-auto w-full my-2 p-3 lg:p-6">
        <div className="flex">
          <ResourceIcon />
          <p className="text-strong mt-0 ml-1 font-bold">Choose Resources</p>
        </div>
        <div className="mt-2 text-start text-left flex-wrap flex items-center justify-start">
          {data.map((item) => {
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
  }

  const cityResourceSelected = () => {
    return (
      <div className="shadow-md border border-gray-200 rounded-md bg-white text-center box-border h-auto w-full my-2 p-3 lg:p-6">
        <div className="flex ml-1 justify-between">
          <div className="flex">
            {/* ICON */}
            <ResourceIcon />
            {/* CITY NAME */}
            <p className="text-strong ml-1 mt-0.5 font-bold capitalize">
              {resource}
            </p>
          </div>

          {/* CHANGE BUTTON */}
          <button onClick={() => setChangeResource(!changeResource)} >
            <span className="font-bold text-primary">Change</span>
          </button>
        </div>
      </div>
    )
  }

  const noneSelected = () => {
    return (
      <div className="shadow-md border border-gray-200 rounded-md bg-gray-100 text-center box-border h-auto w-full my-2 p-3 lg:p-6 cursor-not-allowed">
        <div className="flex">
          <ResourceIconDeactivated />
          <p className="text-strong mt-0 ml-1 font-bold text-gray-500">Please select city first</p>
        </div>
      </div>
    )
  }

  if(city && resource && !changeResource) {
    return cityResourceSelected()
  }
  else if (city) {
    return citySelected()
  }
  else {
    return noneSelected()
  }
}
