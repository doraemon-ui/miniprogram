/**
 * @doraemon-ui/miniprogram.shared.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-20, 17:49:06.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { createDecorator, Doraemon } from '@doraemon-ui/miniprogram.core-js';

function appendWatch(componentOptions, path, handler) {
    componentOptions.watch = componentOptions.watch || Object.create(null);
    const watch = componentOptions.watch;
    const pathWatch = watch[path];
    if (typeof pathWatch === 'object' && pathWatch !== null && !Array.isArray(pathWatch)) {
        watch[path] = [
            pathWatch
        ];
    } else if (typeof pathWatch === 'undefined') {
        watch[path] = [];
    }
    watch[path].push({
        handler
    });
}
function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}
function resolveDefaultValueKey(valueKey) {
    return `default${capitalize(valueKey)}`;
}
function resolveSetterName(key) {
    return `set${capitalize(key)}`;
}
function isUpdater(value) {
    return typeof value === 'function';
}
function resolveNextValue(nextValue, previousValue) {
    return isUpdater(nextValue) ? nextValue(previousValue) : nextValue;
}
function resolveSourceValue(vm, key) {
    if (key in vm) {
        return vm[key];
    }
    const props = vm.$props;
    if (props && key in props) {
        return props[key];
    }
    return undefined;
}
function resolveControlledValue(vm, options) {
    const controlled = resolveSourceValue(vm, options.controlled);
    if (controlled) {
        return resolveSourceValue(vm, options.value);
    }
    return resolveSourceValue(vm, options.defaultValue);
}
function normalizeOptions(valueOrOptions, override) {
    const baseOptions = typeof valueOrOptions === 'string' ? {
        value: valueOrOptions
    } : valueOrOptions;
    const overrideOptions = typeof override === 'string' ? {
        value: override
    } : override;
    const valueKey = overrideOptions?.value || baseOptions.value || '';
    return {
        value: valueKey,
        defaultValue: overrideOptions?.defaultValue || baseOptions.defaultValue || resolveDefaultValueKey(valueKey),
        controlled: overrideOptions?.controlled || baseOptions.controlled || 'controlled'
    };
}
function useControlledState(valueOrOptions) {
    let key = '';
    const setControlledState = (instance, nextValue, condition = false)=>{
        const setter = Reflect.get(instance, resolveSetterName(key));
        if (typeof setter === 'function') {
            setter.call(instance, nextValue, condition);
        }
    };
    function decorate(options) {
        return (target, propertyKey)=>{
            key = String(propertyKey);
            const watchHandlerName = `__watch_controlled_state__${key}`;
            const setterName = resolveSetterName(key);
            createDecorator((componentOptions)=>{
                componentOptions.methods = componentOptions.methods || {};
                const methods = componentOptions.methods;
                if (!methods[setterName]) {
                    methods[setterName] = function setControlledState(nextValue, condition = false) {
                        const value = resolveNextValue(nextValue, this[key]);
                        if (condition || !this[options.controlled]) {
                            this[key] = value;
                        }
                    };
                }
                if (!methods[watchHandlerName]) {
                    methods[watchHandlerName] = function watchControlledState(nextValue, _oldValue) {
                        if (!resolveSourceValue(this, options.controlled)) {
                            return;
                        }
                        const setter = Reflect.get(this, setterName);
                        if (typeof setter === 'function') {
                            setter.call(this, nextValue, true);
                        }
                    };
                }
                appendWatch(componentOptions, options.value, watchHandlerName);
                (componentOptions.mixins || (componentOptions.mixins = [])).push({
                    data () {
                        const value = resolveControlledValue(this, options);
                        return value === undefined ? {} : {
                            [key]: value
                        };
                    }
                });
            })(target, key);
        };
    }
    function ControlledState(override) {
        return decorate(normalizeOptions(valueOrOptions, override));
    }
    return {
        ControlledState,
        setControlledState
    };
}

var decorators = {
    useControlledState
};

const check = (it)=>{
    return it && typeof it.env && it;
};
const miniprogramThis = check(typeof wx === 'object' && wx);

/**
 * 判断小程序环境
 *
 * @export
 * @return {*}  {boolean}
 */ function canUseMP() {
    return miniprogramThis && typeof getCurrentPages !== 'undefined';
}

