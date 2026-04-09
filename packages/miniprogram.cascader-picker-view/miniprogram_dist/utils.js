/**
 * @doraemon-ui/miniprogram.cascader-picker-view.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-05, 20:50:21.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
const DEFAULT_FIELD_NAMES = {
    label: 'label',
    value: 'value',
    disabled: 'disabled',
};
export function getRealIndex(value = 0, min = 0, max = 0) {
    if (value <= min)
        return min;
    if (value >= max)
        return max;
    return value;
}
export function getIndexFromValue(value, col = [], fieldNames = DEFAULT_FIELD_NAMES) {
    return getRealIndex(col.map((v) => v[fieldNames.value]).indexOf(value), 0, col.length - 1);
}
export function getIndexesFromValues(values = [], cols = [], fieldNames = DEFAULT_FIELD_NAMES) {
    return cols.reduce((acc, col, idx) => [...acc, getIndexFromValue(values[idx], col, fieldNames)], []);
}
export function getRealValue(value = '', col = [], fieldNames = DEFAULT_FIELD_NAMES) {
    return col.length > 0 ? col[getIndexFromValue(value, col, fieldNames)]?.[fieldNames.value] : '';
}
export function getRealValues(values = [], cols = [], fieldNames = DEFAULT_FIELD_NAMES) {
    return cols.length > 0 ? cols.reduce((acc, col, idx) => [...acc, getRealValue(values[idx], col, fieldNames)], []) : [];
}
export function getLabelFromIndex(index, col = [], member) {
    return member ? col[index]?.[member] : col[index];
}
export function getLabelsFromIndexes(indexes, cols = [], member) {
    return cols.reduce((acc, col, idx) => [...acc, getLabelFromIndex(indexes[idx], col, member)], []);
}
