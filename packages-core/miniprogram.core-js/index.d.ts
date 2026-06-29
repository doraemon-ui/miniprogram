export declare function nextTick(fn: (...args: any[]) => any): void;

export declare function styleToCssString(rules: string | Record<string, any>, options?: {
    exclude?: RegExp;
}): string;

/**
 * @ts-ignore
 */
/**
 * 扩展的 CSS 样式属性接口，支持 CSS 自定义属性（CSS 变量）
 *
 * 继承自标准的 CSSStyleProperties 接口，增加了对 CSS 自定义属性（CSS Variables）的类型支持。
 * CSS 自定义属性是以 `--` 开头的属性，如 `--primary-color`、`--spacing` 等。
 *
 * @example
 * ```ts
 * // 基本使用
 * const style: CSSStylePropertiesWithVars = {};
 * style.color = 'red';
 * style['--primary-color'] = '#007bff';
 * style['--spacing'] = 16;
 * ```
 *
 * @see {@link https://developer.mozilla.org/docs/Web/API/CSSStyleProperties | CSSStyleProperties MDN}
 * @see {@link https://developer.mozilla.org/docs/Web/CSS/Using_CSS_custom_properties | CSS 自定义属性 MDN}
 */
export type CSSStylePropertiesWithVars = Partial<CSSStyleProperties> & {
    [key: `--${string}`]: string | number | undefined;
};

export declare function warn(msg: string, vm?: Doraemon): void;

export declare function isEqual(x: any, y: any): boolean;

/**
 * DebounceOptions类型定义
 */
export type DebounceOptions = {
    /**
     * leading
     * @type {boolean}
     */
    leading: boolean;
    /**
     * trailing
     * @type {boolean}
     */
    trailing: boolean;
    /**
     * maxWait
     * @type {number}
     */
    maxWait: number;
};

interface NoReturn<T extends (...args: any[]) => any> {
    (...args: Parameters<T>): any;
}

/**
 * DebounceReturn类型定义
 */
export type DebounceReturn<T extends (...args: any[]) => any> = NoReturn<T> & {
    cancel: () => void;
    flush: () => any;
    pending: () => boolean;
};

export declare function debounce<T extends (...args: any[]) => any>(func: T, wait?: number, options?: DebounceOptions): DebounceReturn<T>;

/**
 * ExtractComputedReturns类型定义
 */
export type ExtractComputedReturns<T extends any> = {
    [key in keyof T]: T[key] extends {
        get: (...args: any[]) => infer TReturn;
    } ? TReturn : T[key] extends (...args: any[]) => infer TReturn ? TReturn : never;
};

/**
 * ComputedGetter类型定义
 */
export type ComputedGetter<T> = () => T;

/**
 * ComputedSetter类型定义
 */
export type ComputedSetter<T> = (newValue: T) => void;

/**
 * ComputedOptions接口定义
 */
export interface ComputedOptions<T> {
    /**
     * get
     * @type {ComputedGetter<T>}
     */
    get: ComputedGetter<T>;
    /**
     * set
     * @type {ComputedSetter<T>}
     */
    set: ComputedSetter<T>;
}

/**
 * DefaultData类型定义
 */
export type DefaultData<D> = object | ((this: D) => object);

/**
 * DefaultProps类型定义
 */
export type DefaultProps = Record<string, any>;

/**
 * DefaultMethods类型定义
 */
export type DefaultMethods<D> = {
    [key: string]: (this: D, ...args: any[]) => any;
};

/**
 * DefaultComputed类型定义
 */
export type DefaultComputed = Record<string, ComputedGetter<any> | ComputedOptions<any>>;

/**
 * Parent relation type.
 */
export type ParentRelationType = 'parent' | 'ancestor';

/**
 * Child relation type.
 */
export type ChildRelationType = 'child' | 'descendant';

/**
 * Relation type.
 */
export type RelationType = ParentRelationType | ChildRelationType;

/**
 * RelationComponent类型定义
 */
export type RelationComponent<D> = {
    ['module']?: string;
    type?: RelationType;
    observer?: string | ((target: D) => void);
    debounce?: number | boolean | {
        wait?: number;
        options?: Partial<DebounceOptions>;
    };
};

/**
 * ComponentOptions接口定义
 */
