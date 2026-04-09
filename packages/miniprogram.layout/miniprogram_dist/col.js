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
import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js';
const { classNames } = Doraemon.util;
const DEFAULT_COL_STYLE = 'padding-left: var(--dora-row-gutter-half, 0px); padding-right: var(--dora-row-gutter-half, 0px);';
let Col = class Col extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Col
     */
    prefixCls;
    /**
     * 栅格占位格数
     *
     * @type {number}
     * @memberof Col
     */
    span;
    /**
     * 栅格左侧偏移格数
     *
     * @type {number}
     * @memberof Col
     */
    offset;
    /**
     * 栅格向右移动格数（pull）
     *
     * @type {number}
     * @memberof Col
     */
    pull;
    /**
     * 栅格向左移动格数（push）
     *
     * @type {number}
     * @memberof Col
     */
    push;
    colStyle = DEFAULT_COL_STYLE;
    get classes() {
        const { prefixCls, span, offset, pull, push } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--span-${span}`]: span,
            [`${prefixCls}--offset-${offset}`]: offset,
            [`${prefixCls}--pull-${pull}`]: pull,
            [`${prefixCls}--push-${push}`]: push,
        });
        return {
            wrap,
        };
    }
};
__decorate([
    Prop({ type: Number, default: 0 })
], Col.prototype, "span", void 0);
__decorate([
    Prop({ type: Number, default: 0 })
], Col.prototype, "offset", void 0);
__decorate([
    Prop({ type: Number, default: 0 })
], Col.prototype, "pull", void 0);
__decorate([
    Prop({ type: Number, default: 0 })
], Col.prototype, "push", void 0);
Col = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-col',
            },
            span: {
                type: Number,
                default: 0,
            },
            offset: {
                type: Number,
                default: 0,
            },
            pull: {
                type: Number,
                default: 0,
            },
            push: {
                type: Number,
                default: 0,
            },
        },
    })
], Col);
export default defineComponentHOC()(Col);
