/**
 * @doraemon-ui/taro-react.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-06, 01:39:09.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import React, { forwardRef, createElement, Component, createRef, Children } from 'react';

function styleToString(style) {
    if (!style)
        return '';
    return Object.entries(style)
        .map(([k, v]) => `${k.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())}:${v}`)
        .join(';');
}
class HostComponent extends Component {
    nativeRef = createRef();
    componentDidMount() {
        this._attachRef();
    }
    componentDidUpdate() {
        this._attachRef();
    }
    _attachRef() {
        const { forwardedRef } = this.props;
        if (!forwardedRef)
            return;
        if (typeof forwardedRef === 'function') {
            forwardedRef(this.nativeRef.current);
        }
        else {
            forwardedRef.current = this.nativeRef.current;
        }
    }
    // _transformProps(props: Record<string, any>) {
    //   const result: Record<string, any> = {}
    //   Object.keys(props).forEach((key) => {
    //     const value = props[key]
    //     if (key.startsWith('on') && typeof value === 'function') {
    //       const eventName = key[2].toLowerCase() + key.slice(3)
    //       result[`bind${eventName}`] = value
    //     } else {
    //       result[key] = value
    //     }
    //   })
    //   return result
    // }
    render() {
        const { compName, className, style, children, forwardedRef, ...rest } = this.props;
        // const nativeProps = this._transformProps(rest)
        console.log('nativeProps====', rest);
        const Comp = compName;
        return (React.createElement(Comp, { ref: this.nativeRef, "dora-class": className, "dora-style": styleToString(style), ...rest }, Children.toArray(children)));
    }
}
function createHostComponent(compName, defaultProps) {
    return forwardRef((props, ref) => createElement(HostComponent, {
        ...defaultProps,
        ...props,
        compName,
        forwardedRef: ref,
    }));
}

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Accordion = createHostComponent('dora-accordion', {
    prefixCls: 'dora-accordion',
    defaultCurrent: [],
    current: [],
    controlled: false,
    accordion: false,
    title: '',
    label: '',
});
Accordion.displayName = 'DoraAccordion';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-accordion', {
    prefixCls: '',
    defaultCurrent: '',
    current: '',
    controlled: '',
    accordion: '',
    title: '',
    label: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const AccordionPanel = createHostComponent('dora-accordion-panel', {
    prefixCls: 'dora-accordion-panel',
    key: '',
    thumb: '',
    title: '',
    content: '',
    disabled: false,
    showArrow: true,
});
AccordionPanel.displayName = 'DoraAccordionPanel';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-accordion-panel', {
    prefixCls: '',
    key: '',
    thumb: '',
    title: '',
    content: '',
    disabled: '',
    showArrow: '',
});

const InnerAccordion = Accordion;
InnerAccordion.Panel = AccordionPanel;

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const ActionSheet = createHostComponent('dora-action-sheet', {
    prefixCls: 'dora-action-sheet',
    theme: 'ios',
    titleText: '',
    buttons: [],
    cancelText: '取消',
    destructiveText: '',
    visible: false,
});
ActionSheet.displayName = 'DoraActionSheet';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-action-sheet', {
    prefixCls: '',
    theme: '',
    titleText: '',
    buttons: '',
    cancelText: '',
    destructiveText: '',
    visible: '',
    onClosed: '',
    onClose: '',
    onCancel: '',
    onAction: '',
    onDestructive: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Alert = createHostComponent('dora-alert', {
    prefixCls: 'dora-alert',
    classNames: 'dora-animate--fadeIn',
    theme: 'balanced',
    thumb: '',
    title: '',
    label: '',
    closable: false,
});
Alert.displayName = 'DoraAlert';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-alert', {
    prefixCls: '',
    classNames: '',
    theme: '',
    thumb: '',
    title: '',
    label: '',
    closable: '',
    onClick: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const AnimationGroup = createHostComponent('dora-animation-group', {
    in: false,
    classNames: '',
    duration: null,
    type: 'transition',
    appear: false,
    enter: true,
    exit: true,
    mountOnEnter: true,
    unmountOnExit: true,
    wrapCls: '',
    wrapStyle: null,
    disableScroll: false,
});
AnimationGroup.displayName = 'DoraAnimationGroup';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-animation-group', {
    in: '',
    classNames: '',
    duration: '',
    type: '',
    appear: '',
    enter: '',
    exit: '',
    mountOnEnter: '',
    unmountOnExit: '',
    wrapCls: '',
    wrapStyle: '',
    disableScroll: '',
    onChange: '',
    onClick: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Avatar = createHostComponent('dora-avatar', {
    prefixCls: 'dora-avatar',
    shape: 'circle',
    size: 'default',
    src: '',
    bodyStyle: null,
    scale: false,
});
Avatar.displayName = 'DoraAvatar';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-avatar', {
    prefixCls: '',
    shape: '',
    size: '',
    src: '',
    bodyStyle: '',
    scale: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Backdrop = createHostComponent('dora-backdrop', {
    prefixCls: 'dora-backdrop',
    transparent: false,
    zIndex: null,
    mountOnEnter: true,
    unmountOnExit: true,
    disableScroll: true,
    visible: false,
    classNames: 'dora-animate--fadeIn',
    wrapStyle: null,
});
Backdrop.displayName = 'DoraBackdrop';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-backdrop', {
    prefixCls: '',
    transparent: '',
    zIndex: '',
    mountOnEnter: '',
    unmountOnExit: '',
    disableScroll: '',
    visible: '',
    classNames: '',
    wrapStyle: '',
    onShow: '',
    onShowed: '',
    onClose: '',
    onClosed: '',
    onClick: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Badge = createHostComponent('dora-badge', {
    prefixCls: 'dora-badge',
    count: 0,
    overflowCount: 99,
    dot: false,
    showZero: false,
    status: '',
    text: '',
    position: 'topRight',
    backgroundColor: '#ed3f14',
    hideShadow: false,
    title: '',
});
Badge.displayName = 'DoraBadge';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-badge', {
    prefixCls: '',
    count: '',
    overflowCount: '',
    dot: '',
    showZero: '',
    status: '',
    text: '',
    position: '',
    backgroundColor: '',
    hideShadow: '',
    title: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Barcode = createHostComponent('dora-barcode', {
    prefixCls: 'dora-barcode',
    width: 200,
    height: 100,
    number: '',
    options: { number: true, prefix: true, color: 'black', debug: false },
    canvasId: 'dora-barcode',
});
Barcode.displayName = 'DoraBarcode';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-barcode', {
    prefixCls: '',
    width: '',
    height: '',
    number: '',
    options: '',
    canvasId: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Button = createHostComponent('dora-button', {
    prefixCls: 'dora-button',
    color: 'positive',
    fill: 'solid',
    expand: '',
    shape: '',
    size: 'default',
    strong: false,
    disabled: false,
    loading: false,
    formType: '',
    openType: '',
    hoverClass: 'default',
    hoverStopPropagation: false,
    hoverStartTime: 20,
    hoverStayTime: 70,
    lang: 'en',
    sessionFrom: '',
    sendMessageTitle: '',
    sendMessagePath: '',
    sendMessageImg: '',
    showMessageCard: false,
    phoneNumberNoQuotaToast: true,
    appParameter: '',
});
Button.displayName = 'DoraButton';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-button', {
    prefixCls: '',
    color: '',
    fill: '',
    expand: '',
    shape: '',
    size: '',
    strong: '',
    disabled: '',
    loading: '',
    formType: '',
    openType: '',
    hoverClass: '',
    hoverStopPropagation: '',
    hoverStartTime: '',
    hoverStayTime: '',
    lang: '',
    sessionFrom: '',
    sendMessageTitle: '',
    sendMessagePath: '',
    sendMessageImg: '',
    showMessageCard: '',
    phoneNumberNoQuotaToast: '',
    appParameter: '',
    onClick: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Calendar = createHostComponent('dora-calendar', {
    prefixCls: 'dora-calendar',
});
Calendar.displayName = 'DoraCalendar';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-calendar', {
    prefixCls: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Card = createHostComponent('dora-card', {
    prefixCls: 'dora-card',
    hoverClass: 'none',
    bordered: true,
    full: false,
    title: '',
    thumb: '',
    thumbStyle: null,
    extra: '',
    actions: [],
});
Card.displayName = 'DoraCard';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-card', {
    prefixCls: '',
    hoverClass: '',
    bordered: '',
    full: '',
    title: '',
    thumb: '',
    thumbStyle: '',
    extra: '',
    actions: '',
    onAction: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Cascader = createHostComponent('dora-cascader', {
    prefixCls: 'dora-cascader',
    defaultValue: [],
    value: [],
    controlled: false,
    title: '',
    cancelText: '取消',
    confirmText: '确定',
    options: [],
    full: false,
    height: 'auto',
    chooseTitle: '请选择',
    visible: false,
    skipAnimation: false,
    defaultFieldNames: {},
});
Cascader.displayName = 'DoraCascader';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-cascader', {
    prefixCls: '',
    defaultValue: '',
    value: '',
    controlled: '',
    title: '',
    cancelText: '',
    confirmText: '',
    options: '',
    full: '',
    height: '',
    chooseTitle: '',
    visible: '',
    skipAnimation: '',
    defaultFieldNames: '',
    onTabsChange: '',
    onLoad: '',
    onChange: '',
    onClose: '',
    onConfirm: '',
    onCancel: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const CascaderPickerView = createHostComponent('dora-cascader-picker-view', {
    prefixCls: 'dora-picker',
    pickerPrefixCls: 'dora-picker-view',
    value: [],
    cols: 3,
    itemHeight: 34,
    itemStyle: null,
    indicatorStyle: null,
    indicatorClass: '',
    maskStyle: null,
    maskClass: '',
    labelAlign: 'center',
    loading: false,
    options: [],
    defaultFieldNames: { label: 'label', value: 'value', disabled: 'disabled', children: 'children' },
});
CascaderPickerView.displayName = 'DoraCascaderPickerView';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-cascader-picker-view', {
    prefixCls: '',
    pickerPrefixCls: '',
    value: '',
    cols: '',
    itemHeight: '',
    itemStyle: '',
    indicatorStyle: '',
    indicatorClass: '',
    maskStyle: '',
    maskClass: '',
    labelAlign: '',
    loading: '',
    options: '',
    defaultFieldNames: '',
    onValueChange: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const CascaderView = createHostComponent('dora-cascader-view', {
    prefixCls: 'dora-cascader-view',
    defaultValue: [],
    value: [],
    controlled: false,
    options: [],
    full: false,
    placeholder: '请选择',
    height: 'auto',
    skipAnimation: false,
    defaultFieldNames: {},
});
CascaderView.displayName = 'DoraCascaderView';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-cascader-view', {
    prefixCls: '',
    defaultValue: '',
    value: '',
    controlled: '',
    options: '',
    full: '',
    placeholder: '',
    height: '',
    skipAnimation: '',
    defaultFieldNames: '',
    onTabsChange: '',
    onChange: '',
    onLoad: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Checkbox = createHostComponent('dora-checkbox', {
    prefixCls: 'dora-checkbox',
    cellPrefixCls: 'dora-list-item',
    selectablePrefixCls: 'dora-selectable',
    title: '',
    label: '',
    extra: '',
    value: '',
    checked: false,
    disabled: false,
    readOnly: false,
    color: 'balanced',
    wrapStyle: null,
    hasLine: true,
});
Checkbox.displayName = 'DoraCheckbox';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-checkbox', {
    prefixCls: '',
    cellPrefixCls: '',
    selectablePrefixCls: '',
    title: '',
    label: '',
    extra: '',
    value: '',
    checked: '',
    disabled: '',
    readOnly: '',
    color: '',
    wrapStyle: '',
    hasLine: '',
    onChange: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const CheckboxGroup = createHostComponent('dora-checkbox-group', {
    prefixCls: 'dora-checkbox-group',
    cellGroupPrefixCls: 'dora-list',
    value: [],
    name: '',
    title: '',
    label: '',
    options: [],
    disabled: false,
    readOnly: false,
    mode: 'default',
    bodyStyle: null,
    hasLine: true,
    withListComponent: true,
    iconPosition: 'left',
    iconSize: '',
    iconOn: '',
    iconOff: '',
});
CheckboxGroup.displayName = 'DoraCheckboxGroup';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-checkbox-group', {
    prefixCls: '',
    cellGroupPrefixCls: '',
    value: '',
    name: '',
    title: '',
    label: '',
    options: '',
    disabled: '',
    readOnly: '',
    mode: '',
    bodyStyle: '',
    hasLine: '',
    withListComponent: '',
    iconPosition: '',
    iconSize: '',
    iconOn: '',
    iconOff: '',
    onChange: '',
});

const InnerCheckbox = Checkbox;
InnerCheckbox.Group = CheckboxGroup;

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Circle = createHostComponent('dora-circle', {
    prefixCls: 'dora-circle',
    percent: 0,
    strokeWidth: 10,
    size: 120,
    lineCap: 'round',
    backgroundColor: '#f3f3f3',
    color: '#33cd5f',
    sAngle: 0,
    counterclockwise: false,
    speed: 2000,
    animate: true,
    background: true,
});
Circle.displayName = 'DoraCircle';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-circle', {
    prefixCls: '',
    percent: '',
    strokeWidth: '',
    size: '',
    lineCap: '',
    backgroundColor: '',
    color: '',
    sAngle: '',
    counterclockwise: '',
    speed: '',
    animate: '',
    background: '',
    onChange: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Col = createHostComponent('dora-col');
Col.displayName = 'DoraCol';

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Countdown = createHostComponent('dora-countdown');
Countdown.displayName = 'DoraCountdown';

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Countup = createHostComponent('dora-countup');
Countup.displayName = 'DoraCountup';

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const DatePicker = createHostComponent('dora-date-picker', {
    prefixCls: 'dora-date-picker',
    multiPickerPrefixCls: 'dora-picker',
    pickerPrefixCls: 'dora-picker-view',
    toolbar: { title: '请选择', cancelText: '取消', confirmText: '确定' },
    defaultVisible: false,
    visible: false,
    controlled: false,
    disabled: false,
    value: null,
    itemHeight: 34,
    itemStyle: null,
    indicatorStyle: null,
    indicatorClass: '',
    maskStyle: null,
    maskClass: '',
    labelAlign: 'center',
    mode: 'datetime',
    minuteStep: 1,
    use12Hours: false,
    minDate: null,
    maxDate: null,
    minHour: 0,
    maxHour: 23,
    minMinute: 0,
    maxMinute: 59,
    lang: 'zh_CN',
    tillNow: false,
});
DatePicker.displayName = 'DoraDatePicker';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-date-picker', {
    prefixCls: '',
    multiPickerPrefixCls: '',
    pickerPrefixCls: '',
    toolbar: '',
    defaultVisible: '',
    visible: '',
    controlled: '',
    disabled: '',
    value: '',
    itemHeight: '',
    itemStyle: '',
    indicatorStyle: '',
    indicatorClass: '',
    maskStyle: '',
    maskClass: '',
    labelAlign: '',
    mode: '',
    minuteStep: '',
    use12Hours: '',
    minDate: '',
    maxDate: '',
    minHour: '',
    maxHour: '',
    minMinute: '',
    maxMinute: '',
    lang: '',
    tillNow: '',
    onVisibleChange: '',
    onChange: '',
    onConfirm: '',
    onCancel: '',
    onValueChange: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const DatePickerView = createHostComponent('dora-date-picker-view', {
    prefixCls: 'dora-date-picker',
    multiPickerPrefixCls: 'dora-picker',
    pickerPrefixCls: 'dora-picker-view',
    value: null,
    itemHeight: 34,
    itemStyle: null,
    indicatorStyle: null,
    indicatorClass: '',
    maskStyle: null,
    maskClass: '',
    labelAlign: 'center',
    mode: 'datetime',
    minuteStep: 1,
    use12Hours: false,
    minDate: null,
    maxDate: null,
    minHour: 0,
    maxHour: 23,
    minMinute: 0,
    maxMinute: 59,
    lang: 'zh_CN',
    tillNow: false,
});
DatePickerView.displayName = 'DoraDatePickerView';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-date-picker-view', {
    prefixCls: '',
    multiPickerPrefixCls: '',
    pickerPrefixCls: '',
    value: '',
    itemHeight: '',
    itemStyle: '',
    indicatorStyle: '',
    indicatorClass: '',
    maskStyle: '',
    maskClass: '',
    labelAlign: '',
    mode: '',
    minuteStep: '',
    use12Hours: '',
    minDate: '',
    maxDate: '',
    minHour: '',
    maxHour: '',
    minMinute: '',
    maxMinute: '',
    lang: '',
    tillNow: '',
    onValueChange: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Dialog = createHostComponent('dora-dialog', {
    prefixCls: 'dora-dialog',
    bodyStyle: null,
    mask: true,
    maskClosable: true,
    visible: false,
    zIndex: null,
    closable: false,
    buttonClosable: false,
    verticalButtons: false,
    image: '',
    title: '',
    content: '',
    buttons: [],
});
Dialog.displayName = 'DoraDialog';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-dialog', {
    prefixCls: '',
    bodyStyle: '',
    mask: '',
    maskClosable: '',
    visible: '',
    zIndex: '',
    closable: '',
    buttonClosable: '',
    verticalButtons: '',
    image: '',
    title: '',
    content: '',
    buttons: '',
    onClose: '',
    onClosed: '',
    onAction: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Divider = createHostComponent('dora-divider', {
    prefixCls: 'dora-divider',
    position: 'center',
    dashed: false,
    text: '',
    showText: true,
    direction: 'horizontal',
});
Divider.displayName = 'DoraDivider';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-divider', {
    prefixCls: '',
    position: '',
    dashed: '',
    text: '',
    showText: '',
    direction: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const ESign = createHostComponent('dora-e-sign', {
    prefixCls: 'dora-e-sign',
    type: 'png',
    width: 'auto',
    height: 200,
    bgColor: '#ffffff',
    lineWidth: 3,
    lineColor: '#000000',
    hasFooter: true,
    cancelText: '重置',
    confirmText: '确定',
});
ESign.displayName = 'DoraESign';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-e-sign', {
    prefixCls: '',
    type: '',
    width: '',
    height: '',
    bgColor: '',
    lineWidth: '',
    lineColor: '',
    hasFooter: '',
    cancelText: '',
    confirmText: '',
    onStart: '',
    onSigning: '',
    onEnd: '',
    onClear: '',
    onSubmit: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Ellipsis = createHostComponent('dora-ellipsis', {
    prefixCls: 'dora-ellipsis',
    content: '',
    direction: 'end',
    defaultExpanded: false,
    expandText: '',
    collapseText: '',
    rows: 1,
});
Ellipsis.displayName = 'DoraEllipsis';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-ellipsis', {
    prefixCls: '',
    content: '',
    direction: '',
    defaultExpanded: '',
    expandText: '',
    collapseText: '',
    rows: '',
    onClick: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const FabButton = createHostComponent('dora-fab-button', {
    prefixCls: 'dora-fab-button',
    hoverClass: 'default',
    theme: 'balanced',
    position: 'bottomRight',
    action: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAHdElNRQfhBAQLCR5MtjrbAAAAjUlEQVRo3u3ZMRKAIAxEUbDirp4nXnctFFDHBtDQ/O1Nnk6aHUMgZCBKMkmmNAtgOmL9M+IQQGVM95zljy8DAAAAAAAAAAAAAACALsDZcppSx7Q+WdtUvA5xffUtrjeA8/qQ21S9gc15/3Nfzw0M5O0G2kM5BQAAAAAAAAAAAAAAQGk33q0qZ/p/Q/JFdmei9usomnwIAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA0LTA0VDExOjA5OjMwKzA4OjAw1U4c3wAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wNC0wNFQxMTowOTozMCswODowMKQTpGMAAAAASUVORK5CYII=',
    actionRotate: true,
    hideShadow: false,
    backdrop: false,
    buttons: [],
    direction: 'horizontal',
    spaceBetween: 10,
    duration: 300,
    scale: 0.9,
    reverse: false,
    sAngle: 0,
    eAngle: 360,
    defaultVisible: false,
    visible: false,
    controlled: false,
});
FabButton.displayName = 'DoraFabButton';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-fab-button', {
    prefixCls: '',
    hoverClass: '',
    theme: '',
    position: '',
    action: '',
    actionRotate: '',
    hideShadow: '',
    backdrop: '',
    buttons: '',
    direction: '',
    spaceBetween: '',
    duration: '',
    scale: '',
    reverse: '',
    sAngle: '',
    eAngle: '',
    defaultVisible: '',
    visible: '',
    controlled: '',
    onChange: '',
    onClick: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Field = createHostComponent('dora-field', {
    prefixCls: 'dora-field',
    label: '',
    labelWrap: false,
    extra: '',
    help: '',
    childElementPosition: 'none',
    isLink: false,
    align: 'flex-start',
    disabled: false,
    readOnly: false,
    hidden: false,
    required: false,
    feedbackMessage: [],
    hasFeedback: false,
    index: 0,
    isLast: false,
});
Field.displayName = 'DoraField';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-field', {
    prefixCls: '',
    label: '',
    labelWrap: '',
    extra: '',
    help: '',
    childElementPosition: '',
    isLink: '',
    align: '',
    disabled: '',
    readOnly: '',
    hidden: '',
    required: '',
    feedbackMessage: '',
    hasFeedback: '',
    index: '',
    isLast: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Filterbar = createHostComponent('dora-filterbar', {
    prefixCls: 'dora-filterbar',
    disabled: false,
    hoverClass: 'default',
    wrapStyle: null,
});
Filterbar.displayName = 'DoraFilterbar';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-filterbar', {
    prefixCls: '',
    disabled: '',
    hoverClass: '',
    wrapStyle: '',
    onClick: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const FloatingPanel = createHostComponent('dora-floating-panel', {
    prefixCls: 'dora-floating-panel',
    disabled: false,
    hoverClass: 'default',
    wrapStyle: null,
});
FloatingPanel.displayName = 'DoraFloatingPanel';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-floating-panel', {
    prefixCls: '',
    disabled: '',
    hoverClass: '',
    wrapStyle: '',
    onClick: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Footer = createHostComponent('dora-footer', {
    prefixCls: 'dora-footer',
    disabled: false,
    hoverClass: 'default',
    wrapStyle: null,
});
Footer.displayName = 'DoraFooter';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-footer', {
    prefixCls: '',
    disabled: '',
    hoverClass: '',
    wrapStyle: '',
    onClick: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Form = createHostComponent('dora-form', {
    prefixCls: 'dora-form',
    disabled: false,
    hoverClass: 'default',
    wrapStyle: null,
});
Form.displayName = 'DoraForm';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-form', {
    prefixCls: '',
    disabled: '',
    hoverClass: '',
    wrapStyle: '',
    onClick: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Gallery = createHostComponent('dora-gallery', {
    prefixCls: 'dora-gallery',
    disabled: false,
    hoverClass: 'default',
    wrapStyle: null,
});
Gallery.displayName = 'DoraGallery';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-gallery', {
    prefixCls: '',
    disabled: '',
    hoverClass: '',
    wrapStyle: '',
    onClick: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Grid = createHostComponent('dora-grid', {
    prefixCls: 'dora-grid',
    disabled: false,
    hoverClass: 'default',
    wrapStyle: null,
});
Grid.displayName = 'DoraGrid';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-grid', {
    prefixCls: '',
    disabled: '',
    hoverClass: '',
    wrapStyle: '',
    onClick: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Icon = createHostComponent('dora-icon', {
    prefixCls: 'doraicons',
    hidden: false,
    type: '',
    size: 32,
    color: '',
});
Icon.displayName = 'DoraIcon';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-icon', {
    prefixCls: '',
    hidden: '',
    type: '',
    size: '',
    color: '',
    onClick: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Image = createHostComponent('dora-image', {
    prefixCls: 'dora-image',
    disabled: false,
    hoverClass: 'default',
    wrapStyle: null,
});
Image.displayName = 'DoraImage';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-image', {
    prefixCls: '',
    disabled: '',
    hoverClass: '',
    wrapStyle: '',
    onClick: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Index = createHostComponent('dora-index', {
    prefixCls: 'dora-index',
    height: 300,
    showIndicator: true,
    indicatorPosition: 'center',
    parentOffsetTop: 0,
});
Index.displayName = 'DoraIndex';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-index', {
    prefixCls: '',
    height: '',
    showIndicator: '',
    indicatorPosition: '',
    parentOffsetTop: '',
    onChange: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const IndexItem = createHostComponent('dora-index-item', {
    prefixCls: 'dora-index-item',
    name: '',
});
IndexItem.displayName = 'DoraIndexItem';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-index-item', {
    prefixCls: '',
    name: '',
});

const InnerIndex = Index;
InnerIndex.Item = IndexItem;

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Input = createHostComponent('dora-input', {
    prefixCls: 'dora-input',
    type: 'text',
    password: false,
    placeholder: '',
    placeholderStyle: null,
    placeholderClass: 'input-placeholder',
    maxlength: 140,
    cursorSpacing: 11,
    focus: false,
    confirmType: 'done',
    alwaysEmbed: false,
    confirmHold: false,
    cursor: -1,
    selectionStart: -1,
    selectionEnd: -1,
    adjustPosition: true,
    holdKeyboard: false,
    safePasswordCertPath: null,
    safePasswordLength: null,
    safePasswordTimeStamp: null,
    safePasswordNonce: null,
    safePasswordSalt: null,
    safePasswordCustomHash: null,
    label: '',
    extra: '',
    defaultValue: '',
    value: '',
    controlled: false,
    disabled: false,
    readOnly: false,
    clear: false,
    error: false,
    labelWrap: false,
    requiredMark: false,
    onlyShowClearWhenFocus: true,
    min: null,
    max: null,
    visibilityToggle: false,
});
Input.displayName = 'DoraInput';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-input', {
    prefixCls: '',
    type: '',
    password: '',
    placeholder: '',
    placeholderStyle: '',
    placeholderClass: '',
    maxlength: '',
    cursorSpacing: '',
    focus: '',
    confirmType: '',
    alwaysEmbed: '',
    confirmHold: '',
    cursor: '',
    selectionStart: '',
    selectionEnd: '',
    adjustPosition: '',
    holdKeyboard: '',
    safePasswordCertPath: '',
    safePasswordLength: '',
    safePasswordTimeStamp: '',
    safePasswordNonce: '',
    safePasswordSalt: '',
    safePasswordCustomHash: '',
    label: '',
    extra: '',
    defaultValue: '',
    value: '',
    controlled: '',
    disabled: '',
    readOnly: '',
    clear: '',
    error: '',
    labelWrap: '',
    requiredMark: '',
    onlyShowClearWhenFocus: '',
    min: '',
    max: '',
    visibilityToggle: '',
    onChange: '',
    onFocus: '',
    onBlur: '',
    onConfirm: '',
    onKeyboardheightchange: '',
    onNicknamereview: '',
    onClear: '',
    onError: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const InputNumber = createHostComponent('dora-input-number', {
    prefixCls: 'dora-input-number',
    shape: 'square',
    min: 0,
    max: 0,
    step: 1,
    defaultValue: 0,
    value: 0,
    disabled: true,
    readOnly: false,
    longpress: false,
    color: 'balanced',
    controlled: false,
    digits: -1,
});
InputNumber.displayName = 'DoraInputNumber';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-input-number', {
    prefixCls: '',
    shape: '',
    min: '',
    max: '',
    step: '',
    defaultValue: '',
    value: '',
    disabled: '',
    readOnly: '',
    longpress: '',
    color: '',
    controlled: '',
    digits: '',
    onChange: '',
    onFocus: '',
    onBlur: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Keyboard = createHostComponent('dora-keyboard', {
    prefixCls: 'dora-keyboard',
});
Keyboard.displayName = 'DoraKeyboard';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-keyboard', {
    prefixCls: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Landscape = createHostComponent('dora-landscape', {
    prefixCls: 'dora-landscape',
    visible: false,
    mask: true,
    maskClosable: false,
    closable: true,
});
Landscape.displayName = 'DoraLandscape';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-landscape', {
    prefixCls: '',
    visible: '',
    mask: '',
    maskClosable: '',
    closable: '',
    onClose: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const List = createHostComponent('dora-list', {
    prefixCls: 'dora-list',
    title: '',
    label: '',
    mode: 'default',
    hasLine: true,
    wrapStyle: null,
    bodyStyle: null,
});
List.displayName = 'DoraList';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-list', {
    prefixCls: '',
    title: '',
    label: '',
    mode: '',
    hasLine: '',
    wrapStyle: '',
    bodyStyle: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const ListItem = createHostComponent('dora-list-item', {
    prefixCls: 'dora-list-item',
    thumb: '',
    title: '',
    label: '',
    extra: '',
    hasLine: true,
    isLink: false,
    align: 'center',
    wrapStyle: null,
    url: '',
    urlParams: null,
    delta: 1,
    disabled: false,
    openType: '',
    hoverClass: 'default',
    hoverStopPropagation: false,
    hoverStartTime: 20,
    hoverStayTime: 70,
    lang: 'en',
    sessionFrom: '',
    sendMessageTitle: '',
    sendMessagePath: '',
    sendMessageImg: '',
    showMessageCard: false,
    phoneNumberNoQuotaToast: true,
    appParameter: '',
});
ListItem.displayName = 'DoraListItem';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-list-item', {
    prefixCls: '',
    thumb: '',
    title: '',
    label: '',
    extra: '',
    hasLine: '',
    isLink: '',
    align: '',
    wrapStyle: '',
    url: '',
    urlParams: '',
    delta: '',
    disabled: '',
    openType: '',
    hoverClass: '',
    hoverStopPropagation: '',
    hoverStartTime: '',
    hoverStayTime: '',
    lang: '',
    sessionFrom: '',
    sendMessageTitle: '',
    sendMessagePath: '',
    sendMessageImg: '',
    showMessageCard: '',
    phoneNumberNoQuotaToast: '',
    appParameter: '',
    onClick: '',
});

const InnerList = List;
InnerList.Item = ListItem;

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Loading = createHostComponent('dora-loading', {
    prefixCls: 'dora-loading',
});
Loading.displayName = 'DoraLoading';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-loading', {
    prefixCls: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Media = createHostComponent('dora-media', {
    prefixCls: 'dora-media',
    thumb: '',
    thumbStyle: null,
    title: '',
    label: '',
    align: 'center',
});
Media.displayName = 'DoraMedia';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-media', {
    prefixCls: '',
    thumb: '',
    thumbStyle: '',
    title: '',
    label: '',
    align: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const MultiPickerView = createHostComponent('dora-multi-picker-view');
MultiPickerView.displayName = 'DoraMultiPickerView';

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Navbar = createHostComponent('dora-navbar', {
    prefixCls: 'dora-navbar',
    theme: 'light',
    title: '',
    leftText: '',
    rightText: '',
});
Navbar.displayName = 'DoraNavbar';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-navbar', {
    prefixCls: '',
    theme: '',
    title: '',
    leftText: '',
    rightText: '',
    onClick: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const NoticeBar = createHostComponent('dora-notice-bar', {
    prefixCls: 'dora-notice-bar',
    icon: 'data:image/gif;base64,R0lGODlhAQABAAAAACw=',
    content: '',
    mode: '',
    action: 'data:image/gif;base64,R0lGODlhAQABAAAAACw=',
    loop: false,
    leading: 500,
    trailing: 800,
    speed: 25,
});
NoticeBar.displayName = 'DoraNoticeBar';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-notice-bar', {
    prefixCls: '',
    icon: '',
    content: '',
    mode: '',
    action: '',
    loop: '',
    leading: '',
    trailing: '',
    speed: '',
    onClick: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Notification = createHostComponent('dora-notification', {
    prefixCls: 'dora-notification',
    disabled: false,
    hoverClass: 'default',
    wrapStyle: null,
});
Notification.displayName = 'DoraNotification';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-notification', {
    prefixCls: '',
    disabled: '',
    hoverClass: '',
    wrapStyle: '',
    onClick: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Pagination = createHostComponent('dora-pagination', {
    prefixCls: 'dora-pagination',
    mode: 'button',
    defaultCurrent: 1,
    current: 1,
    controlled: false,
    total: 0,
    simple: false,
});
Pagination.displayName = 'DoraPagination';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-pagination', {
    prefixCls: '',
    mode: '',
    defaultCurrent: '',
    current: '',
    controlled: '',
    total: '',
    simple: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Picker = createHostComponent('dora-picker', {
    prefixCls: 'dora-popup-picker',
    multiPickerPrefixCls: 'dora-picker',
    pickerPrefixCls: 'dora-picker-view',
    toolbar: { title: '请选择', cancelText: '取消', confirmText: '确定' },
    defaultVisible: false,
    visible: false,
    controlled: false,
    disabled: false,
    cascade: false,
    cols: 3,
    value: [],
    options: [],
    loading: false,
    itemHeight: 34,
    itemStyle: null,
    indicatorStyle: null,
    indicatorClass: '',
    maskStyle: null,
    maskClass: '',
    labelAlign: 'center',
    defaultFieldNames: { label: 'label', value: 'value', disabled: 'disabled', children: 'children' },
});
Picker.displayName = 'DoraPicker';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-picker', {
    prefixCls: '',
    multiPickerPrefixCls: '',
    pickerPrefixCls: '',
    toolbar: '',
    defaultVisible: '',
    visible: '',
    controlled: '',
    disabled: '',
    cascade: '',
    cols: '',
    value: '',
    options: '',
    loading: '',
    itemHeight: '',
    itemStyle: '',
    indicatorStyle: '',
    indicatorClass: '',
    maskStyle: '',
    maskClass: '',
    labelAlign: '',
    defaultFieldNames: '',
    onVisibleChange: '',
    onChange: '',
    onConfirm: '',
    onCancel: '',
    onValueChange: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const PickerView = createHostComponent('dora-picker-view', {
    prefixCls: 'dora-picker-view',
    defaultValue: '',
    value: '',
    controlled: false,
    itemHeight: 34,
    itemStyle: null,
    indicatorStyle: null,
    indicatorClass: '',
    maskStyle: null,
    maskClass: '',
    labelAlign: 'center',
    loading: false,
    options: [],
    defaultFieldNames: { label: 'label', value: 'value', disabled: 'disabled' },
});
PickerView.displayName = 'DoraPickerView';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-picker-view', {
    prefixCls: '',
    defaultValue: '',
    value: '',
    controlled: '',
    itemHeight: '',
    itemStyle: '',
    indicatorStyle: '',
    indicatorClass: '',
    maskStyle: '',
    maskClass: '',
    labelAlign: '',
    loading: '',
    options: '',
    defaultFieldNames: '',
    onValueChange: '',
    onBeforeChange: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Popover = createHostComponent('dora-popover', {
    prefixCls: 'dora-popover',
    disabled: false,
    hoverClass: 'default',
    wrapStyle: null,
});
Popover.displayName = 'DoraPopover';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-popover', {
    prefixCls: '',
    disabled: '',
    hoverClass: '',
    wrapStyle: '',
    onClick: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Popup = createHostComponent('dora-popup', {
    prefixCls: 'dora-popup',
    animationPrefixCls: 'dora-animate',
    position: 'center',
    wrapStyle: null,
    bodyStyle: null,
    mask: true,
    maskClosable: true,
    maskTransparent: false,
    maskStyle: null,
    visible: false,
    closeOnSwipe: false,
    zIndex: null,
    mountOnEnter: true,
    unmountOnExit: true,
    closable: false,
    safeArea: false,
});
Popup.displayName = 'DoraPopup';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-popup', {
    prefixCls: '',
    animationPrefixCls: '',
    position: '',
    wrapStyle: '',
    bodyStyle: '',
    mask: '',
    maskClosable: '',
    maskTransparent: '',
    maskStyle: '',
    visible: '',
    closeOnSwipe: '',
    zIndex: '',
    mountOnEnter: '',
    unmountOnExit: '',
    closable: '',
    safeArea: '',
    onShow: '',
    onShowed: '',
    onClose: '',
    onClosed: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const PopupSelect = createHostComponent('dora-popup-select', {
    prefixCls: 'dora-popup-select',
    classNames: 'dora-animate--fadeIn',
    virtualized: false,
    notFoundContent: { icon: '', title: '', text: '暂无数据' },
    value: '',
    options: [],
    iconPosition: '',
    multiple: false,
    max: -1,
    toolbar: { title: '请选择', cancelText: '取消', confirmText: '确定' },
    visible: false,
    defaultVisible: false,
    controlled: false,
});
PopupSelect.displayName = 'DoraPopupSelect';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-popup-select', {
    prefixCls: '',
    classNames: '',
    virtualized: '',
    notFoundContent: '',
    value: '',
    options: '',
    iconPosition: '',
    multiple: '',
    max: '',
    toolbar: '',
    visible: '',
    defaultVisible: '',
    controlled: '',
    onChange: '',
    onClosed: '',
    onCancel: '',
    onValueChange: '',
    onConfirm: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Progress = createHostComponent('dora-progress', {
    prefixCls: 'dora-progress',
    percent: 0,
    strokeWidth: 10,
    activeColor: '',
    backgroundColor: '#f3f3f3',
    status: 'normal',
    shape: 'round',
    barStyle: null,
    showInfo: false,
});
Progress.displayName = 'DoraProgress';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-progress', {
    prefixCls: '',
    percent: '',
    strokeWidth: '',
    activeColor: '',
    backgroundColor: '',
    status: '',
    shape: '',
    barStyle: '',
    showInfo: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Prompt = createHostComponent('dora-prompt', {
    prefixCls: 'dora-prompt',
    disabled: false,
    hoverClass: 'default',
    wrapStyle: null,
});
Prompt.displayName = 'DoraPrompt';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-prompt', {
    prefixCls: '',
    disabled: '',
    hoverClass: '',
    wrapStyle: '',
    onClick: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Qrcode = createHostComponent('dora-qrcode', {
    prefixCls: 'dora-qrcode',
    typeNumber: -1,
    errorCorrectLevel: 2,
    width: 200,
    height: 200,
    whiteSpace: 0,
    fgColor: 'black',
    bgColor: 'white',
    data: '',
    showMenuByLongpress: false,
    qrcodeStatus: 'activated',
    qrcodeExpiredText: '二维码过期',
    qrcodeRefreshText: '点击刷新',
});
Qrcode.displayName = 'DoraQrcode';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-qrcode', {
    prefixCls: '',
    typeNumber: '',
    errorCorrectLevel: '',
    width: '',
    height: '',
    whiteSpace: '',
    fgColor: '',
    bgColor: '',
    data: '',
    showMenuByLongpress: '',
    qrcodeStatus: '',
    qrcodeExpiredText: '',
    qrcodeRefreshText: '',
    onLoad: '',
    onError: '',
    onClick: '',
    onRefresh: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Radio = createHostComponent('dora-radio', {
    prefixCls: 'dora-radio',
    cellPrefixCls: 'dora-list-item',
    selectablePrefixCls: 'dora-selectable',
    thumb: '',
    title: '',
    label: '',
    value: '',
    checked: false,
    disabled: false,
    readOnly: false,
    color: 'balanced',
    wrapStyle: null,
    hasLine: true,
});
Radio.displayName = 'DoraRadio';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-radio', {
    prefixCls: '',
    cellPrefixCls: '',
    selectablePrefixCls: '',
    thumb: '',
    title: '',
    label: '',
    value: '',
    checked: '',
    disabled: '',
    readOnly: '',
    color: '',
    wrapStyle: '',
    hasLine: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const RadioGroup = createHostComponent('dora-radio-group', {
    prefixCls: 'dora-radio-group',
    cellGroupPrefixCls: 'dora-list',
    value: '',
    name: '',
    title: '',
    label: '',
    options: [],
    disabled: false,
    readOnly: false,
    mode: 'default',
    bodyStyle: null,
    hasLine: true,
    withListComponent: true,
    iconPosition: 'right',
    iconSize: '',
    iconOn: '',
    iconOff: '',
});
RadioGroup.displayName = 'DoraRadioGroup';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-radio-group', {
    prefixCls: '',
    cellGroupPrefixCls: '',
    value: '',
    name: '',
    title: '',
    label: '',
    options: '',
    disabled: '',
    readOnly: '',
    mode: '',
    bodyStyle: '',
    hasLine: '',
    withListComponent: '',
    iconPosition: '',
    iconSize: '',
    iconOn: '',
    iconOff: '',
    onChange: '',
});

const InnerRadio = Radio;
InnerRadio.Group = RadioGroup;

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Rater = createHostComponent('dora-rater', {
    prefixCls: 'dora-rater',
    max: 5,
    icon: '',
    star: '★',
    defaultValue: 0,
    value: 0,
    activeColor: '#ffc900',
    margin: 2,
    fontSize: 25,
    disabled: false,
    allowHalf: false,
    allowClear: false,
    allowTouchMove: false,
    controlled: false,
});
Rater.displayName = 'DoraRater';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-rater', {
    prefixCls: '',
    max: '',
    icon: '',
    star: '',
    defaultValue: '',
    value: '',
    activeColor: '',
    margin: '',
    fontSize: '',
    disabled: '',
    allowHalf: '',
    allowClear: '',
    allowTouchMove: '',
    controlled: '',
    onChange: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Refresher = createHostComponent('dora-refresher', {
    prefixCls: 'dora-refresher',
    pullingIcon: '',
    pullingText: '下拉刷新',
    refreshingIcon: '',
    refreshingText: '正在刷新',
    disablePullingRotation: false,
    distance: 30,
    prefixLCls: 'dora-loader',
    isShowLoadingText: false,
    loadingText: '正在加载',
    loadNoDataText: '没有更多数据',
    scrollTop: 0,
});
Refresher.displayName = 'DoraRefresher';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-refresher', {
    prefixCls: '',
    pullingIcon: '',
    pullingText: '',
    refreshingIcon: '',
    refreshingText: '',
    disablePullingRotation: '',
    distance: '',
    prefixLCls: '',
    isShowLoadingText: '',
    loadingText: '',
    loadNoDataText: '',
    scrollTop: '',
    onPulling: '',
    onRefresh: '',
    onLoadmore: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Result = createHostComponent('dora-result', {
    prefixCls: 'dora-result',
    icon: '',
    title: '',
    label: '',
    buttons: [],
    extra: '',
    fixed: false,
});
Result.displayName = 'DoraResult';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-result', {
    prefixCls: '',
    icon: '',
    title: '',
    label: '',
    buttons: '',
    extra: '',
    fixed: '',
    onClick: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Row = createHostComponent('dora-row', {
    prefixCls: 'dora-row',
    gutter: 0,
});
Row.displayName = 'DoraRow';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-row', {
    prefixCls: '',
    gutter: '',
});

const InnerRow = Row;
InnerRow.Col = Col;

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const SafeArea = createHostComponent('dora-safe-area', {
    prefixCls: 'dora-safe-area',
    safeArea: { top: false, bottom: false },
    safeAreaStyle: 'default',
    forceRender: false,
    supports: false,
    wrapStyle: null,
});
SafeArea.displayName = 'DoraSafeArea';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-safe-area', {
    prefixCls: '',
    safeArea: '',
    safeAreaStyle: '',
    forceRender: '',
    supports: '',
    wrapStyle: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const SearchBar = createHostComponent('dora-search-bar', {
    prefixCls: 'dora-search-bar',
    defaultValue: '',
    value: '',
    placeholder: '搜索',
    placeholderStyle: null,
    placeholderClass: 'input-placeholder',
    disabled: false,
    maxlength: 140,
    cursorSpacing: 11,
    focus: false,
    confirmType: 'search',
    confirmHold: false,
    cursor: -1,
    selectionStart: -1,
    selectionEnd: -1,
    adjustPosition: true,
    clear: false,
    cancelText: '取消',
    showCancel: false,
    controlled: false,
    onlyShowClearWhenFocus: true,
});
SearchBar.displayName = 'DoraSearchBar';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-search-bar', {
    prefixCls: '',
    defaultValue: '',
    value: '',
    placeholder: '',
    placeholderStyle: '',
    placeholderClass: '',
    disabled: '',
    maxlength: '',
    cursorSpacing: '',
    focus: '',
    confirmType: '',
    confirmHold: '',
    cursor: '',
    selectionStart: '',
    selectionEnd: '',
    adjustPosition: '',
    clear: '',
    cancelText: '',
    showCancel: '',
    controlled: '',
    onlyShowClearWhenFocus: '',
    onChange: '',
    onFocus: '',
    onBlur: '',
    onConfirm: '',
    onClear: '',
    onCancel: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const SegmentedControl = createHostComponent('dora-segmented-control', {
    prefixCls: 'dora-segmented-control',
    theme: 'balanced',
    defaultCurrent: 0,
    current: 0,
    values: [],
    disabled: false,
    controlled: false,
});
SegmentedControl.displayName = 'DoraSegmentedControl';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-segmented-control', {
    prefixCls: '',
    theme: '',
    defaultCurrent: '',
    current: '',
    values: '',
    disabled: '',
    controlled: '',
    onChange: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Select = createHostComponent('dora-select', {
    prefixCls: 'dora-select',
    value: '',
    options: [],
    multiple: false,
    max: -1,
    notFoundContent: { icon: '', title: '', text: '暂无数据' },
    virtualized: false,
    toolbar: { title: '请选择', cancelText: '取消', confirmText: '确定' },
});
Select.displayName = 'DoraSelect';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-select', {
    prefixCls: '',
    value: '',
    options: '',
    multiple: '',
    max: '',
    notFoundContent: '',
    virtualized: '',
    toolbar: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Selectable = createHostComponent('dora-selectable', {
    prefixCls: 'dora-selectable',
    type: 'checkbox',
    value: '',
    defaultChecked: false,
    checked: false,
    disabled: false,
    readOnly: false,
    color: 'balanced',
    controlled: false,
    wrapStyle: null,
    iconSize: '',
    iconOn: '',
    iconOff: '',
});
Selectable.displayName = 'DoraSelectable';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-selectable', {
    prefixCls: '',
    type: '',
    value: '',
    defaultChecked: '',
    checked: '',
    disabled: '',
    readOnly: '',
    color: '',
    controlled: '',
    wrapStyle: '',
    iconSize: '',
    iconOn: '',
    iconOff: '',
    onChange: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const SelectorGroup = createHostComponent('dora-selector-group', {
    prefixCls: 'dora-selector-group',
    theme: 'balanced',
    shape: 'default',
    columns: 3,
    gap: 8,
    options: [],
    defaultValue: [],
    value: [],
    controlled: false,
    multiple: false,
    showCheckMark: true,
    defaultFieldNames: { label: 'label', value: 'value', disabled: 'disabled' },
});
SelectorGroup.displayName = 'DoraSelectorGroup';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-selector-group', {
    prefixCls: '',
    theme: '',
    shape: '',
    columns: '',
    gap: '',
    options: '',
    defaultValue: '',
    value: '',
    controlled: '',
    multiple: '',
    showCheckMark: '',
    defaultFieldNames: '',
    onChange: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Skeleton = createHostComponent('dora-skeleton', {
    prefixCls: 'dora-skeleton',
    active: false,
});
Skeleton.displayName = 'DoraSkeleton';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-skeleton', {
    prefixCls: '',
    active: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const SkeletonAvatar = createHostComponent('dora-skeleton-avatar', {
    prefixCls: 'dora-skeleton-avatar',
    size: 'default',
    shape: 'circle',
    active: false,
});
SkeletonAvatar.displayName = 'DoraSkeletonAvatar';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-skeleton-avatar', {
    prefixCls: '',
    size: '',
    shape: '',
    active: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const SkeletonParagraph = createHostComponent('dora-skeleton-paragraph', {
    prefixCls: 'dora-skeleton-paragraph',
    rows: 3,
    rounded: false,
    active: false,
});
SkeletonParagraph.displayName = 'DoraSkeletonParagraph';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-skeleton-paragraph', {
    prefixCls: '',
    rows: '',
    rounded: '',
    active: '',
});

const InnerSkeleton = Skeleton;
InnerSkeleton.Avatar = SkeletonAvatar;
InnerSkeleton.Paragraph = SkeletonParagraph;

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Slider = createHostComponent('dora-slider', {
    prefixCls: 'dora-slider',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: [0],
    value: [0],
    controlled: false,
    disabled: false,
    showMark: false,
    showValue: false,
    tipFormatter: '{d}',
    markStyle: null,
    handleStyle: null,
    trackStyle: null,
    railStyle: null,
    wrapStyle: null,
});
Slider.displayName = 'DoraSlider';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-slider', {
    prefixCls: '',
    min: '',
    max: '',
    step: '',
    defaultValue: '',
    value: '',
    controlled: '',
    disabled: '',
    showMark: '',
    showValue: '',
    tipFormatter: '',
    markStyle: '',
    handleStyle: '',
    trackStyle: '',
    railStyle: '',
    wrapStyle: '',
    onChange: '',
    onAfterChange: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Spin = createHostComponent('dora-spin', {
    prefixCls: 'dora-spin',
    classNames: 'dora-animate--fadeIn',
    tip: '',
    size: 'default',
    spinning: true,
    nested: false,
    spinColor: 'default',
});
Spin.displayName = 'DoraSpin';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-spin', {
    prefixCls: '',
    classNames: '',
    tip: '',
    size: '',
    spinning: '',
    nested: '',
    spinColor: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Step = createHostComponent('dora-step', {
    prefixCls: 'dora-step',
    status: '',
    title: '',
    content: '',
    icon: '',
});
Step.displayName = 'DoraStep';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-step', {
    prefixCls: '',
    status: '',
    title: '',
    content: '',
    icon: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Steps = createHostComponent('dora-steps', {
    prefixCls: 'dora-steps',
    current: 0,
    direction: 'horizontal',
});
Steps.displayName = 'DoraSteps';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-steps', {
    prefixCls: '',
    current: '',
    direction: '',
});

const InnerSteps = Steps;
InnerSteps.Step = Step;

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Sticky = createHostComponent('dora-sticky', {
    prefixCls: 'dora-sticky',
    disabled: false,
    hoverClass: 'default',
    wrapStyle: null,
});
Sticky.displayName = 'DoraSticky';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-sticky', {
    prefixCls: '',
    disabled: '',
    hoverClass: '',
    wrapStyle: '',
    onClick: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const SwipeAction = createHostComponent('dora-swipe-action', {
    prefixCls: 'dora-swipe',
    autoClose: false,
    disabled: false,
    left: [],
    right: [],
    useSlots: false,
    data: null,
});
SwipeAction.displayName = 'DoraSwipeAction';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-swipe-action', {
    prefixCls: '',
    autoClose: '',
    disabled: '',
    left: '',
    right: '',
    useSlots: '',
    data: '',
    onClick: '',
    onOpen: '',
    onClose: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Switch = createHostComponent('dora-switch', {
    prefixCls: 'dora-switch',
    value: false,
    disabled: false,
    loading: false,
    color: 'balanced',
    checkedText: '',
    uncheckedText: '',
});
Switch.displayName = 'DoraSwitch';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-switch', {
    prefixCls: '',
    value: '',
    disabled: '',
    loading: '',
    color: '',
    checkedText: '',
    uncheckedText: '',
    onChange: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Tab = createHostComponent('dora-tab', {
    prefixCls: 'dora-tabs__tab',
    key: '',
    title: '',
    disabled: false,
});
Tab.displayName = 'DoraTab';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-tab', {
    prefixCls: '',
    key: '',
    title: '',
    disabled: '',
    onClick: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Tabbar = createHostComponent('dora-tabbar', {
    prefixCls: 'dora-tabbar',
    defaultCurrent: '',
    current: '',
    controlled: false,
    theme: 'balanced',
    backgroundColor: '#fff',
    position: '',
    safeArea: false,
});
Tabbar.displayName = 'DoraTabbar';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-tabbar', {
    prefixCls: '',
    defaultCurrent: '',
    current: '',
    controlled: '',
    theme: '',
    backgroundColor: '',
    position: '',
    safeArea: '',
    onChange: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const TabbarItem = createHostComponent('dora-tabbar-item', {
    prefixCls: 'dora-tabbar-item',
    tabKey: '',
    title: '',
    disabled: false,
});
TabbarItem.displayName = 'DoraTabbarItem';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-tabbar-item', {
    prefixCls: '',
    tabKey: '',
    title: '',
    disabled: '',
    onClick: '',
});

const InnerTabbar = Tabbar;
InnerTabbar.Item = TabbarItem;

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Tabs = createHostComponent('dora-tabs', {
    prefixCls: 'dora-tabs',
    defaultCurrent: '',
    current: '',
    scroll: false,
    controlled: false,
    theme: 'balanced',
    direction: 'horizontal',
    justify: 'space-around',
    activeLineMode: 'auto',
});
Tabs.displayName = 'DoraTabs';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-tabs', {
    prefixCls: '',
    defaultCurrent: '',
    current: '',
    scroll: '',
    controlled: '',
    theme: '',
    direction: '',
    justify: '',
    activeLineMode: '',
    onChange: '',
});

const InnerTabs = Tabs;
InnerTabs.Tab = Tab;

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Tag = createHostComponent('dora-tag', {
    prefixCls: 'dora-tag',
    hoverClass: 'default',
    color: '',
    closable: false,
    defaultVisible: true,
    visible: true,
    controlled: false,
});
Tag.displayName = 'DoraTag';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-tag', {
    prefixCls: '',
    hoverClass: '',
    color: '',
    closable: '',
    defaultVisible: '',
    visible: '',
    controlled: '',
    onChange: '',
    onClick: '',
    onClose: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Textarea = createHostComponent('dora-textarea', {
    prefixCls: 'dora-textarea',
    label: '',
    extra: '',
    defaultValue: '',
    value: '',
    controlled: false,
    disabled: false,
    readOnly: false,
    rows: 1,
    hasCount: false,
    clear: false,
    error: false,
    placeholderStyle: null,
});
Textarea.displayName = 'DoraTextarea';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-textarea', {
    prefixCls: '',
    label: '',
    extra: '',
    defaultValue: '',
    value: '',
    controlled: '',
    disabled: '',
    readOnly: '',
    rows: '',
    hasCount: '',
    clear: '',
    error: '',
    placeholderStyle: '',
    onChange: '',
    onFocus: '',
    onBlur: '',
    onConfirm: '',
    onKeyboardheightchange: '',
    onClear: '',
    onError: '',
    onLinechange: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Timeago = createHostComponent('dora-timeago', {
    prefixCls: 'dora-timeago',
    to: null,
    from: null,
    refreshable: false,
    lang: 'zh_CN',
});
Timeago.displayName = 'DoraTimeago';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-timeago', {
    prefixCls: '',
    to: '',
    from: '',
    refreshable: '',
    lang: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Timeline = createHostComponent('dora-timeline', {
    prefixCls: 'dora-timeline',
    pending: false,
    position: 'left',
});
Timeline.displayName = 'DoraTimeline';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-timeline', {
    prefixCls: '',
    pending: '',
    position: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const TimelineItem = createHostComponent('dora-timeline-item', {
    prefixCls: 'dora-timeline-item',
    content: '',
    dotStyle: null,
    custom: false,
});
TimelineItem.displayName = 'DoraTimelineItem';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-timeline-item', {
    prefixCls: '',
    content: '',
    dotStyle: '',
    custom: '',
});

const InnerTimeline = Timeline;
InnerTimeline.Item = TimelineItem;

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Toast = createHostComponent('dora-toast', {
    prefixCls: 'dora-toast',
    image: '',
    icon: '',
    iconColor: '',
    text: '',
    position: 'center',
    mask: true,
    maskClosable: true,
    visible: false,
    zIndex: null,
});
Toast.displayName = 'DoraToast';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-toast', {
    prefixCls: '',
    image: '',
    icon: '',
    iconColor: '',
    text: '',
    position: '',
    mask: '',
    maskClosable: '',
    visible: '',
    zIndex: '',
    onClose: '',
    onClosed: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Toptips = createHostComponent('dora-toptips', {
    prefixCls: 'dora-toptips',
    classNames: 'dora-animate--slideInDown',
    icon: 'cancel',
    hidden: false,
    text: '',
    duration: 3000,
});
Toptips.displayName = 'DoraToptips';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-toptips', {
    prefixCls: '',
    classNames: '',
    icon: '',
    hidden: '',
    text: '',
    duration: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const TouchView = createHostComponent('dora-touch-view', {
    prefixCls: 'dora-touch-view',
    hoverClass: 'none',
    hoverStopPropagation: false,
    hoverStartTime: 20,
    hoverStayTime: 70,
    wrapStyle: null,
});
TouchView.displayName = 'DoraTouchView';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-touch-view', {
    prefixCls: '',
    hoverClass: '',
    hoverStopPropagation: '',
    hoverStartTime: '',
    hoverStayTime: '',
    wrapStyle: '',
    onClick: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Upload = createHostComponent('dora-upload', {
    prefixCls: 'dora-upload',
    max: -1,
    count: 9,
    defaultFileType: 'image',
    compressed: true,
    maxDuration: 60,
    camera: 'back',
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    url: '',
    name: 'file',
    header: {},
    formData: {},
    uploaded: true,
    disabled: false,
    progress: false,
    listType: 'text',
    defaultFileList: [],
    fileList: [],
    controlled: false,
    showUploadList: true,
    showRemoveIcon: true,
});
Upload.displayName = 'DoraUpload';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-upload', {
    prefixCls: '',
    max: '',
    count: '',
    defaultFileType: '',
    compressed: '',
    maxDuration: '',
    camera: '',
    sizeType: '',
    sourceType: '',
    url: '',
    name: '',
    header: '',
    formData: '',
    uploaded: '',
    disabled: '',
    progress: '',
    listType: '',
    defaultFileList: '',
    fileList: '',
    controlled: '',
    showUploadList: '',
    showRemoveIcon: '',
    onBefore: '',
    onChange: '',
    onSuccess: '',
    onFail: '',
    onProgress: '',
    onComplete: '',
    onPreview: '',
    onRemove: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const Vcode = createHostComponent('dora-vcode', {
    prefixCls: 'dora-vcode',
    str: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    num: 6,
    width: 120,
    height: 40,
    bgColor: '',
    fontColor: '',
    hasPoint: true,
    hasLine: true,
    canvasId: 'dora-vcode',
});
Vcode.displayName = 'DoraVcode';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-vcode', {
    prefixCls: '',
    str: '',
    num: '',
    width: '',
    height: '',
    bgColor: '',
    fontColor: '',
    hasPoint: '',
    hasLine: '',
    canvasId: '',
    onChange: '',
    onError: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const VirtualList = createHostComponent('dora-virtual-list', {
    prefixCls: 'dora-virtual-list',
    itemHeight: 50,
    itemBuffer: 0,
    scrollToIndex: 0,
    upperThreshold: 50,
    lowerThreshold: 50,
    scrollWithAnimation: false,
    enableBackToTop: false,
    disableScroll: false,
    enablePageScroll: false,
    height: 300,
    debounce: 0,
});
VirtualList.displayName = 'DoraVirtualList';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-virtual-list', {
    prefixCls: '',
    itemHeight: '',
    itemBuffer: '',
    scrollToIndex: '',
    upperThreshold: '',
    lowerThreshold: '',
    scrollWithAnimation: '',
    enableBackToTop: '',
    disableScroll: '',
    enablePageScroll: '',
    height: '',
    debounce: '',
    onChange: '',
    onScroll: '',
    onScrolltoupper: '',
    onScrolltolower: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const VirtualListItem = createHostComponent('dora-virtual-list-item');
VirtualListItem.displayName = 'DoraVirtualListItem';

const InnerVirtualList = VirtualList;
InnerVirtualList.Item = VirtualListItem;

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const WaterMark = createHostComponent('dora-water-mark', {
    prefixCls: 'dora-water-mark',
    content: null,
    fontColor: 'rgba(0, 0, 0, .15)',
    fontStyle: 'normal',
    fontFamily: 'sans-serif',
    fontWeight: 'normal',
    fontSize: 14,
    fullPage: true,
    gapX: 24,
    gapY: 48,
    width: 120,
    height: 64,
    image: '',
    imageHeight: 64,
    imageWidth: 128,
    rotate: -22,
    zIndex: 2000,
});
WaterMark.displayName = 'DoraWaterMark';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-water-mark', {
    prefixCls: '',
    content: '',
    fontColor: '',
    fontStyle: '',
    fontFamily: '',
    fontWeight: '',
    fontSize: '',
    fullPage: '',
    gapX: '',
    gapY: '',
    width: '',
    height: '',
    image: '',
    imageHeight: '',
    imageWidth: '',
    rotate: '',
    zIndex: '',
    onLoad: '',
    onError: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const WhiteSpace = createHostComponent('dora-white-space', {
    prefixCls: 'dora-white-space',
    size: 'default',
    bodyStyle: null,
});
WhiteSpace.displayName = 'DoraWhiteSpace';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-white-space', {
    prefixCls: '',
    size: '',
    bodyStyle: '',
    onClick: '',
});

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
const WingBlank = createHostComponent('dora-wing-blank', {
    prefixCls: 'dora-wing-blank',
    size: 'default',
    bodyStyle: null,
});
WingBlank.displayName = 'DoraWingBlank';
// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-wing-blank', {
    prefixCls: '',
    size: '',
    bodyStyle: '',
});

export { InnerAccordion as Accordion, AccordionPanel, ActionSheet, Alert, AnimationGroup, Avatar, Backdrop, Badge, Barcode, Button, Calendar, Card, Cascader, CascaderPickerView, CascaderView, InnerCheckbox as Checkbox, CheckboxGroup, Circle, Col, Countdown, Countup, DatePicker, DatePickerView, Dialog, Divider, ESign, Ellipsis, FabButton, Field, Filterbar, FloatingPanel, Footer, Form, Gallery, Grid, Icon, Image, InnerIndex as Index, IndexItem, Input, InputNumber, Keyboard, Landscape, InnerList as List, ListItem, Loading, Media, MultiPickerView, Navbar, NoticeBar, Notification, Pagination, Picker, PickerView, Popover, Popup, PopupSelect, Progress, Prompt, Qrcode, InnerRadio as Radio, RadioGroup, Rater, Refresher, Result, InnerRow as Row, SafeArea, SearchBar, SegmentedControl, Select, Selectable, SelectorGroup, InnerSkeleton as Skeleton, SkeletonAvatar, SkeletonParagraph, Slider, Spin, Step, InnerSteps as Steps, Sticky, SwipeAction, Switch, Tab, InnerTabbar as Tabbar, TabbarItem, InnerTabs as Tabs, Tag, Textarea, Timeago, InnerTimeline as Timeline, TimelineItem, Toast, Toptips, TouchView, Upload, Vcode, InnerVirtualList as VirtualList, VirtualListItem, WaterMark, WhiteSpace, WingBlank };