export interface ComponentOptions<D extends Doraemon, Data = DefaultData<D>, Methods = DefaultMethods<D>, Computed = DefaultComputed, PropsDef = PropsDefinition<DefaultProps>> {
    data?: Data;
    props?: PropsDef;
    computed?: Computed;
    methods?: Methods;
    watch?: Record<string, WatchOptionsWithHandler<any> | WatchHandler<any>>;
    beforeCreate?(this: D): void;
    created?(): void;
    mounted?(): void;
    /**
     * @deprecated use `unmounted` instead
     */
    destroyed?(): void;
    unmounted?(): void;
    errorCaptured?(): void;
    components?: {
        [key: string]: string | Partial<RelationComponent<D>> | (() => Partial<RelationComponent<D>>);
    };
    mixins?: (ComponentOptions<Doraemon> | typeof Doraemon)[];
    name?: string;
    expose?: string[];
}

/**
 * Prop类型定义
 */
export type Prop<T> = {
    (): T;
} | {
    new (...args: never[]): T & object;
} | {
    new (...args: string[]): Function;
};

/**
 * PropType类型定义
 */
export type PropType<T> = Prop<T> | Prop<T>[];

/**
 * PropValidator类型定义
 */
export type PropValidator<T> = PropOptions<T> | PropType<T>;

/**
 * PropOptions接口定义
 */
export interface PropOptions<T = any> {
    /**
     * type
     * @type {PropType<T>}
     */
    type?: PropType<T>;
    default?: T | null | undefined | (() => T | null | undefined);
}

/**
 * RecordPropsDefinition类型定义
 */
export type RecordPropsDefinition<T> = {
    [K in keyof T]: PropValidator<T[K]>;
};

/**
 * ArrayPropsDefinition类型定义
 */
export type ArrayPropsDefinition<T> = (keyof T)[];

/**
 * PropsDefinition类型定义
 */
export type PropsDefinition<T> = ArrayPropsDefinition<T> | RecordPropsDefinition<T>;

/**
 * WatchHandler类型定义
 */
export type WatchHandler<T> = string | ((val: T, oldVal: T) => void);

/**
 * WatchOptions接口定义
 */
export interface WatchOptions {
    /**
     * deep
     * @type {boolean}
     */
    deep?: boolean;
    /**
     * immediate
     * @type {boolean}
     */
    immediate?: boolean;
}

/**
 * WatchOptionsWithHandler接口定义
 */
export interface WatchOptionsWithHandler<T> extends WatchOptions {
    /**
     * handler
     * @type {WatchHandler<T>}
     */
    handler: WatchHandler<T>;
}

/**
 * Class inheritance
 *
 * @param {ComponentOptions<Doraemon>} [extendOptions={}]
 * @returns
 */
export declare function extend(extendOptions?: ComponentOptions<Doraemon>): any;

export declare const util: {
    warn: typeof warn;
    isEqual: typeof isEqual;
    classNames: (...args: any[]) => string;
    styleToCssString: typeof styleToCssString;
};

/**
 * Config类型定义
 */
export type Config = {
    /**
     * 取消所有的日志与警告
     *
     * @type {boolean}
     */
    silent: boolean;
    /**
     * 当前的主题
     *
     * auto: 跟随系统, dark: 深色模式, light 浅色模式
     *
     * @type {('auto' | 'dark' | 'light')}
     */
    darkmode: 'auto' | 'dark' | 'light';
    /**
     * 是否记录性能
     */
    performance: boolean;
    /**
     * 警告函数
     *
     */
    warnHandler: (msg: string) => void;
    /**
     * 生命周期钩子函数
     *
     * @type {string[]}
     */
    _lifecycleHooks: string[];
};

export declare const config: Config;

