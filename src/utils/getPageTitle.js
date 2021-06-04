import camelize from './camelize'

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

export { getPageTitle }
