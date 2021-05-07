import FilterButton from "./FilterButton"
import ResourceIcon from "../assets/Resource.svg"
import ResourceIconDeactivated from "../assets/ResourceDeactivated.svg"
import { useResources } from "~/hooks/useResources"
import Skeleton from "react-loading-skeleton"
import { useSlug } from "~/context/slug"
import { useTranslation } from "~/context/translation"

export default function ResourceFilter() {
  const { location, resource } = useSlug()
  const { t } = useTranslation()
  const [resources, error, isLoading] = useResources()

  // we can add better error state later
  if (error) return <div>failed to load</div>
  if (isLoading) return <Skeleton height={128} />

  if (location)
    return (
      <div className="shadow-md border border-gray-200 rounded-md bg-white text-center box-border h-auto w-full my-2 p-3 lg:p-6">
        <div className="flex">
          <ResourceIcon />
          <p className="text-strong mt-0 ml-1 font-bold">Choose Resources</p>
        </div>
        <div className="mt-2 text-start text-left flex-wrap flex items-center justify-start">
          {resources.map((item) => {
            const buttonResource = item.toLowerCase()
            return (
              <FilterButton
                key={item}
                active={resource === buttonResource}
                href={
                  location === null
                    ? `/${buttonResource}`
                    : `/${location}` + `/${buttonResource}`
                }
              >
                {item}
              </FilterButton>
            )
          })}
        </div>
      </div>
    )

  return (
    <div className="shadow-md border border-gray-200 rounded-md bg-gray-100 text-center box-border h-auto w-full my-2 p-3 lg:p-6 cursor-not-allowed">
      <div className="flex">
        <ResourceIconDeactivated />
        <p className="text-strong mt-0 ml-1 font-bold text-gray-500">
          {t("CHOOSE_LOCATION_FIRST")}
        </p>
      </div>
    </div>
  )
}
