export default defineAppConfig({
  pages: ['pages/tree-shaking/index', 'pages/index/index'],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  usingComponents: {
    'dora-list2': '/miniprogram_npm/@doraemon-ui/miniprogram.list/index',
  },
  // usingComponents: {
  //   'dora-list-item': '/miniprogram_npm/@doraemon-ui/miniprogram.list/item',
  //   'dora-checkbox': '/miniprogram_npm/@doraemon-ui/miniprogram.checkbox/index',
  //   'dora-checkbox-group': '/miniprogram_npm/@doraemon-ui/miniprogram.checkbox/group',
  //   'dora-tab': '/miniprogram_npm/@doraemon-ui/miniprogram.tabs/tab',
  //   'dora-tabs': '/miniprogram_npm/@doraemon-ui/miniprogram.tabs/index',
  //   'dora-selectable': '/miniprogram_npm/@doraemon-ui/miniprogram.selectable/index',
  //   'dora-list': '/miniprogram_npm/@doraemon-ui/miniprogram.list/index',
  // },
  // usingComponents: {
  //   "demo-page": "miniprogram_npm/@doraemon-ui/miniprogram.demo-page/index",
  //   "demo-block": "miniprogram_npm/@doraemon-ui/miniprogram.demo-block/index",
  //   "dora-button": "miniprogram_npm/@doraemon-ui/miniprogram.button/index",
  // },
  // usingComponents: {
  //   'dora-button': 'miniprogram_npm/@doraemon-ui/miniprogram.button/index',
  //   'demo-block': 'miniprogram_npm/@doraemon-ui/miniprogram.demo-block/index',
  //   'demo-page': 'miniprogram_npm/@doraemon-ui/miniprogram.demo-page/index',
  //   'dora-list': 'miniprogram_npm/@doraemon-ui/miniprogram.list/index',
  //   'dora-list-item': 'miniprogram_npm/@doraemon-ui/miniprogram.list/item',
  // },
})