/**
 * 获取当前页面的实例
 *
 * @export
 * @return {*}  {(MiniprogramPublicInstance | null)}
 */ function getCurrentPage() {
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
 */ function findComponentNode(selector, instance = getCurrentPage()) {
    return (instance?.selectComponent(selector)) || null;
}

const fakeMediaResult = (request, response)=>{
    if ('type' in response) {
        return response;
    }
    if (request.mediaType.includes('video')) {
        return {
            tempFiles: [
                {
                    tempFilePath: response.tempFilePath,
                    size: response.size,
                    duration: response.duration,
                    height: response.height,
                    width: response.width,
                    thumbTempFilePath: response.tempFilePath,
                    fileType: 'video'
                }
            ],
            type: 'video'
        };
    }
    const { tempFilePaths = [], tempFiles = [] } = response;
    return {
        tempFiles: tempFilePaths.map((tempFilePath, index)=>({
                tempFilePath: tempFiles[index].path || tempFilePath,
                size: tempFiles[index].size,
                fileType: 'image'
            })),
        type: 'image'
    };
};
/**
 * ## 拍摄或从手机相册中选择图片或视频。
 *
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.chooseMedia.html
 * @export
 * @param {*} options
 * @return {*}
 */ function chooseMedia(options) {
    const { count = 9, mediaType = [
        'image',
        'video'
    ], sourceType = [
        'album',
        'camera'
    ], maxDuration = 10, sizeType = [
        'original',
        'compressed'
    ], camera = 'back', // @deprecated
    compressed = true, ...resetCbs } = options;
    const success = (res)=>{
        if (resetCbs.success) {
            resetCbs.success(fakeMediaResult(options, res));
        }
    };
    if (typeof miniprogramThis.chooseMedia === 'function') {
        return miniprogramThis.chooseMedia({
            ...options,
            success
        });
    }
    if (mediaType.includes('video')) {
        const videoOptions = {
            sourceType,
            compressed,
            maxDuration: options.maxDuration === undefined ? 60 : maxDuration,
            camera,
            ...resetCbs,
            success
        };
        return miniprogramThis.chooseVideo(videoOptions);
    }
    const imageOptions = {
        count,
        sizeType,
        sourceType,
        ...resetCbs,
        success
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
        ...resetCbs
    });
}
function getSystemInfoSync(keys = [
    'window',
    'device',
    'appBase'
]) {
    return typeof miniprogramThis.getWindowInfo === 'function' ? keys.reduce((acc, key)=>({
            ...acc,
            ...miniprogramThis[`get${key.charAt(0).toUpperCase() + key.substring(1)}Info`]()
        }), {}) : miniprogramThis.getSystemInfoSync();
}
function vibrateShort(options) {
    if (getSystemInfoSync([
        'window',
        'device'
    ]).platform === 'devtools') {
        return Promise.resolve();
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
    } catch (e) {
        const windowInfo = getSystemInfoSync([
            'window',
            'device'
        ]);
        const isIOS = !!(windowInfo.system.toLowerCase().search('ios') + 1);
        const height = 32 // 胶囊的高度
        ;
        let width = 88 // 胶囊的宽度
        ;
        let gap = 4 // 胶囊按钮上下间距 使导航内容居中
        ;
        if (windowInfo.platform === 'android') {
            gap = 8;
            width = 96;
        } else if (windowInfo.platform === 'devtools') {
            if (isIOS) {
                gap = 5.5 // 开发工具中 ios 手机
                ;
            } else {
                gap = 7.5 // 开发工具中 android 和其他手机
                ;
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
            width
        };
    }
    return menuRect;
}
function nextTick(cb) {
    if (typeof miniprogramThis.nextTick === 'function') {
        return miniprogramThis.nextTick(cb);
    } else if (typeof Promise !== 'undefined') {
        return Promise.resolve().then(cb);
    } else {
        setTimeout(()=>cb(), 0);
    }
}

// 36 Hex to reduce the size of the file
var presetColors = {
    aliceblue: '9ehhb',
    antiquewhite: '9sgk7',
    aqua: '1ekf',
    aquamarine: '4zsno',
    azure: '9eiv3',
    beige: '9lhp8',
    bisque: '9zg04',
    black: '0',
    blanchedalmond: '9zhe5',
    blue: '73',
    blueviolet: '5e31e',
    brown: '6g016',
    burlywood: '8ouiv',
    cadetblue: '3qba8',
    chartreuse: '4zshs',
    chocolate: '87k0u',
    coral: '9yvyo',
    cornflowerblue: '3xael',
    cornsilk: '9zjz0',
    crimson: '8l4xo',
    cyan: '1ekf',
    darkblue: '3v',
    darkcyan: 'rkb',
    darkgoldenrod: '776yz',
    darkgray: '6mbhl',
    darkgreen: 'jr4',
    darkgrey: '6mbhl',
    darkkhaki: '7ehkb',
    darkmagenta: '5f91n',
    darkolivegreen: '3bzfz',
    darkorange: '9yygw',
    darkorchid: '5z6x8',
    darkred: '5f8xs',
    darksalmon: '9441m',
    darkseagreen: '5lwgf',
    darkslateblue: '2th1n',
    darkslategray: '1ugcv',
    darkslategrey: '1ugcv',
    darkturquoise: '14up',
    darkviolet: '5rw7n',
    deeppink: '9yavn',
    deepskyblue: '11xb',
    dimgray: '442g9',
    dimgrey: '442g9',
    dodgerblue: '16xof',
    firebrick: '6y7tu',
    floralwhite: '9zkds',
    forestgreen: '1cisi',
    fuchsia: '9y70f',
    gainsboro: '8m8kc',
    ghostwhite: '9pq0v',
    goldenrod: '8j4f4',
    gold: '9zda8',
    gray: '50i2o',
    green: 'pa8',
    greenyellow: '6senj',
    grey: '50i2o',
    honeydew: '9eiuo',
    hotpink: '9yrp0',
    indianred: '80gnw',
    indigo: '2xcoy',
    ivory: '9zldc',
    khaki: '9edu4',
    lavenderblush: '9ziet',
    lavender: '90c8q',
    lawngreen: '4vk74',
    lemonchiffon: '9zkct',
    lightblue: '6s73a',
    lightcoral: '9dtog',
    lightcyan: '8s1rz',
    lightgoldenrodyellow: '9sjiq',
    lightgray: '89jo3',
    lightgreen: '5nkwg',
    lightgrey: '89jo3',
    lightpink: '9z6wx',
    lightsalmon: '9z2ii',
    lightseagreen: '19xgq',
    lightskyblue: '5arju',
    lightslategray: '4nwk9',
    lightslategrey: '4nwk9',
    lightsteelblue: '6wau6',
    lightyellow: '9zlcw',
    lime: '1edc',
    limegreen: '1zcxe',
    linen: '9shk6',
    magenta: '9y70f',
    maroon: '4zsow',
    mediumaquamarine: '40eju',
    mediumblue: '5p',
    mediumorchid: '79qkz',
    mediumpurple: '5r3rv',
    mediumseagreen: '2d9ip',
    mediumslateblue: '4tcku',
    mediumspringgreen: '1di2',
    mediumturquoise: '2uabw',
    mediumvioletred: '7rn9h',
    midnightblue: 'z980',
    mintcream: '9ljp6',
    mistyrose: '9zg0x',
    moccasin: '9zfzp',
    navajowhite: '9zest',
    navy: '3k',
    oldlace: '9wq92',
    olive: '50hz4',
    olivedrab: '472ub',
    orange: '9z3eo',
    orangered: '9ykg0',
    orchid: '8iu3a',
    palegoldenrod: '9bl4a',
    palegreen: '5yw0o',
    paleturquoise: '6v4ku',
    palevioletred: '8k8lv',
    papayawhip: '9zi6t',
    peachpuff: '9ze0p',
    peru: '80oqn',
    pink: '9z8wb',
    plum: '8nba5',
    powderblue: '6wgdi',
    purple: '4zssg',
    rebeccapurple: '3zk49',
    red: '9y6tc',
    rosybrown: '7cv4f',
    royalblue: '2jvtt',
    saddlebrown: '5fmkz',
    salmon: '9rvci',
    sandybrown: '9jn1c',
    seagreen: '1tdnb',
    seashell: '9zje6',
    sienna: '6973h',
    silver: '7ir40',
    skyblue: '5arjf',
    slateblue: '45e4t',
    slategray: '4e100',
    slategrey: '4e100',
    snow: '9zke2',
    springgreen: '1egv',
    steelblue: '2r1kk',
    tan: '87yx8',
    teal: 'pds',
    thistle: '8ggk8',
    tomato: '9yqfb',
    turquoise: '2j4r4',
    violet: '9b10u',
    wheat: '9ld4j',
    white: '9zldr',
    whitesmoke: '9lhpx',
    yellow: '9zl6o',
    yellowgreen: '61fzm'
};

const round = Math.round;
/**
 * Support format, alpha unit will check the % mark:
 * - rgba(102, 204, 255, .5)      -> [102, 204, 255, 0.5]
 * - rgb(102 204 255 / .5)        -> [102, 204, 255, 0.5]
 * - rgb(100%, 50%, 0% / 50%)     -> [255, 128, 0, 0.5]
 * - hsl(270, 60, 40, .5)         -> [270, 60, 40, 0.5]
 * - hsl(270deg 60% 40% / 50%)   -> [270, 60, 40, 0.5]
 *
 * When `base` is provided, the percentage value will be divided by `base`.
 */ function splitColorStr(str, parseNum) {
    const match = str// Remove str before `(`
    .replace(/^[^(]*\((.*)/, '$1')// Remove str after `)`
    .replace(/\).*/, '').match(/\d*\.?\d+%?/g) || [];
    const numList = match.map((item)=>parseFloat(item));
    for(let i = 0; i < 3; i += 1){
        numList[i] = parseNum(numList[i] || 0, match[i] || '', i);
    }
    // For alpha. 50% should be 0.5
    if (match[3]) {
        numList[3] = match[3].includes('%') ? numList[3] / 100 : numList[3];
    } else {
        // By default, alpha is 1
        numList[3] = 1;
    }
    return numList;
}
const parseHSVorHSL = (num, _, index)=>index === 0 ? num : num / 100;
/** round and limit number to integer between 0-255 */ function limitRange(value, max) {
    const mergedMax = max || 255;
    if (value > mergedMax) {
        return mergedMax;
    }
    if (value < 0) {
        return 0;
    }
    return value;
}
class FastColor {
    // ======================= Setter =======================
    setR(value) {
        return this._sc('r', value);
    }
    setG(value) {
        return this._sc('g', value);
    }
    setB(value) {
        return this._sc('b', value);
    }
    setA(value) {
        return this._sc('a', value, 1);
    }
    setHue(value) {
        const hsv = this.toHsv();
        hsv.h = value;
        return this._c(hsv);
    }
    // ======================= Getter =======================
    /**
   * Returns the perceived luminance of a color, from 0-1.
   * @see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
   */ getLuminance() {
        function adjustGamma(raw) {
            const val = raw / 255;
            return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
        }
        const R = adjustGamma(this.r);
        const G = adjustGamma(this.g);
        const B = adjustGamma(this.b);
        return 0.2126 * R + 0.7152 * G + 0.0722 * B;
    }
    getHue() {
        if (typeof this._h === 'undefined') {
            const delta = this.getMax() - this.getMin();
            if (delta === 0) {
                this._h = 0;
            } else {
                this._h = round(60 * (this.r === this.getMax() ? (this.g - this.b) / delta + (this.g < this.b ? 6 : 0) : this.g === this.getMax() ? (this.b - this.r) / delta + 2 : (this.r - this.g) / delta + 4));
            }
        }
        return this._h;
    }
    /**
   * @deprecated should use getHSVSaturation or getHSLSaturation instead
   */ getSaturation() {
        return this.getHSVSaturation();
    }
    getHSVSaturation() {
        if (typeof this._hsv_s === 'undefined') {
            const delta = this.getMax() - this.getMin();
            if (delta === 0) {
                this._hsv_s = 0;
            } else {
                this._hsv_s = delta / this.getMax();
            }
        }
        return this._hsv_s;
    }
    getHSLSaturation() {
        if (typeof this._hsl_s === 'undefined') {
            const delta = this.getMax() - this.getMin();
            if (delta === 0) {
                this._hsl_s = 0;
            } else {
                const l = this.getLightness();
                this._hsl_s = delta / 255 / (1 - Math.abs(2 * l - 1));
            }
        }
        return this._hsl_s;
    }
    getLightness() {
        if (typeof this._l === 'undefined') {
            this._l = (this.getMax() + this.getMin()) / 510;
        }
        return this._l;
    }
    getValue() {
        if (typeof this._v === 'undefined') {
            this._v = this.getMax() / 255;
        }
        return this._v;
    }
    /**
   * Returns the perceived brightness of the color, from 0-255.
   * Note: this is not the b of HSB
   * @see http://www.w3.org/TR/AERT#color-contrast
   */ getBrightness() {
        if (typeof this._brightness === 'undefined') {
            this._brightness = (this.r * 299 + this.g * 587 + this.b * 114) / 1000;
        }
        return this._brightness;
    }
    // ======================== Func ========================
    darken(amount = 10) {
        const h = this.getHue();
        const s = this.getSaturation();
        let l = this.getLightness() - amount / 100;
        if (l < 0) {
            l = 0;
        }
        return this._c({
            h,
            s,
            l,
            a: this.a
        });
    }
    lighten(amount = 10) {
        const h = this.getHue();
        const s = this.getSaturation();
        let l = this.getLightness() + amount / 100;
        if (l > 1) {
            l = 1;
        }
        return this._c({
            h,
            s,
            l,
            a: this.a
        });
    }
    /**
   * Mix the current color a given amount with another color, from 0 to 100.
   * 0 means no mixing (return current color).
   */ mix(input, amount = 50) {
        const color = this._c(input);
        const p = amount / 100;
        const calc = (key)=>(color[key] - this[key]) * p + this[key];
        const rgba = {
            r: round(calc('r')),
            g: round(calc('g')),
            b: round(calc('b')),
            a: round(calc('a') * 100) / 100
        };
        return this._c(rgba);
    }
    /**
   * Mix the color with pure white, from 0 to 100.
   * Providing 0 will do nothing, providing 100 will always return white.
   */ tint(amount = 10) {
        return this.mix({
            r: 255,
            g: 255,
            b: 255,
            a: 1
        }, amount);
    }
    /**
   * Mix the color with pure black, from 0 to 100.
   * Providing 0 will do nothing, providing 100 will always return black.
   */ shade(amount = 10) {
        return this.mix({
            r: 0,
            g: 0,
            b: 0,
            a: 1
        }, amount);
    }
    onBackground(background) {
        const bg = this._c(background);
        const alpha = this.a + bg.a * (1 - this.a);
        const calc = (key)=>{
            return round((this[key] * this.a + bg[key] * bg.a * (1 - this.a)) / alpha);
        };
        return this._c({
            r: calc('r'),
            g: calc('g'),
            b: calc('b'),
            a: alpha
        });
    }
    // ======================= Status =======================
    isDark() {
        return this.getBrightness() < 128;
    }
    isLight() {
        return this.getBrightness() >= 128;
    }
    // ======================== MISC ========================
    equals(other) {
        return this.r === other.r && this.g === other.g && this.b === other.b && this.a === other.a;
    }
    clone() {
        return this._c(this);
    }
    // ======================= Format =======================
    toHexString() {
        let hex = '#';
        const rHex = (this.r || 0).toString(16);
        hex += rHex.length === 2 ? rHex : '0' + rHex;
        const gHex = (this.g || 0).toString(16);
        hex += gHex.length === 2 ? gHex : '0' + gHex;
        const bHex = (this.b || 0).toString(16);
        hex += bHex.length === 2 ? bHex : '0' + bHex;
        if (typeof this.a === 'number' && this.a >= 0 && this.a < 1) {
            const aHex = round(this.a * 255).toString(16);
            hex += aHex.length === 2 ? aHex : '0' + aHex;
        }
        return hex;
    }
    /** CSS support color pattern */ toHsl() {
        return {
            h: this.getHue(),
            s: this.getHSLSaturation(),
            l: this.getLightness(),
            a: this.a
        };
    }
    /** CSS support color pattern */ toHslString() {
        const h = this.getHue();
        const s = round(this.getHSLSaturation() * 100);
        const l = round(this.getLightness() * 100);
        return this.a !== 1 ? `hsla(${h},${s}%,${l}%,${this.a})` : `hsl(${h},${s}%,${l}%)`;
    }
    /** Same as toHsb */ toHsv() {
        return {
            h: this.getHue(),
            s: this.getHSVSaturation(),
            v: this.getValue(),
            a: this.a
        };
    }
    toRgb() {
        return {
            r: this.r,
            g: this.g,
            b: this.b,
            a: this.a
        };
    }
    toRgbString() {
        return this.a !== 1 ? `rgba(${this.r},${this.g},${this.b},${this.a})` : `rgb(${this.r},${this.g},${this.b})`;
    }
    toString() {
        return this.toRgbString();
    }
    // ====================== Privates ======================
    /** Return a new FastColor object with one channel changed */ _sc(rgb, value, max) {
        const clone = this.clone();
        clone[rgb] = limitRange(value, max);
        return clone;
    }
    _c(input) {
        return new this.constructor(input);
    }
    getMax() {
        if (typeof this._max === 'undefined') {
            this._max = Math.max(this.r, this.g, this.b);
        }
        return this._max;
    }
    getMin() {
        if (typeof this._min === 'undefined') {
            this._min = Math.min(this.r, this.g, this.b);
        }
        return this._min;
    }
    fromHexString(trimStr) {
        const withoutPrefix = trimStr.replace('#', '');
        function connectNum(index1, index2) {
            return parseInt(withoutPrefix[index1] + withoutPrefix[index2 || index1], 16);
        }
        if (withoutPrefix.length < 6) {
            // #rgb or #rgba
            this.r = connectNum(0);
            this.g = connectNum(1);
            this.b = connectNum(2);
            this.a = withoutPrefix[3] ? connectNum(3) / 255 : 1;
        } else {
            // #rrggbb or #rrggbbaa
            this.r = connectNum(0, 1);
            this.g = connectNum(2, 3);
            this.b = connectNum(4, 5);
            this.a = withoutPrefix[6] ? connectNum(6, 7) / 255 : 1;
        }
    }
    fromHsl({ h: _h, s, l, a }) {
        const h = (_h % 360 + 360) % 360;
        this._h = h;
        this._hsl_s = s;
        this._l = l;
        this.a = typeof a === 'number' ? a : 1;
        if (s <= 0) {
            const rgb = round(l * 255);
            this.r = rgb;
            this.g = rgb;
            this.b = rgb;
            return;
        }
        let r = 0, g = 0, b = 0;
        const huePrime = h / 60;
        const chroma = (1 - Math.abs(2 * l - 1)) * s;
        const secondComponent = chroma * (1 - Math.abs(huePrime % 2 - 1));
        if (huePrime >= 0 && huePrime < 1) {
            r = chroma;
            g = secondComponent;
        } else if (huePrime >= 1 && huePrime < 2) {
            r = secondComponent;
            g = chroma;
        } else if (huePrime >= 2 && huePrime < 3) {
            g = chroma;
            b = secondComponent;
        } else if (huePrime >= 3 && huePrime < 4) {
            g = secondComponent;
            b = chroma;
        } else if (huePrime >= 4 && huePrime < 5) {
            r = secondComponent;
            b = chroma;
        } else if (huePrime >= 5 && huePrime < 6) {
            r = chroma;
            b = secondComponent;
        }
        const lightnessModification = l - chroma / 2;
        this.r = round((r + lightnessModification) * 255);
        this.g = round((g + lightnessModification) * 255);
        this.b = round((b + lightnessModification) * 255);
    }
    fromHsv({ h: _h, s, v, a }) {
        const h = (_h % 360 + 360) % 360;
        this._h = h;
        this._hsv_s = s;
        this._v = v;
        this.a = typeof a === 'number' ? a : 1;
        const vv = round(v * 255);
        this.r = vv;
        this.g = vv;
        this.b = vv;
        if (s <= 0) {
            return;
        }
        const hh = h / 60;
        const i = Math.floor(hh);
        const ff = hh - i;
        const p = round(v * (1.0 - s) * 255);
        const q = round(v * (1.0 - s * ff) * 255);
        const t = round(v * (1.0 - s * (1.0 - ff)) * 255);
        switch(i){
            case 0:
                this.g = t;
                this.b = p;
                break;
            case 1:
                this.r = q;
                this.b = p;
                break;
            case 2:
                this.r = p;
                this.b = t;
                break;
            case 3:
                this.r = p;
                this.g = q;
                break;
            case 4:
                this.r = t;
                this.g = p;
                break;
            case 5:
            default:
                this.g = p;
                this.b = q;
                break;
        }
    }
    fromHsvString(trimStr) {
        const cells = splitColorStr(trimStr, parseHSVorHSL);
        this.fromHsv({
            h: cells[0],
            s: cells[1],
            v: cells[2],
            a: cells[3]
        });
    }
    fromHslString(trimStr) {
        const cells = splitColorStr(trimStr, parseHSVorHSL);
        this.fromHsl({
            h: cells[0],
            s: cells[1],
            l: cells[2],
            a: cells[3]
        });
    }
    fromRgbString(trimStr) {
        const cells = splitColorStr(trimStr, (num, txt)=>// Convert percentage to number. e.g. 50% -> 128
            txt.includes('%') ? round(num / 100 * 255) : num);
        this.r = cells[0];
        this.g = cells[1];
        this.b = cells[2];
        this.a = cells[3];
    }
    constructor(input){
        /**
   * All FastColor objects are valid. So isValid is always true. This property is kept to be compatible with TinyColor.
   */ this.isValid = true;
        /**
   * Red, R in RGB
   */ this.r = 0;
        /**
   * Green, G in RGB
   */ this.g = 0;
        /**
   * Blue, B in RGB
   */ this.b = 0;
        /**
   * Alpha/Opacity, A in RGBA/HSLA
   */ this.a = 1;
        /**
     * Always check 3 char in the object to determine the format.
     * We not use function in check to save bundle size.
     * e.g. 'rgb' -> { r: 0, g: 0, b: 0 }.
     */ function matchFormat(str) {
            return str[0] in input && str[1] in input && str[2] in input;
        }
        if (!input) ; else if (typeof input === 'string') {
            const trimStr = input.trim();
            function matchPrefix(prefix) {
                return trimStr.startsWith(prefix);
            }
            if (/^#?[A-F\d]{3,8}$/i.test(trimStr)) {
                this.fromHexString(trimStr);
            } else if (matchPrefix('rgb')) {
                this.fromRgbString(trimStr);
            } else if (matchPrefix('hsl')) {
                this.fromHslString(trimStr);
            } else if (matchPrefix('hsv') || matchPrefix('hsb')) {
                this.fromHsvString(trimStr);
            } else {
                // From preset color
                const presetColor = presetColors[trimStr.toLowerCase()];
                if (presetColor) {
                    this.fromHexString(// Convert 36 hex to 16 hex
                    parseInt(presetColor, 36).toString(16).padStart(6, '0'));
                }
            }
        } else if (input instanceof FastColor) {
            this.r = input.r;
            this.g = input.g;
            this.b = input.b;
            this.a = input.a;
            this._h = input._h;
            this._hsl_s = input._hsl_s;
            this._hsv_s = input._hsv_s;
            this._l = input._l;
            this._v = input._v;
        } else if (matchFormat('rgb')) {
            this.r = limitRange(input.r);
            this.g = limitRange(input.g);
            this.b = limitRange(input.b);
            this.a = typeof input.a === 'number' ? limitRange(input.a, 1) : 1;
        } else if (matchFormat('hsl')) {
            this.fromHsl(input);
        } else if (matchFormat('hsv')) {
            this.fromHsv(input);
        } else {
            throw new Error('@ant-design/fast-color: unsupported input ' + JSON.stringify(input));
        }
    }
}

function isDate(obj) {
    return obj instanceof Date;
}

function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}

function encode(val) {
    // 对url进行编码并处理特殊字符
    return encodeURIComponent(val)//ig为全局查找，忽略大小写
    .replace(/%40/g, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
}
function buildURL(url, params) {
    // 没有 params 就直接返回 url，无需拼接
    if (!params) {
        return url;
    }
    const parts = [];
    Object.keys(params).forEach((key)=>{
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
        } else {
            // 如果不是数组，那就把它统一变为数组
            values = [
                val
            ];
        }
        values.forEach((val)=>{
            if (isDate(val)) {
                // toISOString() 方法返回一个 ISO（ISO 格式的字符串： YYYY-MM-DDTHH:mm:ss.sssZ。
                val = val.toISOString();
            } else if (isObject(val)) {
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

/* eslint-disable */ /**
 * ------------------------------------------------------------------
 * ⚠️ AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 * ------------------------------------------------------------------
 * This file is generated by:
 * packages/style/build.ts
 *
 * Any manual changes will be overwritten.
 * ------------------------------------------------------------------
 */ const colors = {
    light: '#f4f5f8',
    stable: '#92949c',
    positive: '#3880ff',
    calm: '#3dc2ff',
    balanced: '#2dd36f',
    energized: '#ffc409',
    assertive: '#eb445a',
    royal: '#8a63d2',
    dark: '#222428'
};
const isPresetColor = (color)=>{
    return !!color && color in colors;
};
const getPresetColor = (color)=>{
    return isPresetColor(color) ? colors[color] : color;
};

function customPromise() {
    let _resolveCallback;
    let _rejectCallback;
    let _promiseState = 'pending';
    let promise = new Promise((resolve, reject)=>{
        _resolveCallback = resolve;
        _rejectCallback = reject;
    }).then((value)=>{
        _promiseState = 'fulfilled';
        return value;
    }, (err)=>{
        _promiseState = 'rejected';
        throw err;
    });
    return {
        promise,
        get promiseState () {
            return _promiseState;
        },
        resolve: (value)=>{
            if (_promiseState !== 'pending') return;
            _resolveCallback(value);
        },
        reject: (reason)=>{
            if (_promiseState !== 'pending') return;
            _rejectCallback(reason);
        }
    };
}

function getDefaultContext(props, fields = []) {
    const clone = {};
    if (Array.isArray(fields)) {
        fields.forEach((key)=>{
            const prop = props[key];
            clone[key] = typeof prop === 'object' ? prop.value : prop;
        });
    }
    return clone;
}

/**
 * Normalize font-size value.
 *
 * Rules:
 * - number -> append `px`
 * - numeric string -> append `px`
 * - other css units/value -> keep original
 *
 * Examples:
 * ```ts
 * getFontSize(16)           => '16px'
 * getFontSize('16')         => '16px'
 * getFontSize('1.5rem')     => '1.5rem'
 * getFontSize('20px')       => '20px'
 * getFontSize('20rpx')      => '20rpx'
 * getFontSize('var(--x)')   => 'var(--x)'
 * getFontSize('')           => ''
 */ function getFontSize(size) {
    if (typeof size === 'number') {
        return `${size}px`;
    }
    if (size.trim() !== '' && !isNaN(Number(size))) {
        return `${size}px`;
    }
    return size;
}

function isDef(v) {
    return v !== undefined && v !== null;
}

function isFalse(v) {
    return v === false;
}

function isPromise(val) {
    return isDef(val) && typeof val.then === 'function' && typeof val.catch === 'function';
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

function noop(...args) {}

function omit(obj, fields) {
    const clone = {
        ...obj
    };
    if (Array.isArray(fields)) {
        fields.forEach((key)=>{
            delete clone[key];
        });
    }
    return clone;
}

function pxToNumber(value) {
    if (!value) return 0;
    if (typeof value === 'number') return value;
    const match = value.match(/^\d*(\.\d*)?/);
    return match ? Number(match[0]) : 0;
}

function sleep(time) {
    return new Promise((resolve)=>setTimeout(resolve, time));
}

var util = {
    FastColor,
    buildURL,
    isPresetColor,
    customPromise,
    getFontSize,
    getDefaultContext,
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
    sleep
};

/**
 * 查询节点信息的对象
 *
 * @param {MiniprogramPublicInstance} [instance=getCurrentPage()] 小程序页面或组件的实例对象
 * @return {*}
 */ function useQuery(instance = getCurrentPage()) {
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
 */ function useSelector(selector, instance) {
    return canUseMP() ? useQuery(instance).select(selector) : null;
}
/**
 * 获取匹配指定选择器的所有元素
 *
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/wxml/SelectorQuery.selectAll.html
 * @param {string} selector 在当前页面下选择匹配选择器 selector 的所有节点。
 * @param {MiniprogramPublicInstance} instance 小程序页面或组件的实例对象
 * @return {*}  {(MiniprogramElement | null)}
 */ function useSelectorAll(selector, instance) {
    return canUseMP() ? useQuery(instance).selectAll(selector) : null;
}
const makeFields = ()=>({
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
            'borderLeftWidth'
        ],
        node: true
    });
const makeNodeRef = (node)=>{
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
        node: node.node
    };
};
/**
 * 获取第一个节点的相关信息
 *
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/wxml/NodesRef.fields.html
 * @param {(string | string[])} selector 在当前页面下选择第一个匹配选择器 selector 的节点。
 * @param {MiniprogramPublicInstance} [instance] 小程序页面或组件的实例对象
 * @return {*}  {(Promise<MiniprogramNodeRef | MiniprogramNodeRef[]>)}
 */ function useRef(selector, instance) {
    return new Promise((resolve)=>{
        const query = useQuery(instance);
        const isArray = Array.isArray(selector);
        const classList = isArray ? selector : [
            selector
        ];
        if (query) {
            classList.forEach((s)=>{
                query.select(s).fields(makeFields());
            });
            query.exec((nodes)=>{
                resolve(isArray ? nodes.map((node)=>makeNodeRef(node)) : makeNodeRef(nodes[0]));
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
 */ function useRefAll(selector, instance) {
    return new Promise((resolve)=>{
        const query = useQuery(instance);
        const isArray = Array.isArray(selector);
        const classList = isArray ? selector : [
            selector
        ];
        if (query) {
            classList.forEach((s)=>{
                query.selectAll(s).fields(makeFields());
            });
            query.exec((nodesList)=>{
                resolve(isArray ? nodesList.map((nodes)=>nodes.map((node)=>makeNodeRef(node))) : nodesList[0].map((node)=>makeNodeRef(node)));
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
 */ function useRect(selector, instance) {
    return new Promise((resolve)=>{
        const query = useQuery(instance);
        const isArray = Array.isArray(selector);
        const classList = isArray ? selector : [
            selector
        ];
        if (query) {
            classList.forEach((s)=>{
                query.select(s).boundingClientRect();
            });
            query.exec((nodes)=>{
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
 */ function useRectAll(selector, instance) {
    return new Promise((resolve)=>{
        const query = useQuery(instance);
        const isArray = Array.isArray(selector);
        const classList = isArray ? selector : [
            selector
        ];
        if (query) {
            classList.forEach((s)=>{
                query.selectAll(s).boundingClientRect();
            });
            query.exec((nodesList)=>{
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
 */ function useScrollOffset(instance) {
    return new Promise((resolve)=>{
        const query = useQuery(instance);
        if (query) {
            query.selectViewport().scrollOffset();
            query.exec(([node])=>{
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
 */ function useComputedStyle(selector, ...args) {
    const [computedStyle, instance] = args;
    const opts = {
        computedStyle,
        instance
    };
    if (instance === undefined) {
        opts.computedStyle = [
            'width',
            'height'
        ];
        opts.instance = computedStyle;
    }
    return new Promise((resolve)=>{
        const query = useQuery(opts.instance);
        if (query) {
            query.select(selector).fields({
                computedStyle: opts.computedStyle
            });
            query.exec(([node])=>{
                resolve(node);
            });
        }
    });
}

async function getCanvasRef(canvasId, vm) {
    const res = await useRef(`#${canvasId}`, vm);
    if (!res) {
        return Promise.reject({
            errMsg: 'Canvas is not supported in the current environment.'
        });
    }
    return res.node;
}
function createImage({ imageWidth, imageHeight, imageUrl }, canvas) {
    return new Promise((resolve, reject)=>{
        if (typeof canvas.createImage === 'function') {
            const ratio = getSystemInfoSync([
                'window'
            ]).pixelRatio;
            const ctx = canvas.getContext('2d');
            const img = canvas.createImage();
            img.onload = ()=>{
                ctx.drawImage(img, -imageWidth * ratio / 2, -imageHeight * ratio / 2, imageWidth * ratio, imageHeight * ratio);
                resolve(imageUrl);
            };
            img.onerror = ()=>{
                reject({
                    errMsg: 'Image creation failed in canvas.createImage.'
                });
            };
            img.src = imageUrl;
        } else {
            reject({
                errMsg: 'Canvas.createImage is not a function.'
            });
        }
    });
}
/**
 * 把当前画布指定区域的内容导出生成指定大小的图片
 */ function toDataURL({ width, height, type = 'png', quality = 1 }, canvas) {
    return new Promise((resolve)=>{
        if (typeof canvas.toDataURL === 'function') {
            // 基础库 2.11.0 开始支持
            // @see https://developers.weixin.qq.com/miniprogram/dev/api/canvas/Canvas.toDataURL.html
            const fileType = type === 'jpg' || type === 'jpeg' ? 'jpeg' : type;
            resolve(canvas.toDataURL(`image/${fileType}`, quality));
        } else if (typeof miniprogramThis.canvasToTempFilePath === 'function') {
            // 基础库 1.9.6 开始支持
            // @see https://developers.weixin.qq.com/miniprogram/dev/api/canvas/wx.canvasToTempFilePath.html
            const ratio = getSystemInfoSync([
                'window'
            ]).pixelRatio;
            const fileType = type === 'jpg' || type === 'jpeg' ? 'jpg' : 'png';
            miniprogramThis.canvasToTempFilePath({
                destWidth: width * ratio,
                destHeight: height * ratio,
                canvas,
                fileType,
                quality,
                success: (res)=>resolve(res.tempFilePath),
                fail: ()=>resolve('')
            });
        } else {
            resolve('');
        }
    });
}
function downloadImage(imageUrl) {
    return new Promise((resolve, reject)=>{
        if (/^http/.test(imageUrl) && // @ts-ignore
        !/^http:\/\/tmp/.test(imageUrl)) {
            miniprogramThis.downloadFile({
                url: imageUrl,
                success: (res)=>{
                    if (res.statusCode === 200) {
                        resolve(res.tempFilePath);
                    } else {
                        reject({
                            errMsg: res.errMsg
                        });
                    }
                },
                fail (err) {
                    reject(err);
                }
            });
        } else {
            // 支持本地地址
            resolve(imageUrl);
        }
    });
}

/**
 * 获取触摸点位置信息
 */ const getTouchPoints = (nativeEvent, index = 0)=>{
    const touches = nativeEvent.touches;
    const changedTouches = nativeEvent.changedTouches;
    const hasTouches = touches && touches.length > 0;
    const hasChangedTouches = changedTouches && changedTouches.length > 0;
    const points = !hasTouches && hasChangedTouches ? changedTouches[index] : touches[index];
    return {
        x: points.pageX,
        y: points.pageY
    };
};
/**
 * 获取触摸点个数
 */ const getPointsNumber = (e)=>e.touches?.length || e.changedTouches?.length || 0;
/**
 * 判断是否为同一点
 */ const isEqualPoints = (p1, p2)=>p1.x === p2.x && p1.y === p2.y;
/**
 * 判断是否为相近的两点
 */ const isNearbyPoints = (p1, p2, DOUBLE_TAP_RADIUS = 25)=>{
    const xMove = Math.abs(p1.x - p2.x);
    const yMove = Math.abs(p1.y - p2.y);
    return xMove < DOUBLE_TAP_RADIUS && yMove < DOUBLE_TAP_RADIUS;
};
/**
 * 获取两点之间的距离
 */ const getPointsDistance = (p1, p2)=>{
    const xMove = Math.abs(p1.x - p2.x);
    const yMove = Math.abs(p1.y - p2.y);
    return Math.sqrt(xMove * xMove + yMove * yMove);
};
/**
 * 获取触摸移动方向
 */ const getSwipeDirection = (x1, x2, y1, y2)=>{
    return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? x1 - x2 > 0 ? 'Left' : 'Right' : y1 - y2 > 0 ? 'Up' : 'Down';
};

/**
 * openType 属性可选值为 navigateTo、redirectTo、switchTab、navigateBack、reLaunch
 */ const NATIVE_ROUTES = [
    'navigateTo',
    'redirectTo',
    'switchTab',
    'navigateBack',
    'reLaunch'
];
/**
 * 跳转到指定的页面
 *
 * @export
 * @param {NativeRouteProps} props 参数对象
 * @param {*} vm 小程序页面或组件的实例对象
 * @return {*}
 */ function useNativeRoute(props, vm) {
    const { url, urlParams, openType = 'navigateTo', delta = 1 } = props;
    const promisify = (method, params)=>{
        return new Promise((resolve, reject)=>{
            try {
                miniprogramThis[method]?.call(miniprogramThis, {
                    ...params,
                    success: resolve,
                    fail: reject
                });
            } catch (e) {
                reject(e);
            }
        });
    };
    if (!url) {
        return Promise.reject(`Invalid value of prop "url" of "${vm.is}": Expected an Non-empty String.`);
    } else if (!NATIVE_ROUTES.includes(openType)) {
        return Promise.reject(`Invalid value of prop "openType" of "${vm.is}": expected "${NATIVE_ROUTES.join(',')}", ` + `but got ${openType}.`);
    } else if (openType === 'navigateBack') {
        return promisify(openType, {
            delta
        });
    } else {
        return promisify(openType, {
            url: buildURL(url, urlParams)
        });
    }
}

function usePopupStateHOC(statePropName = 'visible') {
    return (container)=>{
        const render = (props, callback)=>{
            Object.assign(container, Object.fromEntries(Object.entries(props).filter(([, prop])=>typeof prop !== 'function')));
            container.$nextTick(()=>callback?.());
        };
        const update = (props, callback)=>{
            if (props[statePropName] !== undefined) {
                delete props[statePropName];
            }
            render(props, callback);
        };
        const open = (props, callback)=>{
            render({
                ...props,
                [statePropName]: true
            }, callback);
        };
        const close = (callback)=>render({
                [statePropName]: false
            }, callback);
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
    getCanvasRef,
    downloadImage,
    createImage,
    toDataURL,
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

const useColorCls = (color)=>{
    if (!isPresetColor(color)) {
        return null;
    }
    return {
        ['dora-color']: !!color,
        [`dora-color--${color}`]: !!color
    };
};

/**
 * This hook is only for cssVar to add root className for components.
 * If root ClassName is needed, this hook could be refactored with `--root`
 * @param prefixCls
 */ const useCSSVarCls = (prefixCls)=>`${prefixCls}--css-var`;

const { classNames, styleToCssString: stringifyStyle } = Doraemon.util;
function isFunction(value) {
    return typeof value === 'function';
}
function isPlainObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
}
/**
 * Fill object structure by schema, initialize empty objects for keys with `_default` property.
 */ function fillObjectBySchema(value, schema = {}) {
    const newObj = {
        ...value || {}
    };
    Object.keys(schema).forEach((key)=>{
        const currentSchema = schema[key];
        if (currentSchema?._default) {
            var _newObj, _key;
            (_newObj = newObj)[_key = key] || (_newObj[_key] = {});
        } else {
            newObj[key] = fillObjectBySchema(newObj[key], currentSchema);
        }
    });
    return newObj;
}
// ========================= ClassNames =========================
const mergeClassNames = (schema = {}, ...classNameList)=>{
    return classNameList.filter((item)=>Boolean(item)).reduce((acc, cur)=>{
        // Loop keys of the current classNames
        Object.keys(cur).forEach((key)=>{
            const keySchema = schema[key];
            const curVal = cur[key];
            if (keySchema) {
                if (isPlainObject(curVal)) {
                    // Loop fill
                    acc[key] = mergeClassNames(keySchema, acc[key], curVal);
                } else {
                    // Covert string to object structure
                    const { _default: defaultField } = keySchema;
                    if (defaultField) {
                        acc[key] = acc[key] || {};
                        acc[key][defaultField] = classNames(acc[key][defaultField], curVal);
                    }
                }
            } else {
                // Flatten fill
                acc[key] = classNames(acc[key], curVal);
            }
        });
        return acc;
    }, {});
};
// =========================== Styles ===========================
const mergeStyles = (...styles)=>{
    return styles.filter((item)=>Boolean(item)).reduce((acc, cur = {})=>{
        Object.keys(cur).forEach((key)=>{
            acc[key] = {
                ...acc[key],
                ...cur[key]
            };
        });
        return acc;
    }, {});
};
const useSemanticClassNames = (schema, ...classNames)=>{
    return mergeClassNames(schema, ...classNames);
};
const useSemanticStyles = (...styles)=>{
    return mergeStyles(...styles);
};
function stringifySemanticStyles(styles) {
    return Object.keys(styles).reduce((acc, key)=>{
        const value = styles[key];
        if (isPlainObject(value) && Object.values(value).some((item)=>isPlainObject(item))) {
            acc[key] = stringifySemanticStyles(value);
        } else {
            acc[key] = stringifyStyle(value || {});
        }
        return acc;
    }, {});
}
const useSemanticStylesString = (...styles)=>{
    return stringifySemanticStyles(useSemanticStyles(...styles));
};
// =========================== Export ===========================
const resolveStyleOrClass = (value, info)=>{
    return isFunction(value) ? value(info) : value;
};
/**
 * @desc Merge classNames and styles from multiple sources. When `schema` is provided, it **must** provide the nest object structure.
 * @descZH 合并来自多个来源的 classNames 和 styles，当提供了 `schema` 时，必须提供嵌套的对象结构。
 */ const useMergeSemantic = (classNamesList, stylesList, info, schema)=>{
    const resolvedClassNamesList = classNamesList.map((classNames)=>classNames ? resolveStyleOrClass(classNames, info) : undefined);
    const resolvedStylesList = stylesList.map((styles)=>styles ? resolveStyleOrClass(styles, info) : undefined);
    const mergedClassNames = useSemanticClassNames(schema, ...resolvedClassNamesList);
    const mergedStyles = useSemanticStyles(...resolvedStylesList);
    if (!schema) {
        return [
            mergedClassNames,
            mergedStyles
        ];
    }
    return [
        fillObjectBySchema(mergedClassNames, schema),
        fillObjectBySchema(mergedStyles, schema)
    ];
};

var hooks = {
    useColorCls,
    useCSSVarCls,
    fillObjectBySchema,
    mergeClassNames,
    mergeStyles,
    useSemanticClassNames,
    useSemanticStyles,
    useSemanticStylesString,
    resolveStyleOrClass,
    useMergeSemantic
};

var index = {
    decorators,
    dom,
    hooks,
    util,
    ...decorators,
    ...dom,
    ...hooks,
    ...util
};

export { FastColor, NATIVE_ROUTES, buildURL, canUseMP, chooseMedia, createImage, customPromise, decorators, index as default, dom, downloadImage, fillObjectBySchema, findComponentNode, getCanvasRef, getCurrentPage, getDefaultContext, getFontSize, getMenuButtonBoundingClientRectSync, getPointsDistance, getPointsNumber, getPresetColor, getSwipeDirection, getSystemInfoSync, getTouchPoints, hooks, isDate, isDef, isEqualPoints, isFalse, isNearbyPoints, isObject, isPresetColor, isPromise, isString, isTrue, isUndef, mergeClassNames, mergeStyles, miniprogramThis, nextTick, noop, omit, pxToNumber, resolveStyleOrClass, sleep, toDataURL, uploadFile, useCSSVarCls, useColorCls, useComputedStyle, useControlledState, useMergeSemantic, useNativeRoute, usePopupStateHOC, useQuery, useRect, useRectAll, useRef, useRefAll, useScrollOffset, useSelector, useSelectorAll, useSemanticClassNames, useSemanticStyles, useSemanticStylesString, util, vibrateShort };
