/**
 * @doraemon-ui/miniprogram.shared.
 * © 2021 - 2024 Doraemon UI.
 * Built on 2024-04-06, 22:36:01.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.22.
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
 * @return {*}  {(MiniprogramPublicInstance | null)}
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
 * @param {MiniprogramPublicInstance} [instance=getCurrentPage()]
 * @return {*}  {(T | null)}
 */
function findComponentNode(selector, instance = getCurrentPage()) {
    return instance?.selectComponent(selector) || null;
}

function isDate(obj) {
    return obj instanceof Date;
}

function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}

function encode(val) {
    // 对url进行编码并处理特殊字符
    return encodeURIComponent(val)
        //ig为全局查找，忽略大小写
        .replace(/%40/g, '@')
        .replace(/%3A/ig, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/ig, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/ig, '[')
        .replace(/%5D/ig, ']');
}
function buildURL(url, params) {
    // 没有 params 就直接返回 url，无需拼接
    if (!params) {
        return url;
    }
    const parts = [];
    Object.keys(params).forEach((key) => {
        // key 对应的是索引值，数组索引值默认从 0 开始，对象的索引值为 key
        const val = params[key];
        // 如果传入的 params 参数有 null 或者 undefined，那么就处理下一个参数
        if (val === null || typeof val === 'undefined') {
            // 此处的 return 不是退出循环，而是处理下一个参数
            return;
        }
        let values = [];
        // 如果这个参数是数组
        if (Array.isArray(val)) {
            values = val;
            key += '[]';
        }
        else {
            // 如果不是数组，那就把它统一变为数组
            values = [val];
        }
        values.forEach((val) => {
            if (isDate(val)) {
                // toISOString() 方法返回一个 ISO（ISO 格式的字符串： YYYY-MM-DDTHH:mm:ss.sssZ。
                val = val.toISOString();
            }
            else if (isObject(val)) {
                val = JSON.stringify(val);
            }
            parts.push(`${encode(key)}=${encode(val)}`);
        });
    });
    // 将参数以 & 进行连接
    let serializedParams = parts.join('&');
    // 如果 params 参数都为空，parts 是一个空数组
    if (serializedParams) {
        // 查找 url 中是否有 hash 的表示，即 #，因为需要忽略
        const markIndex = url.indexOf('#');
        if (markIndex !== -1) {
            // 存在就需要删除
            url = url.slice(0, markIndex);
        }
        // 在 params 参数之前需要一个 ?
        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }
    return url;
}

function isDef(v) {
    return v !== undefined && v !== null;
}

