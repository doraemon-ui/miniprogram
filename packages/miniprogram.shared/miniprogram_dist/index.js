/**
 * @doraemon-ui/miniprogram.shared.
 * © 2021 - 2024 Doraemon UI.
 * Built on 2024-03-20, 21:46:54.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.18.
 */

const check = (it) => {
    return it && typeof it.env && it;
};
const miniprogramThis = check(typeof wx === 'object' && wx);

/**
 * 判断小程序环境
 *
 * @export
 * @return {*}  {boolean}
 */
function canUseMP() {
    return miniprogramThis && typeof getCurrentPages !== 'undefined';
}

/**
 * 获取当前页面的实例
 *
 * @export
 * @return {*}  {(MPInst | null)}
 */
function getCurrentPage() {
    return canUseMP() ? getCurrentPages()[getCurrentPages().length - 1] : null;
}

/**
 * 获取自定义组件的实例
 *
 * @export
 * @template T
 * @param {string} selector
 * @param {MPInst} [dom=getCurrentPage()]
 * @return {*}  {(T | null)}
 */
function findComponentNode(selector, dom = getCurrentPage()) {
    return dom?.selectComponent(selector) || null;
}

function isDef(v) {
    return v !== undefined && v !== null;
}

function isFalse(v) {
    return v === false;
}

function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}

function isPromise(val) {
    return (isDef(val) &&
        typeof val.then === 'function' &&
        typeof val.catch === 'function');
}

function isString(v) {
    return typeof v === 'string';
}

function isTrue(v) {
    return v === true;
}

function isUndef(v) {
    return v === undefined || v === null;
}

function noop(...args) { }

function omit(obj, fields) {
    const clone = { ...obj };
    if (Array.isArray(fields)) {
        fields.forEach(key => {
            delete clone[key];
        });
    }
    return clone;
}

function pxToNumber(value) {
    if (!value)
        return 0;
    if (typeof value === 'number')
        return value;
    const match = value.match(/^\d*(\.\d*)?/);
    return match ? Number(match[0]) : 0;
}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

var util = {
    isDef,
    isFalse,
    isObject,
    isPromise,
    isString,
    isTrue,
    isUndef,
    noop,
    omit,
    pxToNumber,
    sleep,
};

const useQuery = (dom = getCurrentPage()) => {
    if (!canUseMP()) {
        return null;
    }
    return !!dom ? miniprogramThis?.createSelectorQuery?.().in(dom) : miniprogramThis?.createSelectorQuery?.();
};
/**
 * 获取匹配指定选择器的第一个元素
 *
 * @export
 * @param {string} selector
 * @param {MPInst} dom
 * @return {*}  {(MPElement | null)}
 */
function useSelector(selector, dom) {
    return canUseMP() ? useQuery(dom).select(selector) : null;
}
/**
 * 获取匹配指定选择器的所有元素
 *
 * @export
 * @param {string} selector
 * @param {MPInst} dom
 * @return {*}  {(MPElement | null)}
 */
