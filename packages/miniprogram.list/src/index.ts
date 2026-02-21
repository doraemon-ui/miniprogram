import { type ComponentPublicInstance, defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js'
import { type MiniprogramDOMRect, useRect } from '@doraemon-ui/miniprogram.shared'
import type { ListItemInstance } from './item'
export type { ListItemInstance, ListItemProps, ListItemExpose } from './item'
const { classNames, styleToCssString } = Doraemon.util

export type ListExpose = {
  getBoundingClientRect: () => Promise<MiniprogramDOMRect>
}

export interface ListProps {
  prefixCls?: string
  title?: string
  label?: string
  mode?: 'default' | 'card'
  hasLine?: boolean
  wrapStyle?: Partial<CSSStyleDeclaration>
  bodyStyle?: Partial<CSSStyleDeclaration>
}

export type ListInstance = ComponentPublicInstance<List, ListProps, ListExpose>

@Component({
  components: {
    ListItem: () => ({
      module: './item',
      type: 'descendant',
      observer: 'updateIsLast',
    }),
  },
  props: {
    prefixCls: {
      type: String,
      default: 'dora-list',
    },
  },
  expose: ['getBoundingClientRect'],
})
class List extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof List
   */
  prefixCls!: string

  /**
   * 标题
   *
   * @type {string}
   * @memberof List
   */
  @Prop({
    type: String,
    default: '',
  })
  title: string

  /**
   * 描述
   *
   * @type {string}
   * @memberof List
   */
  @Prop({
    type: String,
    default: '',
  })
  label: string

  /**
   * 支持默认和卡片两种模式
   *
   * @type {('default' | 'card')}
   * @memberof List
   */
  @Prop({
    type: String,
    default: 'default',
  })
  mode: 'default' | 'card'

  /**
   * 是否有底部横线
   *
   * @type {boolean}
   * @memberof List
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  hasLine: boolean

  /**
   * 自定义样式
   *
   * @type {Partial<CSSStyleDeclaration>}
   * @memberof List
   */
  @Prop({
    type: Object,
    default: null,
  })
  wrapStyle: Partial<CSSStyleDeclaration>

  /**
   * 自定义 body 样式
   *
   * @type {Partial<CSSStyleDeclaration>}
   * @memberof List
   */
  @Prop({
    type: Object,
    default: null,
  })
  bodyStyle: Partial<CSSStyleDeclaration>

  get classes() {
    const { prefixCls, mode, hasLine } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--card`]: mode === 'card',
      [`${prefixCls}--has-line`]: hasLine,
    })
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

  get containerStyle() {
    return this.wrapStyle ? styleToCssString(this.wrapStyle) : ''
  }

  get internalBodyStyle() {
    return this.bodyStyle ? styleToCssString(this.bodyStyle) : ''
  }

  updateIsLast() {
    const elements = this.$children as ListItemInstance[]
    if (elements.length > 0) {
      const lastIndex = elements.length - 1
      elements.forEach((element, index) => {
        element.updateIsLast(index === lastIndex)
      })
    }
  }

  getBoundingClientRect() {
    return useRect(`.${this.prefixCls}`, this._renderProxy)
  }

  mounted() {
    this.updateIsLast()
  }
}

export default defineComponentHOC({ multipleSlots: false })(List)
