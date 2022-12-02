import { assert, describe, expect, it } from 'vitest'
import { Some, isSome, some } from './option.js'

describe('option', () => {
  it('test', () => {
    const v = some('test')
    expect(isSome(v)).eq(true)
  })

  it('foo', () => {
    assert.equal(Math.sqrt(4), 2)
  })

  it('bar', () => {
    expect(1 + 1).eq(2)
  })

  it('snapshot', () => {
    expect({ foo: 'bar' }).toMatchSnapshot()
  })
})
