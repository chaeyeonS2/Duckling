import React from "react";
import { SWRConfig } from "swr/_internal";
import axios from "axios";
import "./firebase/config";

export default function SWRWrapper({ children }: React.PropsWithChildren) {
  return (
    <SWRConfig
      value={{
        fetcher: (params) => generalFetcher(params).then((res) => res.data),
      }}
    >
      {children}
    </SWRConfig>
  );
}

async function generalFetcher<T = any>([url, body, params]: [
  string,
  object?,
  object?
]) {
  return await axios<T>(url, {
    method: "GET",
    data: body,
    params,
  });
}

axios.defaults.baseURL = "https://us-central1-netural-app.cloudfunctions.net";
