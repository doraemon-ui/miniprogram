import CountUp from '../src'

describe('CountUp', () => {
  beforeEach(() => {
    jest.useRealTimers()
  })

  test('should print formatted startVal on init', () => {
    const page = { setData: jest.fn() }
    const printValue = jest.fn()
    new CountUp(1, 1024, 0, 2, { printValue }, page)
    expect(printValue).toHaveBeenCalledWith('1')
  })

  test('formatNumber should support decimals and grouping', () => {
    const page = { setData: jest.fn() }
    const printValue = jest.fn()
    const cu = new CountUp(0, 88.88, 2, 2, { printValue }, page)
    expect(printValue).toHaveBeenCalledWith('0.00')
    expect(cu.formatNumber(1000)).toBe('1,000.00')
  })

  test('separator empty should disable grouping', () => {
    const page = { setData: jest.fn() }
    const cu = new CountUp(0, 1000, 0, 1, { separator: '' }, page)
    expect(cu.formatNumber(1000)).toBe('1000')
  })

  test('start should animate to end and invoke callback', () => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2026-01-01T00:00:00.000Z'))

    const page = { setData: jest.fn() }
    const values: string[] = []
    const printValue = (value: string) => values.push(value)
    const done = jest.fn()

    const cu = new CountUp(0, 10, 0, 0.05, { useEasing: false, printValue }, page)
    expect(cu.start(done)).toBe(false)

    jest.advanceTimersByTime(300)

    expect(done).toHaveBeenCalledTimes(1)
    expect(values[values.length - 1]).toBe('10')
  })

  test('pauseResume should pause and resume', () => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2026-01-01T00:00:00.000Z'))

    const page = { setData: jest.fn() }
    const printValue = jest.fn()
    const cu = new CountUp(0, 100, 0, 0.2, { useEasing: false, printValue }, page)

    cu.start()
    jest.advanceTimersByTime(32)
    const callsAfter32 = printValue.mock.calls.length

    cu.pauseResume()
    jest.advanceTimersByTime(200)
    expect(printValue.mock.calls.length).toBe(callsAfter32)

    cu.pauseResume()
    jest.advanceTimersByTime(300)
    expect(printValue).toHaveBeenCalled()
  })

  test('reset and update should work', () => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2026-01-01T00:00:00.000Z'))

    const page = { setData: jest.fn() }
    const values: string[] = []
    const printValue = (value: string) => values.push(value)

    const cu = new CountUp(0, 10, 0, 0.1, { useEasing: false, printValue }, page)
    cu.start()
    jest.advanceTimersByTime(40)

    cu.reset()
    expect(values[values.length - 1]).toBe('0')

    cu.update(20)
    jest.advanceTimersByTime(200)
    expect(values[values.length - 1]).toBe('20')
  })
})
