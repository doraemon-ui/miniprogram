import './app.less'

import { useLaunch } from '@tarojs/taro'
import type { PropsWithChildren } from 'react'

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log('App launched.')
  })

  // children 是将要会渲染的页面
  return children
}

export default App
