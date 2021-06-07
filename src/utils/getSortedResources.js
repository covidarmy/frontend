const getSortedResources = (resources) => {
  const arrayResources = []

  for (const resource in resources) {
    arrayResources.push({ resource, count: resources[resource].count })
  }

  arrayResources.sort((a, b) => {
    return a.count - b.count
  })

  return arrayResources
}

export { getSortedResources }
