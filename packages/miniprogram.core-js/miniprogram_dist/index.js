/**
 * @doraemon-ui/miniprogram.core-js.
 * © 2021 - 2024 Doraemon UI.
 * Built on 2024-03-20, 18:15:34.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.18.
 */

var classnames = {exports: {}};

/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/

(function (module) {
/* global define */

(function () {

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = '';

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (arg) {
				classes = appendClass(classes, parseValue(arg));
			}
		}

		return classes;
	}

	function parseValue (arg) {
		if (typeof arg === 'string' || typeof arg === 'number') {
			return arg;
		}

		if (typeof arg !== 'object') {
			return '';
		}

		if (Array.isArray(arg)) {
			return classNames.apply(null, arg);
		}

		if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
			return arg.toString();
		}

		var classes = '';

		for (var key in arg) {
			if (hasOwn.call(arg, key) && arg[key]) {
				classes = appendClass(classes, key);
			}
		}

		return classes;
	}

	function appendClass (value, newClass) {
		if (!newClass) {
			return value;
		}
	
		if (value) {
			return value + ' ' + newClass;
		}
	
		return value + newClass;
	}

	if (module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else {
		window.classNames = classNames;
	}
}());
}(classnames));

var classNames = classnames.exports;

function a(t, o) {
  const r = RegExp(t, "g");
  return (e) => {
    if (typeof e != "string")
      throw new TypeError(`expected an argument of type string, but got ${typeof e}`);
    return e.match(r) ? e.replace(r, o) : e;
  };
}

const r = a(/[A-Z]/, (o) => `-${o.toLowerCase()}`);

function c(o, r$1 = r) {
  if (!o || typeof o != "object" || Array.isArray(o))
    throw new TypeError(`expected an argument of type object, but got ${typeof o}`);
  return Object.keys(o).map((e) => `${r$1(e)}: ${o[e]};`).join(`
`);
}

const LIFECYCLE_HOOKS = [
    'beforeCreate',
    'created',
    'mounted',
    'destroyed',
    'errorCaptured',
];

const config = {
    /**
     * 取消所有的日志与警告
     */
    silent: false,
    /**
     * 当前的主题
     */
    darkmode: 'auto',
    /**
     * 是否记录性能
     */
    performance: false,
    /**
     * 警告函数
     */
    warnHandler: null,
    /**
     * 生命周期钩子函数
     */
    _lifecycleHooks: LIFECYCLE_HOOKS,
};

const hasConsole = typeof console !== 'undefined';
function warn(msg, vm) {
    if (config.warnHandler) {
        config.warnHandler.call(null, msg);
    }
    else if (hasConsole && (!config.silent)) {
        console.error(`[Doraemon warn]: ${msg}`);
    }
}

/**
 * miniporgram environment sniffing
 */
const inMiniprogram = typeof wx !== 'undefined';
/**
 * development mode
 */
const isDev = "production" !== 'production';
// export const isDev = true

function nextTick(callback) {
    if (inMiniprogram &&
        typeof wx.nextTick === 'function') {
        wx.nextTick(callback);
    }
    else {
        setTimeout(callback, 0);
    }
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray(list, start) {
    start = start || 0;
    let i = list.length - start;
    const ret = new Array(i);
    while (i--) {
        ret[i] = list[i + start];
    }
    return ret;
}

function stateMixin(Component) {
    const dataDef = {};
    dataDef.get = function () { return this._renderProxy ? this._renderProxy.data : undefined; };
    const propsDef = {};
    propsDef.get = function () { return this._renderProxy ? this._renderProxy.properties : undefined; };
    Object.defineProperty(Component.prototype, '$data', dataDef);
    Object.defineProperty(Component.prototype, '$props', propsDef);
}
function renderMixin(Component) {
    Component.prototype.$nextTick = function (fn) {
        return nextTick(fn);
    };
}
function eventsMixin(Component) {
    Component.prototype.$emit = function (event) {
        const args = toArray(arguments, 1);
        if (this._renderProxy) {
            this._renderProxy.triggerEvent(event, ...args);
        }
        return this;
    };
}

/**
 * Check whether an object has the property.
 */
const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
}

