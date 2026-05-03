/**
 * @doraemon-ui/miniprogram.accordion.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:37:56.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { Prop, Watch, Emit, Component, defineComponentHOC, Doraemon } from '@doraemon-ui/miniprogram.core-js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let Accordion = class Accordion extends Doraemon {
    get classes() {
        const { prefixCls } = this;
        const wrap = prefixCls;
        const hd = `${prefixCls}__hd`;
        const bd = `${prefixCls}__bd`;
        const ft = `${prefixCls}__ft`;
        return {
            wrap,
            hd,
            bd,
            ft
        };
    }
    watchCurrent(newVal) {
        if (this.controlled) {
            this.updated(newVal);
        }
    }
    updated(activeKey = this.activeKey) {
        if (this.activeKey !== activeKey) {
            this.activeKey = activeKey;
        }
        this.updateCurrentAndIndex(activeKey);
    }
    updateCurrentAndIndex(activeKey) {
        const elements = this.$children;
        if (elements.length > 0) {
            elements.forEach((element, index)=>{
                const key = element.key || String(index);
                const current = this.accordion ? activeKey[0] === key : activeKey.indexOf(key) !== -1;
                element.updateCurrentAndIndex(current, key);
            });
        }
        if (this.keys.length !== elements.length) {
            this.keys = elements.map((element)=>element.$data);
        }
    }
    setActiveKey(activeKey) {
        if (!this.controlled) {
            this.updated(activeKey);
        }
        return {
            key: this.accordion ? activeKey[0] : activeKey,
            keys: this.keys
        };
    }
    onClickItem(key) {
        let activeKey = [
            ...this.activeKey
        ];
        if (this.accordion) {
            activeKey = activeKey[0] === key ? [] : [
                key
            ];
        } else {
            activeKey = activeKey.indexOf(key) !== -1 ? activeKey.filter((n)=>n !== key) : [
                ...activeKey,
                key
            ];
        }
        this.setActiveKey(activeKey);
    }
    mounted() {
        const { defaultCurrent, current, controlled } = this;
        const activeKey = controlled ? current : defaultCurrent;
        this.updated(activeKey);
    }
    constructor(...args){
        super(...args);
        this.activeKey = [];
        this.keys = [];
    }
};
_ts_decorate([
    Prop({
        type: Array,
        default: []
    })
], Accordion.prototype, "defaultCurrent", void 0);
_ts_decorate([
    Prop({
        type: Array,
        default: []
    })
], Accordion.prototype, "current", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Accordion.prototype, "controlled", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Accordion.prototype, "accordion", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Accordion.prototype, "title", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Accordion.prototype, "label", void 0);
_ts_decorate([
    Watch('current')
], Accordion.prototype, "watchCurrent", null);
_ts_decorate([
    Emit('change')
], Accordion.prototype, "setActiveKey", null);
Accordion = _ts_decorate([
    Component({
        components: {
            Panel: ()=>({
                    module: './panel',
                    type: 'child',
                    observer: 'updated'
                })
        },
        props: {
            prefixCls: {
                type: String,
                default: 'dora-accordion'
            }
        }
    })
], Accordion);
var index = defineComponentHOC({
    multipleSlots: false
})(Accordion);

export { Accordion, index as default };
