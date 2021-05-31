import useSWR from "swr";
import * as React from "react";
import { API_BASE_URL } from "~/constants";

const fetcher = (url, token) => {
  if (token === "") return;
  return fetch(url, {
    headers: {
      authorization: token,
    },
  }).then((res) => res.json());
};

export const useLeads = (authToken) => {
  const { data, error } = useSWR(
    [`${API_BASE_URL}/volunteer/contacts`, authToken],
    fetcher
  );
  const [leads, setLeads] = React.useState(data);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (data) {
      setLeads(data.reverse());
      setIsLoading(false);
    }
  }, [data]);

  return [leads, error, isLoading];
};
