type Split<S extends string, D extends string> = string extends S
  ? string[]
  : S extends ""
  ? []
  : S extends `${infer T}${D}${infer U}`
  ? [T, ...Split<U, D>]
  : [S];

type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void
  ? I extends Record<string, unknown>
    ? I
    : never
  : never;

type ConcatStringArray<Strings extends readonly string[], Acc extends string = ""> = Strings extends readonly [
  infer Head,
  ...infer Rest
]
  ? Head extends string
    ? Rest extends readonly string[]
      ? ConcatStringArray<Rest, `${Acc}${Head}`>
      : Acc
    : Acc
  : Acc;

type Join<
  Strings extends readonly string[],
  Joiner extends string = ",",
  Acc extends string = ""
> = Strings extends readonly [infer Head, ...infer Rest]
  ? Rest extends readonly string[]
    ? Join<
        Rest,
        Joiner,
        Head extends string ? (Acc extends "" ? Head : ConcatStringArray<readonly [Acc, Joiner, Head]>) : never
      >
    : never
  : Acc;

// for debugging
type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
type ExpandRecursively<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: ExpandRecursively<O[K]> }
    : never
  : T;
