/**
 * @doraemon-ui/miniprogram.tabbar.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-07-02, 19:45:09.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.65.
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
        const { prefixCls, disabled, current, color } = this;
        return {
            wrap: classNames(prefixCls, {
                [`${prefixCls}--current`]: current,
                [`${prefixCls}--disabled`]: disabled,
                ['dora-color']: !!color,
                [`dora-color--${color}`]: !!color
            }),
            icon: `${prefixCls}__icon`,
            title: `${prefixCls}__title`
        };
    }
    changeCurrent(current, index, color, length) {
        this.width = `${100 / length}%`;
        this.current = current;
        this.color = color;
        this.index = index;
    }
    onTap() {
        const parent = this.$parent;
        if (this.disabled || !parent) return;
        this.$emit('click', {
            index: this.index
        });
        parent.setActiveKey(this.index);
    }
    constructor(...args){
        super(...args);
        this.width = '100%';
        this.current = false;
        this.index = '0';
        this.color = 'positive';
    }
};
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], TabbarItem.prototype, "key", void 0);
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
var item = defineComponentHOC()(TabbarItem);

export { TabbarItem, item as default };
