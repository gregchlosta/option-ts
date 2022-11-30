export type Some<T> = { __tag: 'some'; value: T }
export type None = { __tag: 'none' }

export type Option<T> = Some<T> | None

export const newNone: None = { __tag: 'none' }
export const newSome = <T>(value: T): Some<T> => {
  return { __tag: 'some', value }
}

export const isNone = <T>(o: Option<T>): o is None => o.__tag === 'none'
export const isSome = <T>(o: Option<T>): o is Some<T> => o.__tag === 'some'

export const fold = <T>(o: Option<T>, defaultT: () => T): T => {
  if (isSome(o)) return o.value
  else return defaultT()
}

export const lift =
  <T, T2>(f: (t: T) => T2) =>
  (o: Option<T>) =>
    map(f)(o)

export const map =
  <T, T2>(f: (t: T) => T2) =>
  (o: Option<T>): Option<T2> => {
    if (isSome(o)) {
      return newSome(f(o.value))
    }
    return newNone
  }

export const match =
  <T, T2>(someF: (t: T) => T2, noneF: () => T2) =>
  (o: Option<T>): T2 => {
    if (isSome(o)) return someF(o.value)
    else return noneF()
  }
