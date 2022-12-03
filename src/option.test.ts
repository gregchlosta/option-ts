import { describe, expect, it } from 'vitest'
import {
  Kinds,
  Match,
  Some,
  isSome,
  None,
  isNone,
  newSome,
  newNone,
  match,
  withDefault,
} from './option.js'

const VALUE = 'test'
const DEFAULT = 'default'
const some: Some<string> = { kind: Kinds.Some, value: VALUE }
const none: None = { kind: Kinds.None }
const matcher: Match<string, string> = {
  Some: (v) => v,
  None: () => DEFAULT,
}

describe('Option', () => {
  it('Create Some', () => {
    const some = newSome(VALUE)
    expect(some.kind).eq(Kinds.Some)
    expect(some.value).eq(VALUE)
  })

  it('Create None', () => {
    const none = newNone
    expect(none.kind).eq(Kinds.None)
  })

  it('Typeguards Some', () => {
    expect(isSome(some)).eq(true)
    expect(isNone(some)).eq(false)
  })

  it('Typeguards None', () => {
    expect(isNone(none)).eq(true)
    expect(isSome(none)).eq(false)
  })

  it('match for Some value', () => {
    expect(match(some, matcher)).eq(VALUE)
  })

  it('match for None value', () => {
    expect(match(none, matcher)).eq(DEFAULT)
  })

  it('withDefault for Some value', () => {
    expect(withDefault(some, DEFAULT)).eq(VALUE)
  })

  it('withDefault for None value', () => {
    expect(withDefault(none, DEFAULT)).eq(DEFAULT)
  })
})
