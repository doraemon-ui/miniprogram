import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance, Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { MiniprogramDOMRect } from '@doraemon-ui/miniprogram.shared';

declare class Field extends Doraemon {
    prefixCls: string;
    initialValue: unknown;
    valuePropName: string;
    trigger: string;
    validate: FormValidateConfig[];
    validateTrigger: string | string[];
    preserve: boolean;
    rules: FormRule[];
    validateFirst: boolean;
    hidden: boolean;
    childElementPosition: string;
    cellPrefixCls: string;
    label: string;
    labelWrap: boolean;
    extra: string;
    isLink: boolean;
    align: string;
    disabled: boolean;
    readOnly: boolean;
    validateStatus: unknown;
    required: unknown;
    help: unknown;
    hasFeedback: boolean;
    name: string;
    value: unknown;
    index: number;
    isLast: boolean;
    context: FormContext;
    popoverVisible: boolean;
    slotRect: MiniprogramDOMRect | null;
    relativeRect: MiniprogramDOMRect | null;
    mergedValidateStatus: string;
    mergedRequired: boolean;
    feedbackMessage: string | string[];
    validateClasses: string;
    _cancelRegister: null | (() => void);
    get classes(): {
        wrap: string;
        child: string;
        label: string;
        extra: string;
        arrow: string;
        asterisk: string;
        text: string;
        feedback: string;
        labelHelp: string;
    };
    onInitialValueChange(initialValue: unknown): void;
    onFieldConfigChange(): void;
    onChildrenChanged(): void;
    getFormContext(): FormInstance | undefined;
    getChildNodes(): InputInstanceLike[];
    changeContext(index: number, isLast: boolean, context: Partial<FormContext>): void;
    setPopoverVisible(): void;
    getPopoverRects(): Promise<[MiniprogramDOMRect, MiniprogramDOMRect]>;
    getFieldData(): FieldData;
    changeValue(value?: unknown): void;
    forceUpdate(inputElem?: InputInstanceLike, callback?: () => void): void;
    mounted(): void;
    destroyed(): void;
    getControls(): InputInstanceLike[];
    getOnlyControl(): InputInstanceLike;
    getChildProp(prop: string): any;
    getMeta(): FormFieldMeta | undefined;
    getField(): FormFieldState | undefined;
    getValidateState(_fieldMeta?: FormFieldMeta, _field?: FormFieldState): "" | "validating" | "error" | "success";
    getRequiredState(required: unknown): boolean;
    getFeedbackMessage(help: unknown): string[] | "";
    getValidateClasses(mergedValidateStatus: string, hasFeedback: boolean, help: unknown): string;
    updateValidateState(props: FieldProps): void;
}

export { Field };

type FormBridge = {
    name: string;
    dispatch: (event: string, ...args: unknown[]) => void;
};

