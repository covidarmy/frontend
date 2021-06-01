import * as React from 'react'
import Fuse from 'fuse.js'
import LocationIcon from '../assets/Location.svg'
import SearchIcon from '../assets/Search.svg'
import FraudBanner from './FraudBanner'

import { useRouter } from 'next/router'
import { HiChevronDown as DownArrow } from 'react-icons/hi'
import { HiChevronUp as UpArrow } from 'react-icons/hi'
import { useSlug } from '~/context/slug'
import { useTranslation } from '~/context/translation'

const getCitiesFromData = (data) => {
  const cities = []
  data.map((item) => {
    cities.push(item.name)
  })

  return cities
}

const getTopCitiesFromData = (data) => {
  const topCities = []
  data.map((item) => {
    if (item.top) topCities.push(item.name)
  })

  return topCities
}

export default function LocationFilter({ cities }) {
  const router = useRouter()
  const { t } = useTranslation()
  const { location } = useSlug()
  const topCities = getTopCitiesFromData(cities)

  const [cityState, setCityState] = React.useState(false)
  const filter = router.pathname === '/' && 'all'
  const [showMore, setShowMore] = React.useState(false)

  const [searchValue, setSearchValue] = React.useState('')

  React.useEffect(() => {
    if (typeof location !== 'undefined') {
      setCityState(true)
    } else {
      setCityState(false)
    }
  }, [location])

  const handleLocationClick = (query) => {
    router.push({
      pathname: '/',
      query: { location: query },
    })
  }

  const renderButtons = () => {
    let _data = null

    if (searchValue) {
      const citiesValues = getCitiesFromData(cities)
      const fuse = new Fuse(
        citiesValues.sort().filter((i) => typeof i !== 'boolean'),
        { includeScore: true }
      )

      _data = fuse.search(searchValue).map(({ item }) => item)
    }

    if (!showMore) {
      _data =
        _data !== null
          ? _data.length > 8
            ? _data.slice(0, 8)
            : _data
          : [
              'Delhi',
              'Bangalore',
              'Chennai',
              'Mumbai',
              'Kolkata',
              'Lucknow',
              'Noida',
              'Gurgaon',
            ]
      if (filter !== 'all' && !_data.includes(filter)) {
        _data = [..._data, filter]
      }
    } else if (_data === null) {
      _data = topCities.sort()
    }

    _data = _data.filter((i) => typeof i !== 'boolean')

    return _data.map((item, idx) => {
      const buttonResource = item.replace(/\s+/g, '').toLowerCase()
      const classes = `cursor-pointer px-2 py-1 md:px-3 md:py-2 m-1 text-sm md:text-base rounded transition-colors ${
        location === buttonResource
          ? 'bg-blue-600 text-white'
          : 'bg-gray-200 hover:bg-gray-500 hover:text-white'
      }`
      return (
        <a
          key={idx}
          className={classes}
          onClick={() => handleLocationClick(buttonResource)}
        >
          {item}
        </a>
      )
    })
  }
  if (!cityState)
    return (
      <div className="shadow-md bg-white box-border h-auto w-full rounded-md my-2 p-3 lg:p-6 border border-gray-200">
        <div className="flex items-center">
          <LocationIcon className="h-5 w-5" />
          <p className="text-strong ml-1 font-bold text-sm md:text-base">
            {t('CHOOSE_LOCATION')}
          </p>
          <FraudBanner />
        </div>
        {/* search bar */}
        <div className="pt-2 ml-1 flex justify-start relative text-gray-600">
          <input
            className="border-2 w-full relative w-400 border-gray-300 bg-white h-10 pl-10 pr-4 rounded-lg text-sm transition-all focus:outline-none focus:ring focus:border-blue-300"
            type="search"
            name="search"
            placeholder="Start searching any city"
            onChange={({ currentTarget }) =>
              setSearchValue(currentTarget.value)
            }
          />
          <SearchIcon className="absolute top-5 left-4" />
        </div>
        <div className="mt-2 text-start text-left flex-wrap flex items-center justify-start">
          {renderButtons()}
        </div>
        <div className="mt-2 ml-1">
          <button
            className="hover:underline flex items-center text-indigo-600 focus:outline-none focus:ring focus:border-blue-300"
            onClick={() => setShowMore((prev) => !prev)}
          >
            <span>{showMore ? 'Most visited' : 'Show all top locations'}</span>
            {showMore && <UpArrow />}
            {!showMore && <DownArrow />}
          </button>
        </div>
      </div>
    )

  return (
    <div className="shadow-md bg-white box-border h-auto w-full rounded-md my-2 p-3 lg:p-6 border border-gray-200">
      <div className="flex ml-1 justify-between">
        <div className="flex items-center">
          <LocationIcon />
          <p className="text-strong ml-1 font-bold capitalize">{location}</p>
        </div>
        <button onClick={() => setCityState(!cityState)}>
          <span className="font-bold text-primary">{t('CHANGE')}</span>
        </button>
      </div>
    </div>
  )
}
