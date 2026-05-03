/**
 * @doraemon-ui/miniprogram.skeleton.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:40:50.
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
let Skeleton = class Skeleton extends Doraemon {
    get classes() {
        const { prefixCls, active } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--active`]: active
        });
        return {
            wrap
        };
    }
};
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Skeleton.prototype, "active", void 0);
Skeleton = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-skeleton'
            }
        }
    })
], Skeleton);
var index = defineComponentHOC()(Skeleton);

export { Skeleton, index as default };
