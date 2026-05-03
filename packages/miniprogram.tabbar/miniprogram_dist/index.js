/**
 * @doraemon-ui/miniprogram.tabbar.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:41:12.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { Doraemon, Prop, Watch, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames, styleToCssString } = Doraemon.util;
let Tabbar = class Tabbar extends Doraemon {
    get classes() {
        const p = this.prefixCls;
        return {
            wrap: classNames(p, {
                [`${p}--${this.position}`]: !!this.position
            }),
            tabbar: `${p}-wrap`
        };
    }
    getChildrenItems() {
        const proxy = this._renderProxy;
        const nodes = proxy && typeof proxy.getRelationNodes === 'function' ? proxy.getRelationNodes('./tabbar-item') || [] : [];
        return nodes.map((n)=>n?.$component).filter(Boolean);
    }
    onCurrentChange(v) {
        if (this.controlled) this.updated(v);
    }
    onBackgroundChange(v) {
        this.updateStyle(v);
    }
    onChildrenChanged() {
        this.changeCurrent(this.activeKey);
    }
    updated(activeKey = this.activeKey) {
        if (this.activeKey !== activeKey) this.activeKey = activeKey;
        this.changeCurrent(activeKey);
    }
    changeCurrent(activeKey) {
        const elements = this.getChildrenItems();
        elements.forEach((element, index)=>{
            const itemKey = element.tabKey || String(index);
            const current = itemKey === activeKey;
            if (element && typeof element.changeCurrent === 'function') {
                element.changeCurrent(current, itemKey, this.theme, elements.length);
            }
        });
        if (this.keys.length !== elements.length) {
            this.keys = elements.map((element)=>({
                    key: element.tabKey,
                    title: element.title,
                    disabled: element.disabled
                }));
        }
    }
    emitEvent(key) {
        this.$emit('change', {
            key,
            keys: this.keys
        });
    }
    setActiveKey(activeKey) {
        if (!this.controlled) this.updated(activeKey);
        this.emitEvent(activeKey);
    }
    updateStyle(backgroundColor) {
        const tabbarStyle = styleToCssString({
            backgroundColor
        });
        if (this.tabbarStyle !== tabbarStyle) this.tabbarStyle = tabbarStyle;
    }
    mounted() {
        const activeKey = this.controlled ? this.current : this.defaultCurrent;
        this.updated(activeKey);
        this.updateStyle(this.backgroundColor);
    }
    constructor(...args){
        super(...args);
        this.tabbarStyle = '';
        this.activeKey = '';
        this.keys = [];
    }
};
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Tabbar.prototype, "defaultCurrent", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Tabbar.prototype, "current", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Tabbar.prototype, "controlled", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'balanced'
    })
], Tabbar.prototype, "theme", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: '#fff'
    })
], Tabbar.prototype, "backgroundColor", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Tabbar.prototype, "position", void 0);
_ts_decorate([
    Prop({
        type: [
            Boolean,
            String,
            Object
        ],
        default: false
    })
], Tabbar.prototype, "safeArea", void 0);
_ts_decorate([
    Watch('current')
], Tabbar.prototype, "onCurrentChange", null);
_ts_decorate([
    Watch('backgroundColor')
], Tabbar.prototype, "onBackgroundChange", null);
Tabbar = _ts_decorate([
    Component({
        components: {
            TabbarItem: ()=>({
                    module: './tabbar-item',
                    type: 'child',
                    observer: 'onChildrenChanged'
                })
        },
        props: {
            prefixCls: {
                type: String,
                default: 'dora-tabbar'
            }
        }
    })
], Tabbar);
var index = defineComponentHOC()(Tabbar);

export { Tabbar, index as default };
