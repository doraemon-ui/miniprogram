/**
 * @doraemon-ui/miniprogram.slider.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-05, 17:32:04.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js';
import { getPointsNumber, getTouchPoints, useRect } from '@doraemon-ui/miniprogram.shared';
const { classNames, styleToCssString } = Doraemon.util;
const getPrecision = (step) => {
    const stepString = String(step);
    return stepString.indexOf('.') >= 0 ? stepString.length - stepString.indexOf('.') - 1 : 0;
};
const checkValuePrecision = (val, step, min) => {
    const safeStep = step || 1;
    const closestStep = Math.round((val - min) / safeStep) * safeStep + min;
    const precision = getPrecision(safeStep);
    return parseFloat(closestStep.toFixed(precision));
};
const getStyles = (value) => {
    return Array.isArray(value) ? value.map((n) => styleToCssString(n)) : styleToCssString(value);
};
let Slider = class Slider extends Doraemon {
    prefixCls;
    min;
    max;
    step;
    defaultValue;
    value;
    controlled;
    disabled;
    showMark;
    showValue;
    tipFormatter;
    markStyle;
    handleStyle;
    trackStyle;
    railStyle;
    wrapStyle;
    offsets = [];
    inputValue = [];
    extMarkStyle = '';
    extHandleStyle = '';
    extTrackStyle = '';
    extRailStyle = '';
    extWrapStyle = '';
    marks = [];
    isTouched = false;
    isMoved = false;
    last = 0;
    startX = 0;
    moveX = 0;
    startPos = 0;
    movedLocal = false;
    get classes() {
        const { prefixCls, disabled, tipFormatter } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--disabled`]: disabled,
            [`${prefixCls}--has-tip`]: !!tipFormatter,
        });
        return {
            wrap,
            min: `${prefixCls}__min`,
            railWrap: `${prefixCls}__rail-wrap`,
            rail: `${prefixCls}__rail`,
            mark: `${prefixCls}__mark`,
            track: `${prefixCls}__track`,
            handle: `${prefixCls}__handle`,
            max: `${prefixCls}__max`,
        };
    }
    get showMin() {
        if (typeof this.showValue === 'object' && this.showValue)
            return !!this.showValue.min;
        return !!this.showValue;
    }
    get showMax() {
        if (typeof this.showValue === 'object' && this.showValue)
            return !!this.showValue.max;
        return !!this.showValue;
    }
    onValuePropChange(v) {
        if (this.controlled)
            this.updated(v);
    }
    onMarkStyleChange(v) {
        this.extMarkStyle = getStyles(v);
    }
    onHandleStyleChange(v) {
        this.extHandleStyle = getStyles(v);
    }
    onTrackStyleChange(v) {
        this.extTrackStyle = getStyles(v);
    }
    onRailStyleChange(v) {
        this.extRailStyle = styleToCssString(v);
    }
    onWrapStyleChange(v) {
        this.extWrapStyle = styleToCssString(v);
    }
    onMarkDepsChange() {
        this.getMarks();
        this.offsets = this.inputValue.map((n) => this.calcOffset(this.checkValue(n)));
    }
    updated(inputValue = []) {
        this.inputValue = [...inputValue];
        this.offsets = this.inputValue.map((n) => this.calcOffset(this.checkValue(n)));
    }
    onTouchStart(e) {
        if (this.disabled || getPointsNumber(e) > 1)
            return;
        const { index } = e.currentTarget.dataset;
        this.movedLocal = false;
        this.startX = getTouchPoints(e).x;
        this.moveX = 0;
        this.startPos = this.offsets[index] || 0;
        this.last = index;
        this.isTouched = true;
        this.isMoved = false;
    }
    onTouchMove(e) {
        if (this.disabled || getPointsNumber(e) > 1)
            return;
        const { index } = e.currentTarget.dataset;
        this.movedLocal = true;
        this.isMoved = true;
        this.moveX = getTouchPoints(e).x;
        useRect(`.${this.prefixCls}__rail`, this._renderProxy).then((rect) => {
            if (!rect || !this.movedLocal)
                return;
            const diffX = ((this.moveX - this.startX) / rect.width) * 100;
            const nextOffsets = [...this.offsets];
            const offset = this.checkValue(this.startPos + diffX, 0, 100);
            const currentValue = this.calcValue(offset);
            const prevValue = this.inputValue[index - 1];
            const nextValue = this.inputValue[index + 1];
            nextOffsets[index] = this.calcOffset(currentValue);
            if (index > 0 && prevValue > currentValue)
                nextOffsets[index] = this.calcOffset(prevValue);
            if (index < this.inputValue.length - 1 && nextValue < currentValue)
                nextOffsets[index] = this.calcOffset(nextValue);
            if (this.inputValue[index] !== currentValue) {
                const value = this.getValue(nextOffsets);
                if (!this.controlled)
                    this.updated(value);
                this.$emit('change', { offsets: nextOffsets, value });
            }
        });
    }
    onTouchEnd(e) {
        if (this.disabled || getPointsNumber(e) > 1 || !this.movedLocal)
            return;
        this.movedLocal = false;
        this.isTouched = false;
        this.isMoved = false;
        const value = this.getValue(this.offsets);
        this.$emit('afterChange', { offsets: this.offsets, value });
    }
    calcValue(ratio) {
        return this.trimValue((ratio * (this.max - this.min)) / 100 + this.min);
    }
    calcOffset(value) {
        const ratio = (value - this.min) / (this.max - this.min || 1);
        return ratio * 100;
    }
    checkValue(val, min = this.min, max = this.max) {
        if (val <= min)
            return min;
        if (val >= max)
            return max;
        return val;
    }
    trimValue(val) {
        return checkValuePrecision(this.checkValue(val), this.step, this.min);
    }
    getValue(offsets = this.offsets) {
        return offsets.map((offset) => this.calcValue(offset));
    }
    getMarks() {
        if (!this.showMark) {
            this.marks = [];
            return;
        }
        const count = (this.max - this.min) / (this.step || 1);
        const marks = [];
        const offset = (100 * (this.step || 1)) / (this.max - this.min || 1);
        for (let i = 1; i < count; i++)
            marks.push(i * offset);
        this.marks = marks;
    }
    formatTip(value) {
        return (this.tipFormatter || '').replace(/\{d\}/g, `${value}`);
    }
    getTrackStyle(index) {
        if (this.inputValue.length <= 1)
            return `width: ${this.offsets[index] || 0}%`;
        return `left: ${this.offsets[index] || 0}%; width: ${(this.offsets[index + 1] || 0) - (this.offsets[index] || 0)}%`;
    }
    getIndexedStyle(style, index) {
        return Array.isArray(style) ? (style[index] || '') : (style || '');
    }
    getMarkStyle(index) {
        return this.getIndexedStyle(this.extMarkStyle, index);
    }
    getTrackItemStyle(index) {
        return this.getIndexedStyle(this.extTrackStyle, index);
    }
    getHandleStyle(index) {
        return this.getIndexedStyle(this.extHandleStyle, index);
    }
    getValueByPosition(position) {
        const newPosition = position < this.min ? this.min : position > this.max ? this.max : position;
        const lengthPerStep = 100 / ((this.max - this.min) / (this.step || 1));
        const steps = Math.round(newPosition / lengthPerStep);
        return steps * lengthPerStep * (this.max - this.min) * 0.01 + this.min;
    }
    onRailClick(e) {
        if (this.disabled || getPointsNumber(e) > 1)
            return;
        useRect(`.${this.prefixCls}__rail-wrap`, this._renderProxy).then((rect) => {
            const position = ((getTouchPoints(e).x - rect.left) / Math.ceil(rect.width)) * (this.max - this.min) + this.min;
            const targetValue = this.getValueByPosition(position);
            const indexLength = this.inputValue.length - 1;
            const range = indexLength > 0;
            const nextOffsets = [...this.offsets];
            let nextSliderValue = [...this.inputValue];
            let currentIndex = 0;
            if (range) {
                let prevIndex = 0;
                let nextIndex = null;
                for (let i = indexLength; i >= 0; i--) {
                    if (this.inputValue[i] <= targetValue) {
                        prevIndex = i;
                        break;
                    }
                }
                if (prevIndex === indexLength) {
                    nextIndex = prevIndex;
                    prevIndex = nextIndex - 1;
                }
                else {
                    nextIndex = prevIndex + 1;
                }
                if (Math.abs(targetValue - this.inputValue[prevIndex]) > Math.abs(targetValue - this.inputValue[nextIndex])) {
                    currentIndex = nextIndex;
                    nextSliderValue[nextIndex] = targetValue;
                }
                else {
                    currentIndex = prevIndex;
                    nextSliderValue[prevIndex] = targetValue;
                }
            }
            else {
                nextSliderValue = [targetValue];
            }
            nextOffsets[currentIndex] = this.calcOffset(targetValue);
            if (this.inputValue[currentIndex] !== targetValue) {
                if (!this.controlled)
                    this.updated(nextSliderValue);
                this.$emit('change', { offsets: nextOffsets, value: nextSliderValue });
                this.$emit('afterChange', { offsets: nextOffsets, value: nextSliderValue });
            }
        });
    }
    noop() { }
    mounted() {
        const inputValue = this.controlled ? this.value : this.defaultValue;
        this.getMarks();
        this.updated(inputValue);
        this.onMarkStyleChange(this.markStyle);
        this.onHandleStyleChange(this.handleStyle);
        this.onTrackStyleChange(this.trackStyle);
        this.onRailStyleChange(this.railStyle);
        this.onWrapStyleChange(this.wrapStyle);
    }
};
__decorate([
    Prop({ type: Number, default: 0 })
], Slider.prototype, "min", void 0);
__decorate([
    Prop({ type: Number, default: 100 })
], Slider.prototype, "max", void 0);
__decorate([
    Prop({ type: Number, default: 1 })
], Slider.prototype, "step", void 0);
__decorate([
    Prop({ type: Array, default: [0] })
], Slider.prototype, "defaultValue", void 0);
__decorate([
    Prop({ type: Array, default: [0] })
], Slider.prototype, "value", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Slider.prototype, "controlled", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Slider.prototype, "disabled", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Slider.prototype, "showMark", void 0);
__decorate([
    Prop({ type: null, default: false })
], Slider.prototype, "showValue", void 0);
__decorate([
    Prop({ type: String, default: '{d}' })
], Slider.prototype, "tipFormatter", void 0);
__decorate([
    Prop({ type: null, default: '' })
], Slider.prototype, "markStyle", void 0);
__decorate([
    Prop({ type: null, default: '' })
], Slider.prototype, "handleStyle", void 0);
__decorate([
    Prop({ type: null, default: '' })
], Slider.prototype, "trackStyle", void 0);
__decorate([
    Prop({ type: null, default: '' })
], Slider.prototype, "railStyle", void 0);
__decorate([
    Prop({ type: null, default: '' })
], Slider.prototype, "wrapStyle", void 0);
__decorate([
    Watch('value')
], Slider.prototype, "onValuePropChange", null);
__decorate([
    Watch('markStyle')
], Slider.prototype, "onMarkStyleChange", null);
__decorate([
    Watch('handleStyle')
], Slider.prototype, "onHandleStyleChange", null);
__decorate([
    Watch('trackStyle')
], Slider.prototype, "onTrackStyleChange", null);
__decorate([
    Watch('railStyle')
], Slider.prototype, "onRailStyleChange", null);
__decorate([
    Watch('wrapStyle')
], Slider.prototype, "onWrapStyleChange", null);
__decorate([
    Watch('min'),
    Watch('max'),
    Watch('step')
], Slider.prototype, "onMarkDepsChange", null);
Slider = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-slider',
            },
        },
    })
], Slider);
export default defineComponentHOC()(Slider);
