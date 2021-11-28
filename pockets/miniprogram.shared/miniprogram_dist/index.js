/**
 * @doraemon-ui/miniprogram.shared.
 * © 2021 - 2021 Doraemon UI.
 * Built on 2021-11-28, 16:59:03.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.17.
 */

/**
 * 判断小程序环境
 *
 * @export
 * @param {string} [api='wx']
 * @return {*}  {boolean}
 */
function canUseMP(api = 'wx') {
    return typeof self[api] !== 'undefined';
}

/**
 * 获取当前页面的实例
 *
 * @export
 * @return {*}  {(MPInst | null)}
 */
function getCurrentDOM() {
    return canUseMP('getCurrentPages') ? getCurrentPages()[getCurrentPages().length - 1] : null;
}

/**
 * 获取自定义组件的实例
 *
 * @export
 * @template T
 * @param {string} selector
 * @param {MPInst} [dom=getCurrentDOM()]
 * @return {*}  {(T | null)}
 */
function findComponentNode(selector, dom = getCurrentDOM()) {
    return dom?.selectComponent(selector) || null;
}

/**
 * 获取指定元素的大小及其相对于视口的位置
 *
 * @export
 * @param {MPElement} element
 * @return {*}  {(Promise<MPDOMRect | MPDOMRect[]>)}
 */
function getBoundingClientRect(element) {
    return new Promise((resolve) => {
        element?.fields({
            rect: true,
            size: true,
            properties: ['scrollX', 'scrollY'],
        }).exec((rects) => {
            resolve(Array.isArray(rects)
                ? rects.map((rect) => ({
                    ...rect,
                    x: rect.left,
                    y: rect.top,
                }))
                : {
                    ...rects,
                    x: rects.left,
                    y: rects.top,
                });
        });
    });
}

/**
 * 获取匹配指定选择器的第一个元素
 *
 * @export
 * @param {string} selector
 * @param {MPInst} [dom=getCurrentDOM()]
 * @return {*}  {(MPElement | null)}
 */
function querySelector(selector, dom = getCurrentDOM()) {
    return canUseMP() ? wx?.createSelectorQuery().in(dom).select(selector) : null;
}

/**
 * 获取匹配指定选择器的所有元素
 *
 * @export
 * @param {string} selector
 * @param {MPInst} [dom=getCurrentDOM()]
 * @return {*}  {(MPElement | null)}
 */
function querySelectorAll(selector, dom = getCurrentDOM()) {
    return canUseMP() ? wx?.createSelectorQuery().in(dom).selectAll(selector) : null;
}

var dom = {
    canUseMP,
    findComponentNode,
    getBoundingClientRect,
    getCurrentDOM,
    querySelector,
    querySelectorAll,
};

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
    sleep,
};

var index = {
    dom,
    util,
    ...dom,
    ...util,
};

export { canUseMP, index as default, dom, findComponentNode, getBoundingClientRect, getCurrentDOM, isDef, isFalse, isObject, isPromise, isString, isTrue, isUndef, noop, omit, querySelector, querySelectorAll, sleep, util };
