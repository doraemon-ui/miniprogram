/**
 * @doraemon-ui/miniprogram.grid.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-02-26, 21:20:50.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js';
const { classNames } = Doraemon.util;
let GridItem = class GridItem extends Doraemon {
    prefixCls;
    hoverClass;
    thumb;
    label;
    width = '100%';
    bordered = true;
    square = true;
    index = 0;
    get classes() {
        const { prefixCls, hoverClass, bordered, square } = this;
        const hover = hoverClass && hoverClass !== 'default' ? hoverClass : `${prefixCls}--hover`;
        return {
            wrap: classNames(prefixCls, {
                [`${prefixCls}--bordered`]: bordered,
                [`${prefixCls}--square`]: square,
            }),
            content: `${prefixCls}__content`,
            inner: `${prefixCls}__inner`,
            hd: `${prefixCls}__hd`,
            thumb: `${prefixCls}__thumb`,
            bd: `${prefixCls}__bd`,
            label: `${prefixCls}__label`,
            hover,
        };
    }
    changeCurrent(width, bordered, square, index) {
        this.width = width;
        this.bordered = bordered;
        this.square = square;
        this.index = index;
    }
    onTap() {
        this.$emit('click', {
            width: this.width,
            bordered: this.bordered,
            square: this.square,
            index: this.index,
            thumb: this.thumb,
            label: this.label,
        });
    }
};
__decorate([
    Prop({ type: String, default: 'default' })
], GridItem.prototype, "hoverClass", void 0);
__decorate([
    Prop({ type: String, default: '' })
], GridItem.prototype, "thumb", void 0);
__decorate([
    Prop({ type: String, default: '' })
], GridItem.prototype, "label", void 0);
GridItem = __decorate([
    Component({
        components: {
            Grids: () => ({
                module: './index',
                type: 'ancestor',
            }),
        },
        props: {
            prefixCls: {
                type: String,
                default: 'dora-grid',
            },
        },
        expose: ['changeCurrent'],
    })
], GridItem);
export default defineComponentHOC()(GridItem);