/**
 * Check if a string starts with $ or _
 */
function isReserved(str) {
    const c = (str + '').charCodeAt(0);
    return c === 0x24 || c === 0x5F;
}

function noop(...args) { }

const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop,
};
function proxy(target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter() {
        return this._renderProxy[sourceKey][key];
    };
    sharedPropertyDefinition.set = function proxySetter(val) {
        this._renderProxy.setData({
            [key]: val,
        });
    };
    Object.defineProperty(target, key, sharedPropertyDefinition);
}
function initProxy(vm) {
    const props = vm.$options.props;
    const keys = Object.keys(vm._renderProxy.data);
    let i = keys.length;
    while (i--) {
        const key = keys[i];
        if (props && hasOwn(props, key)) {
            continue;
        }
        else if (!isReserved(key)) {
            // 在 extend 时，静态 props & computed 已经在组件的原型上代理
            // 所以只需要在实例上代理其他的 props
            if (!(key in vm)) {
                proxy(vm, 'data', key);
            }
        }
    }
}

function isEqual(x, y) {
    if (x === y) {
        return true;
    }
    if (!(typeof x == 'object' && x != null) || !(typeof y == 'object' && y != null)) {
        return false;
    }
    if (Object.keys(x).length != Object.keys(y).length) {
        return false;
    }
    for (var prop in x) {
        if (y.hasOwnProperty(prop)) {
            if (!isEqual(x[prop], y[prop])) {
                return false;
            }
        }
        else {
            return false;
        }
    }
    return true;
}

let uid = 0;
let cid = 1;
class Doraemon {
    _isDoraemon = false;
    _isMounted = false;
    _isDestroyed = false;
    _renderProxy;
    _uid;
    _self;
    $options;
    get $root() {
        return undefined;
    }
    get $parent() {
        return undefined;
    }
    get $children() {
        return undefined;
    }
    get $refs() {
        return undefined;
    }
    get $data() {
        return undefined;
    }
    get $props() {
        return undefined;
    }
    $emit;
    $nextTick;
    /**
     * Creates an instance of Doraemon.
     *
     * @param {ComponentOptions<Doraemon>} [options]
     * @memberof Doraemon
     */
    constructor(options) {
        this._init(options);
    }
    /**
     * init.
     *
     * @param {ComponentOptions<Doraemon>} [options]
     * @memberof Doraemon
     */
    _init(options) {
        const vm = this;
        vm._uid = uid++;
        vm._isDoraemon = true;
        vm.$options = Object.assign({}, vm.constructor.options, options || {});
        vm._self = vm;
    }
    /**
     * proxy miniprogram instance.
     *
     * @param {ComponentRenderProxy<Doraemon>} vm
     * @memberof Doraemon
     */
    _render(vm) {
        this._renderProxy = vm;
    }
    static cid = 0;
    static options = {};
    static nextTick = nextTick;
    static extend = extend;
    static get config() {
        return config;
    }
    static set config(_) {
    }
    /**
     * exposed util methods.
     *
     * @static
     * @memberof Doraemon
     */
    static util = {
        warn,
        isEqual,
        classNames,
        styleToCssString: c,
    };
}
/**
 * Class inheritance
 *
 * @param {ComponentOptions<Doraemon>} [extendOptions={}]
 * @returns
 */
