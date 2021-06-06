import * as React from 'react'
import Fuse from 'fuse.js'
import BackIcon from '~/assets/arrow-left.svg'
import LocationIcon from '~/assets/Location.svg'
import FilterButton from '~/components/FilterButton'
import SearchIcon from '~/assets/Search.svg'

import { useTranslation } from '~/context/translation'
import { useEmptyCities } from '~/hooks/useEmptyCities'
import { useStore } from '~/lib/StepsStore'
import { useResources } from '~/hooks/useResources'
import Skeleton from 'react-loading-skeleton'

const LocationFilterCustom = ({ nextStep, cities }) => {
  const [resources, error, isLoading] = useResources()
  const { t } = useTranslation()
  const [searchValue, setSearchValue] = React.useState('')
  const { selectCity } = useStore((state) => ({
    selectCity: state.actions.selectCity,
  }))

  const handleCitySubmit = (item) => {
    selectCity(item)
    nextStep()
  }
  // we can add better error state later
  if (error) return <div>failed to load</div>
  if (isLoading) return <Skeleton height={128} />

  const renderButtons = () => {
    let _data = cities

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

    return _data.map((item) => {
      return (
        <FilterButton
          key={item}
          active={false}
          onClick={() => handleCitySubmit(item)}
        >
          {item}
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
            className="border-2 w-full max-w-sm relative w-400 border-gray-200 bg-white h-14 px-4 rounded-lg text-sm transition-all focus:outline-none focus:ring focus:border-blue-300"
            type="search"
            name="search"
            placeholder="Start searching any city"
            onChange={({ currentTarget }) =>
              setSearchValue(currentTarget.value)
            }
          />
        </div>
        {searchValue && (
          <div className="mt-2 text-start text-left flex-wrap flex items-center justify-start">
            {!isLoading ? (
              cities !== undefined ? (
                renderButtons()
              ) : (
                <div>No empty city found for this state.</div>
              )
            ) : (
              <div>loading..</div>
            )}
          </div>
        )}

        <p className="text-gray-400 mt-7">Select a resource</p>
        <div className="flex flex-wrap mt-2">
          {resources.map((item) => {
            return (
              <FilterButton
                key={item}
                active={false}
                onClick={() => handleResourceSubmit(item)}
              >
                {item}
              </FilterButton>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const Card = ({ title, resources }) => {
  const { nextStep } = useStore((state) => ({
    nextStep: state.actions.nextStep,
  }))

  const handleSubmit = () => {
      
    nextStep()
  }

  return (
    <div className="border border-gray-200 rounded-lg px-3 py-4">
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="flex flex-wrap mt-5">
        {Object.keys(resources).map((item) => {
          return (
            <FilterButton
              key={item}
              active={false}
              onClick={() => handleSubmit(item)}
            >
              {item}
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {smallList.map((item) => (
          <Card title={item.city} resources={item.resourceCount} />
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
  const { cstate, nextStep, previousStep } = useStore((state) => ({
    cstate: state.cstate,
    previousStep: state.actions.previousStep,
    nextStep: state.actions.nextStep,
  }))
  const [data, cities, isLoading] = useEmptyCities(cstate)

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
        <div className="mb-5">
          <p className="text-gray-400">
            Following cities have urgent need of the following resources.
          </p>
          <p>Select a resource for which you will provide a lead</p>
        </div>

        {data === undefined ? <Skeleton /> : <CityAndResource data={data} />}
      </div>

      <LocationFilterCustom
        nextStep={nextStep}
        cities={cities}
        isLoading={isLoading}
      />
    </main>
  )
}

export default CitiesStep
