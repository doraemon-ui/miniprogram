/**
 * @doraemon-ui/miniprogram.skeleton.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:40:50.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { Doraemon, Prop, Watch, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames } = Doraemon.util;
let SkeletonParagraph = class SkeletonParagraph extends Doraemon {
    get classes() {
        const { prefixCls, active, rounded } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--active`]: active,
            [`${prefixCls}--rounded`]: rounded
        });
        return {
            wrap,
            row: `${prefixCls}__row`
        };
    }
    updateRows(rows = this.rows) {
        const n = Math.max(0, Number(rows) || 0);
        this.rowList = Array.from({
            length: n
        }, (_, i)=>i);
    }
    onRowsChange(v) {
        this.updateRows(v);
    }
    mounted() {
        this.updateRows(this.rows);
    }
    constructor(...args){
        super(...args);
        this.rowList = [];
    }
};
_ts_decorate([
    Prop({
        type: Number,
        default: 3
    })
], SkeletonParagraph.prototype, "rows", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], SkeletonParagraph.prototype, "rounded", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], SkeletonParagraph.prototype, "active", void 0);
_ts_decorate([
    Watch('rows')
], SkeletonParagraph.prototype, "onRowsChange", null);
SkeletonParagraph = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-skeleton-paragraph'
            }
        }
    })
], SkeletonParagraph);
var skeletonParagraph = defineComponentHOC()(SkeletonParagraph);

export { SkeletonParagraph, skeletonParagraph as default };
