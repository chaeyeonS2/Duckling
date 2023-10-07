import { useState, useEffect } from "react";
import axios from "axios";

function useFetch<T, APIResponse>(
  url: string,
  defaultValue: T,
  map: (data: APIResponse) => T
): T;
function useFetch<APIResponse>(
  url: string,
  defaultValue: APIResponse,
  map?: (data: APIResponse) => APIResponse
): APIResponse;

function useFetch<T, APIResponse>(
  url: string,
  defaultValue: T,
  map = (data: APIResponse): APIResponse => data
): T | APIResponse {
  const [state, setState] = useState<T | APIResponse>(defaultValue);
  useEffect(() => {
    (async () => {
      const data = await axios
        .get(url)
        .then<APIResponse>((res) => res.data)
        .catch(() => undefined);

      if (data) setState(map(data));
    })();
  }, [url, map]);

  return state;
}

export default useFetch;
