/**
 * @doraemon-ui/miniprogram.tag.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:41:19.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { Doraemon, Prop, Watch, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames, styleToCssString } = Doraemon.util;
const isPresetColor = (color)=>/^(pink|red|yellow|orange|cyan|green|blue|purple|geekblue|magenta|volcano|gold|lime)(-inverse)?$/.test(color);
let Tag = class Tag extends Doraemon {
    get classes() {
        const p = this.prefixCls;
        const hover = this.hoverClass && this.hoverClass !== 'default' ? this.hoverClass : `${p}--hover`;
        return {
            wrap: classNames(p),
            icon: `${p}__icon`,
            hover
        };
    }
    onVisibleChange(v) {
        if (this.controlled) this.updated(v);
    }
    onColorChange(c) {
        this.updateStyle(c);
    }
    updated(tagVisible) {
        if (this.tagVisible !== tagVisible) this.tagVisible = tagVisible;
    }
    updateStyle(color) {
        const isPreset = isPresetColor(color);
        this.className = isPreset ? `${this.prefixCls}--${color}` : '';
        this.tagStyle = !isPreset && color ? styleToCssString({
            backgroundColor: color,
            color: '#fff'
        }) : '';
    }
    onChange(tagVisible) {
        if (!this.controlled) this.updated(tagVisible);
        this.$emit('change', {
            value: tagVisible
        });
    }
    onClick() {
        this.$emit('click');
    }
    onClose() {
        if (this.closable) {
            this.$emit('close');
            this.onChange(false);
        }
    }
    mounted() {
        this.updated(this.controlled ? this.visible : this.defaultVisible);
        this.updateStyle(this.color);
    }
    constructor(...args){
        super(...args);
        this.className = '';
        this.tagStyle = '';
        this.tagVisible = true;
    }
};
_ts_decorate([
    Prop({
        type: String,
        default: 'default'
    })
], Tag.prototype, "hoverClass", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Tag.prototype, "color", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Tag.prototype, "closable", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: true
    })
], Tag.prototype, "defaultVisible", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: true
    })
], Tag.prototype, "visible", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Tag.prototype, "controlled", void 0);
_ts_decorate([
    Watch('visible')
], Tag.prototype, "onVisibleChange", null);
_ts_decorate([
    Watch('color')
], Tag.prototype, "onColorChange", null);
Tag = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-tag'
            }
        }
    })
], Tag);
var index = defineComponentHOC()(Tag);

export { Tag, index as default };
