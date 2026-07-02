/**
 * @doraemon-ui/miniprogram.form.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-07-02, 19:46:01.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.65.
 */

import { Doraemon, Watch, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';
import { useRect, findComponentNode } from '@doraemon-ui/miniprogram.shared';
import { FIELD_META_PROP, FIELD_DATA_PROP } from './constants.js';
import { fieldProps } from './props.js';
import warning from './warning.js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames } = Doraemon.util;
const intersperseSpace = (list)=>{
    return list.reduce((current, item)=>[
            ...current,
            ' ',
            item
        ], []).slice(1);
};
const defaultContext = {
    layout: 'horizontal',
    requiredMarkStyle: 'asterisk',
    asteriskText: '*',
    requiredText: '必填',
    optionalText: '选填',
    disabled: false,
    readOnly: false
};
let Field = class Field extends Doraemon {
    get classes() {
        const { prefixCls, childElementPosition, labelWrap } = this;
        return {
            wrap: classNames(prefixCls),
            child: classNames(`${prefixCls}__child`, {
                [`${prefixCls}__child--position-${childElementPosition}`]: childElementPosition
            }),
            label: classNames(`${prefixCls}__label`, {
                [`${prefixCls}__label--wrap`]: labelWrap
            }),
            extra: `${prefixCls}__extra`,
            arrow: `${prefixCls}__arrow`,
            asterisk: `${prefixCls}__required-asterisk`,
            text: `${prefixCls}__required-text`,
            feedback: `${prefixCls}__feedback-message`,
            labelHelp: `${prefixCls}__label-help`
        };
    }
    onInitialValueChange(initialValue) {
        this.changeValue(initialValue);
    }
    onFieldConfigChange() {
        this.changeValue();
    }
    onChildrenChanged() {
        this.changeValue();
    }
    getFormContext() {
        return this.$parent;
    }
    getChildNodes() {
        return this.$children;
    }
    changeContext(index, isLast, context) {
        const nextContext = {
            ...defaultContext,
            ...this.context,
            ...context
        };
        this.index = index;
        this.isLast = isLast;
        this.context = nextContext;
    }
    setPopoverVisible() {
        const popoverVisible = !this.popoverVisible;
        const promise = popoverVisible ? this.getPopoverRects() : Promise.resolve([
            null,
            null
        ]);
        promise.then(([slotRect, relativeRect])=>{
            if (slotRect && relativeRect) {
                this.slotRect = slotRect;
                this.relativeRect = relativeRect;
                this.popoverVisible = popoverVisible;
            } else {
                this.popoverVisible = popoverVisible;
            }
        });
    }
    getPopoverRects() {
        const getSlotRect = ()=>useRect(`.${this.prefixCls}__label-help`, this._renderProxy).then((rect)=>rect || null);
        const getRelativeRect = ()=>new Promise((resolve)=>{
                const fieldWrap = findComponentNode('#dora-field-wrap', this._renderProxy);
                if (fieldWrap) {
                    fieldWrap.getBoundingClientRect().then((rect)=>{
                        resolve(rect);
                    });
                } else {
                    resolve(null);
                }
            });
        return Promise.all([
            getSlotRect(),
            getRelativeRect()
        ]);
    }
    getFieldData() {
        return {
            name: this.name,
            initialValue: this.initialValue,
            trigger: this.trigger,
            valuePropName: this.valuePropName,
            validate: this.validate,
            validateTrigger: this.validateTrigger,
            preserve: this.preserve,
            rules: this.rules,
            validateFirst: this.validateFirst,
            hidden: this.hidden
        };
    }
    changeValue(value = this.value) {
        // set value
        if (this.value !== value) {
            this.value = value;
        }
        const elements = this.getChildNodes();
        const valuePropName = this.valuePropName;
        if (elements.length > 0) {
            elements.forEach((inputElem)=>{
                inputElem.hasFieldDecorator = true;
                if (valuePropName in inputElem) {
                    inputElem[valuePropName] = value;
                }
                Doraemon.nextTick(()=>{
                    this.forceUpdate(inputElem);
                });
            });
        }
    }
    forceUpdate(inputElem, callback) {
        const formContext = this.getFormContext();
        if (!formContext) {
            warning(false, `Field<${this.name}> instance is not connected to any Form element.Forgot to use <dora-form />?`);
            return;
        }
        const { getFieldDecorator } = formContext.getInternalHooks('FORM_HOOK_MARK');
        const fieldData = this.getFieldData();
        const { name } = fieldData;
        const inputProps = getFieldDecorator(name, fieldData, this)(inputElem);
        const finallyCb = ()=>{
            callback?.();
            this.updateValidateState(this);
        };
        for(const key in inputProps){
            if (key in inputElem) {
                inputElem[key] = inputProps[key];
            }
        }
        Doraemon.nextTick(finallyCb);
    }
    mounted() {
        const formContext = this.getFormContext();
        if (formContext) {
            const { registerField } = formContext.getInternalHooks('FORM_HOOK_MARK');
            this._cancelRegister = registerField(this.name, this);
        }
    }
    destroyed() {
        this._cancelRegister?.();
        this._cancelRegister = null;
    }
    getControls() {
        return this.getChildNodes().filter((node)=>!!node.hasFieldDecorator);
    }
    getOnlyControl() {
        const child = this.getControls()[0];
        return child !== undefined ? child : null;
    }
    getChildProp(prop) {
        const child = this.getOnlyControl();
        return child && child.$data && child.$data[prop];
    }
    getMeta() {
        return this.getChildProp(FIELD_META_PROP);
    }
    getField() {
        return this.getChildProp(FIELD_DATA_PROP);
    }
    getValidateState(_fieldMeta, _field) {
        const onlyControl = this.getOnlyControl();
        if (!onlyControl) {
            return '';
        }
        const fieldMeta = _fieldMeta || this.getMeta();
        const field = _field || this.getField();
        if (field.validating) {
            return 'validating';
        }
        if (field.errors) {
            return 'error';
        }
        const fieldValue = 'value' in field ? field.value : fieldMeta.initialValue;
        if (fieldValue !== undefined && fieldValue !== null && fieldValue !== '') {
            return 'success';
        }
        return '';
    }
    getRequiredState(required) {
        if (required !== null) {
            return !!required;
        }
        if (this.getOnlyControl()) {
            const meta = this.getMeta();
            const validate = meta?.validate || [];
            return validate.filter((item)=>!!item.rules).some((item)=>{
                return item.rules.some((rule)=>rule.required);
            });
        }
        return false;
    }
    getFeedbackMessage(help) {
        // if (help !== null) {
        //     return help
        // }
        if (this.getOnlyControl()) {
            const { errors } = this.getField();
            if (errors) {
                return intersperseSpace(errors.map((e)=>e.message));
            }
        }
        return '';
    }
    getValidateClasses(mergedValidateStatus, hasFeedback, help) {
        if (mergedValidateStatus) {
            return classNames({
                // 'with-help': help !== null,
                // 'has-feedback': mergedValidateStatus && hasFeedback,
                'has-success': mergedValidateStatus === 'success',
                'has-warning': mergedValidateStatus === 'warning',
                'has-error': mergedValidateStatus === 'error',
                'is-validating': mergedValidateStatus === 'validating'
            });
        }
        return '';
    }
    updateValidateState(props) {
        const mergedValidateStatus = props.validateStatus !== null ? `${props.validateStatus}` : this.getValidateState();
        if (this.mergedValidateStatus !== mergedValidateStatus) {
            this.mergedValidateStatus = mergedValidateStatus;
        }
        const mergedRequired = this.getRequiredState(props.required);
        if (this.mergedRequired !== mergedRequired) {
            this.mergedRequired = mergedRequired;
        }
        const feedbackMessage = this.getFeedbackMessage(props.help);
        if (this.feedbackMessage !== feedbackMessage) {
            this.feedbackMessage = feedbackMessage;
        }
        const validateClasses = this.getValidateClasses(mergedValidateStatus, props.hasFeedback, props.help);
        if (this.validateClasses !== validateClasses) {
            this.validateClasses = validateClasses;
        }
    }
    constructor(...args){
        super(...args);
        this.index = 0;
        this.isLast = false;
        this.context = defaultContext;
        this.popoverVisible = false;
        this.slotRect = null;
        this.relativeRect = null;
        this.mergedValidateStatus = '';
        this.mergedRequired = false;
        this.feedbackMessage = '';
        this.validateClasses = '';
        this._cancelRegister = null;
    }
};
_ts_decorate([
    Watch('initialValue')
], Field.prototype, "onInitialValueChange", null);
_ts_decorate([
    Watch('valuePropName'),
    Watch('trigger'),
    Watch('validate'),
    Watch('validateTrigger'),
    Watch('preserve'),
    Watch('rules'),
    Watch('validateFirst'),
    Watch('hidden')
], Field.prototype, "onFieldConfigChange", null);
Field = _ts_decorate([
    Component({
        components: {
            Form: ()=>({
                    module: './index',
                    type: 'ancestor'
                }),
            Input: ()=>({
                    module: '../miniprogram.input/index',
                    type: 'descendant',
                    observer: 'onChildrenChanged'
                })
        },
        props: fieldProps
    })
], Field);
var field = defineComponentHOC({
    behaviors: [
        'wx://form-field'
    ]
})(Field);

export { Field, field as default };
