import * as React from "react"

// COMPONENTS
import LocationFilter from "./LocationFilter"
import ResourceFilter from "./ResourceFilter"
import TweetsList from "./TweetsList"
import Footer from "./Footer"
import { useTranslation } from "~/context/translation"

export const Dashboard = () => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col justify-between h-screen min-h-screen">
      <div>
        {/* DISCLAIMER */}
        <div className="mt-4 lg:mt-8 text-center mb-4 md:mb-0">
          <p className="text-red-600 font-bold">
            🚨 {t("FRAUDSTERS_DISCLAIMER")} 🚨
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 px-4 overflow-hidden lg:mt-6">
          <div className="rounded-md">
            <LocationFilter />
            <ResourceFilter />
          </div>
          <TweetsList />
        </div>
      </div>
      <Footer />
    </div>
  )
}
