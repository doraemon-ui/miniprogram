/**
 * @doraemon-ui/miniprogram.wing-blank.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-06, 05:46:59.
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
let WingBlank = class WingBlank extends Doraemon {
    prefixCls;
    size;
    bodyStyle;
    extStyle = '';
    onBodyStyleChange(v) {
        this.extStyle = styleToCssString(v);
    }
    get classes() {
        const { prefixCls, size } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--${size}`]: !!size,
        });
        return { wrap };
    }
    mounted() {
        this.onBodyStyleChange(this.bodyStyle);
    }
};
__decorate([
    Prop({ type: String, default: 'default' })
], WingBlank.prototype, "size", void 0);
__decorate([
    Prop({ type: null, default: '' })
], WingBlank.prototype, "bodyStyle", void 0);
__decorate([
    Watch('bodyStyle')
], WingBlank.prototype, "onBodyStyleChange", null);
WingBlank = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-wing-blank',
            },
        },
    })
], WingBlank);
export default defineComponentHOC()(WingBlank);
