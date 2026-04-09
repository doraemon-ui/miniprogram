/**
 * @doraemon-ui/miniprogram.field.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-05, 00:28:07.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js';
import { useRect } from '@doraemon-ui/miniprogram.shared';
const { classNames } = Doraemon.util;
const defaultContext = {
    layout: 'horizontal',
    requiredMarkStyle: 'asterisk',
    asteriskText: '*',
    requiredText: '必填',
    optionalText: '选填',
    disabled: false,
    readOnly: false,
};
let Field = class Field extends Doraemon {
    prefixCls;
    label;
    labelWrap;
    extra;
    help;
    childElementPosition;
    isLink;
    align;
    disabled;
    readOnly;
    hidden;
    required;
    feedbackMessage;
    hasFeedback;
    index;
    isLast;
    context = defaultContext;
    popoverVisible = false;
    slotRect = null;
    relativeRect = null;
    get mergedRequired() {
        return this.required;
    }
    get validateClasses() {
        return this.hasFeedback && this.feedbackMessage?.length ? 'invalid' : '';
    }
    get classes() {
        const { prefixCls, childElementPosition, labelWrap } = this;
        return {
            wrap: classNames(prefixCls),
            child: classNames(`${prefixCls}__child`, {
                [`${prefixCls}__child--position-${childElementPosition}`]: childElementPosition,
            }),
            label: classNames(`${prefixCls}__label`, {
                [`${prefixCls}__label--wrap`]: labelWrap,
            }),
            extra: `${prefixCls}__extra`,
            arrow: `${prefixCls}__arrow`,
            asterisk: `${prefixCls}__required-asterisk`,
            text: `${prefixCls}__required-text`,
            feedback: `${prefixCls}__feedback-message`,
            labelHelp: `${prefixCls}__label-help`,
        };
    }
    onHelpChange() {
        if (!this.help && this.popoverVisible) {
            this.popoverVisible = false;
        }
    }
    setPopoverVisible() {
        const popoverVisible = !this.popoverVisible;
        const promise = popoverVisible ? this.getPopoverRects() : Promise.resolve([null, null]);
        promise.then(([slotRect, relativeRect]) => {
            this.slotRect = slotRect;
            this.relativeRect = relativeRect;
            this.popoverVisible = popoverVisible;
        });
    }
    getPopoverRects() {
        const getSlotRect = () => useRect(`.${this.prefixCls}__label-help`, this._renderProxy)
            .then((rect) => rect || null);
        const getRelativeRect = () => useRect('#dora-field-wrap', this._renderProxy)
            .then((rect) => rect || null);
        return Promise.all([getSlotRect(), getRelativeRect()]);
    }
    onPopoverChange(e) {
        if (this.popoverVisible !== e.detail.visible) {
            this.popoverVisible = e.detail.visible;
        }
    }
};
__decorate([
    Prop({
        type: String,
        default: '',
    })
], Field.prototype, "label", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: false,
    })
], Field.prototype, "labelWrap", void 0);
__decorate([
    Prop({
        type: String,
        default: '',
    })
], Field.prototype, "extra", void 0);
__decorate([
    Prop({
        type: String,
        default: '',
    })
], Field.prototype, "help", void 0);
__decorate([
    Prop({
        type: String,
        default: 'none',
    })
], Field.prototype, "childElementPosition", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: false,
    })
], Field.prototype, "isLink", void 0);
__decorate([
    Prop({
        type: String,
        default: 'flex-start',
    })
], Field.prototype, "align", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: false,
    })
], Field.prototype, "disabled", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: false,
    })
], Field.prototype, "readOnly", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: false,
    })
], Field.prototype, "hidden", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: false,
    })
], Field.prototype, "required", void 0);
__decorate([
    Prop({
        type: Array,
        default: [],
    })
], Field.prototype, "feedbackMessage", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: false,
    })
], Field.prototype, "hasFeedback", void 0);
__decorate([
    Prop({
        type: Number,
        default: 0,
    })
], Field.prototype, "index", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: false,
    })
], Field.prototype, "isLast", void 0);
__decorate([
    Watch('help')
], Field.prototype, "onHelpChange", null);
Field = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-field',
            },
        },
    })
], Field);
export default defineComponentHOC()(Field);
