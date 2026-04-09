import path from 'path'
import simulate from 'miniprogram-simulate'

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

describe('ActionSheet', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-action-sheet', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-action-sheet').length).toBe(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-action-sheet-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-action-sheet-custom').length).toBe(1)
  })

  function createActionSheetWrapper(data = {}) {
    const compId = simulate.load({
      usingComponents: {
        'dora-action-sheet': id,
      },
      template: `
        <dora-action-sheet
          id="action-sheet"
          visible="{{ visible }}"
          theme="{{ theme }}"
          titleText="{{ titleText }}"
          buttons="{{ buttons }}"
          cancelText="{{ cancelText }}"
          destructiveText="{{ destructiveText }}"
          bind:cancel="onCancel"
          bind:action="onAction"
          bind:destructive="onDestructive"
          bind:close="onClose"
        />
      `,
      data: {
        visible: false,
        theme: 'ios',
        titleText: '',
        buttons: [],
        cancelText: '取消',
        destructiveText: '',
        ...data,
      },
      methods: {
        onCancel: jest.fn(),
        onAction: jest.fn(),
        onDestructive: jest.fn(),
        onClose: jest.fn(),
      },
    })
    const wrapper = simulate.render(compId)
    wrapper.attach(document.createElement('parent-wrapper'))
    const actionSheet = wrapper.querySelector('#action-sheet')
    const $comp = actionSheet.instance.$component as any
    return { wrapper, actionSheet, $comp }
  }

  test('should support theme prop', async () => {
    const { wrapper, actionSheet, $comp } = createActionSheetWrapper()

    wrapper.setData({ theme: 'wx' })
    await simulate.sleep(0)
    expect($comp.$props.theme).toBe('wx')
    expect(actionSheet.querySelectorAll('.dora-action-sheet__content--theme-wx').length).toBe(1)
  })

  test('should support titleText prop', async () => {
    const { wrapper, actionSheet, $comp } = createActionSheetWrapper()

    wrapper.setData({ titleText: '请选择操作' })
    await simulate.sleep(0)
    expect($comp.$props.titleText).toBe('请选择操作')
    expect(actionSheet.querySelectorAll('.dora-action-sheet__title').length).toBe(1)
  })

  test('should support buttons prop', async () => {
    const { wrapper, actionSheet, $comp } = createActionSheetWrapper()

    wrapper.setData({
      buttons: [{ text: '选项一' }, { text: '选项二' }, { text: '选项三' }],
    })
    await simulate.sleep(0)
    expect($comp.$props.buttons.length).toBe(3)
    expect(actionSheet.querySelectorAll('.dora-action-sheet__button--option').length).toBe(3)
  })

  test('should support cancelText prop', async () => {
    const { wrapper, actionSheet, $comp } = createActionSheetWrapper()

    expect(actionSheet.querySelectorAll('.dora-action-sheet__button--cancel').length).toBe(1)

    wrapper.setData({ cancelText: '' })
    await simulate.sleep(0)
    expect($comp.$props.cancelText).toBe('')
    expect(actionSheet.querySelectorAll('.dora-action-sheet__group--cancel').length).toBe(0)
  })

  test('should support destructiveText prop', async () => {
    const { wrapper, actionSheet, $comp } = createActionSheetWrapper()

    wrapper.setData({ destructiveText: '删除' })
    await simulate.sleep(0)
    expect($comp.$props.destructiveText).toBe('删除')
    expect(actionSheet.querySelectorAll('.dora-action-sheet__button--destructive').length).toBe(1)
  })

  test('should support visible prop', async () => {
    const { wrapper, $comp } = createActionSheetWrapper()

    wrapper.setData({ visible: true })
    await simulate.sleep(0)
    expect($comp.$props.visible).toBe(true)
    expect($comp.popupVisible).toBe(true)
  })
})
