/**
 * @doraemon-ui/miniprogram.date-picker-view.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-05, 21:23:30.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
export const props = {
    prefixCls: { type: String, default: 'dora-date-picker' },
    multiPickerPrefixCls: { type: String, default: 'dora-picker' },
    pickerPrefixCls: { type: String, default: 'dora-picker-view' },
    value: { type: null, default: null },
    itemHeight: { type: Number, default: 34 },
    itemStyle: { type: null, default: '' },
    indicatorStyle: { type: null, default: '' },
    indicatorClass: { type: String, default: '' },
    maskStyle: { type: null, default: '' },
    maskClass: { type: String, default: '' },
    labelAlign: { type: String, default: 'center' },
    mode: { type: String, default: 'datetime' },
    minuteStep: { type: Number, default: 1 },
    use12Hours: { type: Boolean, default: false },
    minDate: { type: null, default: null },
    maxDate: { type: null, default: null },
    minHour: { type: Number, default: 0 },
    maxHour: { type: Number, default: 23 },
    minMinute: { type: Number, default: 0 },
    maxMinute: { type: Number, default: 59 },
    lang: { type: String, default: 'zh_CN' },
    tillNow: { type: Boolean, default: false },
};