export declare class Doraemon implements ComponentInternalInstance {
    _isDoraemon: boolean;
    _isMounted: boolean;
    _isDestroyed: boolean;
    _hasHookEvent: boolean;
    /**
     * miniprogram component instance
     *
     * @type {ComponentRenderProxy<Doraemon>}
     * @memberof Doraemon
     */
    _renderProxy: ComponentRenderProxy<Doraemon>;
    _exposed: Record<string, any> | null;
    _exposeProxy: Record<string, any> | null;
    _uid: number;
    _self: this;
    $options: ComponentOptions<Doraemon>;
    get $root(): ComponentPublicInstance;
    get $parent(): ComponentPublicInstance;
    get $children(): ComponentPublicInstance[];
    get $refs(): {
        [key: string]: ComponentPublicInstance | ComponentPublicInstance[] | undefined;
    };
    get $data(): Record<string, any>;
    get $props(): Record<string, any>;
    $emit: (event: string, ...args: any[]) => this;
    $nextTick: (fn: (this: this) => void) => void;
    /**
     * Creates an instance of Doraemon.
     *
     * @param {ComponentOptions<Doraemon>} [options]
     * @memberof Doraemon
     */
    constructor(options?: ComponentOptions<Doraemon>);
    /**
     * init.
     *
     * @param {ComponentOptions<Doraemon>} [options]
     * @memberof Doraemon
     */
    _init(options?: ComponentOptions<Doraemon>): void;
    /**
     * proxy miniprogram component instance.
     *
     * @param {ComponentRenderProxy<Doraemon>} vm
     * @memberof Doraemon
     */
    _render(vm: ComponentRenderProxy<Doraemon>): void;
    static cid: number;
    static options: ComponentOptions<Doraemon>;
    static nextTick: typeof nextTick;
    static extend: typeof extend;
    static get config(): Config;
    static set config(_: Config);
    /**
     * exposed util methods.
     *
     * @static
     * @memberof Doraemon
     */
    static util: typeof util;
    static super: typeof Doraemon;
    static superOptions: ComponentOptions<Doraemon>;
    static extendOptions: ComponentOptions<Doraemon>;
    static sealedOptions: ComponentOptions<Doraemon>;
}

/**
 * DoraemonClass类型定义
 */
export type DoraemonClass<D> = {
    new (...args: any[]): D & Doraemon;
} & typeof Doraemon;

type TCustomInstanceProperty<D extends Doraemon> = {
    /** 组件实例本身 */
    $component: D;
    /**
     * 获取这个关系所对应的所有关联节点，参见 组件间关系
     * @note tt API 均为异步 API，需要指定回调函数
     */
    getRelationNodes(relationKey: string): ComponentRenderProxy<D>[];
    getRelationNodes(relationKey: string, callback?: CallableFunction): void;
};

/**
 * ComponentRenderProxy类型定义
 */
export type ComponentRenderProxy<D extends Doraemon> = WechatMiniprogram.Component.Instance<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, Partial<WechatMiniprogram.Component.MethodOption>, TCustomInstanceProperty<D>>;

/**
 * IfAny类型定义
 */
export type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N;

/**
 * Prettify类型定义
 */
export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

/**
 * ComponentCustomProperties接口定义
 */
export interface ComponentCustomProperties {
}

/**
 * ComponentPublicInstance类型定义
 */
export type ComponentPublicInstance<D extends Doraemon = Doraemon, Props = {}, RawBindings = {}, Data = {}, Computed extends DefaultComputed = {}, Methods extends DefaultMethods<D> = {}, PublicProps = Props> = {
    $options: ComponentOptions<D>;
    $root: ComponentPublicInstance | undefined;
    $parent: ComponentPublicInstance | undefined;
    $children: ComponentPublicInstance[];
    $refs: {
        [key: string]: ComponentPublicInstance | ComponentPublicInstance[] | undefined;
    };
    $data: Data;
    $props: Prettify<Props> & PublicProps;
    $emit: (event: string, ...args: any[]) => ComponentPublicInstance;
    $nextTick: (fn: (this: ComponentPublicInstance) => void) => void;
} & IfAny<Props, Props, Omit<Props, keyof RawBindings>> & RawBindings & ExtractComputedReturns<Computed> & Methods & ComponentCustomProperties;

/**
 * ComponentInternalInstance接口定义
 */
export interface ComponentInternalInstance<D extends Doraemon = Doraemon> extends ComponentPublicInstance<D> {
    /**
     * _isDoraemon
     * @type {boolean}
     */
    _isDoraemon: boolean;
    /**
     * _isMounted
     * @type {boolean}
     */
    _isMounted: boolean;
    /**
     * _isDestroyed
     * @type {boolean}
     */
    _isDestroyed: boolean;
    /**
     * _hasHookEvent
     * @type {boolean}
     */
    _hasHookEvent: boolean;
    /**
     * _renderProxy
     * @type {ComponentRenderProxy<D>}
     */
    _renderProxy: ComponentRenderProxy<D>;
    /**
     * _exposed
     * @type {Record<string, any> | null}
     */
    _exposed: Record<string, any> | null;
    /**
     * _exposeProxy
     * @type {Record<string, any> | null}
     */
    _exposeProxy: Record<string, any> | null;
    /**
     * _uid
     * @type {number}
     */
    _uid: number;
    /**
     * _self
     * @type {this}
     */
    _self: this;
    /**
     * init.
     */
    _init: (options?: ComponentOptions<D>) => void;
    /**
     * proxy miniprogram component instance.
     */
    _render: (vm: ComponentRenderProxy<D>) => void;
}

