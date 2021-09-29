import { defineComponentHOC, Doraemon, Component, Prop, Watch, Emit, Event } from '../src'

const valueDecorator = (value: any) => (_: any, __: any): any => {
  return {
    enumerable: true,
    value,
  }
}

const getterDecorator = (value: any) => (_: any, __: any): any => {
  return {
    enumerable: true,
    get () {
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
})
class MyComp extends Doraemon {
  foo: number

  @Prop({
    default: '3q',
    type: String,
  })
  bar: string

  a: string = 'hello'

  get b () {
    return this.foo + 1
  }

  @valueDecorator('field1')
  field1: string

  @getterDecorator('field2')
  field2: string

  msg: string = ''

  hello () {
    this.msg = 'hi'
  }

  changed: boolean = false

  @Watch('a')
  onChange (newVal: string) {
    this.changed = true
  }

  count: number = 1

  @Emit('reset')
  resetCount() {
    this.count = 0
  }

  @Event()
  @Emit()
  increment(e) {
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

  beforeCreate () {}
  created () {}
  mounted () {}
  destroyed () {}
  errorCaptured () {}

  error () {
    throw new Error('errorCaptured')
  }

  observer () {}
}

export default defineComponentHOC()(MyComp)