declare class Form extends Doraemon {
    prefixCls: string;
    cellGroupPrefixCls: string;
    title: string;
    label: string;
    mode: FormMode;
    bodyStyle: Partial<CSSStyleDeclaration> | null;
    layout: FormLayout;
    validateMessages: FormValidateMessages | null;
    requiredMarkStyle: FormRequiredMarkStyle;
    asteriskText: string;
    requiredText: string;
    optionalText: string;
    disabled: boolean;
    readOnly: boolean;
    _fieldsStore: ReturnType<typeof createFieldsStore>;
    _renderFields: Record<string, boolean>;
    _cachedBind: Record<string, Record<string, {
        fn: (...args: unknown[]) => void;
        oriFn: Function;
    }>>;
    _clearedFieldMetaCache: Record<string, {
        field: FormFieldState;
        meta: FormFieldMeta;
    }>;
    _instances: Record<string, FieldInstance>;
    _formBridges: Record<string, FormBridge>;
    get classes(): {
        wrap: string;
        footer: string;
    };
    onContextChange(): void;
    onChildChanged(): void;
    changeFieldElem(props: FormProps): void;
    changeValue(): void;
    saveRef(name: string, component: FieldInstance | null): void;
    recoverClearedField(name: string): void;
    setFieldsAsErrors(name: string, fieldMeta: FormFieldMeta): void;
    clearUnlinkedFields(): void;
    clearField(name: string): void;
    setFields(maybeNestedFields: Record<string, FormFieldState>, callback?: () => void): void;
    onCollectValidate(name: string, action: string, ...args: unknown[]): void;
    onCollectCommon(name: string, action: string, args: unknown[]): {
        name: string;
        field: {
            value: unknown;
            touched: boolean;
            name: string;
            dirty?: boolean;
            validating?: boolean;
            errors?: FormError[];
        };
        fieldMeta: FormFieldMeta;
    };
    onCollect(name_: string, action: string, ...args: unknown[]): void;
    setFieldsValue(changedValues: Record<string, unknown>, callback?: () => void): void;
    resetFields(ns?: string[] | string): void;
    validateFieldsInternal(fields: FormFieldState[], { fieldNames, action, options }: {
        fieldNames?: string[];
        action?: string;
        options?: Record<string, unknown>;
    }, callback?: (errors: Record<string, unknown> | null, values: Record<string, unknown>) => void): void;
    validateFields(ns?: string[] | string | ((errors: Record<string, unknown> | null, values: Record<string, unknown>) => void), opt?: Record<string, unknown> | ((errors: Record<string, unknown> | null, values: Record<string, unknown>) => void), cb?: (errors: Record<string, unknown> | null, values: Record<string, unknown>) => void): Promise<unknown>;
    getRules(fieldMeta: FormFieldMeta, action?: string): FormRule[];
    getFieldInstance(name: string): FieldInstance;
    getCacheBind(name: string, action: string, fn: (...args: unknown[]) => void): (...args: unknown[]) => void;
    getFieldDecorator(name: string, fieldData: FieldData, fieldElem: FieldInstance): (inputElem: InputInstanceLike) => {
        [x: string]: unknown;
        __dataFieldData: FormFieldState;
        __dataFieldMeta: Omit<FormFieldMeta, "fieldElem" | "inputElem">;
    };
    getFieldProps(name: string, fieldData: FieldData, fieldElem: FieldInstance): FormInputProps;
    createFormBridge(name: string): {
        name: string;
        dispatch: (event: string, ...args: unknown[]) => void;
    };
    patchFormBridge(name: string, inputElem: InputInstanceLike): void;
    registerField(name: string, fieldElem: FieldInstance): () => void;
    getInternalHooks(key: string): FormHooks | null;
    onValuesChange(changedValues: Record<string, unknown>, allValues: Record<string, unknown>): void;
    onFieldsChange(changedFields: Record<string, unknown>, allFields: Record<string, unknown>): void;
    getFieldsValue(names?: string[]): Record<string, unknown>;
    getFieldValue(name: string): unknown;
    setFieldsInitialValue(values: Record<string, unknown>): void;
    getFieldsError(names?: string[]): Record<string, unknown>;
    getFieldError(name: string): unknown;
    isFieldValidating(name: string): unknown;
    isFieldsValidating(names?: string[]): boolean;
    isFieldTouched(name: string): unknown;
    isFieldsTouched(names?: string[]): boolean;
    created(): void;
}

export { Form };

export type InputInstanceLike = Doraemon & {
    hasFieldDecorator?: boolean;
    [x: string]: unknown;
};

export type FormMode = 'default' | 'card';

export type FormLayout = 'horizontal' | 'vertical' | 'none';

export type FormRequiredMarkStyle = 'asterisk' | 'text-required' | 'text-optional';

export interface FormValidateMessages {
    [key: string]: string;
}

export type FormContext = Pick<FormProps, 'layout' | 'validateMessages' | 'requiredMarkStyle' | 'asteriskText' | 'requiredText' | 'optionalText' | 'disabled' | 'readOnly'>;

