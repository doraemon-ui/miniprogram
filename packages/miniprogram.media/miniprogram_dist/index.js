/**
 * @doraemon-ui/miniprogram.media.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-04, 22:59:10.
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
let Media = class Media extends Doraemon {
    prefixCls;
    thumb;
    thumbStyle;
    title;
    label;
    align;
    extStyle = '';
    get classes() {
        const { prefixCls, align } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--align-${align}`]: align,
        });
        return {
            wrap,
            hd: `${prefixCls}__hd`,
            thumb: `${prefixCls}__thumb`,
            bd: `${prefixCls}__bd`,
            title: `${prefixCls}__title`,
            desc: `${prefixCls}__desc`,
        };
    }
    onThumbStyleChange(value) {
        this.extStyle = styleToCssString(value || '');
    }
    mounted() {
        this.onThumbStyleChange(this.thumbStyle);
    }
};
__decorate([
    Prop({
        type: String,
        default: '',
    })
], Media.prototype, "thumb", void 0);
__decorate([
    Prop({
        type: [String, Object],
        default: '',
    })
], Media.prototype, "thumbStyle", void 0);
__decorate([
    Prop({
        type: String,
        default: '',
    })
], Media.prototype, "title", void 0);
__decorate([
    Prop({
        type: String,
        default: '',
    })
], Media.prototype, "label", void 0);
__decorate([
    Prop({
        type: String,
        default: 'center',
    })
], Media.prototype, "align", void 0);
__decorate([
    Watch('thumbStyle')
], Media.prototype, "onThumbStyleChange", null);
Media = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-media',
            },
        },
    })
], Media);
export default defineComponentHOC()(Media);
