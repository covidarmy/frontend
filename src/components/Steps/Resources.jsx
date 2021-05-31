import { useRouter } from 'next/router'
import * as React from 'react'
import LoadingPage from '~/components/LoadingPage'
import { useAuth } from '~/context/auth'
import BackIcon from '~/assets/arrow-left.svg'
import { useTranslation } from '~/context/translation'
import { useResources } from '~/hooks/useResources'
import FilterButton from '~/components/FilterButton'
import ResourceIcon from '~/assets/Resource.svg'
import Skeleton from 'react-loading-skeleton'
import { useStore } from '~/lib/StepsStore'

const ResourceFilterCustom = ({ nextStep }) => {
  const { t } = useTranslation()
  const { selectResource } = useStore((state) => ({
    selectResource: state.actions.selectResource,
  }))
  const [resources, error, isLoading] = useResources()

  const handleResourceSubmit = (item) => {
    selectResource(item)
    nextStep()
  }

  // we can add better error state later
  if (error) return <div>failed to load</div>
  if (isLoading) return <Skeleton height={128} />

  return (
    <div className="bg-white text-center h-auto w-full my-2">
      <div className="flex items-center">
        <ResourceIcon />
        <p className="text-strong mt-0 ml-1 font-bold">
          {t('CHOOSE_RESOURCES')}
        </p>
      </div>
      <div className="mt-2 text-start text-left flex-wrap flex items-center justify-start">
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
  )
}

const ResourceStep = () => {
  const { nextStep, previousStep } = useStore((state) => ({
    previousStep: state.actions.previousStep,
    nextStep: state.actions.nextStep,
  }))

  return (
    <main className="flex flex-col items-center justify-center rounded-lg p-4 sm:p-8">
      <div className="shadow-md bg-white p-4 sm:px-10 w-full max-w-lg">
        <div className="flex items-center">
          <a
            aria-label="Back Button"
            onClick={previousStep}
            className="cursor-pointer"
          >
            <BackIcon />
          </a>
          <div className="w-full">
            <p className="text-sm text-center">Step 3 of 4</p>
          </div>
        </div>
        <hr className="my-6" />
        <ResourceFilterCustom nextStep={nextStep} />
      </div>
    </main>
  )
}

export default ResourceStep
