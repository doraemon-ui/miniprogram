import { defineComponentHOC, Doraemon, Component, Prop, Watch, Event } from '@doraemon-ui/miniprogram.core-js'
import type { CSSStylePropertiesWithVars, CustomEvent } from '@doraemon-ui/miniprogram.core-js'
import { getFontSize } from '@doraemon-ui/miniprogram.shared'

import type { ImageMode, ImageShape, ImageStatus, SemanticName } from './types'

const { classNames, styleToCssString } = Doraemon.util

const EMPTY: ImageStatus = 'empty'
const LOADING: ImageStatus = 'loading'
const LOADED: ImageStatus = 'loaded'
const ERROR: ImageStatus = 'error'
const UNMOUNTED: ImageStatus = 'unmounted'

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-image',
    },
    classNames: {
      type: Object,
      default: () => ({}),
    },
    styles: {
      type: Object,
      default: () => ({}),
    },
  },
})
class Image extends Doraemon {
  prefixCls!: string
  classNames!: Partial<Record<SemanticName, string>>
  styles!: Partial<Record<SemanticName, CSSStylePropertiesWithVars>>

  @Prop({
    type: String,
    default: '',
  })
  src: string

  @Prop({
    type: String,
    default: 'scaleToFill',
  })
  mode: ImageMode

  @Prop({
    type: Boolean,
    default: false,
  })
  webp: boolean

  @Prop({
    type: Boolean,
    default: false,
  })
  lazyLoad: boolean

  @Prop({
    type: Boolean,
    default: false,
  })
  showMenuByLongpress: boolean

  @Prop({
    type: Boolean,
    default: false,
  })
  forceHttps: boolean

  @Prop({
    type: String,
    default: 'normal',
  })
  shape: ImageShape

  @Prop({
    type: null,
    default: 300,
  })
  width: string | number

  @Prop({
    type: null,
    default: 225,
  })
  height: string | number

  @Prop({
    type: Boolean,
    default: false,
  })
  unmountOnEmpty: boolean

  @Prop({
    type: Boolean,
    default: false,
  })
  unmountOnError: boolean

  @Prop({
    type: String,
    default: '',
  })
  empty: string

  @Prop({
    type: String,
    default: '',
  })
  loading: string

  @Prop({
    type: String,
    default: '',
  })
  error: string

  status: ImageStatus = EMPTY
  internalRootStyle = ''

  get classes() {
    const { prefixCls, shape, mode, status, empty, loading, error } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--${shape}`]: shape,
      [`${prefixCls}--${mode}`]: mode,
      [`${prefixCls}--${status}`]: status,
    })
    const inner = `${prefixCls}__inner`
    const thumb = `${prefixCls}__thumb`
    const mask = classNames(`${prefixCls}__mask`, {
      [`${prefixCls}__mask--text`]: empty || loading || error,
    })
    const text = `${prefixCls}__text`

    return {
      wrap,
      inner,
      thumb,
      mask,
      text,
    }
  }

  get rootStyle() {
    const { styles } = this
    return styles?.root ? styleToCssString(styles.root) : ''
  }

  get imageStyle() {
    const { styles } = this
    return styles?.image ? styleToCssString(styles.image) : ''
  }

  @Watch('src')
  onSrcChange(src: string) {
    this.updated(src)
  }

  @Watch('width')
  onWidthChange() {
    this.updateStyle(this.width, this.height)
  }

  @Watch('height')
  onHeightChange() {
    this.updateStyle(this.width, this.height)
  }

  updated(src: string) {
    this.updateStatus(src ? LOADING : this.unmountOnEmpty ? UNMOUNTED : EMPTY)
  }

  updateStyle(width: string | number, height: string | number) {
    this.internalRootStyle = styleToCssString({
      width: getFontSize(width),
      height: getFontSize(height),
    })
  }

  updateStatus(status: ImageStatus) {
    if (this.status !== status) {
      this.status = status
    }

    this.$emit('change', { status })
  }

  @Event()
  onLoad(e: CustomEvent) {
    this.updateStatus(LOADED)
    this.$emit('load', { ...e.detail, status: LOADED })
  }

  @Event()
  onError(e: CustomEvent) {
    const status = this.unmountOnError ? UNMOUNTED : ERROR
    this.updateStatus(status)
    this.$emit('error', { ...e.detail, status })
  }

  @Event()
  onTap(e: CustomEvent) {
    this.$emit('click', { ...e.detail, status: this.status })
  }

  mounted() {
    this.updateStyle(this.width, this.height)
    this.updated(this.src)
  }
}

export { Image }

export default defineComponentHOC()(Image)
