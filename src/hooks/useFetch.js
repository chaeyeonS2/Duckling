import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url, defaultValue, map = (data) => data) => {
  const [state, setState] = useState(defaultValue);
  useEffect(() => {
    (async () => {
      const data = await axios
        .get(url)
        .then((res) => res.data)
        .catch(() => undefined);

      if (data) setState(map(data));
    })();
  }, [url, map]);

  return state;
};

export default useFetch;
