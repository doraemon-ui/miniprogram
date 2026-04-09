/**
 * @doraemon-ui/miniprogram.layout.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-02-26, 04:39:59.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js';
const { classNames } = Doraemon.util;
let Row = class Row extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Row
     */
    prefixCls;
    /**
     * 栅格间隔（px）
     *
     * @type {number}
     * @memberof Row
     */
    gutter;
    rowStyle = '';
    get classes() {
        const { prefixCls } = this;
        const wrap = classNames(prefixCls);
        return {
            wrap,
        };
    }
    onGutterChange(newVal) {
        this.updateStyle(newVal);
    }
    updateStyle(gutter = this.gutter) {
        const g = typeof gutter === 'number' && gutter > 0 ? gutter : 0;
        const half = g / 2;
        const rowStyle = g > 0
            ? `--dora-row-gutter: ${g}px; --dora-row-gutter-half: ${half}px; margin-left: -${half}px; margin-right: -${half}px;`
            : `--dora-row-gutter: 0px; --dora-row-gutter-half: 0px;`;
        if (this.rowStyle !== rowStyle) {
            this.rowStyle = rowStyle;
        }
    }
    mounted() {
        this.updateStyle();
    }
};
__decorate([
    Prop({ type: Number, default: 0 })
], Row.prototype, "gutter", void 0);
__decorate([
    Watch('gutter')
], Row.prototype, "onGutterChange", null);
Row = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-row',
            },
            gutter: {
                type: Number,
                default: 0,
            },
        },
    })
], Row);
export default defineComponentHOC()(Row);
