import React from "react";
import { SWRConfig } from "swr/_internal";
import axios from "axios";

export default function SWRWrapper({ children }: React.PropsWithChildren) {
  return (
    <SWRConfig
      value={{
        refreshWhenHidden: false,
        fetcher: (params) => generalFetcher(params).then((res) => res?.data),
      }}
    >
      {children}
    </SWRConfig>
  );
}

async function generalFetcher<T = any>(urlOrParam: string | [string, object?, object?]) {
  try {
    const [url, body, params] = typeof urlOrParam === "string" ? [urlOrParam, undefined, undefined] : urlOrParam;

    return await axios<T>(url, {
      method: "GET",
      data: body,
      params,
    });
  } catch {
    return undefined;
  }
}
