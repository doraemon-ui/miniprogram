import path from 'path'
import simulate from 'miniprogram-simulate'
import type { RootComponent, Component } from 'miniprogram-simulate'
import { getPointsDistance, getPointsNumber } from '@doraemon-ui/miniprogram.shared'

import * as gallery from '../src/gallery'
import type { GalleryInstance, GalleryItem } from '../src/types'

jest.mock('@doraemon-ui/miniprogram.shared', () => {
  const actual = jest.requireActual('@doraemon-ui/miniprogram.shared')
  return {
    ...actual,
    getPointsDistance: jest.fn(),
    getPointsNumber: jest.fn(),
  }
})

function getComponentInstance(wrapper: RootComponent<any, any, any> | Component<any, any, any>): GalleryInstance {
  return wrapper.instance.$component as unknown as GalleryInstance
}

function mountTest(id: string | (() => string), defaultProps: Record<string, unknown> = {}) {
  describe('mount and unmount', () => {
    it('component could be updated and unmounted without errors', () => {
      const wrapper = simulate.render(typeof id === 'function' ? id() : id, defaultProps)
      wrapper.attach(document.createElement('parent-wrapper'))
      expect(() => {
        wrapper.setData({})
        wrapper.detach()
      }).not.toThrow()
    })
  })
}

function createHostWrapper(methods: Record<string, jest.Mock> = {}, data: Record<string, unknown> = {}) {
  const hostId = simulate.load({
    usingComponents: {
      'dora-gallery': id,
    },
    template: `
      <dora-gallery
        id="dora-gallery"
        visible="{{visible}}"
        current="{{current}}"
        urls="{{urls}}"
        showDelete="{{showDelete}}"
        icon="{{icon}}"
        indicatorDots="{{indicatorDots}}"
        allowScale="{{allowScale}}"
        bind:click="onClick"
        bind:delete="onDelete"
        bind:change="onChange"
        bind:cancel="onCancel"
        bind:close="onClose"
      />
    `,
    data: {
      visible: true,
      current: 0,
      urls: [],
      showDelete: true,
      icon: '',
      indicatorDots: false,
      allowScale: true,
      ...data,
    },
    methods: {
      onClick: jest.fn(),
      onDelete: jest.fn(),
      onChange: jest.fn(),
      onCancel: jest.fn(),
      onClose: jest.fn(),
      ...methods,
    },
  })
  const wrapper = simulate.render(hostId)
  wrapper.attach(document.createElement('parent-wrapper'))

  const galleryWrapper = wrapper.querySelector('#dora-gallery')

  return {
    wrapper,
    galleryWrapper,
    $comp: getComponentInstance(galleryWrapper),
  }
}

const urls: GalleryItem[] = [
  {
    image: 'https://cdn.skyvow.cn/logo.png',
    remark: 'first image',
  },
  {
    image: 'https://cdn.skyvow.cn/logo.png?2',
    remark: 'second image',
  },
]

const mockGetPointsNumber = getPointsNumber as jest.Mock
const mockGetPointsDistance = getPointsDistance as jest.Mock

let id: string

function getId() {
  return id
}

