import type { PlatformAdapter, PlatformBuildContext } from './types'

import { resolvePackageName } from './registry'

import { transformTemplateAttributes } from './utils'

export const toutiaoPlatform: PlatformAdapter = {
  id: 'tt',

  markupExt: '.ttml',

  styleExt: '.ttss',

  runtimeStyleImport: '../../../../@doraemon-ui/style/index.ttss',

  jsonUsingComponentsPrefix: 'ext://',

  templateAttributePrefix: 'tt',

  resolvePackageName(pkgName) {
    return resolvePackageName(pkgName, 'tt')
  },

  transformTemplate(content) {
    return transformTemplateAttributes(content, 'tt')
  },

  transformStyle(content) {
    return content
  },

  transformJson(json) {
    const usingComponents = json.usingComponents ?? {}

    return {
      ...json,

      usingComponents: Object.fromEntries(
        Object.entries(usingComponents).map(([name, pkg]) => [
          name,

          `${this.jsonUsingComponentsPrefix}${this.resolvePackageName(String(pkg))}`,
        ]),
      ),
    }
  },

  transformPackageJson(pkg, ctx) {
    return {
      ...pkg,

      name: this.resolvePackageName(pkg.name),

      miniprogramType: 'tt-npm',

      main: 'miniprogram_dist/index',

      exports: {
        components: ctx.exports ?? {},
      },
    }
  },
}
