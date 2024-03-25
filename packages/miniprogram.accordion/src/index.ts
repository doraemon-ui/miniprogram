import { defineComponentHOC, Doraemon, Component, Emit, Watch } from '@doraemon-ui/miniprogram.core-js'

@Component({
  components: {
    Panel: () => ({
      module: './panel',
      type: 'child',
      observer: 'updated',
    }),
  },
  props: {
    prefixCls: {
      type: String,
      default: 'dora-accordion',
    },
    defaultCurrent: {
      type: Array,
      default: [],
    },
    current: {
      type: Array,
      default: [],
    },
    controlled: {
      type: Boolean,
      default: false,
    },
    accordion: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
  },
})
class Accordion extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Accordion
   */
  prefixCls!: string

  get classes () {
    const { prefixCls } = this as any
    const wrap = prefixCls
    const hd = `${prefixCls}__hd`
    const bd = `${prefixCls}__bd`
    const ft = `${prefixCls}__ft`

    return {
      wrap,
      hd,
      bd,
      ft,
    }
  }

  activeKey: string[] = []
  keys: any[] = []

  @Watch('current')
  watchCurrent (newVal: string[]) {
    if ((this as any).controlled) {
      this.updated(newVal)
    }
  }

  updated (activeKey = this.activeKey) {
    if (this.activeKey !== activeKey) {
      this.activeKey = activeKey
    }

    this.changeCurrent(activeKey)
  }

  changeCurrent (activeKey: string[]) {
    const elements = this.$children

    if (elements.length > 0) {
      elements.forEach((element, index) => {
        const key = (element as any).key || String(index)
        const current = (this as any).accordion ?
          activeKey[0] === key :
          activeKey.indexOf(key) !== -1

        this.$nextTick(() => (element as any).changeCurrent(current, key))
      })
    }

    if (this.keys.length !== elements.length) {
      this.keys = elements.map((element) => element.$data)
    }
  }

  @Emit('change')
  setActiveKey (activeKey: string[]) {
    if (!(this as any).controlled) {
      this.updated(activeKey)
    }
    return {
      key: (this as any).accordion ? activeKey[0] : activeKey,
      keys: this.keys,
    }
  }

  onClickItem (key: string) {
    let activeKey = [...this.activeKey]

    if ((this as any).accordion) {
      activeKey = activeKey[0] === key ? [] : [key]
    } else {
      activeKey = activeKey.indexOf(key) !== -1 ?
        activeKey.filter((n) => n !== key) :
        [...activeKey, key]
    }

    this.setActiveKey(activeKey)
  }

  mounted () {
    const { defaultCurrent, current, controlled } = this as any
    const activeKey = controlled ? current : defaultCurrent

    this.updated(activeKey)
  }
}

export default defineComponentHOC({ multipleSlots: false })(Accordion)