function extend(extendOptions = {}) {
    const Super = this;
    const SuperId = Super.cid;
    const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
        return cachedCtors[SuperId];
    }
    const Sub = function DoraemonComponent(options = {}) {
        this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = Object.assign({}, Super.options, extendOptions);
    Sub.extend = Super.extend;
    Sub['super'] = Super;
    // 在这里 props & computed 定义在原型上
    // 避免为每个创建的实例调用 Object.defineProperty
    if (Sub.options.props) {
        initProps$1(Sub);
    }
    if (Sub.options.computed) {
        initComputed$1(Sub);
    }
    // keep a reference to the super options at extension time
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = Object.assign({}, Sub.options);
    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub;
}
function initProps$1(Component) {
    const props = Component.options.props || {};
    for (const key in props) {
        proxy(Component.prototype, 'data', key);
    }
}
function initComputed$1(Component) {
    const computed = Component.options.computed || {};
    for (const key in computed) {
        proxy(Component.prototype, 'data', key);
    }
}
stateMixin(Doraemon);
eventsMixin(Doraemon);
renderMixin(Doraemon);

const fakeArray = { __proto__: [] };
const hasProto = fakeArray instanceof Array;

function isPrimitive(value) {
    const type = typeof value;
    return value == null || (type !== 'object' && type !== 'function');
}

function createDecorator(factory) {
    return (target, key, index) => {
        const Ctor = typeof target === 'function'
            ? target
            : target.constructor;
        if (!Ctor.__decorators__) {
            Ctor.__decorators__ = [];
        }
        if (typeof index !== 'number') {
            index = undefined;
        }
        Ctor.__decorators__.push(options => factory(options, key, index));
    };
}
const $internalHooks = [
    'data',
    ...LIFECYCLE_HOOKS,
];
function componentFactory(Component, options = {}) {
    options.name = options.name || Component._componentTag || Component.name;
    // prototype props.
    const proto = Component.prototype;
    Object.getOwnPropertyNames(proto).forEach(function (key) {
        if (key === 'constructor') {
            return;
        }
        // hooks
        if ($internalHooks.indexOf(key) > -1) {
            options[key] = proto[key];
            return;
        }
        const descriptor = Object.getOwnPropertyDescriptor(proto, key);
        if (descriptor.value !== void 0) {
            // methods
            if (typeof descriptor.value === 'function') {
                (options.methods || (options.methods = {}))[key] = descriptor.value;
            }
            else {
                // typescript decorated data
                (options.mixins || (options.mixins = [])).push({
                    data() {
                        return { [key]: descriptor.value };
                    },
                });
            }
        }
        else if (descriptor.get || descriptor.set) {
            // computed properties
            (options.computed || (options.computed = {}))[key] = {
                get: descriptor.get,
                set: descriptor.set,
            };
        }
    });
    (options.mixins || (options.mixins = [])).push({
        data() {
            return collectDataFromConstructor(this, Component);
        },
    });
    // decorate options
    const decorators = Component.__decorators__;
    if (decorators) {
        decorators.forEach(fn => fn(options));
        delete Component.__decorators__;
    }
    // find super
    const superProto = Object.getPrototypeOf(Component.prototype);
    const Super = superProto instanceof Doraemon
        ? superProto.constructor
        : Doraemon;
    const Extended = Super.extend(options);
    forwardStaticMembers(Extended, Component, Super);
    return Extended;
}
function forwardStaticMembers(Extended, Original, Super) {
    // We have to use getOwnPropertyNames since Babel registers methods as non-enumerable
    Object.getOwnPropertyNames(Original).forEach(key => {
        // `prototype` should not be overwritten
        if (key === 'prototype') {
            return;
        }
        // Some browsers does not allow reconfigure built-in properties
        const extendedDescriptor = Object.getOwnPropertyDescriptor(Extended, key);
        if (extendedDescriptor && !extendedDescriptor.configurable) {
            return;
        }
        const descriptor = Object.getOwnPropertyDescriptor(Original, key);
        if (!hasProto) {
            if (key === 'cid') {
                return;
            }
            const superDescriptor = Object.getOwnPropertyDescriptor(Super, key);
            if (!isPrimitive(descriptor.value) &&
                superDescriptor &&
                superDescriptor.value === descriptor.value) {
                return;
            }
        }
        Object.defineProperty(Extended, key, descriptor);
    });
}
function collectDataFromConstructor(vm, Component) {
    // override _init to prevent to init as Doraemon instance
    const originalInit = Component.prototype._init;
    Component.prototype._init = function () {
        // proxy to actual vm
        const keys = Object.getOwnPropertyNames(vm);
        const props = vm.$options.props || {};
        if (props) {
            for (const key in props) {
                if (!this.hasOwnProperty(key)) {
                    keys.push(key);
                }
            }
        }
        keys.forEach(key => {
            if (key.charAt(0) !== '_') {
                Object.defineProperty(this, key, {
                    get: () => vm[key],
                    // set: value => { vm[key] = value },
                    set: value => {
                        if (!(props && hasOwn(props, key))) {
                            vm[key] = value !== undefined ? value : null;
                        }
                    },
                    configurable: true,
                });
            }
        });
    };
    // should be acquired class property values
    const data = new Component();
    // restore original _init to avoid memory leak
    Component.prototype._init = originalInit;
    // create plain data object
    const plainData = {};
    Object.keys(data).forEach(key => {
        if (data[key] !== undefined) {
            plainData[key] = data[key];
        }
    });
    return plainData;
}
function Component$1(options) {
    if (typeof options === 'function') {
        return componentFactory(options);
    }
    return function (Component) {
        return componentFactory(Component, options);
    };
}
Component$1.registerHooks = function registerHooks(keys) {
    $internalHooks.push(...keys);
};

