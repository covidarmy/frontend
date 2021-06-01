import * as React from 'react'
import Navbar from '~/components/Navbar'
import { Dashboard } from '~/components/Dashboard'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { camelize } from '~/lib/utils'
import { API_BASE_URL } from '~/constants'

function HomePage({ cities, resources }) {
  const router = useRouter()
  const params = router.query

  const title = Array.isArray(params)
    ? params
        .map((i) => {
          return i[0].toUpperCase() + i.slice(1)
        })
        .join(' - ')
    : ''

  const resource = typeof params.resource === 'string' ? camelize(params.resource) : null
  const pageTitle = `Covid.army ${title}`
  const desc = `Covid Resources Leads${title !== '' ? ` For ${title}` : ''}`

  return (
    <>
      <NextSeo
        title={pageTitle}
        openGraph={{
          title: pageTitle,
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
