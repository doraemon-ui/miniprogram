/**
 * @doraemon-ui/miniprogram.rater.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-05, 02:41:06.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js';
import { useRectAll } from '@doraemon-ui/miniprogram.shared';
const { classNames } = Doraemon.util;
let Rater = class Rater extends Doraemon {
    prefixCls;
    max;
    icon;
    star;
    defaultValue;
    value;
    activeColor;
    margin;
    fontSize;
    disabled;
    allowHalf;
    allowClear;
    allowTouchMove;
    controlled;
    inputValue = -1;
    hasFieldDecorator = false;
    stars = [];
    colors = [];
    cutIndex = 0;
    cutPercent = 0;
    get classes() {
        const { prefixCls, disabled } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--disabled`]: disabled,
        });
        return {
            wrap,
            star: `${prefixCls}__star`,
            box: `${prefixCls}__box`,
            inner: `${prefixCls}__inner`,
            outer: `${prefixCls}__outer`,
            icon: `${prefixCls}__icon`,
        };
    }
    onRecalc() {
        const stars = [...new Array(this.max)].map((_, i) => i);
        const colors = stars.map((i) => (i <= this.inputValue - 1 ? this.activeColor : '#ccc'));
        const split = this.inputValue.toString().split('.');
        const slice = split.length === 1 ? [split[0], '0'] : split;
        this.stars = stars;
        this.colors = colors;
        this.cutIndex = Number(slice[0]);
        this.cutPercent = Number(slice[1]) * 10;
    }
    onValueChange(newVal) {
        if (this.controlled)
            this.setValue(newVal);
    }
    onMaxChange() {
        this.setValue(this.inputValue);
    }
    updated(v) {
        if (!this.hasFieldDecorator && this.inputValue !== v) {
            this.inputValue = v;
        }
    }
    setValue(value) {
        const inputValue = value <= 0 ? 0 : value > this.max ? this.max : value;
        this.updated(inputValue);
    }
    updateHalfStarValue(index, x, cb) {
        useRectAll(`.${this.prefixCls}__star`, this._renderProxy).then((rects) => {
            if (rects.filter((n) => !n).length)
                return;
            const rect = rects[index];
            const has = (x - rect.left) < rect.width / 2;
            const value = has ? index + 0.5 : index + 1;
            cb.call(this, value, index);
        });
    }
    onTap(e) {
        const { index } = e.currentTarget.dataset;
        if (this.disabled)
            return;
        if (!this.allowHalf) {
            const value = index + 1;
            const isReset = this.allowClear && value === this.inputValue;
            this.onChange(isReset ? 0 : value, index);
        }
        else {
            this.updateHalfStarValue(index, (e.detail?.x) || 0, (value, i) => {
                const isReset = this.allowClear && value === this.inputValue;
                this.onChange(isReset ? 0 : value, i);
            });
        }
    }
    onChange(value, index) {
        if (!this.controlled)
            this.setValue(value);
        this.$emit('change', { value, index });
    }
    onTouchMove(e) {
        if (this.disabled || !this.allowTouchMove)
            return;
        const x = e.changedTouches[0].pageX;
        useRectAll(`.${this.prefixCls}__star`, this._renderProxy).then((rects) => {
            if (rects.filter((n) => !n).length)
                return;
            const first = rects[0];
            const maxWidth = rects.map((n) => n.width).reduce((a, b) => a + b, 0);
            const diff = x - first.left;
            let value = Math.ceil(diff / first.width);
            if (diff > 0 && diff < maxWidth) {
                const index = value - 1;
                if (this.allowHalf) {
                    const star = rects[index];
                    const has = (x - star.left) < star.width / 2;
                    value = has ? value - 0.5 : value;
                }
                this.onChange(value, index);
            }
        });
    }
    mounted() {
        const inputValue = this.controlled ? this.value : this.defaultValue;
        this.setValue(inputValue);
        this.onRecalc();
    }
};
__decorate([
    Prop({ type: Number, default: 5 })
], Rater.prototype, "max", void 0);
__decorate([
    Prop({ type: String, default: '' })
], Rater.prototype, "icon", void 0);
__decorate([
    Prop({ type: String, default: '★' })
], Rater.prototype, "star", void 0);
__decorate([
    Prop({ type: Number, default: 0 })
], Rater.prototype, "defaultValue", void 0);
__decorate([
    Prop({ type: Number, default: 0 })
], Rater.prototype, "value", void 0);
__decorate([
    Prop({ type: String, default: '#ffc900' })
], Rater.prototype, "activeColor", void 0);
__decorate([
    Prop({ type: Number, default: 2 })
], Rater.prototype, "margin", void 0);
__decorate([
    Prop({ type: Number, default: 25 })
], Rater.prototype, "fontSize", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Rater.prototype, "disabled", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Rater.prototype, "allowHalf", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Rater.prototype, "allowClear", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Rater.prototype, "allowTouchMove", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Rater.prototype, "controlled", void 0);
__decorate([
    Watch('inputValue'),
    Watch('max'),
    Watch('activeColor')
], Rater.prototype, "onRecalc", null);
__decorate([
    Watch('value')
], Rater.prototype, "onValueChange", null);
__decorate([
    Watch('max')
], Rater.prototype, "onMaxChange", null);
Rater = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-rater',
            },
        },
    })
], Rater);
export default defineComponentHOC()(Rater);
