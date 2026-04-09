/**
 * @doraemon-ui/miniprogram.input-number.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-02-27, 01:41:52.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
/**
 * number-precision (trimmed for input-number)
 */
function strip(num, precision = 12) {
    return +Number.parseFloat(num.toPrecision(precision));
}
function digitLength(num) {
    const eSplit = num.toString().split(/[eE]/);
    const len = (eSplit[0].split('.')[1] || '').length - +(eSplit[1] || 0);
    return len > 0 ? len : 0;
}
function float2Fixed(num) {
    if (num.toString().indexOf('e') === -1) {
        return Number(num.toString().replace('.', ''));
    }
    const dLen = digitLength(num);
    return dLen > 0 ? strip(num * Math.pow(10, dLen)) : num;
}
function times(num1, num2) {
    const num1Changed = float2Fixed(num1);
    const num2Changed = float2Fixed(num2);
    const baseNum = digitLength(num1) + digitLength(num2);
    return (num1Changed * num2Changed) / Math.pow(10, baseNum);
}
function plus(num1, num2) {
    const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
    return (times(num1, baseNum) + times(num2, baseNum)) / baseNum;
}
function minus(num1, num2) {
    const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
    return (times(num1, baseNum) - times(num2, baseNum)) / baseNum;
}
function divide(num1, num2) {
    const num1Changed = float2Fixed(num1);
    const num2Changed = float2Fixed(num2);
    return times(num1Changed / num2Changed, Math.pow(10, digitLength(num2) - digitLength(num1)));
}
function round(num, ratio) {
    const base = Math.pow(10, ratio);
    return divide(Math.round(times(num, base)), base);
}
export default {
    strip,
    plus,
    minus,
    round,
};
