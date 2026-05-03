/**
 * @doraemon-ui/miniprogram.picker-view.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:40:01.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

const DEFAULT_FIELD_NAMES = {
    label: 'label',
    value: 'value',
    disabled: 'disabled'
};
function getRealIndex(value = 0, min = 0, max = 0) {
    if (value <= min) return min;
    if (value >= max) return max;
    return value;
}
function getIndexFromValue(value, col = [], fieldNames = DEFAULT_FIELD_NAMES) {
    return getRealIndex(col.map((v)=>v[fieldNames.value]).indexOf(value), 0, col.length - 1);
}
function getRealValue(value = '', col = [], fieldNames = DEFAULT_FIELD_NAMES) {
    return col.length > 0 ? (col[getIndexFromValue(value, col, fieldNames)]?.[fieldNames.value]) : '';
}
function getLabelFromIndex(index, col = [], member) {
    return member ? col[index]?.[member] : col[index];
}
function getRealCol(data = [], fieldNames = DEFAULT_FIELD_NAMES) {
    return data.map((v)=>{
        if (typeof v !== 'object') {
            return {
                [fieldNames.value]: v,
                [fieldNames.label]: v
            };
        }
        return v;
    });
}

export { getIndexFromValue, getLabelFromIndex, getRealCol, getRealIndex, getRealValue };
