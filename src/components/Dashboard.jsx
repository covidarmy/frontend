import * as React from 'react'
import LocationFilter from './LocationFilter'
import ResourceFilter from './ResourceFilter'
import TweetsList from './TweetsList'
import { DesktopFooter } from './Footer'

import { FABWhatsapp } from './FAB'
import { isDesktop, isMobile, isTablet } from 'react-device-detect'

export default function Dashboard({ cities, resources }) {
  return (
    <>
      <main className="container mx-auto p-2 grid grid-cols-1 md:grid-cols-2 md:gap-4 lg:mt-5">
        <div className="flex flex-col">
          <LocationFilter cities={cities} />
          <ResourceFilter resources={resources} />
          {isDesktop && <DesktopFooter />}
        </div>
        <div
          className="lg:overflow-y-auto"
          style={{ height: 'calc(100vh - 100px)' }}
        >
          <TweetsList />
        </div>
      </main>
      {(isMobile || isTablet) && <FABWhatsapp />}
    </>
  )
}
