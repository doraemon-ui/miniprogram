/**
 * @doraemon-ui/miniprogram.skeleton.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-05, 17:07:09.
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
let SkeletonParagraph = class SkeletonParagraph extends Doraemon {
    prefixCls;
    rows;
    rounded;
    active;
    rowList = [];
    get classes() {
        const { prefixCls, active, rounded } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--active`]: active,
            [`${prefixCls}--rounded`]: rounded,
        });
        return {
            wrap,
            row: `${prefixCls}__row`,
        };
    }
    updateRows(rows = this.rows) {
        const n = Math.max(0, Number(rows) || 0);
        this.rowList = Array.from({ length: n }, (_, i) => i);
    }
    onRowsChange(v) {
        this.updateRows(v);
    }
    mounted() {
        this.updateRows(this.rows);
    }
};
__decorate([
    Prop({ type: Number, default: 3 })
], SkeletonParagraph.prototype, "rows", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], SkeletonParagraph.prototype, "rounded", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], SkeletonParagraph.prototype, "active", void 0);
__decorate([
    Watch('rows')
], SkeletonParagraph.prototype, "onRowsChange", null);
SkeletonParagraph = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-skeleton-paragraph',
            },
        },
    })
], SkeletonParagraph);
export default defineComponentHOC()(SkeletonParagraph);
