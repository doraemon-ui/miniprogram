/**
 * @doraemon-ui/miniprogram.picker-view.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-05, 18:58:32.
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
export function getRealValue(value = '', col = [], fieldNames = DEFAULT_FIELD_NAMES) {
    return col.length > 0 ? col[getIndexFromValue(value, col, fieldNames)]?.[fieldNames.value] : '';
}
export function getLabelFromIndex(index, col = [], member) {
    return member ? col[index]?.[member] : col[index];
}
export function getRealCol(data = [], fieldNames = DEFAULT_FIELD_NAMES) {
    return data.map((v) => {
        if (typeof v !== 'object') {
            return {
                [fieldNames.value]: v,
                [fieldNames.label]: v,
            };
        }
        return v;
    });
}