function isPromise(obj) {
    return obj instanceof Promise || (obj && typeof obj.then === 'function');
}

const hyphenateRE = /\B([A-Z])/g;
const hyphenate = (str) => str.replace(hyphenateRE, '-$1').toLowerCase();
/**
 * decorator of an event-emitter function
 *
 * @param  event The name of the event
 * @return MethodDecorator
 */
function Emit(event) {
    return function (_target, propertyKey, descriptor) {
        const key = hyphenate(propertyKey);
        const original = descriptor.value;
        descriptor.value = function emitter(...args) {
            const emit = (returnValue) => {
                const emitName = event || key;
                if (returnValue === undefined) {
                    if (args.length === 0) {
                        this.$emit(emitName);
                    }
                    else if (args.length === 1) {
                        this.$emit(emitName, args[0]);
                    }
                    else {
                        this.$emit(emitName, ...args);
                    }
                }
                else {
                    args.unshift(returnValue);
                    this.$emit(emitName, ...args);
                }
            };
            const returnValue = original.apply(this, args);
            if (isPromise(returnValue)) {
                returnValue.then(emit);
            }
            else {
                emit(returnValue);
            }
            return returnValue;
        };
    };
}

/**
 * decorator of an event function
 *
 * @return MethodDecorator
 */
function Event() {
    return function (_target, propertyKey, descriptor) {
        const original = descriptor.value;
        descriptor.value = function dispatchEvent(e) {
            const event = { ...e };
            if (event) {
                event.preventDefault = function () { };
                event.stopPropagation = function () { };
                event.target = event.target || {};
                event.currentTarget = event.currentTarget || event.target || {};
                event.detail = event.detail || {};
                Object.assign(event.target, event.detail);
                Object.assign(event.currentTarget, event.detail);
            }
            return original.call(this, event);
        };
    };
}

/**
 * decorator of a prop
 *
 * @param  options the options for the prop
 * @return PropertyDecorator | void
 */
function Prop(options) {
    return function (target, key) {
        createDecorator((componentOptions, k) => {
            (componentOptions.props || (componentOptions.props = {}))[k] = options;
        })(target, key);
    };
}

/**
 * decorator of a watch function
 *
 * @param  path the path or the expression to observe
 * @param  WatchOption
 * @return MethodDecorator
 */
