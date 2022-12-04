import { describe, expect, it } from 'vitest'
import {
  Kinds,
  Match,
  Some,
  isSome,
  None,
  isNone,
  newOption,
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
  it('Create Option', () => {
    const optionS = newOption(VALUE)
    expect(optionS.kind).eq(Kinds.Some)

    const optionN = newOption()
    expect(optionN.kind).eq(Kinds.None)
  })

  it('Typeguard Some', () => {
    expect(isSome(some)).eq(true)
    expect(isNone(some)).eq(false)
  })

  it('Typeguard None', () => {
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
