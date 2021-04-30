import fetch from "node-fetch"

const BASE_URL = "https://api.covid.army/api/tweets"

export const fetchTweets = ({ location, resource, limit, offset }) => {
  let url = BASE_URL
  
  if(location){
    url += "/" + location[0].toUpperCase() + location.substring(1, location.length).toLowerCase()
  }
  if(resource){
    url += "/" + resource.toLowerCase()
  }
  url += "?"

  if(limit){
    url += "limit="+limit
  }
  if(offset){
    url += "&offset="+offset
  }
  console.log(url);
  return fetch(url).then(res => res.json());
}
