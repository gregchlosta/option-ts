export enum Kinds {
  Some = 'Some',
  None = 'None',
}

export type Some<T> = { kind: Kinds.Some; value: T }
export type None = { kind: Kinds.None }

export type Option<T> = Some<T> | None

export const none: None = { kind: Kinds.None }
export const some = <T>(value: T): Some<T> => {
  return { kind: Kinds.Some, value }
}

export const isNone = <T>(o: Option<T>): o is None => o.kind === Kinds.None
export const isSome = <T>(o: Option<T>): o is Some<T> => o.kind === Kinds.Some

export const fold = <T>(o: Option<T>, defaultT: () => T): T => {
  if (isSome(o)) return o.value
  else return defaultT()
}

export const map =
  <T, T2>(f: (t: T) => T2) =>
  (o: Option<T>): Option<T2> => {
    if (isSome(o)) {
      return some(f(o.value))
    }
    return none
  }

export const lift =
  <T, T2>(f: (t: T) => T2) =>
  (o: Option<T>) =>
    map(f)(o)

export const filter = <T>(
  o: Option<T>,
  predicate: (t: T) => boolean
): Option<T> => {
  if (isSome(o) && predicate(o.value)) return o
  return none
}

export const match =
  <T, T2>(someF: (t: T) => T2, noneF: () => T2) =>
  (o: Option<T>): T2 => {
    if (isSome(o)) return someF(o.value)
    else return noneF()
  }

export const withDefault = <T>(defaultVal: T, option: Option<T>): T => {
  return isSome(option) ? option.value : defaultVal
}
