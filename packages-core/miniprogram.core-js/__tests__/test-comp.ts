import { Component, defineComponentHOC, Doraemon } from '../src'

@Component({
  components: {
    MyComp: () => ({
      module: './my-comp',
      type: 'parent',
    }),
  },
})
class TestComp extends Doraemon {}

export { TestComp }

export default defineComponentHOC()(TestComp)
