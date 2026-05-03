import { defineComponentHOC, Doraemon, Component } from '@doraemon-ui/miniprogram.core-js'
import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

export type TestCompInstance = ComponentPublicInstance<
  TestComp,
  {},
  {},
  {
    accordion: boolean
    haveBeenCalled: boolean
  }
>

@Component({})
class TestComp extends Doraemon {
  accordion = false
  haveBeenCalled = false

  onChange() {
    this.haveBeenCalled = true
  }
}

export default defineComponentHOC()(TestComp)
