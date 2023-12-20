import { SWRConfiguration, SWRResponse } from "swr";

type CheckAPIMap<
  K extends keyof APIMap,
  M extends Methods
> = `${K}-${LengthOfPath<K>}` extends infer KT extends keyof APIMaps
  ? M extends keyof APIMaps[KT]
    ? APIMaps[KT][M] extends infer T extends undefined | [unknown, unknown]
      ? T extends [infer R, infer D]
        ? [R, D]
        : ["invalid method!", "invalid method!"]
      : never
    : never
  : never;

declare module "swr" {
  // override type declaration of "useSWR" and "useSWRImmutable"
  export interface SWRHook {
    <K extends keyof APIMap, T extends CheckAPIMap<K, "GET">>(
      url: T extends ["invalid method!", "invalid method!"] ? T : K,
      config?: SWRConfiguration<T[1]>
    ): T extends ["invalid method!", "invalid method!"] ? SWRResponse<T> : SWRResponse<T[0], T[1]>;

    <K extends keyof APIMap, T extends CheckAPIMap<K, "GET">, D>(
      url: T extends ["invalid method!", "invalid method!"] ? T : K,
      config?: SWRConfiguration<T[1]>
    ): T extends ["invalid method!", "invalid method!"] ? SWRResponse<T> : SWRResponse<T[0], T[1], D>;
  }
}

declare module "axios" {
  export interface Axios {
    get<K extends keyof APIMap, T extends CheckAPIMap<K, "GET">>(
      url: T extends ["invalid method!", "invalid method!"] ? T : K,
      config?: AxiosRequestConfig<T[1]>
    ): Promise<AxiosResponse<T[0]>>;

    delete<K extends keyof APIMap, T extends CheckAPIMap<K, "DELETE">>(
      url: T extends ["invalid method!", "invalid method!"] ? T : K,
      config?: AxiosRequestConfig<T[1]>
    ): Promise<AxiosResponse<T[0]>>;

    post<K extends keyof APIMap, T extends CheckAPIMap<K, "POST">>(
      url: T extends ["invalid method!", "invalid method!"] ? T : K,
      data?: T[1],
      config?: AxiosRequestConfig<T[1]>
    ): Promise<AxiosResponse<T[0]>>;

    put<K extends keyof APIMap, T extends CheckAPIMap<K, "PUT">>(
      url: T extends ["invalid method!", "invalid method!"] ? T : K,
      data?: T[1],
      config?: AxiosRequestConfig<T[1]>
    ): Promise<AxiosResponse<T[0]>>;

    patch<K extends keyof APIMap, T extends CheckAPIMap<K, "PATCH">>(
      url: T extends ["invalid method!", "invalid method!"] ? T : K,
      data?: T[1],
      config?: AxiosRequestConfig<T[1]>
    ): Promise<AxiosResponse<T[0]>>;

    postForm<K extends keyof APIMap, T extends CheckAPIMap<K, "POST">>(
      url: T extends ["invalid method!", "invalid method!"] ? T : K,
      data?: T[1],
      config?: AxiosRequestConfig<T[1]>
    ): Promise<AxiosResponse<T[0]>>;

    putForm<K extends keyof APIMap, T extends CheckAPIMap<K, "PUT">>(
      url: T extends ["invalid method!", "invalid method!"] ? T : K,
      data?: T[1],
      config?: AxiosRequestConfig<T[1]>
    ): Promise<AxiosResponse<T[0]>>;

    patchForm<K extends keyof APIMap, T extends CheckAPIMap<K, "PATCH">>(
      url: T extends ["invalid method!", "invalid method!"] ? T : K,
      data?: T[1],
      config?: AxiosRequestConfig<T[1]>
    ): Promise<AxiosResponse<T[0]>>;
  }
}

export {};
