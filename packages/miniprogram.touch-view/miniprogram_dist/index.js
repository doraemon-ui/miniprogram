/**
 * @doraemon-ui/miniprogram.touch-view.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-05, 17:42:17.
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
let TouchView = class TouchView extends Doraemon {
    prefixCls;
    hoverClass;
    hoverStopPropagation;
    hoverStartTime;
    hoverStayTime;
    wrapStyle;
    extStyle = '';
    get classes() {
        const { prefixCls, hoverClass } = this;
        const wrap = classNames(prefixCls);
        const hover = hoverClass && hoverClass !== 'default' ? hoverClass : `${prefixCls}--hover`;
        return {
            wrap,
            hover,
        };
    }
    onWrapStyleChange(v) {
        this.extStyle = styleToCssString(v);
    }
    onClick() {
        this.$emit('click');
    }
    mounted() {
        this.onWrapStyleChange(this.wrapStyle);
    }
};
__decorate([
    Prop({ type: String, default: 'none' })
], TouchView.prototype, "hoverClass", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], TouchView.prototype, "hoverStopPropagation", void 0);
__decorate([
    Prop({ type: Number, default: 20 })
], TouchView.prototype, "hoverStartTime", void 0);
__decorate([
    Prop({ type: Number, default: 70 })
], TouchView.prototype, "hoverStayTime", void 0);
__decorate([
    Prop({ type: null, default: '' })
], TouchView.prototype, "wrapStyle", void 0);
__decorate([
    Watch('wrapStyle')
], TouchView.prototype, "onWrapStyleChange", null);
TouchView = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-touch-view',
            },
        },
    })
], TouchView);
export default defineComponentHOC()(TouchView);
