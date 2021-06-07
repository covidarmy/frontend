import * as React from 'react'
import Navbar from '~/components/Navbar'
import Dashboard from '~/components/Dashboard'

import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { API_BASE_URL } from '~/constants'
import { getPageTitle } from '~/utils/getPageTitle'
import { getPageDescription } from '~/utils/getPageDescription'

function HomePage({ cities, resources }) {
  const router = useRouter()
  const { location, resource } = router.query

  const title = getPageTitle(location, resource)
  const desc = getPageDescription(location, resource)

  return (
    <>
      <NextSeo
        title={title}
        openGraph={{
          title: title,
          description: desc,
        }}
      />
      <Navbar />
      <Dashboard cities={cities} resources={resources} />
    </>
  )
}

export async function getStaticProps() {
  const citiesResponse = await fetch(`${API_BASE_URL}/api/cities`)
  const resourcesResponse = await fetch(`${API_BASE_URL}/api/resources`)

  const cities = await citiesResponse.json()
  const resources = await resourcesResponse.json()

  return {
    props: {
      cities,
      resources,
    },
  }
}

export default HomePage