export { Doraemon };

export type DecoratedClass = {
    new (...args: any[]): any;
} & {
    __decorators__?: any;
};

/**
 * DoraemonDecorator接口定义
 */
export interface DoraemonDecorator {
    (Ctor: typeof Doraemon): void;
    (target: Doraemon, key: string): void;
    (target: Doraemon, key: string, index: number): void;
}

export declare function createDecorator(factory: (options: ComponentOptions<Doraemon>, key: string, index: number) => void): DoraemonDecorator;

export declare const $internalHooks: string[];

export declare function componentFactory(Component: DoraemonClass<Doraemon>, options?: ComponentOptions<Doraemon>): DoraemonClass<Doraemon>;

export declare function collectDataFromConstructor(vm: any, Component: DoraemonClass<Doraemon>): {};

declare function Component<D extends Doraemon>(options: ComponentOptions<D> & ThisType<D>): <DC extends DoraemonClass<D>>(target: DC) => DC;

declare function Component<DC extends DoraemonClass<Doraemon>>(target: DC): DC;

declare namespace Component {
    var registerHooks: (keys: string[]) => void;
}

export { Component };

/**
 * decorator of an event-emitter function
 *
 * @param  event The name of the event
 * @return MethodDecorator
 */
export declare function Emit(event?: string): MethodDecorator;

/**
 * IAnyObject类型定义
 */
export type IAnyObject = Record<string, any>;

/**
 * Target类型定义
 */
export type Target<D extends IAnyObject = IAnyObject> = {
    /**
     * 事件组件的 id
     */
    id: string;
    /**
     * 当前组件的类型
     */
    tagName?: string;
    /**
     * 事件组件上由 `data-` 开头的自定义属性组成的集合
     */
    dataset: D;
    /**
     * 距离页面顶部的偏移量
     */
    offsetTop: number;
    /**
     * 距离页面左边的偏移量
     */
    offsetLeft: number;
};

/**
 * BaseEvent接口定义
 */
export interface BaseEvent<M extends IAnyObject = IAnyObject, C extends IAnyObject = IAnyObject, T extends IAnyObject = C> {
    /**
     * 事件类型
     */
    type: string;
    /**
     * 页面打开到触发事件所经过的毫秒数
     */
    timeStamp: number;
    /**
     * 事件冒泡路径上所有由 `mark:` 开头的自定义属性组成的集合
     */
    mark?: M;
    /**
     * 触发事件的源组件
     */
    target: Target<T>;
    /**
     * 事件绑定的当前组件
     */
    currentTarget: Target<C>;
}

/**
 * CustomEvent接口定义
 */
export interface CustomEvent<D extends IAnyObject = IAnyObject, M extends IAnyObject = IAnyObject, C extends IAnyObject = IAnyObject, T extends IAnyObject = C> extends BaseEvent<M, C, T> {
    /**
     * 额外的信息
     */
    detail: D;
    /**
     * 触发事件的源组件
     */
    target: Target<T> & D;
    /**
     * 事件绑定的当前组件
     */
    currentTarget: Target<C> & D;
    preventDefault(): void;
    stopPropagation(): void;
}

/**
 * TouchDetail接口定义
 */
export interface TouchDetail {
    /**
     * 距离页面可显示区域 (屏幕除去导航条) 左上角距离，横向为 X 轴
     */
    clientX: number;
    /**
     * 距离页面可显示区域 (屏幕除去导航条) 左上角距离，纵向为 Y 轴
     */
    clientY: number;
    /**
     * 触摸点的标识符
     */
    identifier: number;
    /**
     * 距离文档左上角的距离，文档的左上角为原点，横向为 X 轴
     */
    pageX: number;
    /**
     * 距离文档左上角的距离，文档的左上角为原点，纵向为 Y 轴
     */
    pageY: number;
}

/**
 * TouchEvent接口定义
 */
