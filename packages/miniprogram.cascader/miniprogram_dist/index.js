/**
 * @doraemon-ui/miniprogram.cascader.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:38:16.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { Doraemon, Prop, Watch, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';
import { findComponentNode } from '@doraemon-ui/miniprogram.shared';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames } = Doraemon.util;
function getDefaultFieldNames() {
    return {
        label: 'label',
        value: 'value',
        children: 'children',
        disabled: 'disabled'
    };
}
let Cascader = class Cascader extends Doraemon {
    get classes() {
        const { prefixCls } = this;
        const wrap = classNames(prefixCls);
        const hd = `${prefixCls}__hd`;
        const bd = `${prefixCls}__bd`;
        const toolbar = `${prefixCls}__toolbar`;
        const inner = `${prefixCls}__inner`;
        const cancel = classNames(`${prefixCls}__button`, {
            [`${prefixCls}__button--cancel`]: true
        });
        const confirm = classNames(`${prefixCls}__button`, {
            [`${prefixCls}__button--confirm`]: true
        });
        const hover = `${prefixCls}__button--hover`;
        const title = `${prefixCls}__title`;
        return {
            wrap,
            hd,
            bd,
            toolbar,
            inner,
            cancel,
            confirm,
            hover,
            title
        };
    }
    onValueChange(newVal) {
        if (this.controlled) {
            this.setActiveValue(newVal);
            this.setInnerValue(newVal);
        }
    }
    onVisibleChange(shouldRender) {
        if (shouldRender) {
            this.setShouldRender(true);
        }
    }
    setShouldRender(shouldRender) {
        if (this.shouldRender !== shouldRender) {
            this.shouldRender = shouldRender;
        }
    }
    setActiveValue(activeValue, forceTrigger = false) {
        if (this.activeValue !== activeValue || forceTrigger) {
            this.activeValue = activeValue;
        }
    }
    setInnerValue(innerValue) {
        if (this.innerValue !== innerValue) {
            this.innerValue = innerValue;
        }
    }
    /**
   * 获取当前选择的值与选项信息
   */ getValue(value = this.activeValue) {
        this.cascaderView = this.cascaderView || findComponentNode('#dora-cascader-view', this._renderProxy);
        return this.cascaderView ? this.cascaderView.getValue(value) : null;
    }
    /**
   * 切换面板的回调
   */ onTabsChange(e) {
        this.$emit('tabsChange', e.detail);
    }
    /**
   * 叶子节点加载的回调
   */ onLoadOptions(e) {
        this.$emit('load', e.detail);
    }
    /**
   * 选项改变时触发
   */ onChange(e) {
        const props = e.detail;
        const innerValue = props?.value || [];
        this.setInnerValue(innerValue);
        if (this.visible) {
            this.$emit('change', props);
        }
    }
    /**
   * 组件关闭时的回调函数
   */ close() {
        this.$emit('close');
    }
    /**
   * 组件关闭时重置其内部数据
   */ onClosed() {
        const innerValue = this.activeValue;
        this.setInnerValue(innerValue);
        this.setShouldRender(false);
    }
    /**
   * 点击确定按钮时的回调函数
   */ onConfirm() {
        const activeValue = this.innerValue;
        if (!this.controlled) {
            this.setActiveValue(activeValue, true);
        }
        const values = this.getValue(activeValue);
        this.$emit('confirm', values ? {
            ...values
        } : {
            value: activeValue,
            options: [],
            done: true
        });
        this.close();
    }
    /**
   * 点击取消按钮时的回调函数
   */ onCancel() {
        const values = this.getValue();
        this.$emit('cancel', values ? {
            ...values
        } : {
            value: this.activeValue,
            options: [],
            done: true
        });
        this.close();
    }
    /**
   * 阻止移动触摸
   */ noop() {}
    mounted() {
        const activeValue = this.controlled ? this.value : this.defaultValue;
        this.setActiveValue(activeValue);
        this.setInnerValue(activeValue);
        this.setShouldRender(this.visible);
    }
    constructor(...args){
        super(...args);
        this.shouldRender = false;
        this.innerValue = [];
        this.activeValue = [];
        this.cascaderView = null;
    }
};
_ts_decorate([
    Prop({
        type: Array,
        default: ()=>[]
    })
], Cascader.prototype, "defaultValue", void 0);
_ts_decorate([
    Prop({
        type: Array,
        default: ()=>[]
    })
], Cascader.prototype, "value", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Cascader.prototype, "controlled", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Cascader.prototype, "title", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: '取消'
    })
], Cascader.prototype, "cancelText", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: '确定'
    })
], Cascader.prototype, "confirmText", void 0);
_ts_decorate([
    Prop({
        type: Array,
        default: ()=>[]
    })
], Cascader.prototype, "options", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Cascader.prototype, "full", void 0);
_ts_decorate([
    Prop({
        type: null,
        default: 'auto'
    })
], Cascader.prototype, "height", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: '请选择'
    })
], Cascader.prototype, "chooseTitle", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Cascader.prototype, "visible", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Cascader.prototype, "skipAnimation", void 0);
_ts_decorate([
    Prop({
        type: Object,
        default: ()=>getDefaultFieldNames()
    })
], Cascader.prototype, "defaultFieldNames", void 0);
_ts_decorate([
    Watch('value')
], Cascader.prototype, "onValueChange", null);
_ts_decorate([
    Watch('visible')
], Cascader.prototype, "onVisibleChange", null);
Cascader = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-cascader'
            },
            defaultValue: {
                type: Array,
                default: ()=>[]
            },
            value: {
                type: Array,
                default: ()=>[]
            },
            controlled: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: ''
            },
            cancelText: {
                type: String,
                default: '取消'
            },
            confirmText: {
                type: String,
                default: '确定'
            },
            options: {
                type: Array,
                default: ()=>[]
            },
            full: {
                type: Boolean,
                default: false
            },
            height: {
                type: null,
                default: 'auto'
            },
            chooseTitle: {
                type: String,
                default: '请选择'
            },
            visible: {
                type: Boolean,
                default: false
            },
            skipAnimation: {
                type: Boolean,
                default: false
            },
            defaultFieldNames: {
                type: Object,
                default: ()=>getDefaultFieldNames()
            }
        },
        expose: [
            'getValue',
            'close'
        ]
    })
], Cascader);
var index = defineComponentHOC({
    externalClasses: [
        'dora-scroll-view-class'
    ]
})(Cascader);

export { Cascader, index as default, getDefaultFieldNames };
