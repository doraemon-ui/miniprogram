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
import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js';
const { classNames } = Doraemon.util;
let SkeletonAvatar = class SkeletonAvatar extends Doraemon {
    prefixCls;
    size;
    shape;
    active;
    get classes() {
        const { prefixCls, active, size, shape } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--active`]: active,
            [`${prefixCls}--${size}`]: !!size,
            [`${prefixCls}--${shape}`]: !!shape,
        });
        return { wrap };
    }
};
__decorate([
    Prop({ type: String, default: 'default' })
], SkeletonAvatar.prototype, "size", void 0);
__decorate([
    Prop({ type: String, default: 'circle' })
], SkeletonAvatar.prototype, "shape", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], SkeletonAvatar.prototype, "active", void 0);
SkeletonAvatar = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-skeleton-avatar',
            },
        },
    })
], SkeletonAvatar);
export default defineComponentHOC()(SkeletonAvatar);