export interface TouchEvent<D extends IAnyObject = IAnyObject, M extends IAnyObject = IAnyObject, C extends IAnyObject = IAnyObject, T extends IAnyObject = C> extends CustomEvent<D, M, C, T> {
    /**
     * 触摸事件，当前停留在屏幕中的触摸点信息的数组
     */
    touches: TouchDetail[];
    /**
     * 触摸事件，当前变化的触摸点信息的数组
     */
    changedTouches: TouchDetail[];
}

/**
 * decorator of an event function
 *
 * @return MethodDecorator
 */
export declare function Event(): MethodDecorator;

type Constructor = {
    new (...args: any[]): any;
};

/**
 * decorator of a prop
 *
 * @param  options the options for the prop
 * @return PropertyDecorator | void
 */
export declare function Prop(options?: PropOptions | Constructor[] | Constructor): PropertyDecorator;

/**
 * decorator of a watch function
 *
 * @param  path the path or the expression to observe
 * @param  WatchOption
 * @return MethodDecorator
 */
export declare function Watch(path: string, watchOptions?: WatchOptions): MethodDecorator;

/**
 * ComponentExternalOptions接口定义
 */
export interface ComponentExternalOptions extends WechatMiniprogram.Component.ComponentOptions {
    /**
     * 组件接受的外部样式类
     */
    externalClasses?: string[];
    /**
     * 组件自定义导出
     */
    expose?: () => WechatMiniprogram.IAnyObject;
    /**
     * 组件间代码共享
     */
    behaviors?: WechatMiniprogram.Behavior.BehaviorIdentifier[];
    /**
     * 组件的内部数据
     */
    data?: Record<string, any> | (() => Record<string, any>);
}

export declare function defineComponentHOC(externalOptions?: ComponentExternalOptions): (target: DoraemonClass<Doraemon>) => WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export declare function toNative(target: DoraemonClass<Doraemon>): WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

/**
 * Runtime environment types.
 * - WEAPP: WeChat Miniporgram
 * - TT: Douyin/Toutiao Miniporgram
 */
export declare enum ENV_TYPE {
    WEAPP = "WEAPP",
    TT = "TT"
}

/**
 * Current Miniporgram global object.
 */
export declare const miniprogramThis: any;

/**
 * Miniporgram environment sniffing.
 */
export declare const inMiniprogram: boolean;

/**
 * Get the current runtime environment type.
 *
 * @returns Current environment type.
 */
export declare const getEnv: () => ENV_TYPE;

/**
 * Whether the current build is running in development mode.
 */
export declare const isDev: boolean;

/**
 * ThrottleOptions类型定义
 */
export type ThrottleOptions = Omit<DebounceOptions, 'maxWait'>;

/**
 * ThrottleReturn类型定义
 */
export type ThrottleReturn<T extends (...args: any[]) => any> = DebounceReturn<T>;

export declare function throttle<T extends (...args: any[]) => any>(func: T, wait?: number, options?: ThrottleOptions): ThrottleReturn<T>;

interface RelationOption {
    /**
     * 目标组件的相对关系
     */
    type: RelationType;
    /**
     * 关系生命周期函数，当关系被建立在页面节点树中时触发，触发时机在组件attached生命周期之后
     */
    linked?(target: ComponentRenderProxy<Doraemon>): void;
    /**
     * 关系生命周期函数，当关系在页面节点树中发生改变时触发，触发时机在组件moved生命周期之后
     */
    linkChanged?(target: ComponentRenderProxy<Doraemon>): void;
    /**
     * 关系生命周期函数，当关系脱离页面节点树时触发，触发时机在组件detached生命周期之后
     */
    unlinked?(target: ComponentRenderProxy<Doraemon>): void;
    /**
     * 如果这一项被设置，则它表示关联的目标节点所应具有的behavior，所有拥有这一behavior的组件节点都会被关联
     */
    target?: string;
}

export declare function useDebounceFn(node: ComponentRenderProxy<Doraemon>, fn: Function, wait: number, options: Partial<DebounceOptions>): {
    run: DebounceReturn<any>;
    cancel: () => void;
    flush: () => any;
};

export declare function useThrottleFn(node: ComponentRenderProxy<Doraemon>, fn: Function, wait: number, options: ThrottleOptions): {
    run: ThrottleReturn<any>;
    cancel: () => void;
    flush: () => any;
};

