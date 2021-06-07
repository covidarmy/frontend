import * as React from 'react'
import Fuse from 'fuse.js'
import BackIcon from '~/assets/arrow-left.svg'
import ResourceIcon from '~/assets/Resource.svg'

import FilterButton from '~/components/FilterButton'
import Highlighter from 'react-highlight-words'

import { useEmptyCities } from '~/hooks/useEmptyCities'
import { useStore } from '~/lib/StepsStore'
import { useResources } from '~/hooks/useResources'
import Skeleton from 'react-loading-skeleton'
import LoadingPage from '../LoadingPage'

import { HiChevronUp as UpArrow } from 'react-icons/hi'
import { getSortedResources } from '~/utils/getSortedResources'

const LocationFilterCustom = ({ cities }) => {
  const [resources, error, isLoading] = useResources()
  const [searchValue, setSearchValue] = React.useState('')
  const [showAll, setShowAll] = React.useState(false)

  const { city, resource, nextStep, selectCity, selectResource } = useStore(
    (state) => ({
      city: state.city,
      resource: state.resource,
      nextStep: state.actions.nextStep,
      selectCity: state.actions.selectCity,
      selectResource: state.actions.selectResource,
    })
  )

  const handleCitySubmit = (item) => {
    selectCity(item)
  }
  const handleResourceSubmit = (item) => {
    selectResource(item)
  }
  const handleSubmit = () => {
    nextStep()
  }

  // we can add better error state later
  if (error) return <div>failed to load</div>
  if (isLoading) return <Skeleton height={128} />

  const renderButtons = () => {
    let _data = showAll ? cities : cities.slice(0, 12)

    if (searchValue) {
      const fuse = new Fuse(
        cities.sort().filter((i) => typeof i !== 'boolean'),
        { includeScore: true }
      )

      _data = fuse
        .search(searchValue)
        .map(({ item }) => item)
        .slice(0, 12)
    }

    return _data.map((item, idx) => {
      return (
        <FilterButton
          isButton
          key={idx}
          active={city === item}
          onClick={() => handleCitySubmit(item)}
        >
          <Highlighter
            searchWords={[searchValue]}
            autoEscape={true}
            textToHighlight={item}
          />
        </FilterButton>
      )
    })
  }

  return (
    <div className="shadow-md bg-white py-6 px-4 sm:px-10 w-full max-w-4xl mt-5">
      <div className="bg-white h-auto w-full my-2">
        <p>You can also select city and resources manually here</p>

        {/* search bar */}
        <div className="text-gray-400 mt-5">City</div>
        <div className="pt-2 ml-1 flex justify-start relative text-gray-600">
          <input
            className="border-2 w-full max-w-sm relative w-400 border-gray-200 bg-white h-12 px-4 rounded-lg transition-all focus:outline-none focus:ring focus:border-blue-300"
            type="search"
            name="search"
            placeholder="Start searching empty cities"
            onChange={({ currentTarget }) =>
              setSearchValue(currentTarget.value)
            }
          />
        </div>
        <div className="mt-2 text-start text-left flex-wrap flex items-center justify-start">
          {renderButtons()}
        </div>
        <div className="mt-2 ml-1">
          <button
            className="hover:underline flex items-center text-indigo-600 focus:outline-none focus:ring focus:border-blue-300"
            onClick={() => setShowAll((prev) => !prev)}
          >
            <span>{showAll ? 'Show Less' : 'Show More'}</span>
            <UpArrow
              className={`mt-0.5 ml-1 transform ${!showAll && 'rotate-180'}`}
            />
          </button>
        </div>

        <p className="text-gray-400 mt-7">Select a resource</p>
        <div className="flex flex-wrap mt-2">
          {resources.map((item, idx) => {
            return (
              <FilterButton
                isButton
                key={idx}
                active={resource === item}
                onClick={() => handleResourceSubmit(item)}
              >
                {item}
              </FilterButton>
            )
          })}
        </div>
      </div>

      <div className="mt-10 rounded-md">
        <button
          className={`py-2 px-8 w-full md:w-auto text-white ${
            city && resource ? 'bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
          }`}
          onClick={() => handleSubmit()}
        >
          Submit
        </button>
      </div>
    </div>
  )
}

const Card = ({ city, resources }) => {
  const { nextStep, selectCity, selectResource } = useStore((state) => ({
    nextStep: state.actions.nextStep,
    selectCity: state.actions.selectCity,
    selectResource: state.actions.selectResource,
  }))
  const sortedResource = getSortedResources(resources)

  const handleSubmit = (item) => {
    selectCity(city)
    selectResource(item)
    nextStep()
  }

  return (
    <div className="border border-gray-200 rounded-lg px-3 py-4">
      <h2 className="text-lg font-bold">{city}</h2>
      <div className="flex flex-wrap mt-5">
        {sortedResource.map((item, idx) => {
          return (
            <FilterButton
              key={idx}
              active={false}
              onClick={() => handleSubmit(item.resource)}
            >
              {item.resource}
            </FilterButton>
          )
        })}
      </div>
    </div>
  )
}

const CityAndResource = ({ data }) => {
  const [size, setSize] = React.useState(4)
  const [smallList, setSmallList] = React.useState(data.slice(0, size))

  React.useEffect(() => {
    setSmallList(data.slice(0, size))
  }, [size])

  return (
    <>
      <div className="mb-5">
        <p className="text-gray-400">
          Following cities have urgent need of the following resources.
        </p>
        <p>Select a resource for which you will provide a lead</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {smallList.map((item) => (
          <Card city={item.city} resources={item.resourceCount} />
        ))}
      </div>
      {size <= smallList.length && (
        <button
          className="mt-5 w-full border border-gray-200 rounded-lg py-3 text-blue-500 hover:bg-gray-100 transition-colors"
          onClick={() => setSize(size + 4)}
        >
          Load more cities
        </button>
      )}
    </>
  )
}

const CitiesStep = () => {
  const { cstate, previousStep } = useStore((state) => ({
    cstate: state.cstate,
    previousStep: state.actions.previousStep,
  }))
  const { rankedData, cities, isLoading } = useEmptyCities(cstate)

  if (isLoading) return <LoadingPage />

  return (
    <main className="flex flex-col items-center justify-center rounded-lg p-4 sm:p-8">
      <div className="shadow-md bg-white py-6 px-4 sm:px-10 w-full max-w-4xl">
        <div className="flex items-center">
          <a
            aria-label="Back Button"
            onClick={previousStep}
            className="cursor-pointer"
          >
            <BackIcon />
          </a>
          <div className="w-full">
            <p className="text-sm text-center">Step 2 of 3</p>
          </div>
        </div>
        <hr className="my-6" />
        <div className="flex items-center mb-5 text-lg">
          <ResourceIcon className="h-5 w-5 mt-1" />
          <p className="text-strong ml-1 mt-0.5 font-bold">Choose a resource</p>
        </div>
        {cities && rankedData ? (
          <CityAndResource data={rankedData} />
        ) : (
          <div>Sorry, there are no empty cities available for this state.</div>
        )}
      </div>

      {cities !== undefined && <LocationFilterCustom cities={cities} />}
    </main>
  )
}

export default CitiesStep