function isFalse(v) {
    return v === false;
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
    buildURL,
    isDate,
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

/**
 * 查询节点信息的对象
 *
 * @param {MiniprogramPublicInstance} [instance=getCurrentPage()] 小程序页面或组件的实例对象
 * @return {*}
 */
function useQuery(instance = getCurrentPage()) {
    if (!canUseMP()) {
        return null;
    }
    return !!instance ? miniprogramThis?.createSelectorQuery?.().in(instance) : miniprogramThis?.createSelectorQuery?.();
}
/**
 * 获取匹配指定选择器的第一个元素
 *
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/wxml/SelectorQuery.select.html
 * @param {string} selector 在当前页面下选择第一个匹配选择器 selector 的节点
 * @param {MiniprogramPublicInstance} instance 小程序页面或组件的实例对象
 * @return {*}  {(MiniprogramElement | null)}
 */
function useSelector(selector, instance) {
    return canUseMP() ? useQuery(instance).select(selector) : null;
}
/**
 * 获取匹配指定选择器的所有元素
 *
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/wxml/SelectorQuery.selectAll.html
 * @param {string} selector 在当前页面下选择匹配选择器 selector 的所有节点。
 * @param {MiniprogramPublicInstance} instance 小程序页面或组件的实例对象
 * @return {*}  {(MiniprogramElement | null)}
 */
function useSelectorAll(selector, instance) {
    return canUseMP() ? useQuery(instance).selectAll(selector) : null;
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
/**
 * 获取第一个节点的相关信息
 *
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/wxml/NodesRef.fields.html
 * @param {(string | string[])} selector 在当前页面下选择第一个匹配选择器 selector 的节点。
 * @param {MiniprogramPublicInstance} [instance] 小程序页面或组件的实例对象
 * @return {*}  {(Promise<MiniprogramNodeRef | MiniprogramNodeRef[]>)}
 */
function useRef(selector, instance) {
    return new Promise((resolve) => {
        const query = useQuery(instance);
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
}
/**
 * 获取所有节点的相关信息
 *
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/wxml/NodesRef.fields.html
 * @param {(string | string[])} selector 在当前页面下选择匹配选择器 selector 的所有节点。
 * @param {MiniprogramPublicInstance} [instance] 小程序页面或组件的实例对象
 * @return {*}  {(Promise<MiniprogramNodeRef[] | MiniprogramNodeRef[][]>)}
 */
function useRefAll(selector, instance) {
    return new Promise((resolve) => {
        const query = useQuery(instance);
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
}
/**
 * 添加第一个节点的布局位置的查询请求
 *
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/wxml/NodesRef.boundingClientRect.html
 * @param {(string | string[])} selector 在当前页面下选择第一个匹配选择器 selector 的节点。
 * @param {MiniprogramPublicInstance} [instance] 小程序页面或组件的实例对象
 * @return {*}  {(Promise<MiniprogramDOMRect | MiniprogramDOMRect[]>)}
 */
function useRect(selector, instance) {
    return new Promise((resolve) => {
        const query = useQuery(instance);
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
}
/**
 * 添加所有节点的布局位置的查询请求
 *
 * @param {(string | string[])} selector 在当前页面下选择匹配选择器 selector 的所有节点。
 * @param {MiniprogramPublicInstance} [instance] 小程序页面或组件的实例对象
 * @return {*}  {(Promise<MiniprogramDOMRect[] | MiniprogramDOMRect[][]>)}
 */
function useRectAll(selector, instance) {
    return new Promise((resolve) => {
        const query = useQuery(instance);
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
}
/**
 * 添加节点的滚动位置查询请求。以像素为单位。节点必须是 scroll-view 或者 viewport，返回 NodesRef 对应的 SelectorQuery。
 *
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/wxml/NodesRef.scrollOffset.html
 * @param {MiniprogramPublicInstance} [instance] 小程序页面或组件的实例对象
 * @return {*}  {Promise<MiniprogramScrollOffset>}
 */
function useScrollOffset(instance) {
    return new Promise((resolve) => {
        const query = useQuery(instance);
        if (query) {
            query
                .selectViewport()
                .scrollOffset();
            query.exec(([node]) => {
                resolve(node);
            });
        }
    });
}
/**
 * 指定样式名列表，返回节点对应样式名的当前值
 *
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/wxml/NodesRef.fields.html
 * @param {string} selector 在当前页面下选择第一个匹配选择器 selector 的节点。
 * @param {...any[]} args
 * @return {*}  {Promise<{ [key in keyof Partial<CSSStyleDeclaration>]: any }>}
 */
function useComputedStyle(selector, ...args) {
    const [computedStyle, instance] = args;
    const opts = {
        computedStyle,
        instance,
    };
    if (instance === undefined) {
        opts.computedStyle = ['width', 'height'];
        opts.instance = computedStyle;
    }
    return new Promise((resolve) => {
        const query = useQuery(opts.instance);
        if (query) {
            query
                .select(selector)
                .fields({
                computedStyle: opts.computedStyle,
            });
            query.exec(([node]) => {
                resolve(node);
            });
        }
    });
}

/**
 * 获取触摸点位置信息
 */
const getTouchPoints = (nativeEvent, index = 0) => {
    const touches = nativeEvent.touches;
    const changedTouches = nativeEvent.changedTouches;
    const hasTouches = touches && touches.length > 0;
    const hasChangedTouches = changedTouches && changedTouches.length > 0;
    const points = !hasTouches && hasChangedTouches ? changedTouches[index] : touches[index];
    return {
        x: points.pageX,
        y: points.pageY,
    };
};
/**
* 获取触摸点个数
*/
const getPointsNumber = (e) => e.touches?.length || e.changedTouches?.length || 0;
/**
* 判断是否为同一点
*/
const isEqualPoints = (p1, p2) => p1.x === p2.x && p1.y === p2.y;
/**
* 判断是否为相近的两点
*/
const isNearbyPoints = (p1, p2, DOUBLE_TAP_RADIUS = 25) => {
    const xMove = Math.abs(p1.x - p2.x);
    const yMove = Math.abs(p1.y - p2.y);
    return xMove < DOUBLE_TAP_RADIUS && yMove < DOUBLE_TAP_RADIUS;
};
/**
* 获取两点之间的距离
*/
const getPointsDistance = (p1, p2) => {
    const xMove = Math.abs(p1.x - p2.x);
    const yMove = Math.abs(p1.y - p2.y);
    return Math.sqrt(xMove * xMove + yMove * yMove);
};
/**
* 获取触摸移动方向
*/
const getSwipeDirection = (x1, x2, y1, y2) => {
    return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down');
};

const fakeMediaResult = (request, response) => {
    if ('type' in response) {
        return response;
    }
    if (request.mediaType.includes('video')) {
        return {
            tempFiles: [{
                    tempFilePath: response.tempFilePath,
                    size: response.size,
                    duration: response.duration,
                    height: response.height,
                    width: response.width,
                    thumbTempFilePath: response.tempFilePath,
                    fileType: 'video',
                }],
            type: 'video',
        };
    }
    const { tempFilePaths = [], tempFiles = [] } = response;
    return {
        tempFiles: tempFilePaths.map((tempFilePath, index) => ({
            tempFilePath: tempFiles[index].path || tempFilePath,
            size: tempFiles[index].size,
            fileType: 'image',
        })),
        type: 'image',
    };
};
/**
 * ## 拍摄或从手机相册中选择图片或视频。
 *
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.chooseMedia.html
 * @export
 * @param {*} options
 * @return {*}
 */
function chooseMedia(options) {
    const { count = 9, mediaType = ['image', 'video'], sourceType = ['album', 'camera'], maxDuration = 10, sizeType = ['original', 'compressed'], camera = 'back', 
    // @deprecated
    compressed = true, ...resetCbs } = options;
    const success = (res) => {
        if (resetCbs.success) {
            resetCbs.success(fakeMediaResult(options, res));
        }
    };
    if (typeof miniprogramThis.chooseMedia === 'function') {
        return miniprogramThis.chooseMedia({ ...options, success });
    }
    if (mediaType.includes('video')) {
        const videoOptions = {
            sourceType,
            compressed,
            maxDuration: options.maxDuration === undefined ? 60 : maxDuration,
            camera,
            ...resetCbs,
            success,
        };
        return miniprogramThis.chooseVideo(videoOptions);
    }
    const imageOptions = {
        count,
        sizeType,
        sourceType,
        ...resetCbs,
        success,
    };
    return miniprogramThis.chooseImage(imageOptions);
}
function uploadFile(options) {
    const { url, filePath, name = 'file', header = {}, formData = {}, timeout = 20, enableProfile = true, enableHttp2 = false, ...resetCbs } = options;
    return miniprogramThis.uploadFile({
        url,
        filePath,
        name,
        header,
        formData,
        timeout,
        enableProfile,
        enableHttp2,
        ...resetCbs,
    });
}
function getSystemInfoSync(keys = ['window', 'device', 'appBase']) {
    return typeof miniprogramThis.getWindowInfo === 'function'
        ? keys.reduce((acc, key) => ({
            ...acc,
            ...miniprogramThis[`get${key.charAt(0).toUpperCase() + key.substring(1)}Info`](),
        }), {})
        : miniprogramThis.getSystemInfoSync();
}
function vibrateShort(options) {
    if (getSystemInfoSync(['window', 'device']).platform === 'devtools') {
        return;
    }
    return miniprogramThis.vibrateShort(options);
}
function getMenuButtonBoundingClientRectSync() {
    let menuRect;
    try {
        menuRect = miniprogramThis.getMenuButtonBoundingClientRect ? miniprogramThis.getMenuButtonBoundingClientRect() : null;
        if (menuRect === null) {
            throw 'getMenuButtonBoundingClientRect error';
        }
        // 取值为 0 的情况  有可能 width 不为 0, top 为 0 的情况
        if (!menuRect.width || !menuRect.top || !menuRect.left || !menuRect.height) {
            throw 'getMenuButtonBoundingClientRect error';
        }
    }
    catch (e) {
        const windowInfo = getSystemInfoSync(['window', 'device']);
        const isIOS = !!(windowInfo.system.toLowerCase().search('ios') + 1);
        const height = 32; // 胶囊的高度
        let width = 88; // 胶囊的宽度
        let gap = 4; // 胶囊按钮上下间距 使导航内容居中
        if (windowInfo.platform === 'android') {
            gap = 8;
            width = 96;
        }
        else if (windowInfo.platform === 'devtools') {
            if (isIOS) {
                gap = 5.5; // 开发工具中 ios 手机
            }
            else {
                gap = 7.5; // 开发工具中 android 和其他手机
            }
        }
        // 开启 wifi 的情况下修复 statusBarHeight 值获取不到
        if (!windowInfo.statusBarHeight) {
            windowInfo.statusBarHeight = windowInfo.screenHeight - windowInfo.windowHeight - 20;
        }
        // 获取不到胶囊信息就自定义重置一个
        menuRect = {
            bottom: windowInfo.statusBarHeight + gap + height,
            height,
            left: windowInfo.windowWidth - width - 10,
            right: windowInfo.windowWidth - 10,
            top: windowInfo.statusBarHeight + gap,
            width,
        };
    }
    return menuRect;
}
function nextTick(cb) {
    if (typeof miniprogramThis.nextTick === 'function') {
        return miniprogramThis.nextTick(cb);
    }
    else if (typeof Promise !== 'undefined') {
        return Promise.resolve().then(cb);
    }
    else {
        setTimeout(() => cb(), 0);
    }
}

/**
 * openType 属性可选值为 navigateTo、redirectTo、switchTab、navigateBack、reLaunch
 */
const NATIVE_ROUTES = [
    'navigateTo',
    'redirectTo',
    'switchTab',
    'navigateBack',
    'reLaunch',
];
/**
 * 跳转到指定的页面
 *
 * @export
 * @param {NativeRouteProps} props 参数对象
 * @param {*} vm 小程序页面或组件的实例对象
 * @return {*}
 */
function useNativeRoute(props, vm) {
    const { url, urlParams, openType = 'navigateTo', delta = 1 } = props;
    const promisify = (method, params) => {
        return new Promise((resolve, reject) => {
            miniprogramThis[method].call(miniprogramThis, {
                ...params,
                success: resolve,
                fail: reject,
            });
        });
    };
    if (!url) {
        return Promise.reject(`Invalid value of prop "url" of "${vm.is}": Expected an Non-empty String.`);
    }
    else if (!NATIVE_ROUTES.includes(openType)) {
        return Promise.reject(`Invalid value of prop "openType" of "${vm.is}": expected "${NATIVE_ROUTES.join(',')}", ` +
            `but got ${openType}.`);
    }
    else if (openType === 'navigateBack') {
        return promisify(openType, { delta });
    }
    else {
        return promisify(openType, { url: buildURL(url, urlParams) });
    }
}

function usePopupStateHOC(statePropName = 'visible') {
    return (container) => {
        const render = (props, callback) => {
            Object.assign(container, props);
            container.$nextTick(() => callback?.());
        };
        const update = (props, callback) => {
            if (props[statePropName] !== undefined) {
                delete props[statePropName];
            }
            render(props, callback);
        };
        const open = (props, callback) => {
            render({ ...props, [statePropName]: true }, callback);
        };
        const close = (callback) => render({ [statePropName]: false }, callback);
        return {
            render: open,
            destroy: close,
            update
        };
    };
}

var dom = {
    canUseMP,
    findComponentNode,
    getCurrentPage,
    miniprogramThis,
    useQuery,
    useSelector,
    useSelectorAll,
    useRef,
    useRefAll,
    useRect,
    useRectAll,
    useScrollOffset,
    useComputedStyle,
    getTouchPoints,
    getPointsNumber,
    isEqualPoints,
    isNearbyPoints,
    getPointsDistance,
    getSwipeDirection,
    getSystemInfoSync,
    getMenuButtonBoundingClientRectSync,
    useNativeRoute,
    usePopupStateHOC
};

var index = {
    dom,
    util,
    ...dom,
    ...util,
};

export { NATIVE_ROUTES, buildURL, canUseMP, chooseMedia, index as default, dom, findComponentNode, getCurrentPage, getMenuButtonBoundingClientRectSync, getPointsDistance, getPointsNumber, getSwipeDirection, getSystemInfoSync, getTouchPoints, isDate, isDef, isEqualPoints, isFalse, isNearbyPoints, isObject, isPromise, isString, isTrue, isUndef, miniprogramThis, nextTick, noop, omit, pxToNumber, sleep, uploadFile, useComputedStyle, useNativeRoute, usePopupStateHOC, useQuery, useRect, useRectAll, useRef, useRefAll, useScrollOffset, useSelector, useSelectorAll, util, vibrateShort };
