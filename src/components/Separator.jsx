import clsx from 'clsx'

const Separator = ({ className = '' }) => {
  return (
    <div
      className={clsx(['w-full border-b lg:block border-gray-600', className])}
    />
  )
}

export default Separator
