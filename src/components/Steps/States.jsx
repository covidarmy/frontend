import { useRouter } from 'next/router'
import * as React from 'react'
import Fuse from 'fuse.js'
import BackIcon from '~/assets/arrow-left.svg'
import LocationIcon from '~/assets/Location.svg'
import SearchIcon from '~/assets/Search.svg'

import AllStates from '~/lib/states'
import { useStore } from '~/lib/StepsStore'

const LocationFilterCustom = ({ nextStep }) => {
  const { selectState } = useStore((state) => ({
    selectState: state.actions.selectState,
  }))
  const [searchValue, setSearchValue] = React.useState('')

  const handleStateSubmit = (item) => {
    selectState(item)
    nextStep()
  }

  const renderButtons = () => {
    let _data = AllStates

    if (searchValue) {
      const fuse = new Fuse(
        AllStates.sort().filter((i) => typeof i !== 'boolean'),
        { includeScore: true }
      )

      _data = fuse.search(searchValue).map(({ item }) => item)
    }

    return _data.map((item) => {
      return (
        <button
          className="w-full flex justify-start py-6 pl-1 border-b border-gray-300 font-semibold"
          key={item}
          onClick={() => handleStateSubmit(item)}
        >
          {item}
        </button>
      )
    })
  }

  return (
    <div className="bg-white h-auto w-full my-2">
      <div className="flex items-center ml-1 mb-1">
        <LocationIcon className="h-5 w-5 mt-1" />
        <p className="text-strong ml-1 mt-0.5 font-bold">
          Choose the state you live in
        </p>
      </div>
      {/* search bar */}
      <div className="pt-2 ml-1 flex justify-start relative text-gray-600">
        <input
          className="border-2 w-full relative w-400 border-gray-300 bg-white h-10 pl-10 pr-4 rounded-lg text-sm transition-all focus:outline-none focus:ring focus:border-blue-300"
          type="search"
          name="search"
          placeholder="Start searching any state"
          onChange={({ currentTarget }) => setSearchValue(currentTarget.value)}
        />
        <SearchIcon className="absolute top-5 left-4" />
      </div>
      <div className="mt-2 -mr-2 flex flex-col max-h-96 overflow-y-auto">
        {renderButtons()}
      </div>
    </div>
  )
}

const StatesStep = () => {
  const router = useRouter()
  const { nextStep } = useStore((state) => ({
    nextStep: state.actions.nextStep,
  }))

  return (
    <main className="flex flex-col items-center justify-center rounded-lg p-4 sm:p-8">
      <div className="shadow-md bg-white p-4 sm:px-10 w-full max-w-lg">
        <div className="flex items-center">
          <a
            aria-label="Back Button"
            onClick={() => {
              router.push('/dashboard')
            }}
            className="cursor-pointer"
          >
            <BackIcon />
          </a>
          <div className="w-full">
            <p className="text-sm text-center">Step 1 of 4</p>
          </div>
        </div>
        <hr className="my-6" />
        <LocationFilterCustom nextStep={nextStep} />
      </div>
    </main>
  )
}

export default StatesStep