function useSelectorAll(selector, dom) {
    return canUseMP() ? useQuery(dom).selectAll(selector) : null;
}
const makeFields = () => ({
    id: true,
    dataset: true,
    mark: true,
    rect: true,
    // size: true,
    scrollOffset: true,
    computedStyle: [
        'width',
        'height',
        'borderTopWidth',
        'borderRightWidth',
        'borderBottomWidth',
        'borderLeftWidth',
    ],
    node: true,
});
const makeNodeRef = (node) => {
    const borderRightWidth = pxToNumber(node.borderRightWidth || 0);
    const borderLeftWidth = pxToNumber(node.borderLeftWidth || 0);
    const borderTopWidth = pxToNumber(node.borderTopWidth || 0);
    const borderBottomWidth = pxToNumber(node.borderBottomWidth || 0);
    const clientWidth = pxToNumber(node.width);
    const clientHeight = pxToNumber(node.height);
    const offsetWidth = clientWidth + borderRightWidth + borderLeftWidth;
    const offsetHeight = clientHeight + borderTopWidth + borderBottomWidth;
    return {
        id: node.id,
        dataset: node.dataset,
        mark: node.mark,
        top: node.top,
        right: node.right,
        bottom: node.bottom,
        left: node.left,
        width: offsetWidth,
        height: offsetHeight,
        x: node.left,
        y: node.top,
        offsetWidth,
        offsetHeight,
        clientLeft: borderLeftWidth,
        clientTop: borderTopWidth,
        clientWidth,
        clientHeight,
        scrollHeight: node.scrollHeight,
        scrollLeft: node.scrollLeft,
        scrollTop: node.scrollTop,
        scrollWidth: node.scrollWidth,
        node: node.node,
    };
};
const useRef = (selector, dom) => {
    return new Promise((resolve) => {
        const query = useQuery(dom);
        const isArray = Array.isArray(selector);
        const classList = isArray ? selector : [selector];
        if (query) {
            classList.forEach((s) => {
                query
                    .select(s)
                    .fields(makeFields());
            });
            query.exec((nodes) => {
                resolve(isArray
                    ? nodes.map((node) => makeNodeRef(node))
                    : makeNodeRef(nodes[0]));
            });
        }
    });
};
const useRefAll = (selector, dom) => {
    return new Promise((resolve) => {
        const query = useQuery(dom);
        const isArray = Array.isArray(selector);
        const classList = isArray ? selector : [selector];
        if (query) {
            classList.forEach((s) => {
                query
                    .selectAll(s)
                    .fields(makeFields());
            });
            query.exec((nodesList) => {
                resolve(isArray
                    ? nodesList.map((nodes) => nodes.map((node) => makeNodeRef(node)))
                    : nodesList[0].map((node) => makeNodeRef(node)));
            });
        }
    });
};
const useRect = (selector, dom) => {
    return new Promise((resolve) => {
        const query = useQuery(dom);
        const isArray = Array.isArray(selector);
        const classList = isArray ? selector : [selector];
        if (query) {
            classList.forEach((s) => {
                query
                    .select(s)
                    .boundingClientRect();
            });
            query.exec((nodes) => {
                resolve(isArray ? nodes : nodes[0]);
            });
        }
    });
};
const useRectAll = (selector, dom) => {
    return new Promise((resolve) => {
        const query = useQuery(dom);
        const isArray = Array.isArray(selector);
        const classList = isArray ? selector : [selector];
        if (query) {
            classList.forEach((s) => {
                query
                    .selectAll(s)
                    .boundingClientRect();
            });
            query.exec((nodesList) => {
                resolve(isArray ? nodesList : nodesList[0]);
            });
        }
    });
};
const useScrollOffset = (dom) => {
    return new Promise((resolve) => {
        const query = useQuery(dom);
        if (query) {
            query
                .selectViewport()
                .scrollOffset();
            query.exec(([node]) => {
                resolve(node);
            });
        }
    });
};
const useComputedStyle = (selector, ...args) => {
    const computedStyle = args.length === 2 ? args[0] : ['width', 'height'];
    const dom = args.length === 2 ? args[1] : args[0];
    return new Promise((resolve) => {
        const query = useQuery(dom);
        if (query) {
            query
                .select(selector)
                .fields({
                computedStyle,
            });
            query.exec(([node]) => {
                resolve(node);
            });
        }
    });
};

var dom = {
    canUseMP,
    findComponentNode,
    getCurrentPage,
    useQuery,
    useSelector,
    useSelectorAll,
    useRef,
    useRefAll,
    useRect,
    useRectAll,
    useScrollOffset,
    useComputedStyle
};

var index = {
    dom,
    util,
    ...dom,
    ...util,
};

export { canUseMP, index as default, dom, findComponentNode, getCurrentPage, isDef, isFalse, isObject, isPromise, isString, isTrue, isUndef, noop, omit, pxToNumber, sleep, useComputedStyle, useQuery, useRect, useRectAll, useRef, useRefAll, useScrollOffset, useSelector, useSelectorAll, util };
