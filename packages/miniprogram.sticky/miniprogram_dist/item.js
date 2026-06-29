/**
 * @doraemon-ui/miniprogram.sticky.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-06-27, 16:55:51.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.41.
 */

import { Doraemon, Prop, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';
import { useRect } from '@doraemon-ui/miniprogram.shared';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames } = Doraemon.util;
let StickyItem = class StickyItem extends Doraemon {
    get classes() {
        const { prefixCls, isFixed } = this;
        return {
            wrap: classNames(prefixCls, {
                [`${prefixCls}--fixed`]: isFixed
            }),
            hd: `${prefixCls}__hd`,
            title: `${prefixCls}__title`,
            bd: `${prefixCls}__bd`,
            content: `${prefixCls}__content`
        };
    }
    onScroll(scrollTop) {
        const { top, height, index } = this;
        const isFixed = scrollTop >= top && scrollTop < top + height;
        if (this.isFixed !== isFixed) {
            this.isFixed = isFixed;
            const parent = this.$parent;
            if (parent) {
                if (isFixed) {
                    parent.emitStick({
                        index
                    });
                } else {
                    parent.emitUnstick({
                        index
                    });
                }
            }
        }
    }
    updated(index) {
        useRect(`.${this.prefixCls}`, this._renderProxy).then((rect)=>{
            if (!rect) return;
            this.top = rect.top;
            this.height = rect.height;
            this.index = index;
        });
    }
    constructor(...args){
        super(...args);
        this.isFixed = false;
        this.index = 0;
        this.top = 0;
        this.height = 0;
    }
};
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], StickyItem.prototype, "title", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], StickyItem.prototype, "content", void 0);
StickyItem = _ts_decorate([
    Component({
        components: {
            Sticky: ()=>({
                    module: './index',
                    type: 'parent'
                })
        },
        props: {
            prefixCls: {
                type: String,
                default: 'dora-sticky-item'
            }
        },
        expose: [
            'onScroll',
            'updated'
        ]
    })
], StickyItem);
var item = defineComponentHOC()(StickyItem);

export { StickyItem, item as default };
