export const API_BASE_URL = "https://api.covid.army"

export const fetchTweets = ({
  location,
  resource,
  limit = undefined,
  offset = undefined,
}) => {
  let url = API_BASE_URL + "/api/tweets"

  if (location) {
    url += "/" + location
  }
  if (resource) {
    url += "/" + encodeURIComponent(resource.trim())
  }

  url += "?"

  if (limit) {
    url += "limit=" + limit
  }
  if (offset) {
    url += "&offset=" + offset
  }

  console.log(url)

  return fetch(url).then((res) => res.json())
}

export const getCities = async () =>
  await fetch(API_BASE_URL + "/api/cities")
    .then((res) => res.json())
    .then((data) => Object.keys(data))

export const getResources = async () =>
  await fetch(API_BASE_URL + "/api/resources")
    .then((res) => res.json())
    .then((data) => Object.keys(data))
