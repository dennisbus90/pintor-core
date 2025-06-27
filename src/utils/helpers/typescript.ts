export type DeepReadonly<T> = T extends Function
  ? T
  : T extends object
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T;

export type DeepMutable<T> = T extends Function
  ? T
  : T extends object
  ? { -readonly [P in keyof T]: DeepMutable<T[P]> }
  : T;
