import type { PlatformAdapter, PlatformBuildContext } from './types'

export const wechatPlatform: PlatformAdapter = {
  id: 'wechat',

  markupExt: '.wxml',

  styleExt: '.wxss',

  runtimeStyleImport: '../../../../@doraemon-ui/style/index.wxss',

  jsonUsingComponentsPrefix: '',

  templateAttributePrefix: 'wx',

  resolvePackageName(pkgName) {
    return pkgName
  },

  transformTemplate(content) {
    return content
  },

  transformStyle(content) {
    return content
  },

  transformJson(json) {
    return json
  },

  transformPackageJson(pkg) {
    return pkg
  },
}