function Watch(path, watchOptions = {}) {
    return createDecorator((componentOptions, handler) => {
        componentOptions.watch = componentOptions.watch || Object.create(null);
        const watch = componentOptions.watch;
        if (typeof watch[path] === 'object' && !Array.isArray(watch[path])) {
            watch[path] = [watch[path]];
        }
        else if (typeof watch[path] === 'undefined') {
            watch[path] = [];
        }
        watch[path].push({ handler, ...watchOptions });
    });
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}

function initComponents(vm, components) {
    return Object.keys(components).reduce((acc, key) => {
        const { module: componentName, type = 'child', observer = noop } = getData$1(components[key]);
        const linkCb = function () {
            if (typeof observer === 'string') {
                return this[observer]();
            }
            else if (typeof observer === 'function') {
                return observer();
            }
        };
        const option = {
            type,
            linked: linkCb,
            linkChanged: linkCb,
            unlinked: linkCb,
        };
        return {
            ...acc,
            [componentName]: option,
        };
    }, {});
}
function getData$1(comp) {
    if (typeof comp === 'function') {
        const ret = comp();
        return {
            ['module']: ret.module,
            type: ret.type,
            observer: ret.observer,
        };
    }
    else if (typeof comp === 'string') {
        return {
            ['module']: comp,
        };
    }
    else if (isPlainObject(comp)) {
        return {
            ['module']: comp.module,
            type: comp.type,
            observer: comp.observer,
        };
    }
    return {};
}

function initComputed(vm, forceUpdate = false) {
    if (vm._isMounted || forceUpdate) {
        const computed = vm.$options.computed || {};
        Object.keys(computed).forEach(key => {
            const userDef = computed[key];
            const getter = typeof userDef === 'function' ? userDef : userDef.get;
            if (getter) {
                const value = getter.call(vm, vm);
                if (vm.$options.props && key in vm.$options.props) ;
                else if (!isEqual(vm._renderProxy.data[key], value)) {
                    vm._renderProxy.setData({
                        [key]: value,
                    });
                }
            }
        });
    }
}

function initData(vm) {
    let data = vm.$options.data || {};
    data = typeof data === 'function'
        ? getData(data, vm)
        : data || {};
    const mixins = vm.$options.mixins || [];
    const instData = mixins.reduce((acc, mixin) => ({ ...acc, ...getData(mixin.data, vm) }), {});
    data = {
        ...data,
        ...instData,
    };
    vm._renderProxy.setData(data);
}
function getData(data, vm) {
    try {
        let ret = {};
        data = data.call(vm, vm);
        if (!isPlainObject(data)) {
            data = {};
            if (isDev) ;
        }
        const keys = Object.keys(data);
        const props = vm.$options.props;
        const methods = vm.$options.methods;
        let i = keys.length;
        while (i--) {
            const key = keys[i];
            if (isDev) ;
            if (props && hasOwn(props, key)) {
                isDev && warn(`The data property "${key}" is already declared as a prop. ` +
                    'Use prop default value instead.', vm);
            }
            else if (!isReserved(key)) {
                // properties starting with "$" or "_" are not set in miniprogram instance
                ret[key] = data[key];
            }
        }
        return ret;
    }
    catch (e) {
        return {};
    }
}

/**
 * Simple bind
 */
function bind(fn, ctx) {
    return fn.bind(ctx);
}

function initLifecycle(vm, options) {
    const methods = options.methods;
    vm._isMounted = false;
    vm._isDestroyed = false;
    vm._hasHookEvent = true;
    for (const key in methods) {
        vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
    }
}
function callHook(vm, hook) {
    var handlers = [vm.$options[hook]];
    if (handlers) {
        for (var i = 0, j = handlers.length; i < j; i++) {
            try {
                handlers[i].call(vm);
            }
            catch (e) {
                /** Ignore */
            }
        }
    }
    if (vm._hasHookEvent) {
        vm.$emit('hook:' + hook);
    }
}

