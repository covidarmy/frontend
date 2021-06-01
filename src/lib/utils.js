const camelize = (str) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word) {
      return word.toUpperCase()
    })
    .replace(/\s+/g, '')
}

const getPageTitle = (location, resource) => {
  // Covid.army - Bangalore - Oxygenbed
  let title = 'Covid.army'

  if (location) {
    title += ' - ' + camelize(location)
  }

  if (resource) {
    title += ' - ' + camelize(resource)
  }

  return title
}

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

export { getPageDescription, getPageTitle }
