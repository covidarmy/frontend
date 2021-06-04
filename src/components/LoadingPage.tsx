import * as React from 'react'
import SpinnerIcon from '~/assets/spinner.svg'

const LoadingPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen overflow-hidden">
      <SpinnerIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" />
    </div>
  )
}

export default LoadingPage