function initMethods(vm, methods) {
    const methodProxy = {};
    vm.$options.props;
    for (const key in methods) {
        methodProxy[key] = typeof methods[key] !== 'function' ? noop : function (...args) {
            return this.$component[key].call(this.$component, ...args);
        };
    }
    return methodProxy;
}

const NULL_PROP = null;
function initProps(vm, propsOptions) {
    // miniprogram props
    const properties = {};
    for (const key in propsOptions) {
        const propOptions = propsOptions[key];
        const type = propOptions.type || NULL_PROP;
        const value = validateProp(key, propsOptions, {}, vm);
        properties[key] = { type, value };
    }
    return properties;
}
function validateProp(key, propsOptions, propsData, vm) {
    const prop = propsOptions[key];
    let value = propsData[key];
    // check default value
    if (value === undefined) {
        value = getPropDefaultValue(vm, prop);
    }
    return value;
}
function getPropDefaultValue(vm, prop, key) {
    // no default, return null
    if (!hasOwn(prop, 'default')) {
        return NULL_PROP;
    }
    const def = prop.default;
    let value = typeof def === 'function' ? def.call(vm) : def;
    // fix undefined for miniprogram
    if (value === undefined) {
        value = NULL_PROP;
    }
    return value;
}

function initRefs(vm) {
    const components = vm.$options.components || {};
    const parentNodes = [];
    const childrenNodes = [];
    const refNodes = [];
    for (const key in components) {
        const { module: componentName, type = 'child' } = getData$1(components[key]);
        if (['ancestor', 'parent'].includes(type)) {
            parentNodes.push(componentName);
        }
        else if (['child', 'descendant'].includes(type)) {
            childrenNodes.push(componentName);
        }
        refNodes.push({
            ref: key,
            path: componentName,
        });
    }
    Object.defineProperty(vm, '$parent', {
        get() {
            const nodes = parentNodes
                .slice(0, 1)
                .reduce((acc, path) => ([
                ...acc,
                ...find(vm, path),
            ]), []);
            return nodes && nodes[0];
        },
    });
    Object.defineProperty(vm, '$root', {
        get() {
            return this.$parent ? this.$parent.$root : vm;
        },
    });
    Object.defineProperty(vm, '$children', {
        get() {
            const nodes = childrenNodes
                .reduce((acc, path) => ([
                ...acc,
                ...find(vm, path),
            ]), []);
            return nodes;
        },
    });
    Object.defineProperty(vm, '$refs', {
        get() {
            const nodes = refNodes
                .reduce((acc, node) => ({
                ...acc,
                [node.ref]: find(vm, node.path),
            }), {});
            return nodes;
        },
    });
}
function find(vm, path) {
    const nodes = vm._renderProxy.getRelationNodes(path);
    if (nodes && nodes.length > 0) {
        return nodes.map((v) => v.$component);
    }
    return [];
}

function initWatch(vm, watch) {
    return Object.keys(watch).reduce((acc, key) => ({ ...acc, [key]: function defineWatch(newVal) {
            if (!this.$component || !this.$component._isMounted) {
                return;
            }
            // Always equal to the newVal
            const oldVal = this.data[key];
            const handler = Array.isArray(watch[key]) ? watch[key] : [watch[key]];
            handler.forEach(h => {
                this[h.handler](newVal, oldVal);
            });
        } }), {});
}

/**
 * 更新性能统计
 *
 * @param {*} vm
 * @param {*} options
 */
let setUpdatePerformance;
if (inMiniprogram) {
    setUpdatePerformance = function (vm, options = {}) {
        if (vm.setUpdatePerformanceListener) {
            vm.setUpdatePerformanceListener({ withDataPaths: true, ...options }, (res) => {
                const cost = res.updateEndTimestamp - res.updateStartTimestamp;
                const isShow = options.showZero || cost > 0;
                if (isShow) {
                    console.info(`doraemon ${vm.$component.$options.name} update ${cost} ms`);
                }
            });
        }
    };
}

