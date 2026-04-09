import Countdown from '../src'

describe('Countdown', () => {
  beforeEach(() => {
    jest.useRealTimers()
  })

  test('leadingZeros should pad with zeros', () => {
    const page = { setData: jest.fn() }
    const cd = new Countdown({ refresh: 0 }, page)
    expect(cd.leadingZeros(2, 4)).toBe('0002')
    expect(cd.leadingZeros(12, 2)).toBe('12')
    expect(cd.leadingZeros('1', 2)).toBe('01')
  })

  test('should bind render/onEnd to instance', () => {
    const page = { setData: jest.fn() }
    let renderThis: unknown = null
    let onEndThis: unknown = null

    const cd = new Countdown(
      {
        refresh: 0,
        render() {
          renderThis = this
        },
        onEnd() {
          onEndThis = this
        },
      },
      page,
    )

    cd.options.onEnd()

    expect(renderThis).toBeInstanceOf(Countdown)
    expect(onEndThis).toBeInstanceOf(Countdown)
  })

  test('start should render and create interval; stop should clear interval', () => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2026-01-01T00:00:00.000Z'))

    const page = { setData: jest.fn() }
    const render = jest.fn()
    const cd = new Countdown({ date: Date.now() + 3000, refresh: 1000, render }, page)

    expect(render).toHaveBeenCalled()
    expect(cd.interval).not.toBeNull()
    expect(cd.start()).toBe(false)

    cd.stop()
    expect(cd.interval).toBeNull()
  })

  test('should call onEnd when countdown is over (next tick)', () => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2026-01-01T00:00:00.000Z'))

    const page = { setData: jest.fn() }
    const render = jest.fn()
    const onEnd = jest.fn()
    const cd = new Countdown({ date: Date.now() - 1000, refresh: 1000, render, onEnd }, page)

    expect(cd.interval).not.toBeNull()
    jest.advanceTimersByTime(1000)

    expect(render).toHaveBeenCalled()
    expect(onEnd).toHaveBeenCalledTimes(1)
    expect(cd.interval).toBeNull()
  })

  test('update should change date and trigger render', () => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2026-01-01T00:00:00.000Z'))

    const page = { setData: jest.fn() }
    const render = jest.fn()
    const cd = new Countdown({ refresh: 0, render }, page)

    const before = render.mock.calls.length
    cd.update(Date.now() + 5000)
    expect(render.mock.calls.length).toBe(before + 1)
    expect(cd.options.date).toBeInstanceOf(Date)
  })

  test('updateOffset and restart should work', () => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2026-01-01T00:00:00.000Z'))

    const page = { setData: jest.fn() }
    const render = jest.fn()
    const cd = new Countdown({ refresh: 0, render }, page)

    cd.updateOffset(1000)
    expect(cd.options.offset).toBe(1000)

    cd.restart({ refresh: 1000, date: Date.now() + 5000 })
    expect(cd.interval).not.toBeNull()
  })
})
