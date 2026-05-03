/**
 * @doraemon-ui/miniprogram.tabbar.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:41:12.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { Doraemon, Prop, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames } = Doraemon.util;
let TabbarItem = class TabbarItem extends Doraemon {
    get classes() {
        const p = this.prefixCls;
        return {
            wrap: classNames(p, {
                [`${p}--${this.theme}`]: !!this.theme,
                [`${p}--current`]: this.current,
                [`${p}--disabled`]: this.disabled
            }),
            icon: `${p}__icon`,
            title: `${p}__title`
        };
    }
    changeCurrent(current, index, theme, length) {
        this.width = `${100 / length}%`;
        this.current = current;
        this.theme = theme;
        this.index = index;
    }
    onTap() {
        const proxy = this._renderProxy;
        const parentNodes = proxy && typeof proxy.getRelationNodes === 'function' ? proxy.getRelationNodes('./index') : [];
        const parentNode = parentNodes && parentNodes[0];
        const parent = parentNode && parentNode.$component;
        if (this.disabled || !parent) return;
        this.$emit('click', {
            index: this.index
        });
        if (parent && typeof parent.setActiveKey === 'function') {
            parent.setActiveKey(this.index);
        }
    }
    constructor(...args){
        super(...args);
        this.width = '100%';
        this.current = false;
        this.index = '0';
        this.theme = 'balanced';
    }
};
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], TabbarItem.prototype, "tabKey", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], TabbarItem.prototype, "title", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], TabbarItem.prototype, "disabled", void 0);
TabbarItem = _ts_decorate([
    Component({
        components: {
            Tabbar: ()=>({
                    module: './index',
                    type: 'parent'
                })
        },
        props: {
            prefixCls: {
                type: String,
                default: 'dora-tabbar-item'
            }
        }
    })
], TabbarItem);
var tabbarItem = defineComponentHOC()(TabbarItem);

export { TabbarItem, tabbarItem as default };
