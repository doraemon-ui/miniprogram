/**
 * @doraemon-ui/miniprogram.safe-area.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:42:16.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { Doraemon, Prop, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';
import { getSystemInfoSync, getMenuButtonBoundingClientRectSync } from '@doraemon-ui/miniprogram.shared';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames, styleToCssString } = Doraemon.util;
function getSafeAreaInset(safeAreaStyle = 'default') {
    // StatusBar & NavBar
    const isDefault = [
        'default',
        'navBar'
    ].includes(safeAreaStyle);
    // iPhoneX 竖屏安全区域
    const safeAreaInset = {
        top: isDefault ? 88 : 44,
        left: 0,
        right: 0,
        bottom: 34
    };
    try {
        const menuRect = getMenuButtonBoundingClientRectSync();
        const windowInfo = getSystemInfoSync([
            'window',
            'device'
        ]);
        const { safeArea, screenHeight, windowHeight } = windowInfo;
        const isIOS = !!(windowInfo.system.toLowerCase().search('ios') + 1);
        // 状态栏高度
        const statusBarHeight = !windowInfo.statusBarHeight ? screenHeight - windowHeight - 20 : windowInfo.statusBarHeight;
        // 胶囊高度
        const navBarHeight = (menuRect.top - statusBarHeight) * 2 + menuRect.height;
        // 下方扩展 4 像素高度, 防止下方边距太小
        const navBarExtendHeight = windowInfo.statusBarHeight && isIOS ? 4 : 0;
        safeAreaInset.top = isDefault ? statusBarHeight + navBarHeight + navBarExtendHeight : Math.max(statusBarHeight, safeAreaInset.top);
        safeAreaInset.bottom = screenHeight - safeArea.bottom;
    } catch (e) {
    /**
     * Ignore
     */ }
    return safeAreaInset;
}
const checkIPhoneX = ({ model, windowHeight, windowWidth })=>{
    return /iphone (x|12|13|14)/.test(model.toLowerCase()) || windowHeight >= 812 && windowHeight / windowWidth > 2;
};
const defaultSafeArea = {
    top: false,
    bottom: false
};
const getSafeAreaConfig = (params)=>{
    if (typeof params === 'boolean') {
        return Object.assign({}, defaultSafeArea, {
            top: params,
            bottom: params
        });
    } else if (params !== null && typeof params === 'object') {
        return Object.assign({}, defaultSafeArea, params);
    } else if (typeof params === 'string') {
        return Object.assign({}, defaultSafeArea, {
            [params]: true
        });
    }
    return Object.assign({}, defaultSafeArea);
};
let SafeArea = class SafeArea extends Doraemon {
    /**
   * 组件样式
   *
   * @readonly
   * @memberof SafeArea
   */ get containerStyle() {
        const { safeArea, safeAreaStyle, forceRender, supports, wrapStyle, isIPhoneX } = this;
        const safeAreaConfig = getSafeAreaConfig(safeArea);
        const position = safeAreaConfig.bottom ? 'bottom' : safeAreaConfig.top ? 'top' : 'none';
        let varStyle = '';
        if ((forceRender || isIPhoneX) && !supports && [
            'bottom',
            'top'
        ].includes(position)) {
            const safeAreaInset = getSafeAreaInset(safeAreaStyle);
            varStyle = `--inset-top: ${safeAreaInset.top}PX;`;
            varStyle += `--inset-bottom: ${safeAreaInset.bottom}PX;`;
        }
        return styleToCssString(varStyle + styleToCssString(wrapStyle));
    }
    get classes() {
        const { prefixCls, forceRender, supports, safeArea, isIPhoneX } = this;
        const safeAreaConfig = getSafeAreaConfig(safeArea);
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--position-bottom`]: (forceRender || isIPhoneX) && safeAreaConfig.bottom,
            [`${prefixCls}--position-top`]: (forceRender || isIPhoneX) && !safeAreaConfig.bottom,
            [`${prefixCls}--supports`]: (forceRender || isIPhoneX) && supports
        });
        return {
            wrap
        };
    }
    /**
   * 内部判断是否刘海屏
   *
   * @readonly
   * @memberof SafeArea
   */ get isIPhoneX() {
        const windowInfo = getSystemInfoSync([
            'window',
            'device'
        ]);
        return checkIPhoneX({
            model: windowInfo.model || '',
            windowHeight: windowInfo.windowHeight || 0,
            windowWidth: windowInfo.windowWidth || 0
        });
    }
};
_ts_decorate([
    Prop({
        type: [
            Boolean,
            String,
            Object
        ],
        default: ()=>({
                ...defaultSafeArea
            })
    })
], SafeArea.prototype, "safeArea", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'default'
    })
], SafeArea.prototype, "safeAreaStyle", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], SafeArea.prototype, "forceRender", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], SafeArea.prototype, "supports", void 0);
_ts_decorate([
    Prop({
        type: Object,
        default: null
    })
], SafeArea.prototype, "wrapStyle", void 0);
SafeArea = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-safe-area'
            }
        }
    })
], SafeArea);
var index = defineComponentHOC()(SafeArea);

export { SafeArea, checkIPhoneX, index as default, defaultSafeArea, getSafeAreaConfig, getSafeAreaInset };
