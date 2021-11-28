import { dogShit, doraProp, doraQuote } from '../src'

describe('DemoShared', () => {
  test('call dogShit', () => {
    expect(dogShit('dogShit')).toBeDefined()
    expect(dogShit('dogShit', 6000)).toBeDefined()
    expect(dogShit('dogShit', 6000, 10)).toBeDefined()
  })
  test('call doraProp', () => {
    expect(doraProp.high()).toBeDefined()
    expect(doraProp.high(3)).toEqual('任意门')
    expect(doraProp.high(-1)).toBeUndefined()
    expect(doraProp.medium()).toBeDefined()
    expect(doraProp.medium(5)).toEqual('请客桌巾')
    expect(doraProp.medium(-1)).toBeUndefined()
    expect(doraProp.low()).toBeDefined()
    expect(doraProp.low(7)).toEqual('鼹鼠手套')
    expect(doraProp.low(-1)).toBeUndefined()
  })
  test('call doraQuote', () => {
    expect(doraQuote()).toBeDefined()
    expect(doraQuote(20)).toEqual('大雄你这个色鬼，我讨厌你！')
    expect(doraQuote(-1)).toBeUndefined()
  })
})
