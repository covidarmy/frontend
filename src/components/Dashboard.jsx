import * as React from "react"
import LocationFilter from "./LocationFilter"
import ResourceFilter from "./ResourceFilter"
import TweetsList from "./TweetsList"

export const Dashboard = ({
  data: { resources, cities, tweets, resource, city },
}) => {
  return (
    <div className="flex flex-col w-full items-center justify-center gap-4 lg:mt-8 mt-6 px-4 lg:px-0">
      <div className="rounded-md grid grid-cols-1 lg:grid-cols-2 gap-4 pb-4">
        <LocationFilter data={cities} city={city} resource={resource} />
        <ResourceFilter data={resources} city={city} resource={resource} />
      </div>
      <TweetsList data={tweets} />
    </div>
  )
}
