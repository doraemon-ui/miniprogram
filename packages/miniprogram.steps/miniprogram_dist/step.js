/**
 * @doraemon-ui/miniprogram.steps.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-05, 18:30:15.
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
const defaultStatus = ['wait', 'process', 'finish', 'error'];
const defaultIcon = 'ios-checkmark';
let Step = class Step extends Doraemon {
    prefixCls;
    status;
    title;
    content;
    icon;
    width = '100%';
    length = 1;
    index = 0;
    current = 0;
    direction = 'horizontal';
    hasIcon = false;
    thumb = defaultIcon;
    className = '';
    get classes() {
        const { prefixCls, direction } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--${direction}`]: direction,
        });
        return {
            wrap,
            hd: `${prefixCls}__hd`,
            icon: `${prefixCls}__icon`,
            thumb: `${prefixCls}__thumb`,
            bd: `${prefixCls}__bd`,
            title: `${prefixCls}__title`,
            content: `${prefixCls}__content`,
            ft: `${prefixCls}__ft`,
        };
    }
    updateCurrent(opts = {}) {
        const length = opts.length || this.length || 1;
        const direction = opts.direction || this.direction;
        const width = direction === 'horizontal' ? `${100 / length}%` : '100%';
        const index = typeof opts.index === 'number' ? opts.index : this.index;
        const current = typeof opts.current === 'number' ? opts.current : this.current;
        const stateIndex = defaultStatus.indexOf(this.status);
        const hasIcon = index < current || !!this.icon;
        const thumb = this.icon || defaultIcon;
        const suffix = stateIndex !== -1 ? defaultStatus[stateIndex] : index < current ? 'finish' : index === current ? 'process' : '';
        const className = suffix ? `${this.prefixCls}--${suffix}` : '';
        this.width = width;
        this.length = length;
        this.index = index;
        this.current = current;
        this.direction = direction;
        this.hasIcon = hasIcon;
        this.thumb = thumb;
        this.className = className;
    }
    mounted() {
        this.updateCurrent();
    }
};
__decorate([
    Prop({ type: String, default: '' })
], Step.prototype, "status", void 0);
__decorate([
    Prop({ type: String, default: '' })
], Step.prototype, "title", void 0);
__decorate([
    Prop({ type: String, default: '' })
], Step.prototype, "content", void 0);
__decorate([
    Prop({ type: String, default: '' })
], Step.prototype, "icon", void 0);
Step = __decorate([
    Component({
        components: {
            Steps: () => ({
                module: './index',
                type: 'parent',
            }),
        },
        props: {
            prefixCls: {
                type: String,
                default: 'dora-step',
            },
        },
    })
], Step);
export default defineComponentHOC()(Step);
