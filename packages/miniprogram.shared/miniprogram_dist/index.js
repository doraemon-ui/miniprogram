/**
 * @doraemon-ui/miniprogram.shared.
 * © 2021 - 2024 Doraemon UI.
 * Built on 2024-03-25, 14:57:31.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.20.
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

const useQuery = (instance = getCurrentPage()) => {
    if (!canUseMP()) {
        return null;
    }
    return !!instance ? miniprogramThis?.createSelectorQuery?.().in(instance) : miniprogramThis?.createSelectorQuery?.();
};
/**
 * 获取匹配指定选择器的第一个元素
 *
 * @export
 * @param {string} selector
 * @param {MiniprogramPublicInstance} instance
 * @return {*}  {(MiniprogramElement | null)}
 */
function useSelector(selector, instance) {
    return canUseMP() ? useQuery(instance).select(selector) : null;
}
/**
 * 获取匹配指定选择器的所有元素
 *
 * @export
 * @param {string} selector
 * @param {MiniprogramPublicInstance} instance
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
const useRef = (selector, instance) => {
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
};
const useRefAll = (selector, instance) => {
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
};
const useRect = (selector, instance) => {
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
};
const useRectAll = (selector, instance) => {
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
};
const useScrollOffset = (instance) => {
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
};
const useComputedStyle = (selector, ...args) => {
    const computedStyle = args.length === 2 ? args[0] : ['width', 'height'];
    const instance = args.length === 2 ? args[1] : args[0];
    return new Promise((resolve) => {
        const query = useQuery(instance);
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
    getSystemInfoSync,
    getMenuButtonBoundingClientRectSync,
    usePopupStateHOC
};

var index = {
    dom,
    util,
    ...dom,
    ...util,
};

export { canUseMP, chooseMedia, index as default, dom, findComponentNode, getCurrentPage, getMenuButtonBoundingClientRectSync, getSystemInfoSync, isDef, isFalse, isObject, isPromise, isString, isTrue, isUndef, miniprogramThis, nextTick, noop, omit, pxToNumber, sleep, uploadFile, useComputedStyle, usePopupStateHOC, useQuery, useRect, useRectAll, useRef, useRefAll, useScrollOffset, useSelector, useSelectorAll, util, vibrateShort };
