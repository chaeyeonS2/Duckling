import { SWRConfiguration, SWRResponse } from "swr";

type CheckAPIMap<
  K extends keyof APIMap,
  M extends Methods
> = `${K}-${LengthOfPath<K>}` extends infer KT extends keyof APIMaps
  ? M extends keyof APIMaps[KT]
    ? APIMaps[KT][M]
    : ["invalid method!", "invalid method!"]
  : never;

declare module "swr" {
  // override type declaration of "useSWR" and "useSWRImmutable"
  export interface SWRHook {
    <
      K extends keyof APIMap,
      T extends CheckAPIMap<K, "GET">,
      IsValid = T extends ["invalid method!", "invalid method!"] ? false : true
    >(
      url: IsValid extends false ? T : K,
      config?: SWRConfiguration<T[1]>
    ): IsValid extends false ? SWRResponse<T> : SWRResponse<T[0], T[1]>;

    <
      K extends keyof APIMap,
      T extends CheckAPIMap<K, "GET">,
      D,
      IsValid = T extends ["invalid method!", "invalid method!"] ? false : true
    >(
      url: IsValid extends false ? T : K,
      config?: SWRConfiguration<T[1]>
    ): IsValid extends false ? SWRResponse<T> : SWRResponse<T[0], T[1], D>;
  }
}

declare module "axios" {
  export interface AxiosInstance {
    get<
      K extends keyof APIMap,
      T extends CheckAPIMap<K, "GET">,
      IsValid = T extends ["invalid method!", "invalid method!"] ? false : true
    >(
      url: IsValid extends false ? T : K,
      config?: AxiosRequestConfig<T[1]>
    ): Promise<AxiosResponse<T[0]>>;

    delete<
      K extends keyof APIMap,
      T extends CheckAPIMap<K, "DELETE">,
      IsValid = T extends ["invalid method!", "invalid method!"] ? false : true
    >(
      url: IsValid extends false ? T : K,
      config?: AxiosRequestConfig<T[1]>
    ): Promise<AxiosResponse<T[0]>>;

    post<
      K extends keyof APIMap,
      T extends CheckAPIMap<K, "POST">,
      IsValid = T extends ["invalid method!", "invalid method!"] ? false : true
    >(
      url: IsValid extends false ? T : K,
      data?: T[1],
      config?: AxiosRequestConfig<T[1]>
    ): Promise<AxiosResponse<T[0]>>;

    put<
      K extends keyof APIMap,
      T extends CheckAPIMap<K, "PUT">,
      IsValid = T extends ["invalid method!", "invalid method!"] ? false : true
    >(
      url: IsValid extends false ? T : K,
      data?: T[1],
      config?: AxiosRequestConfig<T[1]>
    ): Promise<AxiosResponse<T[0]>>;

    patch<
      K extends keyof APIMap,
      T extends CheckAPIMap<K, "PATCH">,
      IsValid = T extends ["invalid method!", "invalid method!"] ? false : true
    >(
      url: IsValid extends false ? T : K,
      data?: T[1],
      config?: AxiosRequestConfig<T[1]>
    ): Promise<AxiosResponse<T[0]>>;

    postForm<
      K extends keyof APIMap,
      T extends CheckAPIMap<K, "POST">,
      IsValid = T extends ["invalid method!", "invalid method!"] ? false : true
    >(
      url: IsValid extends false ? T : K,
      data?: T[1],
      config?: AxiosRequestConfig<T[1]>
    ): Promise<AxiosResponse<T[0]>>;

    putForm<
      K extends keyof APIMap,
      T extends CheckAPIMap<K, "PUT">,
      IsValid = T extends ["invalid method!", "invalid method!"] ? false : true
    >(
      url: IsValid extends false ? T : K,
      data?: T[1],
      config?: AxiosRequestConfig<T[1]>
    ): Promise<AxiosResponse<T[0]>>;

    patchForm<
      K extends keyof APIMap,
      T extends CheckAPIMap<K, "PATCH">,
      IsValid = T extends ["invalid method!", "invalid method!"] ? false : true
    >(
      url: IsValid extends false ? T : K,
      data?: T[1],
      config?: AxiosRequestConfig<T[1]>
    ): Promise<AxiosResponse<T[0]>>;
  }
}

export {};
