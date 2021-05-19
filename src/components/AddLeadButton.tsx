import Link from "next/link"
import * as React from "react"
import { HiPlus } from "react-icons/hi"

const AddLeadButton = () => {
  return (
    <Link href="/dashboard/add">
      <a className="bg-white rounded shadow-md gap-2 text-gray-700 px-4 py-2 flex items-center justify-center">
        <HiPlus className="h-5 w-5" />
        <span>Add new lead</span>
      </a>
    </Link>
  )
}

export default AddLeadButton
