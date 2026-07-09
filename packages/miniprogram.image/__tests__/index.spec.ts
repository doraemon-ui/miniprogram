import type { Component, RootComponent } from 'miniprogram-simulate'
import simulate from 'miniprogram-simulate'
import path from 'path'

import type { ImageInstance } from '../src/types'

function getComponentInstance(wrapper: RootComponent<any, any, any> | Component<any, any, any>): ImageInstance {
  return wrapper.instance.$component as unknown as ImageInstance
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

let id: string

function getId() {
  return id
}

describe('Image', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-image', { less: true })
  })

  mountTest(getId)

  test('mount correctly', async () => {
    const wrapper = simulate.render(id, {
      src: 'https://picsum.photos/300/225/?random=1',
      shape: 'rounded',
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(10)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should update loading state when src changes', async () => {
    const wrapper = simulate.render(id, {
      src: '',
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    const comp = getComponentInstance(wrapper)

    expect(wrapper.querySelectorAll('.dora-image--empty').length).toBe(1)

    wrapper.setData({
      src: 'https://picsum.photos/300/225/?random=2',
    })
    await simulate.sleep(0)

    expect(comp.$props.src).toBe('https://picsum.photos/300/225/?random=2')
    expect(wrapper.querySelectorAll('.dora-image--loading').length).toBe(1)
  })

  test('should emit click event with current status', async () => {
    const onClick = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-image': id,
        },
        template: `
          <dora-image
            id="dora-image"
            src=""
            bind:click="onClick"
          />
        `,
        methods: {
          onClick,
        },
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))

    wrapper.querySelector('#dora-image').querySelector('.dora-image')?.dispatchEvent('tap')
    await simulate.sleep(0)

    expect(onClick).toHaveBeenCalled()
    expect(onClick.mock.calls[0][0].detail.status).toBe('empty')
  })

  test('should emit load event and update loaded state', async () => {
    const onLoad = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-image': id,
        },
        template: `
          <dora-image
            id="dora-image"
            src="{{ src }}"
            bind:load="onLoad"
          />
        `,
        data: {
          src: 'https://picsum.photos/300/225/?random=3',
        },
        methods: {
          onLoad,
        },
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))

    wrapper
      .querySelector('#dora-image')
      .querySelector('.dora-image__thumb')
      ?.dispatchEvent('load', {
        detail: {
          width: 300,
          height: 225,
        },
      })
    await simulate.sleep(0)

    expect(onLoad).toHaveBeenCalled()
    expect(onLoad.mock.calls[0][0].detail.status).toBe('loaded')
    expect(wrapper.querySelector('#dora-image').querySelectorAll('.dora-image--loaded').length).toBe(1)
  })

  test('should unmount on error when unmountOnError is true', async () => {
    const onError = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-image': id,
        },
        template: `
          <dora-image
            id="dora-image"
            src="{{ src }}"
            unmountOnError
            bind:error="onError"
          />
        `,
        data: {
          src: 'error',
        },
        methods: {
          onError,
        },
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))

    wrapper
      .querySelector('#dora-image')
      .querySelector('.dora-image__thumb')
      ?.dispatchEvent('error', {
        detail: {
          errMsg: 'load image fail',
        },
      })
    await simulate.sleep(0)

    expect(onError).toHaveBeenCalled()
    expect(onError.mock.calls[0][0].detail.status).toBe('unmounted')
    expect(wrapper.querySelectorAll('.dora-image').length).toBe(0)
  })

  test('should support externalClasses', async () => {
    const compId = simulate.load({
      usingComponents: {
        'dora-image': id,
      },
      template: `
        <dora-image
          id="dora-image"
          src="https://picsum.photos/300/225/?random=4"
          dora-class="custom-root-class"
          dora-image-class="custom-image-class"
        />
      `,
    })

    const wrapper = simulate.render(compId)
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)

    const image = wrapper.querySelector('#dora-image')
    expect(image.querySelector('.dora-image').dom.className).toContain('custom-root-class')
    expect(image.querySelector('.dora-image__thumb').dom.className).toContain('custom-image-class')
  })
})
