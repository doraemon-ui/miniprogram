import { defineComponentHOC, Doraemon, Component } from '@doraemon-ui/miniprogram.core-js'

@Component({})
class TestComp extends Doraemon {
  accordion = false
  haveBeenCalled = false

  onChange() {
    this.haveBeenCalled = true
  }
}

export default defineComponentHOC()(TestComp)
