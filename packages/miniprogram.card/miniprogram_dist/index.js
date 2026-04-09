/**
 * @doraemon-ui/miniprogram.card.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-02-26, 00:13:35.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js';
const { classNames, styleToCssString } = Doraemon.util;
let Card = class Card extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Card
     */
    prefixCls;
    hoverClass;
    bordered;
    full;
    title;
    thumb;
    thumbStyle;
    extra;
    actions;
    disabled = false;
    extStyle = '';
    get classes() {
        const { prefixCls, hoverClass, bordered, full, actions } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--bordered`]: bordered,
            [`${prefixCls}--full`]: full,
            [`${prefixCls}--has-actions`]: actions.length > 0,
        });
        const hd = `${prefixCls}__hd`;
        const content = `${prefixCls}__content`;
        const thumb = `${prefixCls}__thumb`;
        const extra = `${prefixCls}__extra`;
        const bd = `${prefixCls}__bd`;
        const ft = `${prefixCls}__ft`;
        const actionsCls = `${prefixCls}__actions`;
        const action = actions.map((a) => {
            const type = a.type || 'default';
            const wrap = classNames(`${prefixCls}__action`, {
                [`${prefixCls}__action--${type}`]: true,
                [`${prefixCls}__action--bold`]: !!a.bold,
                [`${prefixCls}__action--disabled`]: !!a.disabled,
                [`${a.className}`]: !!a.className,
            });
            const hover = a.hoverClass && a.hoverClass !== 'default' ? a.hoverClass : `${prefixCls}__action--hover`;
            return { wrap, hover };
        });
        const hover = hoverClass && hoverClass !== 'default' ? hoverClass : `${prefixCls}--hover`;
        return {
            wrap,
            hover,
            hd,
            content,
            thumb,
            extra,
            bd,
            ft,
            actions: actionsCls,
            action,
        };
    }
    updateThumbStyle(newVal) {
        this.extStyle = styleToCssString(newVal);
    }
    onThumbStyleChange(newVal) {
        this.updateThumbStyle(newVal);
    }
    onAction(e) {
        const dataset = e.currentTarget.dataset;
        const index = dataset.index;
        const actions = this.actions || [];
        const action = actions[index];
        if (action && !action.disabled) {
            this.$emit('action', { index, action, actions });
        }
    }
    mounted() {
        this.updateThumbStyle(this.thumbStyle);
    }
};
__decorate([
    Prop({ type: String, default: 'none' })
], Card.prototype, "hoverClass", void 0);
__decorate([
    Prop({ type: Boolean, default: true })
], Card.prototype, "bordered", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Card.prototype, "full", void 0);
__decorate([
    Prop({ type: String, default: '' })
], Card.prototype, "title", void 0);
__decorate([
    Prop({ type: String, default: '' })
], Card.prototype, "thumb", void 0);
__decorate([
    Prop({ type: null, default: '' })
], Card.prototype, "thumbStyle", void 0);
__decorate([
    Prop({ type: String, default: '' })
], Card.prototype, "extra", void 0);
__decorate([
    Prop({ type: Array, default: () => [] })
], Card.prototype, "actions", void 0);
__decorate([
    Watch('thumbStyle')
], Card.prototype, "onThumbStyleChange", null);
Card = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-card',
            },
            hoverClass: {
                type: String,
                default: 'none',
            },
            bordered: {
                type: Boolean,
                default: true,
            },
            full: {
                type: Boolean,
                default: false,
            },
            title: {
                type: String,
                default: '',
            },
            thumb: {
                type: String,
                default: '',
            },
            thumbStyle: {
                type: null,
                default: '',
            },
            extra: {
                type: String,
                default: '',
            },
            actions: {
                type: Array,
                default: () => [],
            },
        },
    })
], Card);
export default defineComponentHOC()(Card);