function syncPropsToData(computed) {
    const sync = (data) => {
        return Object.keys(computed).reduce((acc, key) => {
            const userDef = computed[key];
            const getter = typeof userDef === 'function' ? userDef : userDef.get;
            if (getter) {
                const value = getter.call(data, data);
                return { ...acc, [key]: value };
            }
            return acc;
        }, {});
    };
    return Behavior({
        definitionFilter(defFields) {
            defFields.data = defFields.data || {};
            defFields.data = Object.assign(defFields.data, sync(defFields.data));
        },
    });
}

function defineComponentHOC(externalOptions = {}) {
    return function (target) {
        mergeStaticProperty(externalOptions, target);
        const componentInstance = new target();
        const options = componentInstance.$options;
        options.props = options.props || {};
        options.data = options.data || {};
        options.watch = options.watch || {};
        options.computed = options.computed || {};
        options.components = options.components || {};
        options.methods = options.methods || {};
        options.mixins = options.mixins || [];
        const defaultProps = initProps(componentInstance, options.props);
        const defaultData = Object.keys(defaultProps).reduce((acc, name) => ({ ...acc, [name]: defaultProps[name].value }), {});
        const watch = initWatch(componentInstance, options.watch);
        const components = initComponents(componentInstance, options.components);
        const methods = initMethods(componentInstance, options.methods);
        const componentConf = {
            options: {
                multipleSlots: typeof externalOptions.multipleSlots !== 'undefined' ?
                    externalOptions.multipleSlots : true,
                addGlobalClass: typeof externalOptions.addGlobalClass !== 'undefined' ?
                    externalOptions.addGlobalClass : true,
            },
            externalClasses: ['dora-class', 'dora-hover-class'].concat(Array.isArray(externalOptions.externalClasses) ?
                externalOptions.externalClasses : []),
            ['export']() {
                if (externalOptions['export']) {
                    return externalOptions['export'].call(this);
                }
                return this.$component ? this.$component : this;
            },
            relations: components,
            behaviors: (Array.isArray(externalOptions.behaviors) ?
                externalOptions.behaviors : []).concat(['wx://component-export', syncPropsToData(options.computed)]),
            observers: {
                ...watch,
                ['**']: function defineComputed(newVal) {
                    initComputed(this.$component);
                },
            },
            properties: defaultProps,
            data: defaultData,
            methods,
            lifetimes: {
                created: function beforeCreate() {
                    this.$component = new target();
                    this.$component._render(this);
                    initLifecycle(this.$component, options);
                    initRefs(this.$component);
                    callHook(this.$component, 'beforeCreate');
                },
                attached: function created() {
                    initData(this.$component);
                    initProxy(this.$component);
                    initComputed(this.$component, true);
                    if (config.performance) {
                        setUpdatePerformance(this);
                    }
                    callHook(this.$component, 'created');
                },
                ready: function mounted() {
                    if (!this.$component._isMounted) {
                        this.$component._isMounted = true;
                    }
                    callHook(this.$component, 'mounted');
                },
                detached: function destroyed() {
                    if (!this.$component._isDestroyed) {
                        this.$component._isDestroyed = true;
                    }
                    callHook(this.$component, 'destroyed');
                },
                error: function errorCaptured() {
                    callHook(this.$component, 'errorCaptured');
                },
            },
        };
        return Component(componentConf);
    };
}
function mergeStaticProperty(config, target) {
    for (const key in target) {
        config[key] = target[key];
    }
    // 低版本 IOS 下部分属性不能直接访问
    Object.getOwnPropertyNames(target).forEach(key => {
        const excludes = ['arguments', 'caller', 'length', 'name', 'prototype'];
        if (excludes.indexOf(key) < 0) {
            config[key] = target[key];
        }
    });
}

export { Component$1 as Component, Doraemon, Emit, Event, Prop, Watch, defineComponentHOC };
