import * as React from "react"
import LocationFilter from "./LocationFilter"
import ResourceFilter from "./ResourceFilter"
import TweetsList from "./TweetsList"

export const Dashboard = ({
  data: { resources, tweets, cities, resource, city },
}) => {
  return (
    <>
      <div className="lg:flex hidden flex-col justify-center px-4 overflow-hidden lg:flex-row lg:mt-6">
        <div className="rounded-md flex flex-col lg:w-6/12">
          <LocationFilter data={cities} city={city} resource={resource} />
          <ResourceFilter data={resources} city={city} resource={resource} />
        </div>
        <div className="h-auto overflow-y-auto flex flex-col items-center lg:w-6/12 pb-4">
          <TweetsList city={city} resource={resource} data={tweets} />
        </div>
      </div>
      <div className="flex-col justify-center px-4 space-y-6 lg:flex-row lg:mt-6 flex lg:hidden pb-6">
        <div className="rounded-md flex flex-col lg:w-6/12">
          <LocationFilter data={cities} city={city} resource={resource} />
          <ResourceFilter data={resources} city={city} resource={resource} />
        </div>
        <TweetsList city={city} resource={resource} data={tweets} />
      </div>
    </>
  )
}
