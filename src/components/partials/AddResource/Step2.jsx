import { useRouter } from "next/router"
import * as React from "react"
import Link from "next/link"
import LoadingPage from "~/components/LoadingPage"
import Navbar from "~/components/Navbar"
import { useAuth } from "~/context/auth"
import BackIcon from "~/assets/arrow-left.svg"
import { useTranslation } from "~/context/translation"
import { useResources } from "~/hooks/useResources"
import FilterButton from "~/components/FilterButton"
import ResourceIcon from "~/assets/Resource.svg"
import Skeleton from "react-loading-skeleton"

const ResourceFilterCustom = () => {
  const { t } = useTranslation()
  const [resources, error, isLoading] = useResources()

  // we can add better error state later
  if (error) return <div>failed to load</div>
  if (isLoading) return <Skeleton height={128} />

  return (
    <div className="bg-white text-center h-auto w-full my-2">
      <div className="flex items-center">
        <ResourceIcon />
        <p className="text-strong mt-0 ml-1 font-bold">
          {t("CHOOSE_RESOURCES")}
        </p>
      </div>
      <div className="mt-2 text-start text-left flex-wrap flex items-center justify-start">
        {resources.map((item) => {
          return (
            <FilterButton key={item} active={false} href={"/dashboard/step3"}>
              {item}
            </FilterButton>
          )
        })}
      </div>
    </div>
  )
}

const Step2Page = () => {
  const { isAuthenticated, user, loading } = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, loading])

  if (loading) return <LoadingPage />

  return (
    <div
      className="shadow-md bg-white py-6 px-6 sm:px-10 w-full "
      style={{ maxWidth: "32rem" }}
    >
      <div className="flex items-center">
        <Link href="/dashboard">
          <a aria-label="Back Button">
            <BackIcon />
          </a>
        </Link>
        <div className="w-full">
          <p className="text-sm text-center">Step 2 of 3</p>
        </div>
      </div>
      <hr className="my-6" />
      <ResourceFilterCustom />
    </div>
  )
}

export default Step2Page
