import Link from "next/link"
import * as React from "react"
import LocationFilter from "./LocationFilter"
import ResourceFilter from "./ResourceFilter"
import Team from "../pages/team"
import TweetsList from "./TweetsList"

export const Dashboard = ({ data: { resources, cities, resource, city } }) => {
  return (
    <div className="flex flex-col justify-center px-4 overflow-hidden lg:flex-row lg:mt-6">
      <div className="rounded-md flex flex-col lg:w-6/12">
        <LocationFilter data={cities} city={city} resource={resource} />
        <ResourceFilter data={resources} city={city} resource={resource} />
      </div>
      <div className="h-auto overflow-y-auto flex flex-col items-center lg:w-6/12">
        <TweetsList city={city} resource={resource} />
      </div>
    </div>
  )
}
