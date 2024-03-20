import { defineComponentHOC, Doraemon, Component } from '../src'

@Component({
  components: {
    MyComp: () => ({
      module: './my-comp',
      type: 'parent',
    }),
  },
})
class TestComp extends Doraemon {}

export default defineComponentHOC()(TestComp)
