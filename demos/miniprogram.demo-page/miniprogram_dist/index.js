/**
 * @doraemon-ui/miniprogram.demo-page.
 * © 2021 - 2024 Doraemon UI.
 * Built on 2024-03-20, 18:16:52.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.18.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js';
const { classNames } = Doraemon.util;
const themeJSON = {
    'light': {
        'backgroundColor': '#fafafa',
        'backgroundTextStyle': 'light',
        'navigationBarBackgroundColor': '#fafafa',
        'navigationBarTextStyle': 'black',
    },
    'dark': {
        'backgroundColor': '#0d0d0d',
        'backgroundTextStyle': 'dark',
        'navigationBarBackgroundColor': '#0d0d0d',
        'navigationBarTextStyle': 'white',
    },
};
const darkmodeSync = (darkmode) => {
    const theme = themeJSON[darkmode];
    if (typeof wx !== 'undefined') {
        wx.setBackgroundTextStyle({
            textStyle: theme.backgroundTextStyle,
        });
        wx.setBackgroundColor({
            backgroundColor: theme.backgroundColor,
        });
        wx.setNavigationBarColor({
            frontColor: theme.navigationBarTextStyle === 'black' ? '#000000' : '#ffffff',
            backgroundColor: theme.navigationBarBackgroundColor,
        });
    }
};
var DarkMode;
(function (DarkMode) {
    DarkMode["AUTO"] = "auto";
    DarkMode["LIGHT"] = "light";
    DarkMode["DARK"] = "dark";
})(DarkMode || (DarkMode = {}));
const getSysTheme = () => {
    let theme;
    try {
        theme = wx.getSystemInfoSync().theme;
    }
    catch (e) {
        theme = DarkMode.LIGHT;
    }
    return theme;
};
let DemoPage = class DemoPage extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof DemoPage
     */
    prefixCls;
    /**
     * 当前的主题
     *
     * @type {string}
     * @memberof DemoPage
     */
    darkmode;
    clickable;
    spacing;
    title;
    desc;
    get classes() {
        const { prefixCls, spacing, sysTheme, curTheme, darkmode: _darkmode } = this;
        const wrap = prefixCls;
        const hd = `${prefixCls}__hd`;
        const title = `${prefixCls}__title`;
        const desc = `${prefixCls}__desc`;
        const darkmode = classNames(`${prefixCls}__darkmode`, `${prefixCls}__iconfont`, (curTheme === DarkMode.AUTO ? sysTheme === DarkMode.DARK : curTheme === DarkMode.DARK) ?
            `${prefixCls}__iconfont-dark` : `${prefixCls}__iconfont-light`);
        const bd = classNames(`${prefixCls}__bd`, {
            [`${prefixCls}__bd--spacing`]: spacing,
        });
        return {
            wrap,
            hd,
            title,
            desc,
            darkmode,
            bd,
        };
    }
    onWatchDarmode(darkmode) {
        this.onDarkmodeChange(darkmode);
    }
    isAuto = false;
    isManual = false;
    isRegister = false;
    curTheme = DarkMode.AUTO;
    sysTheme = getSysTheme();
    onIconClick() {
        if (!this.clickable) {
            return;
        }
        const curTheme = this.isManual ? this.curTheme : getSysTheme();
        const theme = curTheme === DarkMode.DARK ? DarkMode.LIGHT : DarkMode.DARK;
        this.isManual = true;
        this.setTheme(theme);
        darkmodeSync(theme);
    }
    setTheme(curTheme) {
        if (this.curTheme !== curTheme) {
            this.curTheme = curTheme;
        }
    }
    onThemeChange(theme) {
        if (this.isRegister) {
            return;
        }
        const cb = ({ theme }) => {
            this.sysTheme = theme;
            this.isRegister = true;
            this.isManual = false;
            this.setTheme(DarkMode.AUTO);
        };
        if (typeof wx !== 'undefined' && wx.onThemeChange) {
            wx.onThemeChange(cb);
        }
        else if (theme) {
            cb({ theme });
        }
    }
    onDarkmodeChange(darkmode) {
        const isAuto = darkmode === DarkMode.AUTO;
        if (isAuto) {
            this.onThemeChange();
        }
        else if (typeof wx !== 'undefined' && wx.offThemeChange) {
            wx.offThemeChange();
        }
        this.isAuto = isAuto;
        this.setTheme(DarkMode.AUTO);
    }
    mounted() {
        this.onDarkmodeChange(this.darkmode);
    }
};
__decorate([
    Prop({
        type: Boolean,
        default: false,
    })
], DemoPage.prototype, "clickable", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: false,
    })
], DemoPage.prototype, "spacing", void 0);
__decorate([
    Prop({
        type: String,
        default: '',
    })
], DemoPage.prototype, "title", void 0);
__decorate([
    Prop({
        type: String,
        default: '',
    })
], DemoPage.prototype, "desc", void 0);
__decorate([
    Watch('darkmode')
], DemoPage.prototype, "onWatchDarmode", null);
DemoPage = __decorate([
    Component({
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
], DemoPage);
export default defineComponentHOC()(DemoPage);
