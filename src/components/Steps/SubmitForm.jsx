import * as React from "react"
import { useRouter } from "next/router"
import BackIcon from "~/assets/arrow-left.svg"
import PhoneIcon from "~/assets/phone.svg"
import { API_BASE_URL } from "~/constants"
import { useStore } from "~/lib/StepsStore"

const SubmitForm = ({ previousStep, user }) => {
  const router = useRouter()
  const { resource } = useStore((state) => ({
    resource: state.resource,
  }))

  console.log(resource);

  const handleSubmit = () => {
    //     const rawResponse = await fetch(`${API_BASE_URL}/volunteer/contacts/`, {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         authorization: ''
    //     })
    //   });

    //   const content = await rawResponse.json();

    console.log(user)

    router.push("/dashboard")
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
        <form>
          <div className="flex items-center mt-10 gap-2">
            <p>Mobile</p>
            {/* add switch here */}
            <p>Landline</p>
          </div>

          <div className="flex gap-3  mt-3">
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm opacity-50">
                STD Code
              </label>
              <input type="text" className="border w-20 p-2" />
            </div>
            <span className="text-sm opacity-50">—</span>
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm opacity-50">
                Contact Number
              </label>
              <input type="text" className="border w-40 p-2" />
            </div>
          </div>

          <div className="mt-7">
            <p className="text-sm opacity-50">
              Please add the link of the source <small>(optional)</small>
            </p>
            <input type="text" className="border w-full p-2 mt-1" />
          </div>

          <div className="mt-7">
            <p className="text-sm opacity-50">
              Message/comment to go along with the contact number
            </p>
            <textarea className="border w-full h-28 p-2 mt-1" />
          </div>

          <div className="mt-7">
            <p className="text-sm opacity-50 mb-2">
              Is it a verified resource ? <small>(optional)</small>
            </p>
            <button className="bg-gray-200 px-4 py-2 rounded-sm">Yes</button>
            <button className="bg-gray-200 px-4 py-2 rounded-sm ml-2">
              No
            </button>
          </div>
        </form>

        <a className=" block text-blue-500 my-14 cursor-pointer hover:underline">
          Add another number and link
        </a>

        <hr className="mt-6" />
        <div className="flex justify-center mt-10 rounded-md">
          <button
            className="py-2 px-8 bg-blue-600 text-white"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </main>
  )
}

export default SubmitForm