export interface FormProps {
    prefixCls?: string;
    cellGroupPrefixCls?: string;
    title?: string;
    label?: string;
    mode?: FormMode;
    bodyStyle?: Partial<CSSStyleDeclaration> | null;
    layout?: FormLayout;
    validateMessages?: FormValidateMessages | null;
    requiredMarkStyle?: FormRequiredMarkStyle;
    asteriskText?: string;
    requiredText?: string;
    optionalText?: string;
    disabled?: boolean;
    readOnly?: boolean;
}

export interface FormExpose {
    getFieldsValue: (names?: string[]) => Record<string, unknown>;
    getFieldValue: (name: string) => unknown;
    setFieldsInitialValue: (values: Record<string, unknown>) => void;
    getFieldsError: (names?: string[]) => Record<string, unknown>;
    getFieldError: (name: string) => unknown;
    isFieldValidating: (name: string) => boolean | undefined;
    isFieldsValidating: (names?: string[]) => boolean;
    isFieldsTouched: (names?: string[]) => boolean;
    isFieldTouched: (name: string) => boolean | undefined;
    setFieldsValue: (values: Record<string, unknown>, callback?: () => void) => void;
    setFields: (fields: Record<string, FormFieldState>, callback?: () => void) => void;
    resetFields: (names?: string[] | string) => void;
    validateFields: (names?: string[] | string, options?: Record<string, unknown>, callback?: (errors: Record<string, unknown> | null, values: Record<string, unknown>) => void) => Promise<Record<string, unknown>>;
    getFieldInstance: (name: string) => FieldInstance | undefined;
    getInternalHooks: (key: string) => FormHooks | null;
}

export type FormInstance = ComponentPublicInstance<Form, FormProps, FormExpose>;

export interface FieldProps {
    prefixCls?: string;
    initialValue?: unknown;
    valuePropName?: string;
    trigger?: string;
    validate?: FormValidateConfig[];
    validateTrigger?: string | string[];
    preserve?: boolean;
    rules?: FormRule[];
    validateFirst?: boolean;
    hidden?: boolean;
    childElementPosition?: string;
    cellPrefixCls?: string;
    label?: string;
    labelWrap?: boolean;
    extra?: string;
    isLink?: boolean;
    align?: string;
    disabled?: boolean;
    readOnly?: boolean;
    validateStatus?: unknown;
    required?: unknown;
    help?: unknown;
    hasFeedback?: boolean;
    name?: string;
    value?: unknown;
}

export type FieldData = Pick<FieldProps, 'name' | 'initialValue' | 'value' | 'valuePropName' | 'trigger' | 'validate' | 'validateTrigger' | 'preserve' | 'rules' | 'validateFirst' | 'hidden'>;

export interface FieldExpose {
    changeContext: (index: number, isLast: boolean, context: Partial<FormContext>) => void;
    getFieldData: () => FieldData;
    forceUpdate: (inputElem?: unknown, callback?: () => void) => void;
}

export type FieldInstance = ComponentPublicInstance<Field, FieldProps, FieldExpose>;

export interface FormHooks {
    registerField: (name: string, fieldElem: FieldInstance) => () => void;
    getFieldDecorator: (name: string, fieldData: FieldData, fieldElem: FieldInstance) => (inputElem: InputInstanceLike) => FormInputProps;
}

export declare const FIELD_META_PROP = "__dataFieldMeta";

export declare const FIELD_DATA_PROP = "__dataFieldData";

export declare const DEFAULT_TRIGGER = "onChange";

export declare function toFormEventName(trigger?: string): string;

export type FormInputProps = {
    [FIELD_DATA_PROP]: FormFieldState;
    [FIELD_META_PROP]: Omit<FormFieldMeta, 'fieldElem' | 'inputElem'>;
    [x: string]: unknown;
};

export type FormError = {
    message: string;
    field: string;
    fieldValue: unknown;
};