export declare function initComponents(vm: Doraemon, components: ComponentOptions<Doraemon>['components']): {
    [componentName: string]: RelationOption;
};

export declare function getData(comp: string | Partial<RelationComponent<Doraemon>> | (() => Partial<RelationComponent<Doraemon>>)): RelationComponent<Doraemon>;

export declare function useRelation(relations?: {
    [componentName: string]: RelationOption;
}): WechatMiniprogram.Behavior.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption, WechatMiniprogram.Component.BehaviorOption>;

export declare function initComputed(vm: Doraemon, forceUpdate?: boolean): void;

export declare function getDefaultData(vm: Doraemon): Record<string, any>;

export declare function initData(vm: Doraemon): void;

export declare function initExposed(vm: Doraemon): Record<string, any>;

/**
 * PublicPropertiesMap类型定义
 */
export type PublicPropertiesMap = Record<string, (i: ComponentInternalInstance) => any>;

export declare const publicPropertiesMap: PublicPropertiesMap;

export declare function getExposeProxy(vm: ComponentInternalInstance): Record<string, any>;

export declare function getPublicInstance(vm: ComponentInternalInstance): ComponentPublicInstance | ComponentInternalInstance['_exposed'] | ComponentInternalInstance | null;

export declare function initLifecycle(vm: Doraemon, options: ComponentOptions<Doraemon>): void;

export declare function callHook(vm: Doraemon, hook: string): void;

export declare function logicalTree(): WechatMiniprogram.Behavior.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption, WechatMiniprogram.Component.BehaviorOption>;

export declare function findLogicalAncestorsByAliases(vm: Doraemon, aliases: string[], directOnly?: boolean): ComponentRenderProxy<Doraemon>[];

export declare function findLogicalDescendantsByAliases(vm: Doraemon, aliases: string[], directOnly?: boolean): ComponentRenderProxy<Doraemon>[];

export declare function normalizeNodes(nodes: ComponentRenderProxy<Doraemon>[]): ComponentPublicInstance[];

export declare function getAliasesByPath(vm: Doraemon, path: string): string[];

export declare function findLogicalAncestors(vm: Doraemon, path: string, type?: RelationType): ComponentRenderProxy<Doraemon>[];

export declare function initMethods(vm: Doraemon, methods: ComponentOptions<Doraemon>['methods']): Record<string, any>;

export declare function stateMixin(Component: typeof Doraemon): void;

export declare function renderMixin(Component: typeof Doraemon): void;

export declare function eventsMixin(Component: typeof Doraemon): void;

export declare function initProps(vm: Doraemon, propsOptions: ComponentOptions<Doraemon>['props']): Record<string, any>;

export declare function validateProp(key: string, propsOptions: ComponentOptions<Doraemon>['props'], propsData: ComponentOptions<Doraemon>['data'], vm: Doraemon): any;

export declare function proxy(target: object, sourceKey: string, key: string): void;

export declare function initProxy(vm: Doraemon): void;

export declare function initRefs(vm: Doraemon): void;

export declare function initWatch(vm: Doraemon, watch: ComponentOptions<Doraemon>['watch']): Record<string, (newVal: any) => void>;

export declare function syncPropsToData(props: Record<string, any>, computed: Record<string, any>): WechatMiniprogram.Behavior.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption, WechatMiniprogram.Component.BehaviorOption>;

/**
 * Simple bind
 */
export declare function bind(fn: Function, ctx: Object): Function;

export declare const LIFECYCLE_HOOKS: string[];

export declare function hasOwn(obj: any, key: string): any;

export declare const hasProto: boolean;

export declare function isDef(v: any): boolean;

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
export declare function isPlainObject(obj: any): boolean;

export declare function isPrimitive(value: any): boolean;

export declare function isPromise(obj: any): obj is Promise<any>;

/**
 * Check if a string starts with $ or _
 */
export declare function isReserved(str: string): boolean;

export declare function noop(...args: any[]): any;

/**
 * 更新性能统计
 *
 * @param {*} vm
 * @param {*} options
 */
export declare let setUpdatePerformance: (vm: ComponentRenderProxy<Doraemon>, options?: {
    withDataPaths?: boolean;
    showZero?: boolean;
}) => void;

/**
 * Convert an Array-like object to a real Array.
 */
export declare function toArray(list: any, start?: number): Array<any>;
