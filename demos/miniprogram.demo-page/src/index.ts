import { Component, defineComponentHOC, Doraemon, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { DarkMode } from '@doraemon-ui/miniprogram.shared'
import { canUseMP, miniprogramThis } from '@doraemon-ui/miniprogram.shared'

import type { PresetTheme, SysTheme } from './types'

const { classNames } = Doraemon.util

const DarkModeMap = {
  AUTO: 'auto',
  LIGHT: 'light',
  DARK: 'dark',
} as const

const getSysTheme = () => {
  let theme: SysTheme
  try {
    theme = miniprogramThis.getSystemInfoSync().theme as SysTheme
  } catch (e) {
    theme = DarkModeMap.LIGHT
  }
  return theme
}

const presetThemeRecord: Record<SysTheme, PresetTheme> = {
  light: {
    backgroundColor: '#fafafa',
    backgroundTextStyle: DarkModeMap.LIGHT,
    navigationBarBackgroundColor: '#fafafa',
    navigationBarTextStyle: 'black',
  },
  dark: {
    backgroundColor: '#0d0d0d',
    backgroundTextStyle: DarkModeMap.DARK,
    navigationBarBackgroundColor: '#0d0d0d',
    navigationBarTextStyle: 'white',
  },
}

const darkmodeSync = (darkmode: SysTheme) => {
  const theme = presetThemeRecord[darkmode]
  if (canUseMP()) {
    miniprogramThis.setBackgroundTextStyle({
      SysTheme: theme.backgroundTextStyle,
    })
    miniprogramThis.setBackgroundColor({
      backgroundColor: theme.backgroundColor,
    })
    miniprogramThis.setNavigationBarColor({
      frontColor: theme.navigationBarTextStyle === 'black' ? '#000000' : '#ffffff',
      backgroundColor: theme.navigationBarBackgroundColor,
    })
  }
}

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-demo-page',
    },
    darkmode: {
      type: String,
      default: Doraemon.config.darkmode,
    },
  },
  expose: ['isAuto', 'isManual', 'onIconClick'],
})
class DemoPage extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof DemoPage
   */
  prefixCls!: string

  /**
   * 当前的主题
   *
   * @type {string}
   * @memberof DemoPage
   */
  darkmode!: DarkMode

  @Prop({
    type: Boolean,
    default: false,
  })
  fixed: boolean

  @Prop({
    type: Boolean,
    default: false,
  })
  clickable: boolean

  @Prop({
    type: Boolean,
    default: false,
  })
  spacing: boolean

  @Prop({
    type: String,
    default: '',
  })
  title: string

  @Prop({
    type: String,
    default: '',
  })
  desc: string

  get classes() {
    const { prefixCls, fixed, spacing, sysTheme, curTheme, darkmode: _darkmode } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--fixed`]: fixed,
    })
    const hd = `${prefixCls}__hd`
    const title = `${prefixCls}__title`
    const desc = `${prefixCls}__desc`
    const darkmode = classNames(
      `${prefixCls}__darkmode`,
      `${prefixCls}__iconfont`,
      (curTheme === DarkModeMap.AUTO ? sysTheme === DarkModeMap.DARK : curTheme === DarkModeMap.DARK)
        ? `${prefixCls}__iconfont-dark`
        : `${prefixCls}__iconfont-light`,
    )
    const bd = classNames(`${prefixCls}__bd`, {
      [`${prefixCls}__bd--spacing`]: spacing,
    })

    return {
      wrap,
      hd,
      title,
      desc,
      darkmode,
      bd,
    }
  }

  @Watch('darkmode')
  onWatchDarmode(darkmode: DarkMode) {
    this.onDarkmodeChange(darkmode)
  }

  isAuto: boolean = false
  isManual: boolean = false
  isRegister: boolean = false
  curTheme: DarkMode = DarkModeMap.AUTO
  sysTheme: SysTheme = getSysTheme()

  onIconClick() {
    if (!this.clickable) {
      return
    }
    const curTheme = this.isManual ? this.curTheme : getSysTheme()
    const theme = curTheme === DarkModeMap.DARK ? DarkModeMap.LIGHT : DarkModeMap.DARK
    this.isManual = true
    this.setTheme(theme)
    darkmodeSync(theme)
  }

  setTheme(curTheme: DarkMode) {
    if (this.curTheme !== curTheme) {
      this.curTheme = curTheme
    }
  }

  onThemeChange(theme?: SysTheme) {
    if (this.isRegister) {
      return
    }
    const cb = ({ theme }) => {
      this.sysTheme = theme as SysTheme
      this.isRegister = true
      this.isManual = false
      this.setTheme(DarkModeMap.AUTO)
    }
    if (canUseMP()) {
      miniprogramThis.onThemeChange(cb)
    } else if (theme) {
      cb({ theme })
    }
  }

  onDarkmodeChange(darkmode: DarkMode) {
    const isAuto = darkmode === DarkModeMap.AUTO
    if (isAuto) {
      this.onThemeChange()
    } else if (canUseMP()) {
      miniprogramThis.offThemeChange()
    }
    this.isAuto = isAuto
    this.setTheme(DarkModeMap.AUTO)
  }

  mounted() {
    this.onDarkmodeChange(this.darkmode as DarkMode)
  }
}

export { DemoPage }

export default defineComponentHOC()(DemoPage)
