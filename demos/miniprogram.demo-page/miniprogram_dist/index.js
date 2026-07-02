/**
 * @doraemon-ui/miniprogram.demo-page.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-07-02, 19:43:44.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.65.
 */

import { Doraemon, Prop, Watch, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';
import { canUseMP, miniprogramThis } from '@doraemon-ui/miniprogram.shared';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames } = Doraemon.util;
const DarkModeMap = {
    AUTO: 'auto',
    LIGHT: 'light',
    DARK: 'dark'
};
const getSysTheme = ()=>{
    let theme;
    try {
        theme = miniprogramThis.getSystemInfoSync().theme;
    } catch (e) {
        theme = DarkModeMap.LIGHT;
    }
    return theme;
};
const presetThemeRecord = {
    light: {
        backgroundColor: '#fafafa',
        backgroundTextStyle: DarkModeMap.LIGHT,
        navigationBarBackgroundColor: '#fafafa',
        navigationBarTextStyle: 'black'
    },
    dark: {
        backgroundColor: '#0d0d0d',
        backgroundTextStyle: DarkModeMap.DARK,
        navigationBarBackgroundColor: '#0d0d0d',
        navigationBarTextStyle: 'white'
    }
};
const darkmodeSync = (darkmode)=>{
    const theme = presetThemeRecord[darkmode];
    if (canUseMP()) {
        miniprogramThis.setBackgroundTextStyle({
            SysTheme: theme.backgroundTextStyle
        });
        miniprogramThis.setBackgroundColor({
            backgroundColor: theme.backgroundColor
        });
        miniprogramThis.setNavigationBarColor({
            frontColor: theme.navigationBarTextStyle === 'black' ? '#000000' : '#ffffff',
            backgroundColor: theme.navigationBarBackgroundColor
        });
    }
};
let DemoPage = class DemoPage extends Doraemon {
    get classes() {
        const { prefixCls, fixed, spacing, sysTheme, curTheme, darkmode: _darkmode } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--fixed`]: fixed
        });
        const hd = `${prefixCls}__hd`;
        const title = `${prefixCls}__title`;
        const desc = `${prefixCls}__desc`;
        const darkmode = classNames(`${prefixCls}__darkmode`, `${prefixCls}__iconfont`, (curTheme === DarkModeMap.AUTO ? sysTheme === DarkModeMap.DARK : curTheme === DarkModeMap.DARK) ? `${prefixCls}__iconfont-dark` : `${prefixCls}__iconfont-light`);
        const bd = classNames(`${prefixCls}__bd`, {
            [`${prefixCls}__bd--spacing`]: spacing
        });
        return {
            wrap,
            hd,
            title,
            desc,
            darkmode,
            bd
        };
    }
    onWatchDarmode(darkmode) {
        this.onDarkmodeChange(darkmode);
    }
    onIconClick() {
        if (!this.clickable) {
            return;
        }
        const curTheme = this.isManual ? this.curTheme : getSysTheme();
        const theme = curTheme === DarkModeMap.DARK ? DarkModeMap.LIGHT : DarkModeMap.DARK;
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
        const cb = ({ theme })=>{
            this.sysTheme = theme;
            this.isRegister = true;
            this.isManual = false;
            this.setTheme(DarkModeMap.AUTO);
        };
        if (canUseMP()) {
            miniprogramThis.onThemeChange(cb);
        } else if (theme) {
            cb({
                theme
            });
        }
    }
    onDarkmodeChange(darkmode) {
        const isAuto = darkmode === DarkModeMap.AUTO;
        if (isAuto) {
            this.onThemeChange();
        } else if (canUseMP()) {
            miniprogramThis.offThemeChange();
        }
        this.isAuto = isAuto;
        this.setTheme(DarkModeMap.AUTO);
    }
    mounted() {
        this.onDarkmodeChange(this.darkmode);
    }
    constructor(...args){
        super(...args);
        this.isAuto = false;
        this.isManual = false;
        this.isRegister = false;
        this.curTheme = DarkModeMap.AUTO;
        this.sysTheme = getSysTheme();
    }
};
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], DemoPage.prototype, "fixed", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], DemoPage.prototype, "clickable", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], DemoPage.prototype, "spacing", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], DemoPage.prototype, "title", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], DemoPage.prototype, "desc", void 0);
_ts_decorate([
    Watch('darkmode')
], DemoPage.prototype, "onWatchDarmode", null);
DemoPage = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-demo-page'
            },
            darkmode: {
                type: String,
                default: Doraemon.config.darkmode
            }
        },
        expose: [
            'isAuto',
            'isManual',
            'onIconClick'
        ]
    })
], DemoPage);
var index = defineComponentHOC()(DemoPage);

export { DemoPage, index as default };