describe('Gallery', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-gallery', { less: true })
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  mountTest(getId)

  test('mount correctly', async () => {
    const wrapper = simulate.render(id, {
      visible: true,
      urls: ['https://cdn.skyvow.cn/logo.png'],
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(10)
    expect(wrapper.querySelectorAll('.dora-gallery__swiper').length).toBe(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', async () => {
    const wrapper = simulate.render(id, {
      prefixCls: 'dora-gallery-custom',
      visible: true,
      urls: ['https://cdn.skyvow.cn/logo.png'],
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(10)
    expect(wrapper.querySelectorAll('.dora-gallery-custom__swiper').length).toBe(1)
  })

  test('should sync declarative props and render active remark', async () => {
    const { wrapper, galleryWrapper, $comp } = createHostWrapper(
      {},
      {
        current: 0,
        urls,
        showDelete: false,
        icon: '',
      },
    )

    await simulate.sleep(10)

    expect($comp.$props.current).toBe(0)
    expect(galleryWrapper.querySelectorAll('.dora-gallery__img').length).toBe(2)
    expect(galleryWrapper.dom?.textContent).toContain('first image')

    wrapper.setData({
      current: 1,
      icon: 'https://cdn.skyvow.cn/delete.png',
    })
    await simulate.sleep(10)

    expect($comp.$props.current).toBe(1)
    expect($comp.$props.icon).toBe('https://cdn.skyvow.cn/delete.png')
    expect(galleryWrapper.dom?.textContent).toContain('second image')
  })

  test('should support click callback and hide api', async () => {
    const onClick = jest.fn()
    const onCancel = jest.fn()
    const onClose = jest.fn()
    const { galleryWrapper, $comp } = createHostWrapper(
      { onClick, onCancel, onClose },
      { urls: ['https://cdn.skyvow.cn/logo.png'] },
    )
    await simulate.sleep(10)

    $comp.onClick(0, ['https://cdn.skyvow.cn/logo.png'])
    await simulate.sleep(0)

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onClick.mock.calls[0][0].detail.current).toBe(0)

    $comp.hide()
    await simulate.sleep(10)

    expect(onCancel).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledTimes(1)
    expect(galleryWrapper.querySelectorAll('.dora-gallery__swiper').length).toBe(0)
  })

  test('should emit delete and change events through real nodes', async () => {
    const onDelete = jest.fn()
    const onChange = jest.fn()
    const { galleryWrapper, $comp } = createHostWrapper(
      { onDelete, onChange },
      { urls, current: 0, icon: 'https://cdn.skyvow.cn/delete.png' },
    )
    await simulate.sleep(10)

    const swiper = galleryWrapper.querySelector('.dora-gallery__swiper')
    swiper.dispatchEvent('change', {
      detail: {
        current: 1,
        source: 'touch',
      },
    })
    await simulate.sleep(0)

    expect(onChange).toHaveBeenCalled()
    expect(onChange.mock.calls.at(-1)?.[0].detail).toEqual({
      current: 1,
      source: 'touch',
    })
    expect($comp.$props.current).toBe(1)
    expect(galleryWrapper.dom?.textContent).toContain('second image')

    const operation = galleryWrapper.querySelector('.dora-gallery__opr')
    operation.dispatchEvent('tap')
    await simulate.sleep(10)

    expect(onDelete).toHaveBeenCalledTimes(1)
    expect(onDelete.mock.calls[0][0].detail.current).toBe(1)
    expect(galleryWrapper.querySelectorAll('.dora-gallery__swiper').length).toBe(0)
  })

  test('should support pinch scale on the current image', async () => {
    mockGetPointsNumber.mockReturnValue(2)
    mockGetPointsDistance.mockReturnValueOnce(100).mockReturnValueOnce(120)

    const { galleryWrapper } = createHostWrapper(
      {},
      {
        urls: ['https://cdn.skyvow.cn/logo.png'],
        allowScale: true,
      },
    )

    const image = galleryWrapper.querySelector('.dora-gallery__img')
    image.dispatchEvent('touchstart', {
      touches: [
        { pageX: 10, pageY: 10 },
        { pageX: 50, pageY: 10 },
      ],
      changedTouches: [
        { pageX: 10, pageY: 10 },
        { pageX: 50, pageY: 10 },
      ],
    })
    image.dispatchEvent('touchmove', {
      touches: [
        { pageX: 10, pageY: 10 },
        { pageX: 70, pageY: 10 },
      ],
      changedTouches: [
        { pageX: 10, pageY: 10 },
        { pageX: 70, pageY: 10 },
      ],
    })
    await simulate.sleep(10)

    expect(mockGetPointsNumber).toHaveBeenCalled()
    expect(mockGetPointsDistance).toHaveBeenCalledTimes(2)
    expect(image.dom.style.transform).toContain('scale(1.1)')
  })

  test('should support functional show helper', async () => {
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-gallery': id,
        },
        template: `<dora-gallery id="dora-gallery" />`,
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))

    let close: (() => void) | null = null
    expect(() => {
      close = gallery.show(
        {
          urls: ['https://cdn.skyvow.cn/logo.png'],
        },
        '#dora-gallery',
        wrapper.instance,
      )
    }).not.toThrow()

    await simulate.sleep(10)

    const galleryWrapper = wrapper.querySelector('#dora-gallery')
    expect(galleryWrapper.querySelectorAll('.dora-gallery__swiper').length).toBe(1)
    expect(typeof close).toBe('function')

    close?.()
    await simulate.sleep(10)

    expect(galleryWrapper.querySelectorAll('.dora-gallery__swiper').length).toBe(0)
  })
})
