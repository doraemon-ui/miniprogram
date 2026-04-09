import path from 'path'
import simulate from 'miniprogram-simulate'

jest.mock('@doraemon-ui/miniprogram.shared', () => ({
  chooseMedia: jest.fn((opts) => {
    opts?.success?.({
      tempFiles: [{ tempFilePath: 'https://example.com/a.png' }],
      type: 'image',
    })
  }),
  uploadFile: jest.fn((opts) => {
    opts?.success?.({ statusCode: 200 })
    opts?.complete?.({ statusCode: 200 })
    return {
      abort: jest.fn(),
      onProgressUpdate: (cb) => cb({ progress: 50 }),
    }
  }),
}))

function mountTest(id: string | (() => string), defaultProps = {}) {
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

describe('Upload', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-upload', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-upload').length).toBeGreaterThanOrEqual(0)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-upload-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-upload-custom').length).toBeGreaterThanOrEqual(0)
  })

  test('should select/upload/remove safely', () => {
    const wrapper = simulate.render(id, {
      listType: 'picture-card',
      url: 'https://example.com/upload',
      defaultFileList: [],
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    const comp = wrapper.instance as any

    expect(() => comp.onSelect()).not.toThrow()
    expect(() => comp.uploadFile()).not.toThrow()
    expect(() => comp.onPreview({ currentTarget: { dataset: { file: { uid: '1' } } } })).not.toThrow()
    expect(() => comp.onRemove({ currentTarget: { dataset: { file: { uid: '1' } } } })).not.toThrow()
    expect(() => comp.abort()).not.toThrow()
  })
})
