/**
 * @doraemon-ui/miniprogram.layout.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:39:36.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { Doraemon, Prop, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames } = Doraemon.util;
const DEFAULT_COL_STYLE = 'padding-left: var(--dora-row-gutter-half, 0px); padding-right: var(--dora-row-gutter-half, 0px);';
let Col = class Col extends Doraemon {
    get classes() {
        const { prefixCls, span, offset, pull, push } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--span-${span}`]: span,
            [`${prefixCls}--offset-${offset}`]: offset,
            [`${prefixCls}--pull-${pull}`]: pull,
            [`${prefixCls}--push-${push}`]: push
        });
        return {
            wrap
        };
    }
    constructor(...args){
        super(...args);
        this.colStyle = DEFAULT_COL_STYLE;
    }
};
_ts_decorate([
    Prop({
        type: Number,
        default: 0
    })
], Col.prototype, "span", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 0
    })
], Col.prototype, "offset", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 0
    })
], Col.prototype, "pull", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 0
    })
], Col.prototype, "push", void 0);
Col = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-col'
            }
        }
    })
], Col);
var col = defineComponentHOC()(Col);

export { Col, col as default };
