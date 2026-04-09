/**
 * @doraemon-ui/miniprogram.date-picker-view.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-05, 21:23:30.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js';
import locales from './locales';
import { props } from './props';
import { DATETIME, DATE, TIME, MONTH, YEAR, ONE_DAY, TILL_NOW, fomartArray, getDaysInMonth, pad, cloneDate, setMonth, isTillNow, convertStringArrayToDate, convertDateToStringArray, getRealValues, getIndexesFromValues, getLabelsFromIndexes, } from './utils';
let DatePickerView = class DatePickerView extends Doraemon {
    prefixCls;
    multiPickerPrefixCls;
    pickerPrefixCls;
    value;
    itemHeight;
    itemStyle;
    indicatorStyle;
    indicatorClass;
    maskStyle;
    maskClass;
    labelAlign;
    mode;
    minuteStep;
    use12Hours;
    minDate;
    maxDate;
    minHour;
    maxHour;
    minMinute;
    maxMinute;
    lang;
    tillNow;
    inputValue = [];
    cols = [];
    defaultMinDate;
    defaultMaxDate;
    onInputValue() {
        this.updatedCols(this.inputValue);
    }
    onDepsChange() {
        this.setValue(this.value);
    }
    getDefaultMinDate() {
        if (!this.defaultMinDate)
            this.defaultMinDate = new Date(2000, 1, 1, 0, 0, 0);
        return this.defaultMinDate;
    }
    getDefaultMaxDate() {
        if (!this.defaultMaxDate)
            this.defaultMaxDate = new Date(2030, 1, 1, 23, 59, 59);
        return this.defaultMaxDate;
    }
    getMinDate() { return this.minDate ? convertStringArrayToDate(this.minDate, this) : this.getDefaultMinDate(); }
    getMaxDate() { return this.maxDate ? convertStringArrayToDate(this.maxDate, this) : this.getDefaultMaxDate(); }
    getDateMember(type, member) {
        const d = type === 'min' ? this.getMinDate() : this.getMaxDate();
        if (member === 'year')
            return d.getFullYear();
        if (member === 'month')
            return d.getMonth();
        if (member === 'day')
            return d.getDate();
        if (member === 'hour')
            return d.getHours();
        return d.getMinutes();
    }
    getDisplayHour(rawHour) {
        if (this.use12Hours) {
            if (rawHour === 0)
                rawHour = 12;
            if (rawHour > 12)
                rawHour -= 12;
        }
        return rawHour;
    }
    setHours(date, hour) {
        if (!this.use12Hours)
            return date.setHours(hour);
        const dh = date.getHours();
        let nhour = dh >= 12 ? hour + 12 : hour;
        nhour = nhour >= 24 ? 0 : nhour;
        date.setHours(nhour);
    }
    setAmPm(date, index) {
        date.setTime(+date + (index === 0 ? -ONE_DAY / 2 : ONE_DAY / 2));
    }
    clipDate(date) {
        const minDate = this.getMinDate();
        const maxDate = this.getMaxDate();
        if (this.mode === DATETIME) {
            if (date < minDate)
                return cloneDate(minDate);
            if (date > maxDate)
                return cloneDate(maxDate);
        }
        else if (this.mode === DATE || this.mode === YEAR || this.mode === MONTH) {
            if (+date + ONE_DAY <= +minDate)
                return cloneDate(minDate);
            if (+date >= +maxDate + ONE_DAY)
                return cloneDate(maxDate);
        }
        else if (this.mode === TIME) {
            const hour = date.getHours();
            const minute = date.getMinutes();
            if (hour < minDate.getHours() || (hour === minDate.getHours() && minute < minDate.getMinutes()))
                return cloneDate(minDate);
            if (hour > maxDate.getHours() || (hour === maxDate.getHours() && minute > maxDate.getMinutes()))
                return cloneDate(maxDate);
        }
        return date;
    }
    getDate(d) {
        const date = d !== undefined ? d : this.value;
        const parsed = isTillNow(date) ? new Date() : convertStringArrayToDate(date, this);
        return this.clipDate(parsed);
    }
    getDateData(date) {
        const locale = locales[this.lang];
        const selYear = date.getFullYear();
        const selMonth = date.getMonth();
        const years = fomartArray(this.getDateMember('min', 'year'), this.getDateMember('max', 'year')).map((i) => ({ value: `${i}`, label: `${i}${locale.year}` }));
        if (this.mode === YEAR)
            return [years];
        const minMonth = this.getDateMember('min', 'year') === selYear ? this.getDateMember('min', 'month') : 0;
        const maxMonth = this.getDateMember('max', 'year') === selYear ? this.getDateMember('max', 'month') : 11;
        const months = fomartArray(minMonth, maxMonth).map((i) => ({ value: `${i}`, label: `${i + 1}${locale.month}` }));
        if (this.mode === MONTH)
            return [years, months];
        const minDay = this.getDateMember('min', 'year') === selYear && this.getDateMember('min', 'month') === selMonth ? this.getDateMember('min', 'day') : 1;
        const maxDay = this.getDateMember('max', 'year') === selYear && this.getDateMember('max', 'month') === selMonth ? this.getDateMember('max', 'day') : getDaysInMonth(date);
        const days = fomartArray(minDay, maxDay).map((i) => ({ value: `${i}`, label: `${i}${locale.day}` }));
        return [years, months, days];
    }
    getTimeData(date) {
        let minHour = this.minHour;
        let maxHour = this.maxHour;
        let minMinute = this.minMinute;
        let maxMinute = this.maxMinute;
        const locale = locales[this.lang];
        const hour = date.getHours();
        if (this.mode === DATETIME) {
            const y = date.getFullYear();
            const m = date.getMonth();
            const d = date.getDate();
            if (this.getDateMember('min', 'year') === y && this.getDateMember('min', 'month') === m && this.getDateMember('min', 'day') === d) {
                minHour = this.getDateMember('min', 'hour');
                if (minHour === hour)
                    minMinute = this.getDateMember('min', 'minute');
            }
            if (this.getDateMember('max', 'year') === y && this.getDateMember('max', 'month') === m && this.getDateMember('max', 'day') === d) {
                maxHour = this.getDateMember('max', 'hour');
                if (maxHour === hour)
                    maxMinute = this.getDateMember('max', 'minute');
            }
        }
        const hours = fomartArray(this.getDisplayHour(minHour), this.getDisplayHour(maxHour)).map((i) => ({ value: `${i}`, label: locale.hour ? `${i}${locale.hour}` : pad(i) }));
        const minutes = [];
        const selMinute = date.getMinutes();
        for (let i = minMinute; i <= maxMinute; i += this.minuteStep) {
            minutes.push({ value: `${i}`, label: locale.minute ? `${i}${locale.minute}` : pad(i) });
            if (selMinute > i && selMinute < i + this.minuteStep) {
                minutes.push({ value: `${selMinute}`, label: locale.minute ? `${selMinute}${locale.minute}` : pad(selMinute) });
            }
        }
        const ampm = [{ value: '0', label: locale.am }, { value: '1', label: locale.pm }];
        return [hours, minutes].concat(this.use12Hours ? [ampm] : []);
    }
    generateDatePickerColumns(selected, d) {
        const locale = locales[this.lang];
        const date = this.getDate(d);
        let cols = [];
        if (this.mode === YEAR || this.mode === MONTH || this.mode === DATETIME || this.mode === DATE)
            cols = this.getDateData(date);
        if (this.mode === DATETIME || this.mode === TIME)
            cols = cols.concat(this.getTimeData(date));
        if (this.tillNow) {
            cols[0].push({ label: locale.tillNow, value: TILL_NOW });
            if (selected && selected[0] === TILL_NOW)
                cols = cols.map((c, i) => (i === 0 ? c : []));
        }
        return cols;
    }
    getNewDate(values, index) {
        const value = parseInt(values[index], 10);
        const newDate = cloneDate(this.getDate());
        if (this.mode === DATETIME || this.mode === DATE || this.mode === YEAR || this.mode === MONTH) {
            if (index === 0)
                newDate.setFullYear(value);
            if (index === 1)
                setMonth(newDate, value);
            if (index === 2)
                newDate.setDate(value);
            if (index === 3)
                this.setHours(newDate, value);
            if (index === 4)
                newDate.setMinutes(value);
            if (index === 5)
                this.setAmPm(newDate, value);
        }
        else if (this.mode === TIME) {
            if (index === 0)
                this.setHours(newDate, value);
            if (index === 1)
                newDate.setMinutes(value);
            if (index === 2)
                this.setAmPm(newDate, value);
        }
        return this.clipDate(newDate);
    }
    onValueChange(e) {
        const tillNow = e.detail.value[0] === TILL_NOW;
        const newDate = tillNow ? this.getDate(new Date()) : this.getNewDate(e.detail.value, e.detail.index);
        const newCols = this.generateDatePickerColumns(e.detail.value, newDate);
        const values = this.getValue(e.detail.value, newCols);
        this.$emit('valueChange', { ...e.detail, ...values, date: +newDate, tillNow });
    }
    updatedCols(inputValue) {
        this.cols = this.generateDatePickerColumns(inputValue);
    }
    updated(inputValue) {
        if (this.inputValue.join('|') !== inputValue.join('|'))
            this.inputValue = [...inputValue];
    }
    setValue(v) {
        this.updated(this.fixValue(v));
    }
    fixValue(v) {
        if (isTillNow(v)) {
            let inputValue = [TILL_NOW, '', '', '', '', ''];
            if (this.mode === YEAR)
                inputValue = inputValue.slice(0, 1);
            else if (this.mode === MONTH)
                inputValue = inputValue.slice(0, 2);
            else if (this.mode === DATE)
                inputValue = inputValue.slice(0, 3);
            else if (this.mode === TIME)
                inputValue = inputValue.slice(0, !this.use12Hours ? 2 : 3);
            else if (this.mode === DATETIME)
                inputValue = inputValue.slice(0, !this.use12Hours ? 5 : 6);
            return inputValue;
        }
        return convertDateToStringArray(this.getDate(v), this);
    }
    getValue(value = this.inputValue, cols = this.cols) {
        const newValue = this.fixValue(value);
        const names = { label: 'label', value: 'value', disabled: 'disabled' };
        const selectedValue = getRealValues(newValue, cols, names);
        const selectedIndex = getIndexesFromValues(selectedValue, cols, names);
        const displayValue = getLabelsFromIndexes(selectedIndex, cols, names.label);
        return {
            value: selectedValue,
            displayValue,
            selectedIndex,
            selectedValue,
            cols,
            date: +this.getDate(),
            tillNow: selectedValue[0] === TILL_NOW,
        };
    }
    mounted() {
        this.setValue(this.value);
    }
};
__decorate([
    Prop({ type: String, default: 'dora-picker' })
], DatePickerView.prototype, "multiPickerPrefixCls", void 0);
__decorate([
    Prop({ type: String, default: 'dora-picker-view' })
], DatePickerView.prototype, "pickerPrefixCls", void 0);
__decorate([
    Prop({ type: null, default: null })
], DatePickerView.prototype, "value", void 0);
__decorate([
    Prop({ type: Number, default: 34 })
], DatePickerView.prototype, "itemHeight", void 0);
__decorate([
    Prop({ type: null, default: '' })
], DatePickerView.prototype, "itemStyle", void 0);
__decorate([
    Prop({ type: null, default: '' })
], DatePickerView.prototype, "indicatorStyle", void 0);
__decorate([
    Prop({ type: String, default: '' })
], DatePickerView.prototype, "indicatorClass", void 0);
__decorate([
    Prop({ type: null, default: '' })
], DatePickerView.prototype, "maskStyle", void 0);
__decorate([
    Prop({ type: String, default: '' })
], DatePickerView.prototype, "maskClass", void 0);
__decorate([
    Prop({ type: String, default: 'center' })
], DatePickerView.prototype, "labelAlign", void 0);
__decorate([
    Prop({ type: String, default: DATETIME })
], DatePickerView.prototype, "mode", void 0);
__decorate([
    Prop({ type: Number, default: 1 })
], DatePickerView.prototype, "minuteStep", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], DatePickerView.prototype, "use12Hours", void 0);
__decorate([
    Prop({ type: null, default: null })
], DatePickerView.prototype, "minDate", void 0);
__decorate([
    Prop({ type: null, default: null })
], DatePickerView.prototype, "maxDate", void 0);
__decorate([
    Prop({ type: Number, default: 0 })
], DatePickerView.prototype, "minHour", void 0);
__decorate([
    Prop({ type: Number, default: 23 })
], DatePickerView.prototype, "maxHour", void 0);
__decorate([
    Prop({ type: Number, default: 0 })
], DatePickerView.prototype, "minMinute", void 0);
__decorate([
    Prop({ type: Number, default: 59 })
], DatePickerView.prototype, "maxMinute", void 0);
__decorate([
    Prop({ type: String, default: 'zh_CN' })
], DatePickerView.prototype, "lang", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], DatePickerView.prototype, "tillNow", void 0);
__decorate([
    Watch('inputValue')
], DatePickerView.prototype, "onInputValue", null);
__decorate([
    Watch('value'),
    Watch('mode'),
    Watch('minuteStep'),
    Watch('use12Hours'),
    Watch('minDate'),
    Watch('maxDate'),
    Watch('minHour'),
    Watch('maxHour'),
    Watch('minMinute'),
    Watch('maxMinute'),
    Watch('lang')
], DatePickerView.prototype, "onDepsChange", null);
DatePickerView = __decorate([
    Component({ props })
], DatePickerView);
export default defineComponentHOC()(DatePickerView);
