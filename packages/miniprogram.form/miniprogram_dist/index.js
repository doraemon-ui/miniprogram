/**
 * @doraemon-ui/miniprogram.form.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-15, 00:06:49.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { Doraemon, Watch, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';
import createFieldsStore, { hasRules, getValueFromEvent, isEmptyObject, flattenArray, transformRules, normalizeValidateRules, getValidateTriggers, getParams, isNullValue } from './form-store.js';
import { set, get, eq } from './utils.js';
import Schema from './async-validator.js';
import warning from './warning.js';
import { DEFAULT_TRIGGER, FIELD_META_PROP, FIELD_DATA_PROP, toFormEventName } from './constants.js';
import { formProps } from './props.js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames } = Doraemon.util;
let Form = class Form extends Doraemon {
    get classes() {
        const { prefixCls } = this;
        return {
            wrap: classNames(prefixCls),
            footer: `${prefixCls}__footer`
        };
    }
    onContextChange() {
        this.changeFieldElem(this);
    }
    onChildChanged() {
        this.changeValue();
    }
    changeFieldElem(props) {
        Doraemon.nextTick(()=>{
            const { layout, validateMessages, requiredMarkStyle, asteriskText, requiredText, optionalText, disabled, readOnly } = props;
            const fields = this.$children;
            if (fields.length === 0) return;
            const lastIndex = fields.length - 1;
            fields.forEach((field, index)=>{
                field.changeContext(index, index === lastIndex, {
                    layout,
                    validateMessages,
                    requiredMarkStyle,
                    asteriskText,
                    requiredText,
                    optionalText,
                    disabled,
                    readOnly
                });
            });
        });
    }
    changeValue() {
        this.changeFieldElem(this);
        this.clearUnlinkedFields();
    }
    saveRef(name, component) {
        if (!component) {
            const fieldMeta = this._fieldsStore.getFieldMeta(name);
            if (!fieldMeta.preserve) {
                this._clearedFieldMetaCache[name] = {
                    field: this._fieldsStore.getField(name),
                    meta: fieldMeta
                };
                this.clearField(name);
            }
            return;
        }
        this.recoverClearedField(name);
        this._instances[name] = component;
    }
    recoverClearedField(name) {
        if (this._clearedFieldMetaCache[name]) {
            this._fieldsStore.setFields({
                [name]: this._clearedFieldMetaCache[name].field
            });
            this._fieldsStore.setFieldMeta(name, this._clearedFieldMetaCache[name].meta);
            delete this._clearedFieldMetaCache[name];
        }
    }
    setFieldsAsErrors(name, fieldMeta) {
        const fieldNames = this._fieldsStore.getValidFieldsFullName(name);
        if (fieldNames.includes(name) && !hasRules(fieldMeta.validate)) {
            const nowField = this._fieldsStore.getField(name);
            if (nowField.errors) {
                this._fieldsStore.setFields({
                    [name]: {
                        ...nowField,
                        errors: undefined
                    }
                });
            }
        }
    }
    clearUnlinkedFields() {
        const fieldList = this._fieldsStore.getAllFieldsName();
        const removedList = fieldList.filter((field)=>{
            const fieldMeta = this._fieldsStore.getFieldMeta(field);
            return !this._renderFields[field] && !fieldMeta.preserve;
        });
        if (removedList.length > 0) {
            removedList.forEach((name)=>this.clearField(name));
        }
    }
    clearField(name) {
        this._fieldsStore.clearField(name);
        delete this._renderFields[name];
        delete this._instances[name];
        delete this._cachedBind[name];
        delete this._formBridges[name];
    }
    setFields(maybeNestedFields, callback) {
        const fields = this._fieldsStore.flattenRegisteredFields(maybeNestedFields);
        Object.keys(fields).forEach((name)=>{
            this._fieldsStore.setFields({
                [name]: fields[name]
            });
            const fieldMeta = this._fieldsStore.getFieldMeta(name);
            if (fieldMeta) {
                const { fieldElem, inputElem } = fieldMeta;
                fieldElem.forceUpdate(inputElem, callback);
            }
        });
        // trigger onFieldsChange
        const changedFields = Object.keys(fields).reduce((acc, name)=>set(acc, name, this._fieldsStore.getField(name)), {});
        const allFields = this._fieldsStore.getNestedAllFields();
        this.onFieldsChange(changedFields, allFields);
    }
    onCollectValidate(name, action, ...args) {
        const { field, fieldMeta } = this.onCollectCommon(name, action, args);
        const newField = {
            ...field,
            dirty: true
        };
        this._fieldsStore.setFieldsAsDirty();
        this.validateFieldsInternal([
            newField
        ], {
            action,
            options: {
                firstFields: !!fieldMeta.validateFirst
            }
        });
    }
    onCollectCommon(name, action, args) {
        const field = this._fieldsStore.getField(name);
        const fieldMeta = this._fieldsStore.getFieldMeta(name);
        const { fieldElem } = fieldMeta;
        const value = getValueFromEvent(args[0]);
        const oldValue = this._fieldsStore.getFieldValue(name);
        // set field value
        if (value !== oldValue) {
            if (fieldElem.value !== value) {
                fieldElem.value = value;
            }
            // trigger onValuesChange
            const changedValues = {
                [name]: value
            };
            const allValues = this._fieldsStore.getAllValues();
            this.onValuesChange(changedValues, {
                ...allValues,
                ...changedValues
            });
        }
        return {
            name,
            field: {
                ...field,
                value,
                touched: true
            },
            fieldMeta
        };
    }
    onCollect(name_, action, ...args) {
        const { name, field, fieldMeta } = this.onCollectCommon(name_, action, args);
        const { validate } = fieldMeta;
        this._fieldsStore.setFieldsAsDirty();
        const newField = {
            ...field,
            dirty: hasRules(validate)
        };
        this.setFields({
            [name]: newField
        });
    }
    setFieldsValue(changedValues, callback) {
        const { fieldsMeta } = this._fieldsStore;
        const values = this._fieldsStore.flattenRegisteredFields(changedValues);
        const newFields = Object.keys(values).reduce((acc, name)=>{
            const isRegistered = fieldsMeta[name];
            if (isRegistered) {
                const value = values[name];
                acc[name] = {
                    value
                };
            }
            return acc;
        }, {});
        this.setFields(newFields, callback);
        const allValues = this._fieldsStore.getAllValues();
        this.onValuesChange(changedValues, allValues);
    }
    resetFields(ns) {
        const names = typeof ns === 'undefined' ? ns : Array.isArray(ns) ? ns : [
            ns
        ];
        const newFields = this._fieldsStore.resetFields(names);
        if (Object.keys(newFields).length > 0) {
            this.setFields(newFields);
        }
        if (ns) {
            const names = Array.isArray(ns) ? ns : [
                ns
            ];
            names.forEach((name)=>delete this._clearedFieldMetaCache[name]);
        } else {
            this._clearedFieldMetaCache = {};
        }
    }
    validateFieldsInternal(fields, { fieldNames, action, options = {} }, callback) {
        const allRules = {};
        const allValues = {};
        const allFields = {};
        const alreadyErrors = {};
        fields.forEach((field)=>{
            const name = field.name;
            if (options.force !== true && field.dirty === false) {
                if (field.errors) {
                    set(alreadyErrors, name, {
                        errors: field.errors
                    });
                }
                return;
            }
            const fieldMeta = this._fieldsStore.getFieldMeta(name);
            const newField = {
                ...field
            };
            newField.errors = undefined;
            newField.validating = true;
            newField.dirty = true;
            allRules[name] = this.getRules(fieldMeta, action);
            allValues[name] = newField.value;
            allFields[name] = newField;
        });
        this.setFields(allFields);
        // in case normalize
        Object.keys(allValues).forEach((f)=>{
            allValues[f] = this._fieldsStore.getFieldValue(f);
        });
        if (callback && isEmptyObject(allFields)) {
            callback(isEmptyObject(alreadyErrors) ? null : alreadyErrors, this._fieldsStore.getFieldsValue(fieldNames));
            return;
        }
        const validator = new Schema(allRules);
        const { validateMessages } = this;
        if (validateMessages) {
            validator.messages(validateMessages);
        }
        validator.validate(allValues, options, (errors)=>{
            const errorsGroup = {
                ...alreadyErrors
            };
            if (errors && errors.length) {
                errors.forEach((e)=>{
                    const errorFieldName = e.field;
                    let fieldName = errorFieldName;
                    // Handle using array validation rule.
                    Object.keys(allRules).some((ruleFieldName)=>{
                        const rules = allRules[ruleFieldName] || [];
                        // Exist if match rule
                        if (ruleFieldName === errorFieldName) {
                            fieldName = ruleFieldName;
                            return true;
                        }
                        // Skip if not match array type
                        if (rules.every(({ type })=>type !== 'array') || errorFieldName.indexOf(`${ruleFieldName}.`) !== 0) {
                            return false;
                        }
                        // Exist if match the field name
                        const restPath = errorFieldName.slice(ruleFieldName.length + 1);
                        if (/^\d+$/.test(restPath)) {
                            fieldName = ruleFieldName;
                            return true;
                        }
                        return false;
                    });
                    const field = get(errorsGroup, fieldName);
                    if (typeof field !== 'object' || Array.isArray(field)) {
                        set(errorsGroup, fieldName, {
                            errors: []
                        });
                    }
                    const fieldErrors = get(errorsGroup, fieldName.concat('.errors'));
                    fieldErrors.push(e);
                });
            }
            const expired = [];
            const nowAllFields = {};
            Object.keys(allRules).forEach((name)=>{
                const fieldErrors = get(errorsGroup, name);
                const nowField = this._fieldsStore.getField(name);
                // avoid concurrency problems
                if (!eq(nowField.value, allValues[name])) {
                    expired.push({
                        name
                    });
                } else {
                    nowField.errors = fieldErrors && fieldErrors.errors;
                    nowField.value = allValues[name];
                    nowField.validating = false;
                    nowField.dirty = false;
                    nowAllFields[name] = nowField;
                }
            });
            this.setFields(nowAllFields);
            if (callback) {
                if (expired.length) {
                    expired.forEach(({ name })=>{
                        const fieldErrors = [
                            {
                                message: `${name} need to revalidate`,
                                field: name
                            }
                        ];
                        set(errorsGroup, name, {
                            expired: true,
                            errors: fieldErrors
                        });
                    });
                }
                callback(isEmptyObject(errorsGroup) ? null : errorsGroup, this._fieldsStore.getFieldsValue(fieldNames));
            }
        });
    }
    validateFields(ns, opt, cb) {
        const pending = new Promise((resolve, reject)=>{
            const { names, options } = getParams(ns, opt, cb);
            let { callback } = getParams(ns, opt, cb);
            if (!callback || typeof callback === 'function') {
                const oldCb = callback;
                callback = (errors, values)=>{
                    if (oldCb) {
                        oldCb(errors, values);
                    }
                    if (errors) {
                        reject({
                            errors,
                            values
                        });
                    } else {
                        resolve(values);
                    }
                };
            }
            const fieldNames = names ? this._fieldsStore.getValidFieldsFullName(names) : this._fieldsStore.getValidFieldsName();
            const fields = fieldNames.filter((name)=>{
                const fieldMeta = this._fieldsStore.getFieldMeta(name);
                return hasRules(fieldMeta.validate);
            }).map((name)=>{
                const field = this._fieldsStore.getField(name);
                field.value = this._fieldsStore.getFieldValue(name);
                return field;
            });
            if (!fields.length) {
                callback(null, this._fieldsStore.getFieldsValue(fieldNames));
                return;
            }
            if (!('firstFields' in options)) {
                options.firstFields = fieldNames.filter((name)=>{
                    const fieldMeta = this._fieldsStore.getFieldMeta(name);
                    return !!fieldMeta.validateFirst;
                });
            }
            this.validateFieldsInternal(fields, {
                fieldNames,
                options
            }, callback);
        });
        pending.catch((e)=>{
            // eslint-disable-next-line no-console
            if (console.error) {
                // eslint-disable-next-line no-console
                console.error(e);
            }
            return e;
        });
        return pending;
    }
    getRules(fieldMeta, action) {
        const actionRules = fieldMeta.validate.filter((item)=>{
            return !action || item.trigger.indexOf(action) >= 0;
        }).map((item)=>item.rules);
        return flattenArray(actionRules);
    }
    getFieldInstance(name) {
        return this._instances[name];
    }
    getCacheBind(name, action, fn) {
        if (!this._cachedBind[name]) {
            this._cachedBind[name] = {};
        }
        const cache = this._cachedBind[name];
        if (!cache[action] || cache[action].oriFn !== fn) {
            cache[action] = {
                fn: fn.bind(this, name, action),
                oriFn: fn
            };
        }
        return cache[action].fn;
    }
    getFieldDecorator(name, fieldData, fieldElem) {
        const props = this.getFieldProps(name, fieldData, fieldElem);
        return (inputElem)=>{
            // We should put field in record if it is rendered
            this._renderFields[name] = true;
            const fieldMeta = this._fieldsStore.getFieldMeta(name);
            fieldMeta.inputElem = inputElem;
            this.patchFormBridge(name, inputElem);
            const decoratedFieldProps = {
                ...props,
                ...this._fieldsStore.getFieldValuePropValue(fieldMeta)
            };
            return decoratedFieldProps;
        };
    }
    getFieldProps(name, fieldData, fieldElem) {
        delete this._clearedFieldMetaCache[name];
        const rules = transformRules(fieldData.rules);
        const { initialValue, trigger = DEFAULT_TRIGGER, valuePropName, validate = [], validateTrigger = [
            DEFAULT_TRIGGER
        ], preserve, // rules,
        validateFirst, hidden } = fieldData;
        const fieldOption = {
            name,
            // initialValue,
            trigger,
            valuePropName,
            validate,
            validateTrigger,
            preserve,
            rules,
            validateFirst,
            hidden
        };
        if (!isNullValue(initialValue)) {
            fieldOption.initialValue = initialValue;
        }
        const inputProps = {
            ...this._fieldsStore.getFieldValuePropValue(fieldOption)
        };
        const fieldMeta = this._fieldsStore.getFieldMeta(name);
        if ('initialValue' in fieldOption) {
            fieldMeta.initialValue = fieldOption.initialValue;
        }
        fieldMeta.fieldElem = fieldElem;
        const validateRules = normalizeValidateRules(validate, rules, validateTrigger);
        const meta = {
            ...fieldMeta,
            ...fieldOption,
            validate: validateRules
        };
        this._fieldsStore.setFieldMeta(name, meta);
        this._formBridges[name] = this.createFormBridge(name);
        // fix errors
        this.setFieldsAsErrors(name, meta);
        const { fieldElem: __fieldElem, inputElem: __inputElem, ...fieldMetaProp } = meta;
        // inject field
        inputProps[FIELD_META_PROP] = fieldMetaProp;
        inputProps[FIELD_DATA_PROP] = this._fieldsStore.getField(name);
        return inputProps;
    }
    createFormBridge(name) {
        return {
            name,
            dispatch: (event, ...args)=>{
                const fieldMeta = this._fieldsStore.getFieldMeta(name);
                const eventName = toFormEventName(event);
                const trigger = fieldMeta.trigger;
                const validateTriggers = getValidateTriggers(fieldMeta.validate);
                validateTriggers.forEach((action)=>{
                    if (action === eventName) {
                        this.onCollectValidate(name, action, ...args);
                    }
                });
                // make sure that the value will be collect
                if (validateTriggers.indexOf(trigger) === -1) {
                    if (trigger === eventName) {
                        this.onCollect(name, trigger, ...args);
                    }
                }
            }
        };
    }
    patchFormBridge(name, inputElem) {
        const bridgeInput = inputElem;
        const nameKey = '_formBridgeName';
        const emitKey = '_formBridgeOriginalEmit';
        const patchedKey = '_formBridgePatched';
        bridgeInput[nameKey] = name;
        if (bridgeInput[patchedKey]) {
            return;
        }
        bridgeInput[emitKey] = bridgeInput.$emit;
        bridgeInput.$emit = (event, ...args)=>{
            const bridgeName = bridgeInput[nameKey];
            const bridge = bridgeName ? this._formBridges[bridgeName] : undefined;
            bridge?.dispatch(event, ...args);
            const originalEmit = bridgeInput[emitKey];
            return originalEmit.call(bridgeInput, event, ...args);
        };
        bridgeInput[patchedKey] = true;
    }
    registerField(name, fieldElem) {
        const action = `${name}__ref`;
        const ref = this.getCacheBind(name, action, this.saveRef);
        ref(fieldElem);
        return ()=>{
            ref(null);
        };
    }
    getInternalHooks(key) {
        if (key === 'FORM_HOOK_MARK') {
            return {
                registerField: this.registerField.bind(this),
                getFieldDecorator: this.getFieldDecorator.bind(this)
            };
        }
        warning(false, '`getInternalHooks` is internal usage of the <form />. Should not call directly.');
        return null;
    }
    onValuesChange(changedValues, allValues) {
        this.$emit('change', {
            form: this,
            changedValues,
            allValues
        });
    }
    onFieldsChange(changedFields, allFields) {
        this.$emit('fieldsChange', {
            form: this,
            changedFields,
            allFields
        });
    }
    getFieldsValue(names) {
        return this._fieldsStore.getFieldsValue(names);
    }
    getFieldValue(name) {
        return this._fieldsStore.getFieldValue(name);
    }
    setFieldsInitialValue(values) {
        this._fieldsStore.setFieldsInitialValue(values);
    }
    getFieldsError(names) {
        return this._fieldsStore.getFieldsError(names);
    }
    getFieldError(name) {
        return this._fieldsStore.getFieldError(name);
    }
    isFieldValidating(name) {
        return this._fieldsStore.isFieldValidating(name);
    }
    isFieldsValidating(names) {
        return this._fieldsStore.isFieldsValidating(names);
    }
    isFieldTouched(name) {
        return this._fieldsStore.isFieldTouched(name);
    }
    isFieldsTouched(names) {
        return this._fieldsStore.isFieldsTouched(names);
    }
    created() {
        this._fieldsStore = createFieldsStore();
        this._renderFields = {};
        this._cachedBind = {};
        this._clearedFieldMetaCache = {};
        this._instances = {};
        this._formBridges = {};
    }
};
_ts_decorate([
    Watch('layout'),
    Watch('validateMessages'),
    Watch('requiredMarkStyle'),
    Watch('asteriskText'),
    Watch('requiredText'),
    Watch('optionalText'),
    Watch('disabled'),
    Watch('readOnly')
], Form.prototype, "onContextChange", null);
Form = _ts_decorate([
    Component({
        components: {
            Field: ()=>({
                    module: './field',
                    type: 'descendant',
                    observer: 'onChildChanged'
                })
        },
        props: formProps,
        expose: [
            'getFieldsValue',
            'getFieldValue',
            'setFieldsInitialValue',
            'getFieldsError',
            'getFieldError',
            'isFieldValidating',
            'isFieldsValidating',
            'isFieldsTouched',
            'isFieldTouched',
            'setFieldsValue',
            'setFields',
            'resetFields',
            'validateFields',
            'getFieldInstance',
            'getInternalHooks'
        ]
    })
], Form);
var index = defineComponentHOC()(Form);

export { Form, index as default };
