import ResourceIconDeactivated from '../assets/ResourceDeactivated.svg'
import ResourceIcon from '../assets/Resource.svg'

import FraudBanner from './FraudBanner'
import { useSlug } from '~/context/slug'
import { useTranslation } from '~/context/translation'
import { useRouter } from 'next/router'

export default function ResourceFilter({ resources }) {
  const router = useRouter()
  const { t } = useTranslation()
  const { location, resource } = useSlug()

  const handleResourceClick = (query) => {
    const params = router.query
    router.push({
      pathname: '/',
      query: { ...params, resource: query },
    })
  }

  if (location)
    return (
      <div className="shadow-md border border-gray-200 rounded-md bg-white text-center box-border h-auto w-full my-2 p-3 lg:p-6">
        <div className="flex items-center">
          <ResourceIcon className="h-5 w-5" />
          <p className="text-strong ml-1 font-bold text-sm md:text-base">
            {t('CHOOSE_RESOURCES')}
          </p>
          <FraudBanner />
        </div>
        <div className="mt-2 text-start text-left flex-wrap flex items-center justify-start">
          {Object.keys(resources).map((item, idx) => {
            const buttonResource = item.replace(/\s+/g, '').toLowerCase()
            const classes = `cursor-pointer px-2 py-1 md:px-3 md:py-2 m-1 text-sm md:text-base rounded transition-colors ${
              resource === buttonResource
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-500 hover:text-white'
            }`
            return (
              <a
                key={idx}
                className={classes}
                onClick={() => handleResourceClick(buttonResource)}
              >
                {item}
              </a>
            )
          })}
        </div>
      </div>
    )

  return (
    <div className="shadow-md border border-gray-200 rounded-md bg-gray-100 text-center box-border h-auto w-full my-2 p-3 lg:p-6 cursor-not-allowed">
      <div className="flex items-center">
        <ResourceIconDeactivated />
        <p className="text-strong ml-1 font-bold text-gray-600">
          {t('CHOOSE_LOCATION_FIRST')}
        </p>
      </div>
    </div>
  )
}
