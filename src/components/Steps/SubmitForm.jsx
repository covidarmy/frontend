import * as React from 'react'
import BackIcon from '~/assets/arrow-left.svg'
import PhoneIcon from '~/assets/phone.svg'

import { useRouter } from 'next/router'
import { API_BASE_URL } from '~/constants'
import { useStore } from '~/lib/StepsStore'
import { isDesktop } from 'react-device-detect'
import { RadioGroup, Switch } from '@headlessui/react'

const SubmitForm = ({ user }) => {
  const router = useRouter()
  const {
    city,
    resource,
    reset,
    previousStep,
    selectCity,
    selectResource,
  } = useStore((state) => ({
    city: state.city,
    resource: state.resource,
    reset: state.actions.reset,
    previousStep: state.actions.previousStep,
    selectCity: state.actions.selectCity,
    selectResource: state.actions.selectResource,
  }))
  const [landlineEnabled, setLandlineEnabled] = React.useState(false)
  const [stdCode, setStdCode] = React.useState('')
  const [phoneNo, setPhoneNo] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [isVerifed, setIsVerfied] = React.useState('')

  const resetStore = () => {
    selectCity('')
    selectResource('')
    reset()
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    user.getIdToken().then((idToken) => {
      const postRequestBody = {
        city: city.toLowerCase(),
        phone_no: stdCode + phoneNo,
        title: title,
        description: message,
        resource_type: resource.split(' ').join('').toLowerCase(),
        isVerified: isVerifed === 'Yes' ? true : false,
      }

      //   console.log(postRequestBody)
      fetch(`${API_BASE_URL}/volunteer/contacts/`, {
        method: 'POST',
        headers: {
          authorization: idToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postRequestBody),
      })
        .then((res) => res.json())
        .then(() => {
          router.push('/dashboard')
          setTimeout(() => reset(), 2000)
        })
        .catch((e) => {
          console.log(e)
        })
    })
  }

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
            <p className="text-sm text-center">Last Step</p>
          </div>
        </div>
        <hr className="my-6" />
        <div className="flex items-center">
          {isDesktop && <PhoneIcon />}
          <p className="ml-0 md:ml-2 font-bold">Please add contact details.</p>
        </div>

        {/* form */}
        <form onSubmit={handleFormSubmit}>
          <div className="flex gap-3  mt-3">
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm opacity-50">
                Your name
              </label>
              <input
                type="text"
                className="border w-50 p-2 mt-1"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          {/* switch */}
          <div className="flex items-center mt-7 gap-2">
            <div
              className={
                !landlineEnabled
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-600'
              }
            >
              mobile
            </div>
            <Switch
              checked={landlineEnabled}
              onChange={setLandlineEnabled}
              className="relative inline-flex items-center h-6 rounded-full w-11 border border-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              <span className="sr-only">Switch to landline</span>
              <span
                className={`${
                  landlineEnabled ? 'translate-x-6' : 'translate-x-1'
                } inline-block w-4 h-4 transform rounded-full bg-blue-600`}
              />
            </Switch>
            <div
              className={
                landlineEnabled
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-600'
              }
            >
              landline
            </div>
          </div>

          {/* phone_no */}
          <div className="flex items-center gap-3 mt-2">
            {landlineEnabled && (
              <>
                <div className="flex flex-col">
                  <label htmlFor="" className="text-sm opacity-50">
                    STD Code
                  </label>
                  <input
                    type="tel"
                    className="border w-20 p-2 mt-1"
                    value={stdCode}
                    required
                    onChange={(e) => setStdCode(e.target.value)}
                  />
                </div>
                <div className="mt-4 text-gray-600">—</div>
              </>
            )}
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm opacity-50">
                Contact Number
              </label>
              <input
                type="tel"
                className="border w-full p-2 mt-1"
                value={phoneNo}
                required
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-7">
            <p className="text-sm opacity-50">
              Message/comment to go along with the contact number (optional).
            </p>
            <textarea
              className="border w-full h-28 p-2 mt-1"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className="mt-7">
            <p className="text-sm opacity-50 mb-2">
              Is it a verified resource ? <small>(optional)</small>
            </p>
            <RadioGroup
              value={isVerifed}
              onChange={setIsVerfied}
              className="flex gap-2"
            >
              <RadioGroup.Option value="Yes">
                {({ checked }) => (
                  <button
                    type="button"
                    className={`${
                      checked ? 'bg-blue-600 text-white' : 'bg-gray-200'
                    } px-4 py-2 rounded-sm`}
                  >
                    Yes
                  </button>
                )}
              </RadioGroup.Option>
              <RadioGroup.Option value="No">
                {({ checked }) => (
                  <button
                    type="button"
                    className={`${
                      checked ? 'bg-blue-600 text-white' : 'bg-gray-200'
                    } px-4 py-2 rounded-sm`}
                  >
                    No
                  </button>
                )}
              </RadioGroup.Option>
            </RadioGroup>
          </div>

          <hr className="mt-6" />
          <div className="flex justify-center mt-10 rounded-md">
            <button className="py-2 px-8 bg-blue-600 text-white" type="submit">
              Submit
            </button>
          </div>
        </form>

        {/* <a className=" block text-blue-500 my-14 cursor-pointer hover:underline">
          Add another number and link
        </a> */}
      </div>
    </main>
  )
}

export default SubmitForm
