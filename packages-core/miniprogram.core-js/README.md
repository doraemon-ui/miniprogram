# @doraemon-ui/miniprogram.core-js

miniprogram corejs for doraemon-ui.

## License

MIT License

## Install

```bash
npm i -S @doraemon-ui/miniprogram.core-js
```

## Usage

There are 7 decorators:

- `@Emit`
- `@Event`
- `@Prop`
- `@Watch`
- `@Component`

```typescript
import { Component, Emit, Event, Prop, Watch, Doraemon } from '@doraemon-ui/miniprogram.core-js'

@Component
class MyComp extends Doraemon {
  count: number = 1

  @Emit()
  addToCount(n: number) {
    this.count += n
  }

  @Emit('reset')
  resetCount() {
    this.count = 0
  }

  @Event()
  increment(e) {
    this.count = e.target.value + 1
  }

  @Prop({ default: 'default value', type: String })
  prop: string

  @Watch('child')
  onChildChanged(val: string) {}
}
```
