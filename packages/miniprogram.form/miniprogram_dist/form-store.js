/**
 * @doraemon-ui/miniprogram.form.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-07-02, 19:46:01.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.65.
 */

import warning from './warning.js';
import { set } from './utils.js';

function isNullValue(value) {
    return value === null || value === undefined;
}
/**
 * fix: setting data field "xxx" to undefined is invalid.
 *
 * @param {*} value
 * @returns
 */ function fixNullValue(value) {
    return isNullValue(value) ? null : value;
}
function flattenArray(arr) {
    return Array.prototype.concat.apply([], arr);
}
function treeTraverse(path = '', tree, isLeafNode, errorMessage, callback) {
    const currentPath = path || '';
    if (isLeafNode(currentPath, tree)) {
        callback(currentPath, tree);
    } else if (tree === undefined || tree === null) ; else if (Array.isArray(tree)) {
        tree.forEach((subTree, index)=>treeTraverse(`${currentPath}[${index}]`, subTree, isLeafNode, errorMessage, callback));
    } else {
        // It's object and not a leaf node
        if (typeof tree !== 'object') {
            warning(false, errorMessage);
            return;
        }
        Object.keys(tree).forEach((subTreeKey)=>{
            const subTree = tree[subTreeKey];
            treeTraverse(`${currentPath}${currentPath ? '.' : ''}${subTreeKey}`, subTree, isLeafNode, errorMessage, callback);
        });
    }
}
function flattenFields(maybeNestedFields, isLeafNode, errorMessage) {
    const fields = {};
    treeTraverse(undefined, maybeNestedFields, isLeafNode, errorMessage, (path, node)=>{
        fields[path] = node;
    });
    return fields;
}
function normalizeValidateRules(validate, rules, validateTrigger) {
    const validateRules = (validate || []).map((item)=>{
        const newItem = {
            ...item,
            trigger: item.trigger || []
        };
        if (typeof newItem.trigger === 'string') {
            newItem.trigger = [
                newItem.trigger
            ];
        }
        return newItem;
    });
    if (rules) {
        validateRules.push({
            trigger: validateTrigger ? [].concat(validateTrigger) : [],
            rules
        });
    }
    return validateRules.map((item)=>({
            ...item,
            rules: item.rules || []
        }));
}
function getValidateTriggers(validateRules) {
    return validateRules.filter((item)=>!!item.rules && item.rules.length).map((item)=>item.trigger).reduce((pre, curr)=>pre.concat(curr), []);
}
function getParams(ns, opt, cb) {
    let names = ns;
    let options = opt;
    let callback = cb;
    if (cb === undefined) {
        if (typeof names === 'function') {
            callback = names;
            options = {};
            names = undefined;
        } else if (Array.isArray(names)) {
            if (typeof options === 'function') {
                callback = options;
                options = {};
            } else {
                options = options || {};
            }
        } else {
            callback = options;
            options = names || {};
            names = undefined;
        }
    }
    return {
        names: names,
        options: options || {},
        callback
    };
}
function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
}
function hasRules(validate) {
    if (validate) {
        return validate.some((item)=>{
            return item.rules && item.rules.length;
        });
    }
    return false;
}
function getErrorStrs(errors) {
    if (errors) {
        return errors.map((e)=>{
            if (e && e.message) {
                return e.message;
            }
            return e;
        });
    }
    return errors;
}
function startsWith(str, prefix) {
    return str.lastIndexOf(prefix, 0) === 0;
}
function getValueFromEvent(e) {
    const getValue = (target)=>target.type === 'checkbox' ? target.checked : target.value;
    // To support custom element
    if (!e || !e.detail) {
        if (!!e) {
            return getValue(e);
        }
        return e;
    }
    return getValue(e.detail);
}
/**
 * ## 转换校验规则，使之支持 async-validator
 * 注意：由于小程序 data 不支持传入 RegExp & function，所以在设置 rules 需要传入字符串映射！！！
 *
 * @example
 * ```
 * // 手机号验证
 * rules="{{ [{ required: true, pattern: '1[3456789]\d{9}' }] }}"
 * ```
 * @example
 * ```
 * // 自定义验证
 * rules="{{ [{ required: true, validator: 'checkMobile' }] }}"
 *
 * Page({
 *   checkMobile(rule, value) {
 *     if (value) {
 *       return Promise.resolve()
 *     }
 *     return Promise.reject(new Error('手机号不能为空!'))
 *   }
 * })
 * ```
 * @example
 * ```
 * // 校验前去除空格
 * rules="{{ [{ required: true, transform: 'trim' }] }}"
 *
 * Page({
 *   trim(value) {
 *     return value.trim()
 *   }
 * })
 * ```
 * @export
 * @param {array} rules 校验规则，设置字段的校验逻辑
 * @param {object} vm 当前页面的实例对象
 * @return {array}
 */ function transformRules(rules, vm) {
    const currentVm = vm || (typeof getCurrentPages === 'function' ? getCurrentPages()[getCurrentPages().length - 1] || null : null);
    return rules.map((rule)=>{
        const cloneRule = {
            ...rule
        };
        // 正则表达式校验
        if (typeof rule.pattern === 'string') {
            cloneRule.pattern = new RegExp(rule.pattern);
        }
        // 校验前转换字段值
        if (typeof rule.transform === 'string' && currentVm && currentVm[rule.transform]) {
            cloneRule.transform = currentVm[rule.transform];
        }
        // 自定义校验，接收 Promise 作为返回值。
        if (typeof rule.validator === 'string' && currentVm && currentVm[rule.validator]) {
            cloneRule.validator = currentVm[rule.validator];
        }
        return cloneRule;
    });
}
/**
 * ## Replace with template.
 *
 * @example
 * ```
 * `I'm ${name}` + { name: 'bamboo' } = I'm bamboo
 * ```
 * @export
 * @param {*} template
 * @param {*} kv
 * @return {*}
 */ function replaceMessage(template, kv) {
    return template.replace(/\$\{\w+\}/g, (str)=>{
        const key = str.slice(2, -1);
        return kv[key];
    });
}
class Field {
    constructor(fields){
        Object.assign(this, fields);
    }
}
function isFormField(obj) {
    return obj instanceof Field;
}
function createFormField(field) {
    if (isFormField(field)) {
        return field;
    }
    return new Field(field);
}
function internalFlattenFields(fields) {
    return flattenFields(fields, (_, node)=>isFormField(node), 'You must wrap field data with `createFormField`.');
}
class FieldsStore {
    updateFields(fields) {
        this.fields = internalFlattenFields(fields);
    }
    flattenRegisteredFields(fields) {
        const validFieldsName = this.getAllFieldsName();
        return flattenFields(fields, (path)=>validFieldsName.indexOf(path) >= 0, 'You cannot set a form field before rendering a field associated with the value.');
    }
    setFields(fields) {
        const nowFields = {
            ...this.fields,
            ...fields
        };
        this.fields = nowFields;
    }
    resetFields(ns) {
        const { fieldsMeta } = this;
        const names = ns ? this.getValidFieldsFullName(ns) : this.getAllFieldsName();
        return names.reduce((acc, name)=>{
            const fieldMeta = fieldsMeta[name];
            if (fieldMeta) {
                acc[name] = {
                    name,
                    value: fixNullValue(fieldMeta.initialValue)
                };
            }
            return acc;
        }, {});
    }
    setFieldMeta(name, meta) {
        this.fieldsMeta[name] = meta;
    }
    setFieldsAsDirty() {
        Object.keys(this.fields).forEach((name)=>{
            const field = this.fields[name];
            const fieldMeta = this.fieldsMeta[name];
            if (field && fieldMeta && hasRules(fieldMeta.validate)) {
                this.fields[name] = {
                    ...field,
                    dirty: true
                };
            }
        });
    }
    getFieldMeta(name) {
        this.fieldsMeta[name] = this.fieldsMeta[name] || {};
        return this.fieldsMeta[name];
    }
    getValueFromFields(name, fields) {
        const field = fields[name];
        if (field && 'value' in field) {
            return fixNullValue(field.value);
        }
        const fieldMeta = this.getFieldMeta(name);
        return fieldMeta && fixNullValue(fieldMeta.initialValue);
    }
    getValidFieldsName() {
        const { fieldsMeta } = this;
        return fieldsMeta ? Object.keys(fieldsMeta).filter((name)=>!this.getFieldMeta(name).hidden) : [];
    }
    getAllFieldsName() {
        const { fieldsMeta } = this;
        return fieldsMeta ? Object.keys(fieldsMeta) : [];
    }
    getValidFieldsFullName(maybePartialName) {
        const maybePartialNames = Array.isArray(maybePartialName) ? maybePartialName : [
            maybePartialName
        ];
        return this.getValidFieldsName().filter((fullName)=>maybePartialNames.some((partialName)=>fullName === partialName || startsWith(fullName, partialName) && [
                    '.',
                    '['
                ].indexOf(fullName[partialName.length]) >= 0));
    }
    getFieldValuePropValue(fieldMeta) {
        const { name, valuePropName } = fieldMeta;
        const field = this.getField(name);
        const fieldValue = 'value' in field ? field.value : fieldMeta.initialValue;
        return {
            [valuePropName]: fixNullValue(fieldValue)
        };
    }
    getField(name) {
        return {
            ...this.fields[name],
            name
        };
    }
    getNotCollectedFields() {
        const fieldsName = this.getValidFieldsName();
        return fieldsName.filter((name)=>!this.fields[name]).map((name)=>({
                name,
                dirty: false,
                value: this.getFieldMeta(name).initialValue
            })).reduce((acc, field)=>set(acc, field.name, createFormField(field)), {});
    }
    getNestedAllFields() {
        return Object.keys(this.fields).reduce((acc, name)=>set(acc, name, createFormField(this.fields[name])), this.getNotCollectedFields());
    }
    getFieldMember(name, member) {
        return this.getField(name)[member];
    }
    getNestedFields(names, getter) {
        const fields = names || this.getValidFieldsName();
        return fields.reduce((acc, f)=>set(acc, f, getter(f)), {});
    }
    getNestedField(name, getter) {
        const fullNames = this.getValidFieldsFullName(name);
        if (fullNames.length === 0 || // Not registered
        fullNames.length === 1 && fullNames[0] === name // Name already is full name.
        ) {
            return getter(name);
        }
        const isArrayValue = fullNames[0][name.length] === '[';
        const suffixNameStartIndex = isArrayValue ? name.length : name.length + 1;
        return fullNames.reduce((acc, fullName)=>set(acc, fullName.slice(suffixNameStartIndex), getter(fullName)), isArrayValue ? [] : {});
    }
    clearField(name) {
        delete this.fields[name];
        delete this.fieldsMeta[name];
    }
    constructor(fields = {}){
        this.setFieldsInitialValue = (initialValues)=>{
            const flattenedInitialValues = this.flattenRegisteredFields(initialValues);
            const fieldsMeta = this.fieldsMeta;
            Object.keys(flattenedInitialValues).forEach((name)=>{
                if (fieldsMeta[name]) {
                    const fieldMeta = this.getFieldMeta(name);
                    const initValue = fieldMeta.initialValue;
                    if (isNullValue(initValue)) {
                        this.setFieldMeta(name, {
                            ...fieldMeta,
                            initialValue: fixNullValue(flattenedInitialValues[name])
                        });
                    }
                }
            });
        };
        this.getAllValues = ()=>{
            const { fieldsMeta, fields } = this;
            return Object.keys(fieldsMeta).reduce((acc, name)=>set(acc, name, this.getValueFromFields(name, fields)), {});
        };
        this.getFieldsValue = (names)=>{
            return this.getNestedFields(names, this.getFieldValue);
        };
        this.getFieldValue = (name)=>{
            const { fields } = this;
            return this.getNestedField(name, (fullName)=>this.getValueFromFields(fullName, fields));
        };
        this.getFieldsError = (names)=>{
            return this.getNestedFields(names, this.getFieldError);
        };
        this.getFieldError = (name)=>{
            return this.getNestedField(name, (fullName)=>getErrorStrs(this.getFieldMember(fullName, 'errors')));
        };
        this.isFieldValidating = (name)=>{
            return this.getFieldMember(name, 'validating');
        };
        this.isFieldsValidating = (ns)=>{
            const names = ns || this.getValidFieldsName();
            return names.some((n)=>this.isFieldValidating(n));
        };
        this.isFieldTouched = (name)=>{
            return this.getFieldMember(name, 'touched');
        };
        this.isFieldsTouched = (ns)=>{
            const names = ns || this.getValidFieldsName();
            return names.some((n)=>this.isFieldTouched(n));
        };
        this.fields = internalFlattenFields(fields);
        this.fieldsMeta = {};
    }
}
function createFieldsStore(fields) {
    return new FieldsStore(fields);
}

export { createFormField, createFieldsStore as default, fixNullValue, flattenArray, flattenFields, getErrorStrs, getParams, getValidateTriggers, getValueFromEvent, hasRules, internalFlattenFields, isEmptyObject, isFormField, isNullValue, normalizeValidateRules, replaceMessage, startsWith, transformRules, treeTraverse };
