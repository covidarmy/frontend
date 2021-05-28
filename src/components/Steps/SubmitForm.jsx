import * as React from "react"
import { useRouter } from "next/router"
import BackIcon from "~/assets/arrow-left.svg"
import PhoneIcon from "~/assets/phone.svg"
import { API_BASE_URL } from "~/constants"
import { useStore } from "~/lib/StepsStore"

const SubmitForm = ({ previousStep, user }) => {
  const router = useRouter()
  const { city, resource } = useStore((state) => ({
    city: state.city,
    resource: state.resource,
  }))
  const [phoneNo, setPhoneNo] = React.useState()
  const [title, setTitle] = React.useState()

  const handleFormSubmit = (e) => {
    e.preventDefault()

    user.getIdToken().then((idToken) => {
      const postRequestBody = {
        authorization: idToken,
        city: city,
        phone_no: phoneNo,
        resource_type: resource,
        title: title,
      }

      console.log(postRequestBody)
      fetch(`${API_BASE_URL}/volunteer/contacts/`, {
        method: "POST",
        headers: {
          'Accept': "application/json",
        },
        body: JSON.stringify(postRequestBody),
      })
        .then((res) => {
            console.log(res)
          // router.push("/dashboard")
        })
        .catch((e) => {
          console.log(e)
        })
    })
  }

  return (
    <main className="flex flex-col items-center justify-center rounded-lg p-4 sm:p-8">
      <div
        className="shadow-md bg-white py-6 px-6 sm:px-10 w-full "
        style={{ maxWidth: "32rem" }}
      >
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
          <PhoneIcon />
          <p className="ml-2 font-bold">Please add contact details and links</p>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="flex gap-3  mt-3">
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm opacity-50">
                Title
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
          <div className="flex gap-3  mt-3">
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm opacity-50">
                Contact Number
              </label>
              <input
                type="tel"
                className="border w-50 p-2 mt-1"
                value={phoneNo}
                required
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>
          </div>

          {/* <div className="mt-7">
            <p className="text-sm opacity-50">
              Please add the link of the source <small>(optional)</small>
            </p>
            <input type="text" className="border w-full p-2 mt-1" />
          </div> */}

          <div className="mt-7">
            <p className="text-sm opacity-50">
              Message/comment to go along with the contact number
            </p>
            <textarea className="border w-full h-28 p-2 mt-1" />
          </div>

          {/* <div className="mt-7">
            <p className="text-sm opacity-50 mb-2">
              Is it a verified resource ? <small>(optional)</small>
            </p>
            <button className="bg-gray-200 px-4 py-2 rounded-sm">Yes</button>
            <button className="bg-gray-200 px-4 py-2 rounded-sm ml-2">
              No
            </button>
          </div> */}

          <hr className="mt-6" />
          <div className="flex justify-center mt-10 rounded-md">
            <button className="py-2 px-8 bg-blue-600 text-white">Submit</button>
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
