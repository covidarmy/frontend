import fetcher from "~/lib/fetcher";
import useSWR from "swr";
import * as React from "react";
import { API_BASE_URL } from "~/constants";

const getCitiesFromData = (data) => {
  const cities = [];
  data.map((item) => {
    cities.push(item.name);
  });

  return cities;
};

const getTopCitiesFromData = (data) => {
  const topCities = [];
  data.map((item) => {
    if (item.top) topCities.push(item.name);
  });

  return topCities;
};

export const useCities = () => {
  const { data, error } = useSWR(`${API_BASE_URL}/api/cities`, fetcher);
  const [cities, setCities] = React.useState(data);
  const [topCities, setTopCities] = React.useState(data);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (data) {
      setCities(getCitiesFromData(data));
      setTopCities(getTopCitiesFromData(data));
      setIsLoading(false);
    }
  }, [data]);

  return [cities, topCities, error, isLoading];
};
