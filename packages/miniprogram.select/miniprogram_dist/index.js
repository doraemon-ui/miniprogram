/**
 * @doraemon-ui/miniprogram.select.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-05, 15:49:10.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js';
const notFoundContent = {
    icon: '',
    title: '',
    text: '暂无数据',
};
const getNotFoundContent = (v) => {
    if (v !== null && typeof v === 'object')
        return Object.assign({}, notFoundContent, v);
    if (typeof v === 'string')
        return Object.assign({}, notFoundContent, { text: v });
    if (v === null || v === false)
        return null;
    return notFoundContent;
};
const flattenOptions = (options) => {
    const list = [];
    options.forEach((item) => {
        if (typeof item === 'string') {
            list.push({ title: item, value: item });
            return;
        }
        const title = String(item.title ?? item.label ?? item.value ?? '');
        const value = String(item.value ?? item.key ?? title);
        if (Array.isArray(item.options)) {
            list.push({ title, value, isGroup: true });
            item.options.forEach((child) => {
                if (typeof child === 'string') {
                    list.push({ title: child, value: child });
                }
                else {
                    list.push({
                        title: String(child.title ?? child.label ?? child.value ?? ''),
                        value: String(child.value ?? child.key ?? child.title ?? ''),
                    });
                }
            });
            return;
        }
        list.push({ title, value });
    });
    return list;
};
const getSelectIndex = (options, value, multiple) => {
    if (multiple) {
        const values = Array.isArray(value) ? value : [];
        return options
            .map((item, index) => ({ item, index }))
            .filter(({ item }) => !item.isGroup && values.includes(item.value))
            .map(({ index }) => index);
    }
    const target = Array.isArray(value) ? value[0] : value;
    return options.findIndex((item) => !item.isGroup && item.value === target);
};
let Select = class Select extends Doraemon {
    prefixCls;
    value;
    options;
    multiple;
    max;
    notFoundContent;
    virtualized;
    toolbar;
    visible = false;
    selectValue = '';
    selectOptions = [];
    selectMultiple = false;
    selectMax = -1;
    selectNotFoundContent = { ...notFoundContent };
    selectVirtualized = false;
    selectToolbar = { title: '请选择', cancelText: '取消', confirmText: '确定' };
    fns = {};
    open(opts = {}) {
        this.fns = {
            onChange: opts.onChange,
            onConfirm: opts.onConfirm,
            onCancel: opts.onCancel,
        };
        this.selectValue = opts.value ?? this.value;
        this.selectOptions = opts.options ?? this.options;
        this.selectMultiple = opts.multiple ?? this.multiple;
        this.selectMax = opts.max !== undefined ? parseInt(String(opts.max), 10) : this.max;
        this.selectNotFoundContent = getNotFoundContent(opts.notFoundContent ?? this.notFoundContent);
        this.selectVirtualized = opts.virtualized ?? this.virtualized;
        this.selectToolbar = opts.toolbar ?? this.toolbar;
        this.visible = true;
    }
    close(callback) {
        this.visible = false;
        if (typeof callback === 'function')
            callback();
    }
    runCallbacks(method, detail) {
        const mergedOptions = flattenOptions(this.selectOptions);
        const index = getSelectIndex(mergedOptions, detail.value, this.selectMultiple);
        const fn = this.fns[method];
        if (typeof fn === 'function')
            fn.call(this, detail.value, index, mergedOptions);
    }
    onConfirm(e) {
        this.runCallbacks('onConfirm', e.detail);
    }
    onCancel(e) {
        this.runCallbacks('onCancel', e.detail);
    }
    onValueChange(e) {
        this.runCallbacks('onChange', e.detail);
    }
    onVisibleChange(e) {
        this.visible = !!e.detail.visible;
    }
    mounted() {
        this.selectValue = this.value;
        this.selectOptions = this.options;
        this.selectMultiple = this.multiple;
        this.selectMax = this.max;
        this.selectNotFoundContent = getNotFoundContent(this.notFoundContent);
        this.selectVirtualized = this.virtualized;
        this.selectToolbar = this.toolbar;
    }
};
__decorate([
    Prop({ type: [String, Array], default: '' })
], Select.prototype, "value", void 0);
__decorate([
    Prop({ type: Array, default: [] })
], Select.prototype, "options", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Select.prototype, "multiple", void 0);
__decorate([
    Prop({ type: Number, default: -1 })
], Select.prototype, "max", void 0);
__decorate([
    Prop({ type: null, default: { ...notFoundContent } })
], Select.prototype, "notFoundContent", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Select.prototype, "virtualized", void 0);
__decorate([
    Prop({ type: Object, default: { title: '请选择', cancelText: '取消', confirmText: '确定' } })
], Select.prototype, "toolbar", void 0);
Select = __decorate([
    Component({
        expose: ['open', 'close'],
        props: {
            prefixCls: { type: String, default: 'dora-select' },
        },
    })
], Select);
export default defineComponentHOC()(Select);
