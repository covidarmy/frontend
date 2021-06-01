import * as React from 'react'
import LocationFilter from './LocationFilter'
import ResourceFilter from './ResourceFilter'
import TweetsList from './TweetsList'
import Footer from './Footer'

import { FABWhatsapp } from './FAB'
import { isDesktop, isMobile, isTablet } from 'react-device-detect'

export default function Dashboard({ cities, resources }) {
  return (
    <>
      <main className="container mx-auto p-2 grid grid-cols-1 md:grid-cols-2 md:gap-4 lg:mt-5">
        <div className="flex flex-col">
          <LocationFilter cities={cities} />
          <ResourceFilter resources={resources} />
          {isDesktop && <Footer />}
        </div>
        <TweetsList />
      </main>
      {(isMobile || isTablet) && <FABWhatsapp />}
    </>
  )
}