export type FormFieldState = {
    name: string;
    value?: unknown;
    touched?: boolean;
    dirty?: boolean;
    validating?: boolean;
    errors?: FormError[];
};

export type FormRule = {
    /**
     * 仅在 type 为 array 类型时有效，用于指定数组元素的校验规则
     */
    defaultField?: FormRule;
    /**
     * 是否匹配枚举中的值，使用时需要将 type 设置为 enum
     */
    enum?: unknown[];
    /**
     * string 类型时为字符串长度；number 类型时为确定数字；array 类型时为数组长度
     */
    len?: number;
    /**
     * 必须设置 type：string 类型为字符串最大长度；number 类型时为最大值；array 类型时为数组最大长度
     */
    max?: number;
    /**
     * 错误信息，不设置时会通过 validateMessages 自动生成
     */
    message?: string;
    /**
     * 必须设置 type：string 类型为字符串最小长度；number 类型时为最小值；array 类型时为数组最小长度
     */
    min?: number;
    /**
     * 正则表达式匹配
     */
    pattern?: string | RegExp;
    /**
     * 是否为必选字段
     */
    required?: boolean;
    /**
     * 将字段值转换成目标值后进行校验
     */
    transform?: string | ((value: unknown) => unknown);
    /**
     * 类型，常见有 string、number、boolean、url、email、enum、array
     */
    type?: string;
    /**
     * 设置触发验证时机，必须是 Field 的 validateTrigger 的子集
     */
    validateTrigger?: string | string[];
    /**
     * 自定义校验，接收 Promise 作为返回值
     */
    validator?: string | ((rule: FormRule, value: unknown) => void | boolean | Error | Promise<void>);
    /**
     * 如果字段仅包含空格则校验不通过，只在 type: 'string' 时生效
     */
    whitespace?: boolean;
};

export type FormValidateConfig = {
    trigger?: string | string[];
    rules?: FormRule[];
};

export type FormFieldMeta = {
    name?: string;
    initialValue?: unknown;
    trigger?: string;
    valuePropName?: string;
    validate?: FormValidateConfig[];
    validateTrigger?: string | string[];
    preserve?: boolean;
    rules?: FormRule[];
    validateFirst?: boolean;
    hidden?: boolean;
    fieldElem?: FieldInstance;
    inputElem?: InputInstanceLike;
};

type FormFieldRecord = Record<string, FormFieldState>;

type FormMetaRecord = Record<string, FormFieldMeta>;

type NestedFieldGetter = (fullName: string) => unknown;

export declare function isNullValue(value: unknown): boolean;

/**
 * fix: setting data field "xxx" to undefined is invalid.
 *
 * @param {*} value
 * @returns
 */
export declare function fixNullValue(value: unknown): unknown;

export declare function flattenArray<T>(arr: T[][]): T[];

export declare function treeTraverse(path: string | undefined, tree: unknown, isLeafNode: (path: string, value: unknown) => boolean, errorMessage: string, callback: (path: string, node: unknown) => void): void;

export declare function flattenFields(maybeNestedFields: Record<string, unknown>, isLeafNode: (path: string, value: unknown) => boolean, errorMessage: string): Record<string, unknown>;

export declare function normalizeValidateRules(validate: FormValidateConfig[] | null | undefined, rules: FormRule[] | undefined, validateTrigger: string | string[] | undefined): {
    rules: FormRule[];
    trigger: string[];
}[];

export declare function getValidateTriggers(validateRules: FormValidateConfig[]): string[];

export declare function getParams(ns?: string[] | string | ((errors: Record<string, unknown> | null, values: Record<string, unknown>) => void) | Record<string, unknown>, opt?: Record<string, unknown> | ((errors: Record<string, unknown> | null, values: Record<string, unknown>) => void), cb?: (errors: Record<string, unknown> | null, values: Record<string, unknown>) => void): {
    names: string[] | string | undefined;
    options: Record<string, unknown>;
    callback: (errors: Record<string, unknown> | null, values: Record<string, unknown>) => void;
};

