export enum Kinds {
  Some = 'Some',
  None = 'None',
}

export type Some<T> = { kind: Kinds.Some; value: T }
export type None = { kind: Kinds.None }

export type Option<T> = Some<T> | None

export const newNone: None = { kind: Kinds.None }
export const newSome = <T>(value: T): Some<T> => {
  return { kind: Kinds.Some, value }
}

export const isSome = <T>(o: Option<T>): o is Some<T> => o.kind === Kinds.Some
export const isNone = <T>(o: Option<T>): o is None => o.kind === Kinds.None

export type Match<T, P> = {
  [Kinds.Some]: (data: T) => P
  [Kinds.None]: () => P
}

export const match = <T, P>(option: Option<T>, matcher: Match<T, P>) => {
  return isSome(option) ? matcher.Some(option.value) : matcher.None()
}

export const withDefault = <T>(option: Option<T>, defaultValue: T): T => {
  return isSome(option) ? option.value : defaultValue
}
