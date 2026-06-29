/**
 * @doraemon-ui/miniprogram.grid.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-06-27, 16:55:30.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.41.
 */

import { Doraemon, Prop, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames } = Doraemon.util;
let GridItem = class GridItem extends Doraemon {
    get classes() {
        const { prefixCls, hoverClass, bordered, square } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--bordered`]: bordered,
            [`${prefixCls}--square`]: square
        });
        const content = `${prefixCls}__content`;
        const inner = `${prefixCls}__inner`;
        const hd = `${prefixCls}__hd`;
        const thumb = `${prefixCls}__thumb`;
        const bd = `${prefixCls}__bd`;
        const label = `${prefixCls}__label`;
        const hover = hoverClass && hoverClass !== 'default' ? hoverClass : `${prefixCls}--hover`;
        return {
            wrap,
            content,
            inner,
            hd,
            thumb,
            bd,
            label,
            hover
        };
    }
    changeCurrent(width, bordered, square, index) {
        this.width = width;
        this.bordered = bordered;
        this.square = square;
        this.index = index;
    }
    onClick() {
        this.$emit('click', {
            index: this.index
        });
    }
    constructor(...args){
        super(...args);
        this.width = '100%';
        this.bordered = true;
        this.square = false;
        this.index = 0;
    }
};
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], GridItem.prototype, "thumb", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], GridItem.prototype, "label", void 0);
GridItem = _ts_decorate([
    Component({
        components: {
            Grid: ()=>({
                    module: './index',
                    type: 'parent'
                })
        },
        props: {
            prefixCls: {
                type: String,
                default: 'dora-grid-item'
            },
            hoverClass: {
                type: String,
                default: 'default'
            }
        },
        expose: [
            'changeCurrent'
        ]
    })
], GridItem);
var item = defineComponentHOC()(GridItem);

export { GridItem, item as default };
