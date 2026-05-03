import { defineComponentHOC, Doraemon, Component, Prop, Watch, Emit, Event } from '../src'
import type { CustomEvent } from '../src'

const { classNames, styleToCssString } = Doraemon.util

const valueDecorator =
  (value: any) =>
  (_: any, __: any): any => {
    return {
      enumerable: true,
      value,
    }
  }

const getterDecorator =
  (value: any) =>
  (_: any, __: any): any => {
    return {
      enumerable: true,
      get() {
        return value
      },
    }
  }

@Component({
  components: {
    TestComp: () => ({
      module: './test-comp',
      type: 'child',
      observer: 'observer',
    }),
  },
  props: {
    foo: {
      default: 1,
      type: Number,
    },
  },
  expose: ['a', 'b', 'field1', 'field2', 'msg', 'changed', 'count', 'hello', 'resetCount', 'increment', 'decrement', 'promise'],
})
class MyComp extends Doraemon {
  foo: number

  @Prop({
    default: '3q',
    type: String,
  })
  bar: string

  @Prop({
    type: Object,
    default: null,
  })
  wrapStyle: Partial<CSSStyleDeclaration>

  a: string = 'hello'

  get b() {
    return this.foo + 1
  }

  get containerStyle() {
    return this.wrapStyle ? styleToCssString(this.wrapStyle) : ''
  }

  @valueDecorator('field1')
  field1: string

  @getterDecorator('field2')
  field2: string

  msg: string = ''

  hello() {
    this.msg = 'hi'
  }

  changed: boolean = false

  @Watch('a')
  onChange(newVal: string) {
    this.changed = true
  }

  count: number = 1

  @Emit('reset')
  resetCount() {
    this.count = 0
  }

  @Event()
  @Emit()
  increment(e: CustomEvent) {
    this.count = e.target.value + 1
  }

  @Emit()
  decrement(n1: number, n2: number) {
    this.count = n1 - n2
  }

  @Emit()
  promise() {
    return Promise.resolve(1)
  }

  beforeCreate() {}
  created() {}
  mounted() {}
  destroyed() {}
  unmounted() {}
  errorCaptured() {}

  error() {
    throw new Error('errorCaptured')
  }

  observer() {}
}

export { MyComp }

export default defineComponentHOC()(MyComp)
