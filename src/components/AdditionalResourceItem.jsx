import clsx from "clsx"

export default function AdditionaResourceItem({
  title,
  children,
  noBorder = false,
}) {
  return (
    <>
      <div
        className={clsx([
          "grid grid-cols-2 divide-x divide-gray-400",
          !noBorder && "border-b border-gray-400",
        ])}
      >
        <dt className="w-full py-3 h-full flex items-center justify-end px-4">
          {title}
        </dt>
        <dd className="w-full py-3 h-full flex items-center justify-start px-4">
          {children}
        </dd>
      </div>
    </>
  )
}
