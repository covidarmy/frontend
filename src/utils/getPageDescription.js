import camelize from './camelize'

const getPageDescription = (location, resource) => {
  // Covid Resources Leads For Bangalore - Oxygenbed
  let desc = 'Verified Real Time List of COVID-19 Resources and Aid' // default

  if (location) {
    desc = `Covid Resources Leads For ${camelize(location)}`
  }

  if (resource) {
    desc += `- ${camelize(resource)}`
  }

  return desc
}

export { getPageDescription }