export declare function isEmptyObject(obj: Record<string, unknown>): boolean;

export declare function hasRules(validate: FormValidateConfig[] | undefined): boolean;

export declare function getErrorStrs(errors: FormError[] | undefined): (string | FormError)[];

export declare function startsWith(str: string, prefix: string): boolean;

export declare function getValueFromEvent(e: {
    detail?: {
        value?: unknown;
        checked?: boolean;
        type?: string;
    };
    value?: unknown;
    checked?: boolean;
    type?: string;
} | undefined): unknown;

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
 */
export declare function transformRules(rules: FormRule[], vm?: Record<string, unknown>): {
    /**
     * 仅在 type 为 array 类型时有效，用于指定数组元素的校验规则
     */
    defaultField?: FormRule;
    /**
     * 是否匹配枚举中的值，使用时需要将 type 设置为 enum
     */
    enum?: unknown[];
    /**
     * string 类型时为字符串长度；number 类型时为确定数字；array 类型时为数组长度
     */
    len?: number;
    /**
     * 必须设置 type：string 类型为字符串最大长度；number 类型时为最大值；array 类型时为数组最大长度
     */
    max?: number;
    /**
     * 错误信息，不设置时会通过 validateMessages 自动生成
     */
    message?: string;
    /**
     * 必须设置 type：string 类型为字符串最小长度；number 类型时为最小值；array 类型时为数组最小长度
     */
    min?: number;
    /**
     * 正则表达式匹配
     */
    pattern?: string | RegExp;
    /**
     * 是否为必选字段
     */
    required?: boolean;
    /**
     * 将字段值转换成目标值后进行校验
     */
    transform?: string | ((value: unknown) => unknown);
    /**
     * 类型，常见有 string、number、boolean、url、email、enum、array
     */
    type?: string;
    /**
     * 设置触发验证时机，必须是 Field 的 validateTrigger 的子集
     */
    validateTrigger?: string | string[];
    /**
     * 自定义校验，接收 Promise 作为返回值
     */
    validator?: string | ((rule: FormRule, value: unknown) => void | boolean | Error | Promise<void>);
    /**
     * 如果字段仅包含空格则校验不通过，只在 type: 'string' 时生效
     */
    whitespace?: boolean;
}[];

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
 */
export declare function replaceMessage(template: string, kv: Record<string, string>): string;

declare class Field {
    constructor(fields: FormFieldState);
}

export declare function isFormField(obj: unknown): obj is Field;

export declare function createFormField(field: FormFieldState): Field;

export declare function internalFlattenFields(fields: Record<string, unknown>): Record<string, unknown>;

declare class FieldsStore {
    fields: FormFieldRecord;
    fieldsMeta: FormMetaRecord;
    constructor(fields?: Record<string, unknown>);
    updateFields(fields: Record<string, unknown>): void;
    flattenRegisteredFields(fields: Record<string, unknown>): Record<string, unknown>;
    setFieldsInitialValue: (initialValues: Record<string, unknown>) => void;
    setFields(fields: FormFieldRecord): void;
    resetFields(ns?: string[]): FormFieldRecord;
    setFieldMeta(name: string, meta: FormFieldMeta): void;
    setFieldsAsDirty(): void;
    getFieldMeta(name: string): FormFieldMeta;
    getValueFromFields(name: string, fields: FormFieldRecord): unknown;
    getAllValues: () => Record<string, unknown>;
    getValidFieldsName(): string[];
    getAllFieldsName(): string[];
    getValidFieldsFullName(maybePartialName: string[] | string): string[];
    getFieldValuePropValue(fieldMeta: Pick<FormFieldMeta, 'name' | 'valuePropName' | 'initialValue'>): {
        [x: string]: unknown;
    };
    getField(name: string): {
        name: string;
        value?: unknown;
        touched?: boolean;
        dirty?: boolean;
        validating?: boolean;
        errors?: FormError[];
    };
    getNotCollectedFields(): Record<string, unknown>;
    getNestedAllFields(): Record<string, unknown>;
    getFieldMember(name: string, member: keyof FormFieldState): unknown;
    getNestedFields(names: string[] | undefined, getter: NestedFieldGetter): Record<string, unknown>;
    getNestedField(name: string, getter: NestedFieldGetter): unknown;
    getFieldsValue: (names?: string[]) => Record<string, unknown>;
    getFieldValue: (name: string) => unknown;
    getFieldsError: (names?: string[]) => Record<string, unknown>;
    getFieldError: (name: string) => unknown;
    isFieldValidating: (name: string) => unknown;
    isFieldsValidating: (ns?: string[]) => boolean;
    isFieldTouched: (name: string) => unknown;
    isFieldsTouched: (ns?: string[]) => boolean;
    clearField(name: string): void;
}

