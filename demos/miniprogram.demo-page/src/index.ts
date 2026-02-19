import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import { miniprogramThis, canUseMP } from '@doraemon-ui/miniprogram.shared'
const { classNames } = Doraemon.util

enum DarkMode {
  AUTO = 'auto',
  LIGHT ='light',
  DARK = 'dark',
}

type SysThemeType = DarkMode.LIGHT | DarkMode.DARK

const getSysTheme = () => {
  let theme: SysThemeType
  try {
    theme = miniprogramThis.getSystemInfoSync().theme as SysThemeType
  } catch (e) {
    theme = DarkMode.LIGHT
  }
  return theme
}

const presetThemeRecord: {
  [x in SysThemeType]: {
    backgroundColor: string
    backgroundTextStyle: SysThemeType
    navigationBarBackgroundColor: string
    navigationBarTextStyle: 'black' | 'white'
  }
} = {
  'light': {
    'backgroundColor': '#fafafa',
    'backgroundTextStyle': DarkMode.LIGHT,
    'navigationBarBackgroundColor': '#fafafa',
    'navigationBarTextStyle': 'black',
  },
  'dark': {
    'backgroundColor': '#0d0d0d',
    'backgroundTextStyle': DarkMode.DARK,
    'navigationBarBackgroundColor': '#0d0d0d',
    'navigationBarTextStyle': 'white',
  },
}

const darkmodeSync = (darkmode: SysThemeType) => {
  const theme = presetThemeRecord[darkmode]
  if (canUseMP()) {
    miniprogramThis.setBackgroundTextStyle({
      textStyle: theme.backgroundTextStyle,
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

  get classes () {
    const { prefixCls, spacing, sysTheme, curTheme, darkmode: _darkmode } = this
    const wrap = prefixCls
    const hd = `${prefixCls}__hd`
    const title = `${prefixCls}__title`
    const desc = `${prefixCls}__desc`
    const darkmode = classNames(
      `${prefixCls}__darkmode`,
      `${prefixCls}__iconfont`,
      (curTheme === DarkMode.AUTO ? sysTheme === DarkMode.DARK : curTheme === DarkMode.DARK) ?
        `${prefixCls}__iconfont-dark` : `${prefixCls}__iconfont-light`
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
  onWatchDarmode (darkmode: DarkMode) {
    this.onDarkmodeChange(darkmode)
  }

  isAuto: boolean = false
  isManual: boolean = false
  isRegister: boolean = false
  curTheme: DarkMode = DarkMode.AUTO
  sysTheme: SysThemeType = getSysTheme()

  onIconClick () {
    if (!this.clickable) { return }
    const curTheme = this.isManual ? this.curTheme : getSysTheme()
    const theme = curTheme === DarkMode.DARK ? DarkMode.LIGHT : DarkMode.DARK
    this.isManual = true
    this.setTheme(theme)
    darkmodeSync(theme)
  }

  setTheme (curTheme: DarkMode) {
    if (this.curTheme !== curTheme) {
      this.curTheme = curTheme
    }
  }

  onThemeChange (theme?: SysThemeType) {
    if (this.isRegister) { return }
    const cb = ({ theme }) => {
      this.sysTheme = theme as SysThemeType
      this.isRegister = true
      this.isManual = false
      this.setTheme(DarkMode.AUTO)
    }
    if (canUseMP()) {
      miniprogramThis.onThemeChange(cb)
    } else if (theme) {
      cb({ theme })
    }
  }

  onDarkmodeChange (darkmode: DarkMode) {
    const isAuto = darkmode === DarkMode.AUTO
    if (isAuto) {
      this.onThemeChange()
    } else if (canUseMP()) {
      miniprogramThis.offThemeChange()
    }
    this.isAuto = isAuto
    this.setTheme(DarkMode.AUTO)
  }

  mounted () {
    this.onDarkmodeChange(this.darkmode as DarkMode)
  }
}

export default defineComponentHOC()(DemoPage)
