/**
 * @doraemon-ui/miniprogram.search-bar.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:40:34.
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
let SearchBar = class SearchBar extends Doraemon {
    get classes() {
        const { prefixCls, disabled, inputFocus } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--focus`]: inputFocus,
            [`${prefixCls}--disabled`]: disabled
        });
        return {
            wrap,
            form: `${prefixCls}__form`,
            box: `${prefixCls}__box`,
            search: `${prefixCls}__search`,
            control: `${prefixCls}__control`,
            input: `${prefixCls}__input`,
            clear: `${prefixCls}__clear`,
            label: `${prefixCls}__label`,
            icon: `${prefixCls}__icon`,
            text: `${prefixCls}__text`,
            cancel: `${prefixCls}__cancel`
        };
    }
    onValueChange(v) {
        if (this.controlled) this.updated(v);
    }
    onPlaceholderStyleChange(v) {
        this.extStyle = styleToCssString(v || '');
    }
    onFocusPropChange(v) {
        this.inputFocus = !!v;
    }
    onClearDepsChange() {
        this.setClear();
    }
    onDisabledChange() {
        this.setClear();
    }
    onInputValueChange() {
        this.setClear();
    }
    onInputFocusChange() {
        this.setClear();
    }
    onOnlyShowClearWhenFocusChange() {
        this.setClear();
    }
    setClear() {
        const shouldShowClear = (()=>{
            if (!this.clear || !this.inputValue || this.disabled) return false;
            if (this.onlyShowClearWhenFocus) return this.inputFocus;
            return true;
        })();
        if (this.shouldShowClear !== shouldShowClear) {
            this.shouldShowClear = shouldShowClear;
        }
    }
    updated(inputValue) {
        if (this.inputValue !== inputValue) this.inputValue = inputValue;
    }
    onChange(e) {
        if (!this.controlled) this.updated(e.detail.value);
        if (!this.inputFocus) this.inputFocus = true;
        this.$emit('change', e.detail);
    }
    onFocus(e) {
        this.inputFocus = true;
        this.$emit('focus', e.detail);
    }
    onBlur(e) {
        this.inputFocus = false;
        this.$emit('blur', e.detail);
    }
    onConfirm(e) {
        this.$emit('confirm', e.detail);
    }
    onClear() {
        const inputValue = this.controlled ? this.inputValue : '';
        this.inputValue = inputValue;
        this.inputFocus = true;
        this.$emit('clear', {
            value: ''
        });
    }
    onCancel() {
        this.$emit('cancel', {
            value: this.inputValue
        });
    }
    onClick() {
        if (this.disabled) return;
        this.inputFocus = true;
    }
    mounted() {
        const inputValue = this.controlled ? this.value : this.defaultValue;
        this.updated(inputValue);
        this.setClear();
        this.onPlaceholderStyleChange(this.placeholderStyle);
        this.onFocusPropChange(this.focus);
    }
    constructor(...args){
        super(...args);
        this.inputValue = '';
        this.inputFocus = false;
        this.shouldShowClear = false;
        this.extStyle = '';
    }
};
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], SearchBar.prototype, "defaultValue", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], SearchBar.prototype, "value", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: '搜索'
    })
], SearchBar.prototype, "placeholder", void 0);
_ts_decorate([
    Prop({
        type: null,
        default: ''
    })
], SearchBar.prototype, "placeholderStyle", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'input-placeholder'
    })
], SearchBar.prototype, "placeholderClass", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], SearchBar.prototype, "disabled", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 140
    })
], SearchBar.prototype, "maxlength", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 11
    })
], SearchBar.prototype, "cursorSpacing", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], SearchBar.prototype, "focus", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'search'
    })
], SearchBar.prototype, "confirmType", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], SearchBar.prototype, "confirmHold", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: -1
    })
], SearchBar.prototype, "cursor", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: -1
    })
], SearchBar.prototype, "selectionStart", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: -1
    })
], SearchBar.prototype, "selectionEnd", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: true
    })
], SearchBar.prototype, "adjustPosition", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], SearchBar.prototype, "clear", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: '取消'
    })
], SearchBar.prototype, "cancelText", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], SearchBar.prototype, "showCancel", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], SearchBar.prototype, "controlled", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: true
    })
], SearchBar.prototype, "onlyShowClearWhenFocus", void 0);
_ts_decorate([
    Watch('value')
], SearchBar.prototype, "onValueChange", null);
_ts_decorate([
    Watch('placeholderStyle')
], SearchBar.prototype, "onPlaceholderStyleChange", null);
_ts_decorate([
    Watch('focus')
], SearchBar.prototype, "onFocusPropChange", null);
_ts_decorate([
    Watch('clear')
], SearchBar.prototype, "onClearDepsChange", null);
_ts_decorate([
    Watch('disabled')
], SearchBar.prototype, "onDisabledChange", null);
_ts_decorate([
    Watch('inputValue')
], SearchBar.prototype, "onInputValueChange", null);
_ts_decorate([
    Watch('inputFocus')
], SearchBar.prototype, "onInputFocusChange", null);
_ts_decorate([
    Watch('onlyShowClearWhenFocus')
], SearchBar.prototype, "onOnlyShowClearWhenFocusChange", null);
SearchBar = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-search-bar'
            }
        }
    })
], SearchBar);
var index = defineComponentHOC()(SearchBar);

export { SearchBar, index as default };
