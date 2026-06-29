/**
 * @doraemon-ui/miniprogram.sticky.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-06-27, 16:55:51.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.41.
 */

import { Doraemon, Prop, Watch, Emit, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames } = Doraemon.util;
let Sticky = class Sticky extends Doraemon {
    get classes() {
        return {
            wrap: classNames(this.prefixCls)
        };
    }
    onScrollChange(scrollTop) {
        this.onScroll(scrollTop);
    }
    getChildNodes() {
        return this.$children || [];
    }
    onScroll(scrollTop = this.scrollTop) {
        const elements = this.getChildNodes();
        if (elements.length > 0) {
            elements.forEach((element)=>{
                element.onScroll(scrollTop);
            });
        }
    }
    updated() {
        const elements = this.getChildNodes();
        if (elements.length > 0) {
            elements.forEach((element, index)=>{
                element.updated(index);
            });
        }
    }
    onChildrenChanged() {
        this.updated();
    }
    emitStick(detail) {
        return detail;
    }
    emitUnstick(detail) {
        return detail;
    }
    mounted() {
        this.updated();
        this.onScroll(this.scrollTop);
    }
};
_ts_decorate([
    Prop({
        type: Number,
        default: 0
    })
], Sticky.prototype, "scrollTop", void 0);
_ts_decorate([
    Watch('scrollTop')
], Sticky.prototype, "onScrollChange", null);
_ts_decorate([
    Emit('stick')
], Sticky.prototype, "emitStick", null);
_ts_decorate([
    Emit('unstick')
], Sticky.prototype, "emitUnstick", null);
Sticky = _ts_decorate([
    Component({
        components: {
            StickyItem: ()=>({
                    module: './item',
                    type: 'child',
                    observer: 'onChildrenChanged'
                })
        },
        props: {
            prefixCls: {
                type: String,
                default: 'dora-sticky'
            }
        },
        expose: [
            'onScroll',
            'updated',
            'emitStick',
            'emitUnstick'
        ]
    })
], Sticky);
var index = defineComponentHOC()(Sticky);

export { Sticky, index as default };