export default function createFieldsStore(fields?: Record<string, unknown>): FieldsStore;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;

export declare const fieldProps: {
    prefixCls: {
        type: StringConstructor;
        default: string;
    };
    initialValue: {
        type: any;
        default: any;
    };
    valuePropName: {
        type: StringConstructor;
        default: string;
    };
    trigger: {
        type: StringConstructor;
        default: string;
    };
    validate: {
        type: ArrayConstructor;
        default: any[];
    };
    validateTrigger: {
        type: (ArrayConstructor | StringConstructor)[];
        default: string;
    };
    preserve: {
        type: BooleanConstructor;
        default: boolean;
    };
    rules: {
        type: ArrayConstructor;
        default: any[];
    };
    validateFirst: {
        type: BooleanConstructor;
        default: boolean;
    };
    hidden: {
        type: BooleanConstructor;
        default: boolean;
    };
    childElementPosition: {
        type: StringConstructor;
        default: string;
    };
    cellPrefixCls: {
        type: StringConstructor;
        default: string;
    };
    label: {
        type: StringConstructor;
        default: string;
    };
    labelWrap: {
        type: BooleanConstructor;
        default: boolean;
    };
    extra: {
        type: StringConstructor;
        default: string;
    };
    isLink: {
        type: BooleanConstructor;
        default: boolean;
    };
    align: {
        type: StringConstructor;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    readOnly: {
        type: BooleanConstructor;
        default: boolean;
    };
    validateStatus: {
        type: any;
        default: any;
    };
    required: {
        type: any;
        default: any;
    };
    help: {
        type: any;
        default: any;
    };
    hasFeedback: {
        type: BooleanConstructor;
        default: boolean;
    };
};

export declare const formProps: {
    prefixCls: {
        type: StringConstructor;
        default: string;
    };
    cellGroupPrefixCls: {
        type: StringConstructor;
        default: string;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    label: {
        type: StringConstructor;
        default: string;
    };
    mode: {
        type: StringConstructor;
        default: string;
    };
    bodyStyle: {
        type: (ObjectConstructor | StringConstructor)[];
        default: string;
    };
    layout: {
        type: StringConstructor;
        default: string;
    };
    validateMessages: {
        type: any;
        default: any;
    };
    requiredMarkStyle: {
        type: StringConstructor;
        default: string;
    };
    asteriskText: {
        type: StringConstructor;
        default: string;
    };
    requiredText: {
        type: StringConstructor;
        default: string;
    };
    optionalText: {
        type: StringConstructor;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    readOnly: {
        type: BooleanConstructor;
        default: boolean;
    };
};

export declare function eq(value: unknown, other: unknown): boolean;

export declare function set(object: Record<string, unknown> | null | undefined, path: unknown, value: unknown): Record<string, unknown>;

export declare function get(object: unknown, path: unknown, defaultValue?: unknown): unknown;

declare let warning: (condition: unknown, format?: string, ...args: unknown[]) => void;
