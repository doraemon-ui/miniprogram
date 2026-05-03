/**
 * @doraemon-ui/miniprogram.radio.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:40:21.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { Prop, Watch, Component, defineComponentHOC, Doraemon } from '@doraemon-ui/miniprogram.core-js';
import { useRect } from '@doraemon-ui/miniprogram.shared';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function normalizeOptions(options) {
    return (options || []).map((option, index)=>{
        if (typeof option === 'string') {
            return {
                index,
                __comp_unique_key: option,
                title: option,
                value: option
            };
        }
        const title = option.title != null ? option.title : '';
        const value = option.value != null ? option.value : '';
        return {
            ...option,
            index,
            __comp_unique_key: option.value !== undefined ? option.value : index,
            title,
            value
        };
    });
}
let RadioGroup = class RadioGroup extends Doraemon {
    onValueChange(newVal) {
        if (this.hasFieldDecorator) return;
        this.updated(newVal);
        this.changeValue({
            value: newVal
        });
    }
    onOptionsChange() {
        this.showOptions = normalizeOptions(this.options);
        this.changeValue();
    }
    onContextChange() {
        this.changeValue();
    }
    onChildrenChanged() {
        this.changeValue();
    }
    updated(inputValue) {
        if (this.inputValue !== inputValue) {
            this.inputValue = inputValue;
        }
    }
    changeValue(props = {}) {
        const { disabled, readOnly, hasLine, withListComponent, iconPosition, iconSize, iconOn, iconOff, prefixCls } = this;
        const value = props.value != null ? props.value : this.inputValue;
        const showOptions = this.showOptions;
        const setChildrenValues = (children)=>{
            const keys = [];
            if (children && children.length > 0) {
                const lastIndex = children.length - 1;
                children.forEach((child, index)=>{
                    const active = value === child.value;
                    const isLast = index === lastIndex;
                    const useDefaultSize = iconSize === '';
                    const useDefaultIcon = iconOn === '' && iconOff === '';
                    child.changeValue(active, index, isLast, {
                        disabled,
                        readOnly,
                        hasLine,
                        hasFieldDecorator: !!this.hasFieldDecorator,
                        withListComponent,
                        iconPosition,
                        iconSize: withListComponent ? iconSize : useDefaultSize ? '23' : iconSize,
                        iconOn: withListComponent ? iconOn : useDefaultIcon ? 'success' : iconOn,
                        iconOff: withListComponent ? iconOff || iconOn : useDefaultIcon ? 'circle' : iconOff
                    });
                    keys.push({
                        title: child.title,
                        value: child.value
                    });
                });
            }
            this.keys = keys;
        };
        Doraemon.nextTick(()=>{
            const proxy = this._renderProxy;
            const selectedNodes = typeof proxy.selectAllComponents === 'function' ? proxy.selectAllComponents(showOptions.length > 0 ? `.${prefixCls}__radio` : 'dora-radio') : [];
            const relationNodes = proxy.getRelationNodes('./index');
            const rawNodes = (selectedNodes && selectedNodes.length > 0 ? selectedNodes : relationNodes) || [];
            const children = rawNodes.map((node)=>node.$component ? node.$component : node).filter((node)=>{
                const child = node;
                return typeof child.changeValue === 'function' && typeof child.value === 'string' && typeof child.title === 'string';
            });
            setChildrenValues(children);
        });
    }
    onChange(item) {
        this.$emit('change', {
            ...item,
            ...this.getValue(item.value),
            name: this.name,
            value: item.value
        });
    }
    onRadioChange(e) {
        const dataset = e.currentTarget.dataset;
        const index = typeof dataset?.index === 'number' ? dataset.index : e.detail?.index != null ? e.detail.index : -1;
        this.onChange({
            ...e.detail,
            index
        });
    }
    getValue(value = this.inputValue, cols = this.keys) {
        const newValue = value ? [
            value
        ] : [];
        const checkedValues = cols.filter((option)=>newValue.includes(option.value));
        const displayValue = checkedValues.map((option)=>option.title) || [];
        const allValues = cols.map((option)=>option.value);
        const selectedIndex = newValue.map((n)=>allValues.indexOf(n));
        return {
            value,
            displayValue: displayValue[0] != null ? displayValue[0] : '',
            selectedIndex: selectedIndex[0] != null ? selectedIndex[0] : -1,
            selectedValue: value,
            cols
        };
    }
    getBoundingClientRect() {
        return useRect(`.${this.prefixCls}`, this._renderProxy);
    }
    mounted() {
        this.updated(this.value);
        this.showOptions = normalizeOptions(this.options);
        this.changeValue();
    }
    constructor(...args){
        super(...args);
        this.hasFieldDecorator = false;
        this.inputValue = '';
        this.keys = [];
        this.showOptions = [];
    }
};
_ts_decorate([
    Prop({
        type: String,
        default: 'dora-list'
    })
], RadioGroup.prototype, "cellGroupPrefixCls", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], RadioGroup.prototype, "value", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], RadioGroup.prototype, "name", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], RadioGroup.prototype, "title", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], RadioGroup.prototype, "label", void 0);
_ts_decorate([
    Prop({
        type: Array,
        default: ()=>[]
    })
], RadioGroup.prototype, "options", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], RadioGroup.prototype, "disabled", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], RadioGroup.prototype, "readOnly", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'default'
    })
], RadioGroup.prototype, "mode", void 0);
_ts_decorate([
    Prop({
        type: null,
        default: ''
    })
], RadioGroup.prototype, "bodyStyle", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: true
    })
], RadioGroup.prototype, "hasLine", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: true
    })
], RadioGroup.prototype, "withListComponent", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'right'
    })
], RadioGroup.prototype, "iconPosition", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], RadioGroup.prototype, "iconSize", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], RadioGroup.prototype, "iconOn", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], RadioGroup.prototype, "iconOff", void 0);
_ts_decorate([
    Watch('value')
], RadioGroup.prototype, "onValueChange", null);
_ts_decorate([
    Watch('options')
], RadioGroup.prototype, "onOptionsChange", null);
_ts_decorate([
    Watch('disabled'),
    Watch('readOnly'),
    Watch('hasLine'),
    Watch('withListComponent'),
    Watch('iconPosition'),
    Watch('iconSize'),
    Watch('iconOn'),
    Watch('iconOff'),
    Watch('prefixCls')
], RadioGroup.prototype, "onContextChange", null);
RadioGroup = _ts_decorate([
    Component({
        components: {
            Radio: ()=>({
                    module: './index',
                    type: 'descendant',
                    observer: 'onChildrenChanged'
                })
        },
        props: {
            prefixCls: {
                type: String,
                default: 'dora-radio-group'
            },
            cellGroupPrefixCls: {
                type: String,
                default: 'dora-list'
            },
            value: {
                type: String,
                default: ''
            },
            name: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            },
            label: {
                type: String,
                default: ''
            },
            options: {
                type: Array,
                default: ()=>[]
            },
            disabled: {
                type: Boolean,
                default: false
            },
            readOnly: {
                type: Boolean,
                default: false
            },
            mode: {
                type: String,
                default: 'default'
            },
            bodyStyle: {
                type: null,
                default: ''
            },
            hasLine: {
                type: Boolean,
                default: true
            },
            withListComponent: {
                type: Boolean,
                default: true
            },
            iconPosition: {
                type: String,
                default: 'right'
            },
            iconSize: {
                type: String,
                default: ''
            },
            iconOn: {
                type: String,
                default: ''
            },
            iconOff: {
                type: String,
                default: ''
            }
        },
        expose: [
            'getValue',
            'getBoundingClientRect',
            'changeValue'
        ]
    })
], RadioGroup);
var group = defineComponentHOC({
    behaviors: [
        'wx://form-field'
    ]
})(RadioGroup);

export { RadioGroup, group as default };
