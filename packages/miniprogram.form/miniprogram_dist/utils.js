/**
 * @doraemon-ui/miniprogram.form.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-15, 00:06:49.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

const hasOwnProperty = Object.prototype.hasOwnProperty;
const MAX_SAFE_INTEGER = 9007199254740991;
const reIsUint = /^(?:0|[1-9]\d*)$/;
const reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
const reIsPlainProp = /^\w*$/;
const charCodeOfDot = '.'.charCodeAt(0);
const reEscapeChar = /\\(\\)?/g;
const rePropName = RegExp('[^.[\\]]+|\\[(?:([^"\'][^[]*)|(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2)\\]|(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))', 'g');
function isObject(value) {
    const type = typeof value;
    return value != null && (type === 'object' || type === 'function');
}
function eq(value, other) {
    return value === other || value !== value && other !== other;
}
function baseAssignValue(object, key, value) {
    if (key === '__proto__') {
        Object.defineProperty(object, key, {
            configurable: true,
            enumerable: true,
            value,
            writable: true
        });
    } else {
        object[key] = value;
    }
}
function assignValue(object, key, value) {
    const objValue = object[key];
    if (!(hasOwnProperty.call(object, key) && eq(objValue, value))) {
        if (value !== 0 || 1 / value === 1 / objValue) {
            baseAssignValue(object, key, value);
        }
    } else if (value === undefined && !(key in object)) {
        baseAssignValue(object, key, value);
    }
}
function toKey(value) {
    if (typeof value === 'string') return value;
    const result = `${value}`;
    return result === '0' && 1 / value === -Infinity ? '-0' : result;
}
function isKey(value, object) {
    if (Array.isArray(value)) return false;
    const type = typeof value;
    if (type === 'number' || type === 'boolean' || value == null) return true;
    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}
function stringToPath(string) {
    const result = [];
    if (string.charCodeAt(0) === charCodeOfDot) result.push('');
    string.replace(rePropName, (match, expression, quote, subString)=>{
        let key = match;
        if (quote) key = subString.replace(reEscapeChar, '$1');
        else if (expression) key = expression.trim();
        result.push(key);
        return match;
    });
    return result;
}
function castPath(value, object) {
    if (Array.isArray(value)) return value;
    return isKey(value, object) ? [
        value
    ] : stringToPath(value);
}
function isIndex(value, length) {
    const type = typeof value;
    const maxLength = MAX_SAFE_INTEGER ;
    return !!maxLength && (type === 'number' || type !== 'symbol' && reIsUint.test(value)) && value > -1 && value % 1 === 0 && value < maxLength;
}
function baseSet(object, path, value) {
    if (!isObject(object)) return object;
    const nextPath = castPath(path, object);
    const length = nextPath.length;
    const lastIndex = length - 1;
    let index = -1;
    let nested = object;
    while(nested != null && ++index < length){
        const key = toKey(nextPath[index]);
        let newValue = value;
        if (index !== lastIndex) {
            const objValue = nested[key];
            newValue = isObject(objValue) ? objValue : isIndex(nextPath[index + 1]) ? [] : {};
        }
        assignValue(nested, key, newValue);
        nested = nested[key];
    }
    return object;
}
function set(object, path, value) {
    return object == null ? object : baseSet(object, path, value);
}
function baseGet(object, path) {
    const nextPath = castPath(path, object);
    let index = 0;
    const length = nextPath.length;
    let current = object;
    while(current != null && index < length){
        current = current[toKey(nextPath[index++])];
    }
    return index && index === length ? current : undefined;
}
function get(object, path, defaultValue) {
    const result = object == null ? undefined : baseGet(object, path);
    return result === undefined ? defaultValue : result;
}

export { eq, get, set };
