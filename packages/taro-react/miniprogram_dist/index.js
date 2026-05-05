/**
 * @doraemon-ui/taro-react.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-05, 20:38:18.
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

const AccordionPanel = createHostComponent('dora-accordion-panel', {
    prefixCls: 'dora-accordion-panel',
    key: '',
    thumb: '',
    title: '',
    content: '',
    disabled: false,
    showArrow: false,
});
AccordionPanel.displayName = 'DoraAccordionPanel';

const InnerAccordion = Accordion;
InnerAccordion.Panel = AccordionPanel;

const ActionSheet = createHostComponent('dora-action-sheet', {
    prefixCls: 'dora-action-sheet',
    theme: 'ios',
    titleText: '',
    buttons: [],
    cancelText: '',
    destructiveText: '',
    visible: false,
});
ActionSheet.displayName = 'DoraActionSheet';

const Alert = createHostComponent('dora-alert', {
    prefixCls: 'dora-alert',
    classNames: '',
    theme: '',
    thumb: '',
    title: '',
    label: '',
    closable: false,
});
Alert.displayName = 'DoraAlert';

const AnimationGroup = createHostComponent('dora-animation-group', {
    in: false,
    classNames: '',
    duration: '',
    type: '',
    appear: false,
    enter: false,
    exit: false,
    mountOnEnter: false,
    unmountOnExit: false,
    wrapCls: '',
    wrapStyle: {},
    disableScroll: false,
});
AnimationGroup.displayName = 'DoraAnimationGroup';

const Avatar = createHostComponent('dora-avatar', {
    prefixCls: 'dora-avatar',
    shape: 'circle',
    size: 'small',
    src: '',
    bodyStyle: '',
    scale: false,
});
Avatar.displayName = 'DoraAvatar';

const Backdrop = createHostComponent('dora-backdrop', {
    prefixCls: 'dora-backdrop',
    transparent: false,
    zIndex: 0,
    mountOnEnter: false,
    unmountOnExit: false,
    disableScroll: false,
    visible: false,
    classNames: '',
    wrapStyle: {},
});
Backdrop.displayName = 'DoraBackdrop';

const Badge = createHostComponent('dora-badge', {
    prefixCls: 'dora-badge',
    count: 0,
    overflowCount: 0,
    dot: false,
    showZero: false,
    status: '',
    text: '',
    position: '',
    backgroundColor: '',
    hideShadow: false,
    title: '',
});
Badge.displayName = 'DoraBadge';

const Barcode = createHostComponent('dora-barcode', {
    prefixCls: 'dora-barcode',
    width: 0,
    height: 0,
    number: '',
    options: '',
    canvasId: '',
});
Barcode.displayName = 'DoraBarcode';

const Button = createHostComponent('dora-button', {
    prefixCls: 'dora-button',
    color: '',
    fill: 'solid',
    expand: 'block',
    shape: 'rounded',
    size: 'small',
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

const Calendar = createHostComponent('dora-calendar', {
    prefixCls: '',
});
Calendar.displayName = 'DoraCalendar';

const Card = createHostComponent('dora-card', {
    prefixCls: 'dora-card',
    hoverClass: '',
    bordered: false,
    full: false,
    title: '',
    thumb: '',
    thumbStyle: '',
    extra: '',
    actions: [],
});
Card.displayName = 'DoraCard';

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

const CascaderPickerView = createHostComponent('dora-cascader-picker-view', {
    prefixCls: 'dora-picker',
    pickerPrefixCls: '',
    value: [],
    cols: 0,
    itemHeight: 0,
    itemStyle: '',
    indicatorStyle: '',
    indicatorClass: '',
    maskStyle: '',
    maskClass: '',
    labelAlign: '',
    loading: false,
    options: [],
    defaultFieldNames: '',
});
CascaderPickerView.displayName = 'DoraCascaderPickerView';

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
    wrapStyle: '',
    hasLine: true,
});
Checkbox.displayName = 'DoraCheckbox';

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
    bodyStyle: '',
    hasLine: true,
    withListComponent: true,
    iconPosition: 'left',
    iconSize: '',
    iconOn: '',
    iconOff: '',
});
CheckboxGroup.displayName = 'DoraCheckboxGroup';

const InnerCheckbox = Checkbox;
InnerCheckbox.Group = CheckboxGroup;

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

const Col = createHostComponent('dora-col');
Col.displayName = 'DoraCol';

const Countdown = createHostComponent('dora-countdown');
Countdown.displayName = 'DoraCountdown';

const Countup = createHostComponent('dora-countup');
Countup.displayName = 'DoraCountup';

const DatePicker = createHostComponent('dora-date-picker', {
    prefixCls: 'dora-date-picker',
    multiPickerPrefixCls: '',
    pickerPrefixCls: '',
    toolbar: '',
    defaultVisible: false,
    visible: false,
    controlled: false,
    disabled: false,
    value: '',
    itemHeight: 0,
    itemStyle: '',
    indicatorStyle: '',
    indicatorClass: '',
    maskStyle: '',
    maskClass: '',
    labelAlign: 'left',
    mode: '',
    minuteStep: 0,
    use12Hours: false,
    minDate: '',
    maxDate: '',
    minHour: 0,
    maxHour: 0,
    minMinute: 0,
    maxMinute: 0,
    lang: '',
    tillNow: false,
});
DatePicker.displayName = 'DoraDatePicker';

const DatePickerView = createHostComponent('dora-date-picker-view', {
    prefixCls: 'dora-date-picker',
    multiPickerPrefixCls: 'dora-picker',
    pickerPrefixCls: 'dora-picker-view',
    value: null,
    itemHeight: 34,
    itemStyle: '',
    indicatorStyle: '',
    indicatorClass: '',
    maskStyle: '',
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

const Dialog = createHostComponent('dora-dialog', {
    prefixCls: 'dora-dialog',
    bodyStyle: {},
    mask: false,
    maskClosable: false,
    visible: false,
    zIndex: 0,
    closable: false,
    buttonClosable: false,
    verticalButtons: false,
    image: '',
    title: '',
    content: '',
    buttons: [],
});
Dialog.displayName = 'DoraDialog';

const Divider = createHostComponent('dora-divider', {
    prefixCls: 'dora-divider',
    position: 'center',
    dashed: false,
    text: '',
    showText: true,
    direction: 'horizontal',
});
Divider.displayName = 'DoraDivider';

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

const FabButton = createHostComponent('dora-fab-button', {
    prefixCls: 'dora-fab-button',
    hoverClass: 'default',
    theme: 'balanced',
    position: 'bottomRight',
    action: '',
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

const Field = createHostComponent('dora-field', {
    prefixCls: 'dora-field',
    label: '',
    labelWrap: false,
    extra: '',
    help: '',
    childElementPosition: '',
    isLink: false,
    align: '',
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

const Filterbar = createHostComponent('dora-filterbar', {
    prefixCls: 'dora-filterbar',
    disabled: false,
    hoverClass: '',
    wrapStyle: {},
});
Filterbar.displayName = 'DoraFilterbar';

const FloatingPanel = createHostComponent('dora-floating-panel', {
    prefixCls: 'dora-floating-panel',
    disabled: false,
    hoverClass: '',
    wrapStyle: {},
});
FloatingPanel.displayName = 'DoraFloatingPanel';

const Footer = createHostComponent('dora-footer', {
    prefixCls: 'dora-footer',
    disabled: false,
    hoverClass: '',
    wrapStyle: {},
});
Footer.displayName = 'DoraFooter';

const Form = createHostComponent('dora-form', {
    prefixCls: 'dora-form',
    disabled: false,
    hoverClass: '',
    wrapStyle: {},
});
Form.displayName = 'DoraForm';

const Gallery = createHostComponent('dora-gallery', {
    prefixCls: 'dora-gallery',
    disabled: false,
    hoverClass: '',
    wrapStyle: {},
});
Gallery.displayName = 'DoraGallery';

const Grid = createHostComponent('dora-grid', {
    prefixCls: 'dora-grid',
    disabled: false,
    hoverClass: '',
    wrapStyle: {},
});
Grid.displayName = 'DoraGrid';

const Icon = createHostComponent('dora-icon', {
    prefixCls: 'doraicons',
    hidden: false,
    type: '',
    size: '',
    color: '',
});
Icon.displayName = 'DoraIcon';

const Image = createHostComponent('dora-image', {
    prefixCls: 'dora-image',
    disabled: false,
    hoverClass: '',
    wrapStyle: {},
});
Image.displayName = 'DoraImage';

const Index = createHostComponent('dora-index', {
    prefixCls: 'dora-index',
    height: 300,
    showIndicator: true,
    indicatorPosition: 'center',
    parentOffsetTop: 0,
});
Index.displayName = 'DoraIndex';

const IndexItem = createHostComponent('dora-index-item', {
    prefixCls: 'dora-index-item',
    name: '',
});
IndexItem.displayName = 'DoraIndexItem';

const InnerIndex = Index;
InnerIndex.Item = IndexItem;

const Input = createHostComponent('dora-input', {
    prefixCls: 'dora-input',
    type: 'text',
    password: false,
    placeholder: '',
    placeholderStyle: '',
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

const Keyboard = createHostComponent('dora-keyboard', {
    prefixCls: 'dora-keyboard',
});
Keyboard.displayName = 'DoraKeyboard';

const Landscape = createHostComponent('dora-landscape', {
    prefixCls: 'dora-landscape',
    visible: false,
    mask: false,
    maskClosable: false,
    closable: false,
});
Landscape.displayName = 'DoraLandscape';

const List = createHostComponent('dora-list', {
    prefixCls: 'dora-list',
    title: '',
    label: '',
    mode: 'default',
    hasLine: false,
    wrapStyle: {},
    bodyStyle: {},
});
List.displayName = 'DoraList';

const ListItem = createHostComponent('dora-list-item', {
    prefixCls: 'dora-list-item',
    thumb: '',
    title: '',
    label: '',
    extra: '',
    hasLine: false,
    isLink: false,
    align: 'flex-start',
    wrapStyle: {},
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

const InnerList = List;
InnerList.Item = ListItem;

const Loading = createHostComponent('dora-loading', {
    prefixCls: 'dora-loading',
});
Loading.displayName = 'DoraLoading';

const Media = createHostComponent('dora-media', {
    prefixCls: 'dora-media',
    thumb: '',
    thumbStyle: '',
    title: '',
    label: '',
    align: '',
});
Media.displayName = 'DoraMedia';

const MultiPickerView = createHostComponent('dora-multi-picker-view');
MultiPickerView.displayName = 'DoraMultiPickerView';

const Navbar = createHostComponent('dora-navbar', {
    prefixCls: 'dora-navbar',
    theme: '',
    title: '',
    leftText: '',
    rightText: '',
});
Navbar.displayName = 'DoraNavbar';

const NoticeBar = createHostComponent('dora-notice-bar', {
    prefixCls: 'dora-notice-bar',
    icon: '',
    content: '',
    mode: '',
    action: '',
    loop: false,
    leading: 0,
    trailing: 0,
    speed: 0,
});
NoticeBar.displayName = 'DoraNoticeBar';

const Notification = createHostComponent('dora-notification', {
    prefixCls: 'dora-notification',
    disabled: false,
    hoverClass: '',
    wrapStyle: {},
});
Notification.displayName = 'DoraNotification';

const Pagination = createHostComponent('dora-pagination', {
    prefixCls: 'dora-pagination',
    mode: '',
    defaultCurrent: 0,
    current: 0,
    controlled: false,
    total: 0,
    simple: false,
});
Pagination.displayName = 'DoraPagination';

const Picker = createHostComponent('dora-picker', {
    prefixCls: 'dora-popup-picker',
    multiPickerPrefixCls: '',
    pickerPrefixCls: '',
    toolbar: '',
    defaultVisible: false,
    visible: false,
    controlled: false,
    disabled: false,
    cascade: false,
    cols: 0,
    value: [],
    options: [],
    loading: false,
    itemHeight: 0,
    itemStyle: '',
    indicatorStyle: '',
    indicatorClass: '',
    maskStyle: '',
    maskClass: '',
    labelAlign: '',
    defaultFieldNames: '',
});
Picker.displayName = 'DoraPicker';

const PickerView = createHostComponent('dora-picker-view', {
    prefixCls: 'dora-picker-view',
    defaultValue: '',
    value: '',
    controlled: false,
    itemHeight: 34,
    itemStyle: '',
    indicatorStyle: '',
    indicatorClass: '',
    maskStyle: '',
    maskClass: '',
    labelAlign: 'center',
    loading: false,
    options: [],
    defaultFieldNames: '',
});
PickerView.displayName = 'DoraPickerView';

const Popover = createHostComponent('dora-popover', {
    prefixCls: 'dora-popover',
    disabled: false,
    hoverClass: '',
    wrapStyle: {},
});
Popover.displayName = 'DoraPopover';

const Popup = createHostComponent('dora-popup', {
    prefixCls: 'dora-popup',
    animationPrefixCls: '',
    position: '',
    wrapStyle: {},
    bodyStyle: {},
    mask: false,
    maskClosable: false,
    maskTransparent: false,
    maskStyle: {},
    visible: false,
    closeOnSwipe: false,
    zIndex: 0,
    mountOnEnter: false,
    unmountOnExit: false,
    closable: false,
    safeArea: '',
});
Popup.displayName = 'DoraPopup';

const PopupSelect = createHostComponent('dora-popup-select', {
    prefixCls: 'dora-popup-select',
    classNames: '',
    virtualized: false,
    notFoundContent: '',
    value: [],
    options: [],
    iconPosition: '',
    multiple: false,
    max: 0,
    toolbar: '',
    visible: false,
    defaultVisible: false,
    controlled: false,
});
PopupSelect.displayName = 'DoraPopupSelect';

const Progress = createHostComponent('dora-progress', {
    prefixCls: 'dora-progress',
    percent: 0,
    strokeWidth: 0,
    activeColor: '',
    backgroundColor: '',
    status: '',
    shape: '',
    barStyle: '',
    showInfo: false,
});
Progress.displayName = 'DoraProgress';

const Prompt = createHostComponent('dora-prompt', {
    prefixCls: 'dora-prompt',
    disabled: false,
    hoverClass: '',
    wrapStyle: {},
});
Prompt.displayName = 'DoraPrompt';

const Qrcode = createHostComponent('dora-qrcode', {
    prefixCls: 'dora-qrcode',
    typeNumber: 0,
    errorCorrectLevel: 0,
    width: 0,
    height: 0,
    whiteSpace: 0,
    fgColor: '',
    bgColor: '',
    data: '',
    showMenuByLongpress: false,
    qrcodeStatus: '',
    qrcodeExpiredText: '',
    qrcodeRefreshText: '',
});
Qrcode.displayName = 'DoraQrcode';

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
    wrapStyle: '',
    hasLine: true,
});
Radio.displayName = 'DoraRadio';

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
    bodyStyle: '',
    hasLine: true,
    withListComponent: true,
    iconPosition: 'right',
    iconSize: '',
    iconOn: '',
    iconOff: '',
});
RadioGroup.displayName = 'DoraRadioGroup';

const InnerRadio = Radio;
InnerRadio.Group = RadioGroup;

const Rater = createHostComponent('dora-rater', {
    prefixCls: 'dora-rater',
    max: 0,
    icon: '',
    star: '',
    defaultValue: 0,
    value: 0,
    activeColor: '',
    margin: 0,
    fontSize: 0,
    disabled: false,
    allowHalf: false,
    allowClear: false,
    allowTouchMove: false,
    controlled: false,
});
Rater.displayName = 'DoraRater';

const Refresher = createHostComponent('dora-refresher', {
    prefixCls: 'dora-refresher',
    pullingIcon: '',
    pullingText: '',
    refreshingIcon: '',
    refreshingText: '',
    disablePullingRotation: false,
    distance: 0,
    prefixLCls: '',
    isShowLoadingText: false,
    loadingText: '',
    loadNoDataText: '',
    scrollTop: 0,
});
Refresher.displayName = 'DoraRefresher';

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

const Row = createHostComponent('dora-row', {
    prefixCls: 'dora-row',
    gutter: 0,
});
Row.displayName = 'DoraRow';

const InnerRow = Row;
InnerRow.Col = Col;

const SafeArea = createHostComponent('dora-safe-area', {
    prefixCls: 'dora-safe-area',
    safeArea: '',
    safeAreaStyle: '',
    forceRender: false,
    supports: false,
    wrapStyle: {},
});
SafeArea.displayName = 'DoraSafeArea';

const SearchBar = createHostComponent('dora-search-bar', {
    prefixCls: 'dora-search-bar',
    defaultValue: '',
    value: '',
    placeholder: '',
    placeholderStyle: '',
    placeholderClass: '',
    disabled: false,
    maxlength: 0,
    cursorSpacing: 0,
    focus: false,
    confirmType: '',
    confirmHold: false,
    cursor: 0,
    selectionStart: 0,
    selectionEnd: 0,
    adjustPosition: false,
    clear: false,
    cancelText: '',
    showCancel: false,
    controlled: false,
    onlyShowClearWhenFocus: false,
});
SearchBar.displayName = 'DoraSearchBar';

const SegmentedControl = createHostComponent('dora-segmented-control', {
    prefixCls: 'dora-segmented-control',
    theme: '',
    defaultCurrent: 0,
    current: 0,
    values: [],
    disabled: false,
    controlled: false,
});
SegmentedControl.displayName = 'DoraSegmentedControl';

const Select = createHostComponent('dora-select', {
    prefixCls: 'dora-select',
    value: [],
    options: [],
    multiple: false,
    max: 0,
    notFoundContent: '',
    virtualized: false,
    toolbar: '',
});
Select.displayName = 'DoraSelect';

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
    wrapStyle: '',
    iconSize: '',
    iconOn: '',
    iconOff: '',
});
Selectable.displayName = 'DoraSelectable';

const SelectorGroup = createHostComponent('dora-selector-group', {
    prefixCls: 'dora-selector-group',
    theme: '',
    shape: '',
    columns: 0,
    gap: 0,
    options: [],
    defaultValue: [],
    value: [],
    controlled: false,
    multiple: false,
    showCheckMark: false,
    defaultFieldNames: '',
});
SelectorGroup.displayName = 'DoraSelectorGroup';

const Skeleton = createHostComponent('dora-skeleton', {
    prefixCls: 'dora-skeleton',
    active: false,
});
Skeleton.displayName = 'DoraSkeleton';

const SkeletonAvatar = createHostComponent('dora-skeleton-avatar', {
    prefixCls: 'dora-skeleton-avatar',
    size: '',
    shape: '',
    active: false,
});
SkeletonAvatar.displayName = 'DoraSkeletonAvatar';

const SkeletonParagraph = createHostComponent('dora-skeleton-paragraph', {
    prefixCls: 'dora-skeleton-paragraph',
    rows: 0,
    rounded: false,
    active: false,
});
SkeletonParagraph.displayName = 'DoraSkeletonParagraph';

const InnerSkeleton = Skeleton;
InnerSkeleton.Avatar = SkeletonAvatar;
InnerSkeleton.Paragraph = SkeletonParagraph;

const Slider = createHostComponent('dora-slider', {
    prefixCls: 'dora-slider',
    min: 0,
    max: 0,
    step: 0,
    defaultValue: [],
    value: [],
    controlled: false,
    disabled: false,
    showMark: false,
    showValue: '',
    tipFormatter: '',
    markStyle: '',
    handleStyle: '',
    trackStyle: '',
    railStyle: '',
    wrapStyle: '',
});
Slider.displayName = 'DoraSlider';

const Spin = createHostComponent('dora-spin', {
    prefixCls: 'dora-spin',
    classNames: '',
    tip: '',
    size: '',
    spinning: false,
    nested: false,
    spinColor: '',
});
Spin.displayName = 'DoraSpin';

const Step = createHostComponent('dora-step', {
    prefixCls: 'dora-step',
    status: '',
    title: '',
    content: '',
    icon: '',
});
Step.displayName = 'DoraStep';

const Steps = createHostComponent('dora-steps', {
    prefixCls: 'dora-steps',
    current: 0,
    direction: 'horizontal',
});
Steps.displayName = 'DoraSteps';

const InnerSteps = Steps;
InnerSteps.Step = Step;

const Sticky = createHostComponent('dora-sticky', {
    prefixCls: 'dora-sticky',
    disabled: false,
    hoverClass: '',
    wrapStyle: {},
});
Sticky.displayName = 'DoraSticky';

const SwipeAction = createHostComponent('dora-swipe-action', {
    prefixCls: 'dora-swipe',
    autoClose: false,
    disabled: false,
    left: [],
    right: [],
    useSlots: false,
    data: '',
});
SwipeAction.displayName = 'DoraSwipeAction';

const Switch = createHostComponent('dora-switch', {
    prefixCls: 'dora-switch',
    value: false,
    disabled: false,
    loading: false,
    color: '',
    checkedText: '',
    uncheckedText: '',
});
Switch.displayName = 'DoraSwitch';

const Tab = createHostComponent('dora-tab', {
    prefixCls: 'dora-tabs__tab',
    key: '',
    title: '',
    disabled: false,
});
Tab.displayName = 'DoraTab';

const Tabbar = createHostComponent('dora-tabbar', {
    prefixCls: 'dora-tabbar',
    defaultCurrent: '',
    current: '',
    controlled: false,
    theme: '',
    backgroundColor: '',
    position: '',
    safeArea: '',
});
Tabbar.displayName = 'DoraTabbar';

const TabbarItem = createHostComponent('dora-tabbar-item', {
    prefixCls: 'dora-tabbar-item',
    tabKey: '',
    title: '',
    disabled: false,
});
TabbarItem.displayName = 'DoraTabbarItem';

const InnerTabbar = Tabbar;
InnerTabbar.Item = TabbarItem;

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

const InnerTabs = Tabs;
InnerTabs.Tab = Tab;

const Tag = createHostComponent('dora-tag', {
    prefixCls: 'dora-tag',
    hoverClass: '',
    color: '',
    closable: false,
    defaultVisible: false,
    visible: false,
    controlled: false,
});
Tag.displayName = 'DoraTag';

const Textarea = createHostComponent('dora-textarea', {
    prefixCls: 'dora-textarea',
    label: '',
    extra: '',
    defaultValue: '',
    value: '',
    controlled: false,
    disabled: false,
    readOnly: false,
    rows: 0,
    hasCount: false,
    clear: false,
    error: false,
    placeholderStyle: '',
});
Textarea.displayName = 'DoraTextarea';

const Timeago = createHostComponent('dora-timeago', {
    prefixCls: 'dora-timeago',
    to: '',
    from: '',
    refreshable: false,
    lang: '',
});
Timeago.displayName = 'DoraTimeago';

const Timeline = createHostComponent('dora-timeline', {
    prefixCls: 'dora-timeline',
    pending: false,
    position: '',
});
Timeline.displayName = 'DoraTimeline';

const TimelineItem = createHostComponent('dora-timeline-item', {
    prefixCls: 'dora-timeline-item',
    content: '',
    dotStyle: '',
    custom: false,
});
TimelineItem.displayName = 'DoraTimelineItem';

const InnerTimeline = Timeline;
InnerTimeline.Item = TimelineItem;

const Toast = createHostComponent('dora-toast', {
    prefixCls: 'dora-toast',
    image: '',
    icon: '',
    iconColor: '',
    text: '',
    position: '',
    mask: false,
    maskClosable: false,
    visible: false,
    zIndex: 0,
});
Toast.displayName = 'DoraToast';

const Toptips = createHostComponent('dora-toptips', {
    prefixCls: 'dora-toptips',
    classNames: '',
    icon: '',
    hidden: false,
    text: '',
    duration: 0,
});
Toptips.displayName = 'DoraToptips';

const TouchView = createHostComponent('dora-touch-view', {
    prefixCls: 'dora-touch-view',
    hoverClass: '',
    hoverStopPropagation: false,
    hoverStartTime: 0,
    hoverStayTime: 0,
    wrapStyle: '',
});
TouchView.displayName = 'DoraTouchView';

const Upload = createHostComponent('dora-upload', {
    prefixCls: 'dora-upload',
    max: 0,
    count: 0,
    defaultFileType: '',
    compressed: false,
    maxDuration: 0,
    camera: '',
    sizeType: [],
    sourceType: [],
    url: '',
    name: '',
    header: {},
    formData: {},
    uploaded: false,
    disabled: false,
    progress: false,
    listType: '',
    defaultFileList: [],
    fileList: [],
    controlled: false,
    showUploadList: false,
    showRemoveIcon: false,
});
Upload.displayName = 'DoraUpload';

const Vcode = createHostComponent('dora-vcode', {
    prefixCls: 'dora-vcode',
    str: '',
    num: 0,
    width: 0,
    height: 0,
    bgColor: '',
    fontColor: '',
    hasPoint: false,
    hasLine: false,
    canvasId: '',
});
Vcode.displayName = 'DoraVcode';

const VirtualList = createHostComponent('dora-virtual-list', {
    prefixCls: 'dora-virtual-list',
    itemHeight: 0,
    itemBuffer: 0,
    scrollToIndex: 0,
    upperThreshold: 0,
    lowerThreshold: 0,
    scrollWithAnimation: false,
    enableBackToTop: false,
    disableScroll: false,
    enablePageScroll: false,
    height: 0,
    debounce: 0,
});
VirtualList.displayName = 'DoraVirtualList';

const VirtualListItem = createHostComponent('dora-virtual-list-item');
VirtualListItem.displayName = 'DoraVirtualListItem';

const InnerVirtualList = VirtualList;
InnerVirtualList.Item = VirtualListItem;

const WaterMark = createHostComponent('dora-water-mark', {
    prefixCls: 'dora-water-mark',
    content: [],
    fontColor: '',
    fontStyle: '',
    fontFamily: '',
    fontWeight: '',
    fontSize: 0,
    fullPage: false,
    gapX: 0,
    gapY: 0,
    width: 0,
    height: 0,
    image: '',
    imageHeight: 0,
    imageWidth: 0,
    rotate: 0,
    zIndex: 0,
});
WaterMark.displayName = 'DoraWaterMark';

const WhiteSpace = createHostComponent('dora-white-space', {
    prefixCls: 'dora-white-space',
    size: '',
    bodyStyle: '',
});
WhiteSpace.displayName = 'DoraWhiteSpace';

const WingBlank = createHostComponent('dora-wing-blank', {
    prefixCls: 'dora-wing-blank',
    size: '',
    bodyStyle: '',
});
WingBlank.displayName = 'DoraWingBlank';

// This file registers component props with Taro's WXML template generator.
// It is parsed by TaroNormalModulesPlugin at build time to discover
// third-party component prop names.
// dora-accordion
React.createElement('dora-accordion', {
    prefixCls: 'dora-accordion',
    defaultCurrent: [],
    current: [],
    controlled: false,
    accordion: false,
    title: '',
    label: '',
});
// dora-accordion-panel
React.createElement('dora-accordion-panel', {
    prefixCls: 'dora-accordion-panel',
    key: '',
    thumb: '',
    title: '',
    content: '',
    disabled: false,
    showArrow: false,
});
// dora-action-sheet
React.createElement('dora-action-sheet', {
    prefixCls: 'dora-action-sheet',
    theme: 'ios',
    titleText: '',
    buttons: [],
    cancelText: '',
    destructiveText: '',
    visible: false,
    onClosed: undefined,
    onClose: undefined,
    onCancel: undefined,
    onAction: undefined,
    onDestructive: undefined,
});
// dora-alert
React.createElement('dora-alert', {
    prefixCls: 'dora-alert',
    classNames: '',
    theme: '',
    thumb: '',
    title: '',
    label: '',
    closable: false,
    onClick: undefined,
});
// dora-animation-group
React.createElement('dora-animation-group', {
    in: false,
    classNames: '',
    duration: '',
    type: '',
    appear: false,
    enter: false,
    exit: false,
    mountOnEnter: false,
    unmountOnExit: false,
    wrapCls: '',
    wrapStyle: {},
    disableScroll: false,
    onChange: undefined,
    onClick: undefined,
});
// dora-avatar
React.createElement('dora-avatar', {
    prefixCls: 'dora-avatar',
    shape: 'circle',
    size: 'small',
    src: '',
    bodyStyle: '',
    scale: false,
});
// dora-backdrop
React.createElement('dora-backdrop', {
    prefixCls: 'dora-backdrop',
    transparent: false,
    zIndex: 0,
    mountOnEnter: false,
    unmountOnExit: false,
    disableScroll: false,
    visible: false,
    classNames: '',
    wrapStyle: {},
    onShow: undefined,
    onShowed: undefined,
    onClose: undefined,
    onClosed: undefined,
    onClick: undefined,
});
// dora-badge
React.createElement('dora-badge', {
    prefixCls: 'dora-badge',
    count: 0,
    overflowCount: 0,
    dot: false,
    showZero: false,
    status: '',
    text: '',
    position: '',
    backgroundColor: '',
    hideShadow: false,
    title: '',
});
// dora-barcode
React.createElement('dora-barcode', {
    prefixCls: 'dora-barcode',
    width: 0,
    height: 0,
    number: '',
    options: '',
    canvasId: '',
});
// dora-button
React.createElement('dora-button', {
    prefixCls: 'dora-button',
    color: '',
    fill: 'solid',
    expand: 'block',
    shape: 'rounded',
    size: 'small',
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
    onClick: undefined,
});
// dora-calendar
React.createElement('dora-calendar', {
    prefixCls: '',
});
// dora-card
React.createElement('dora-card', {
    prefixCls: 'dora-card',
    hoverClass: '',
    bordered: false,
    full: false,
    title: '',
    thumb: '',
    thumbStyle: '',
    extra: '',
    actions: [],
    onAction: undefined,
});
// dora-cascader
React.createElement('dora-cascader', {
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
    onTabsChange: undefined,
    onLoad: undefined,
    onChange: undefined,
    onClose: undefined,
    onConfirm: undefined,
    onCancel: undefined,
});
// dora-cascader-picker-view
React.createElement('dora-cascader-picker-view', {
    prefixCls: 'dora-picker',
    pickerPrefixCls: '',
    value: [],
    cols: 0,
    itemHeight: 0,
    itemStyle: '',
    indicatorStyle: '',
    indicatorClass: '',
    maskStyle: '',
    maskClass: '',
    labelAlign: '',
    loading: false,
    options: [],
    defaultFieldNames: '',
    onValueChange: undefined,
});
// dora-cascader-view
React.createElement('dora-cascader-view', {
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
    onTabsChange: undefined,
    onChange: undefined,
    onLoad: undefined,
});
// dora-checkbox
React.createElement('dora-checkbox', {
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
    wrapStyle: '',
    hasLine: true,
    onChange: undefined,
});
// dora-checkbox-group
React.createElement('dora-checkbox-group', {
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
    bodyStyle: '',
    hasLine: true,
    withListComponent: true,
    iconPosition: 'left',
    iconSize: '',
    iconOn: '',
    iconOff: '',
    onChange: undefined,
});
// dora-circle
React.createElement('dora-circle', {
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
    onChange: undefined,
});
// dora-date-picker
React.createElement('dora-date-picker', {
    prefixCls: 'dora-date-picker',
    multiPickerPrefixCls: '',
    pickerPrefixCls: '',
    toolbar: '',
    defaultVisible: false,
    visible: false,
    controlled: false,
    disabled: false,
    value: '',
    itemHeight: 0,
    itemStyle: '',
    indicatorStyle: '',
    indicatorClass: '',
    maskStyle: '',
    maskClass: '',
    labelAlign: 'left',
    mode: '',
    minuteStep: 0,
    use12Hours: false,
    minDate: '',
    maxDate: '',
    minHour: 0,
    maxHour: 0,
    minMinute: 0,
    maxMinute: 0,
    lang: '',
    tillNow: false,
    onVisibleChange: undefined,
    onChange: undefined,
    onConfirm: undefined,
    onCancel: undefined,
    onValueChange: undefined,
});
// dora-date-picker-view
React.createElement('dora-date-picker-view', {
    prefixCls: 'dora-date-picker',
    multiPickerPrefixCls: 'dora-picker',
    pickerPrefixCls: 'dora-picker-view',
    value: null,
    itemHeight: 34,
    itemStyle: '',
    indicatorStyle: '',
    indicatorClass: '',
    maskStyle: '',
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
    onValueChange: undefined,
});
// dora-dialog
React.createElement('dora-dialog', {
    prefixCls: 'dora-dialog',
    bodyStyle: {},
    mask: false,
    maskClosable: false,
    visible: false,
    zIndex: 0,
    closable: false,
    buttonClosable: false,
    verticalButtons: false,
    image: '',
    title: '',
    content: '',
    buttons: [],
    onClose: undefined,
    onClosed: undefined,
    onAction: undefined,
});
// dora-divider
React.createElement('dora-divider', {
    prefixCls: 'dora-divider',
    position: 'center',
    dashed: false,
    text: '',
    showText: true,
    direction: 'horizontal',
});
// dora-e-sign
React.createElement('dora-e-sign', {
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
    onStart: undefined,
    onSigning: undefined,
    onEnd: undefined,
    onClear: undefined,
    onSubmit: undefined,
});
// dora-ellipsis
React.createElement('dora-ellipsis', {
    prefixCls: 'dora-ellipsis',
    content: '',
    direction: 'end',
    defaultExpanded: false,
    expandText: '',
    collapseText: '',
    rows: 1,
    onClick: undefined,
});
// dora-fab-button
React.createElement('dora-fab-button', {
    prefixCls: 'dora-fab-button',
    hoverClass: 'default',
    theme: 'balanced',
    position: 'bottomRight',
    action: '',
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
    onChange: undefined,
    onClick: undefined,
});
// dora-field
React.createElement('dora-field', {
    prefixCls: 'dora-field',
    label: '',
    labelWrap: false,
    extra: '',
    help: '',
    childElementPosition: '',
    isLink: false,
    align: '',
    disabled: false,
    readOnly: false,
    hidden: false,
    required: false,
    feedbackMessage: [],
    hasFeedback: false,
    index: 0,
    isLast: false,
});
// dora-filterbar
React.createElement('dora-filterbar', {
    prefixCls: 'dora-filterbar',
    disabled: false,
    hoverClass: '',
    wrapStyle: {},
    onClick: undefined,
});
// dora-floating-panel
React.createElement('dora-floating-panel', {
    prefixCls: 'dora-floating-panel',
    disabled: false,
    hoverClass: '',
    wrapStyle: {},
    onClick: undefined,
});
// dora-footer
React.createElement('dora-footer', {
    prefixCls: 'dora-footer',
    disabled: false,
    hoverClass: '',
    wrapStyle: {},
    onClick: undefined,
});
// dora-form
React.createElement('dora-form', {
    prefixCls: 'dora-form',
    disabled: false,
    hoverClass: '',
    wrapStyle: {},
    onClick: undefined,
});
// dora-gallery
React.createElement('dora-gallery', {
    prefixCls: 'dora-gallery',
    disabled: false,
    hoverClass: '',
    wrapStyle: {},
    onClick: undefined,
});
// dora-grid
React.createElement('dora-grid', {
    prefixCls: 'dora-grid',
    disabled: false,
    hoverClass: '',
    wrapStyle: {},
    onClick: undefined,
});
// dora-icon
React.createElement('dora-icon', {
    prefixCls: 'doraicons',
    hidden: false,
    type: '',
    size: '',
    color: '',
    onClick: undefined,
});
// dora-image
React.createElement('dora-image', {
    prefixCls: 'dora-image',
    disabled: false,
    hoverClass: '',
    wrapStyle: {},
    onClick: undefined,
});
// dora-index
React.createElement('dora-index', {
    prefixCls: 'dora-index',
    height: 300,
    showIndicator: true,
    indicatorPosition: 'center',
    parentOffsetTop: 0,
    onChange: undefined,
});
// dora-index-item
React.createElement('dora-index-item', {
    prefixCls: 'dora-index-item',
    name: '',
});
// dora-input
React.createElement('dora-input', {
    prefixCls: 'dora-input',
    type: 'text',
    password: false,
    placeholder: '',
    placeholderStyle: '',
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
    onChange: undefined,
    onFocus: undefined,
    onBlur: undefined,
    onConfirm: undefined,
    onKeyboardheightchange: undefined,
    onNicknamereview: undefined,
    onClear: undefined,
    onError: undefined,
});
// dora-input-number
React.createElement('dora-input-number', {
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
    onChange: undefined,
    onFocus: undefined,
    onBlur: undefined,
});
// dora-keyboard
React.createElement('dora-keyboard', {
    prefixCls: 'dora-keyboard',
});
// dora-landscape
React.createElement('dora-landscape', {
    prefixCls: 'dora-landscape',
    visible: false,
    mask: false,
    maskClosable: false,
    closable: false,
    onClose: undefined,
});
// dora-row
React.createElement('dora-row', {
    prefixCls: 'dora-row',
    gutter: 0,
});
// dora-list
React.createElement('dora-list', {
    prefixCls: 'dora-list',
    title: '',
    label: '',
    mode: 'default',
    hasLine: false,
    wrapStyle: {},
    bodyStyle: {},
});
// dora-list-item
React.createElement('dora-list-item', {
    prefixCls: 'dora-list-item',
    thumb: '',
    title: '',
    label: '',
    extra: '',
    hasLine: false,
    isLink: false,
    align: 'flex-start',
    wrapStyle: {},
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
    onClick: undefined,
});
// dora-loading
React.createElement('dora-loading', {
    prefixCls: 'dora-loading',
});
// dora-media
React.createElement('dora-media', {
    prefixCls: 'dora-media',
    thumb: '',
    thumbStyle: '',
    title: '',
    label: '',
    align: '',
});
// dora-navbar
React.createElement('dora-navbar', {
    prefixCls: 'dora-navbar',
    theme: '',
    title: '',
    leftText: '',
    rightText: '',
    onClick: undefined,
});
// dora-notice-bar
React.createElement('dora-notice-bar', {
    prefixCls: 'dora-notice-bar',
    icon: '',
    content: '',
    mode: '',
    action: '',
    loop: false,
    leading: 0,
    trailing: 0,
    speed: 0,
    onClick: undefined,
});
// dora-notification
React.createElement('dora-notification', {
    prefixCls: 'dora-notification',
    disabled: false,
    hoverClass: '',
    wrapStyle: {},
    onClick: undefined,
});
// dora-pagination
React.createElement('dora-pagination', {
    prefixCls: 'dora-pagination',
    mode: '',
    defaultCurrent: 0,
    current: 0,
    controlled: false,
    total: 0,
    simple: false,
});
// dora-picker
React.createElement('dora-picker', {
    prefixCls: 'dora-popup-picker',
    multiPickerPrefixCls: '',
    pickerPrefixCls: '',
    toolbar: '',
    defaultVisible: false,
    visible: false,
    controlled: false,
    disabled: false,
    cascade: false,
    cols: 0,
    value: [],
    options: [],
    loading: false,
    itemHeight: 0,
    itemStyle: '',
    indicatorStyle: '',
    indicatorClass: '',
    maskStyle: '',
    maskClass: '',
    labelAlign: '',
    defaultFieldNames: '',
    onVisibleChange: undefined,
    onChange: undefined,
    onConfirm: undefined,
    onCancel: undefined,
    onValueChange: undefined,
});
// dora-picker-view
React.createElement('dora-picker-view', {
    prefixCls: 'dora-picker-view',
    defaultValue: '',
    value: '',
    controlled: false,
    itemHeight: 34,
    itemStyle: '',
    indicatorStyle: '',
    indicatorClass: '',
    maskStyle: '',
    maskClass: '',
    labelAlign: 'center',
    loading: false,
    options: [],
    defaultFieldNames: '',
    onValueChange: undefined,
    onBeforeChange: undefined,
});
// dora-popover
React.createElement('dora-popover', {
    prefixCls: 'dora-popover',
    disabled: false,
    hoverClass: '',
    wrapStyle: {},
    onClick: undefined,
});
// dora-popup
React.createElement('dora-popup', {
    prefixCls: 'dora-popup',
    animationPrefixCls: '',
    position: '',
    wrapStyle: {},
    bodyStyle: {},
    mask: false,
    maskClosable: false,
    maskTransparent: false,
    maskStyle: {},
    visible: false,
    closeOnSwipe: false,
    zIndex: 0,
    mountOnEnter: false,
    unmountOnExit: false,
    closable: false,
    safeArea: '',
    onShow: undefined,
    onShowed: undefined,
    onClose: undefined,
    onClosed: undefined,
});
// dora-popup-select
React.createElement('dora-popup-select', {
    prefixCls: 'dora-popup-select',
    classNames: '',
    virtualized: false,
    notFoundContent: '',
    value: [],
    options: [],
    iconPosition: '',
    multiple: false,
    max: 0,
    toolbar: '',
    visible: false,
    defaultVisible: false,
    controlled: false,
    onChange: undefined,
    onClosed: undefined,
    onCancel: undefined,
    onValueChange: undefined,
    onConfirm: undefined,
});
// dora-progress
React.createElement('dora-progress', {
    prefixCls: 'dora-progress',
    percent: 0,
    strokeWidth: 0,
    activeColor: '',
    backgroundColor: '',
    status: '',
    shape: '',
    barStyle: '',
    showInfo: false,
});
// dora-prompt
React.createElement('dora-prompt', {
    prefixCls: 'dora-prompt',
    disabled: false,
    hoverClass: '',
    wrapStyle: {},
    onClick: undefined,
});
// dora-qrcode
React.createElement('dora-qrcode', {
    prefixCls: 'dora-qrcode',
    typeNumber: 0,
    errorCorrectLevel: 0,
    width: 0,
    height: 0,
    whiteSpace: 0,
    fgColor: '',
    bgColor: '',
    data: '',
    showMenuByLongpress: false,
    qrcodeStatus: '',
    qrcodeExpiredText: '',
    qrcodeRefreshText: '',
    onLoad: undefined,
    onError: undefined,
    onClick: undefined,
    onRefresh: undefined,
});
// dora-radio
React.createElement('dora-radio', {
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
    wrapStyle: '',
    hasLine: true,
});
// dora-radio-group
React.createElement('dora-radio-group', {
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
    bodyStyle: '',
    hasLine: true,
    withListComponent: true,
    iconPosition: 'right',
    iconSize: '',
    iconOn: '',
    iconOff: '',
    onChange: undefined,
});
// dora-rater
React.createElement('dora-rater', {
    prefixCls: 'dora-rater',
    max: 0,
    icon: '',
    star: '',
    defaultValue: 0,
    value: 0,
    activeColor: '',
    margin: 0,
    fontSize: 0,
    disabled: false,
    allowHalf: false,
    allowClear: false,
    allowTouchMove: false,
    controlled: false,
    onChange: undefined,
});
// dora-refresher
React.createElement('dora-refresher', {
    prefixCls: 'dora-refresher',
    pullingIcon: '',
    pullingText: '',
    refreshingIcon: '',
    refreshingText: '',
    disablePullingRotation: false,
    distance: 0,
    prefixLCls: '',
    isShowLoadingText: false,
    loadingText: '',
    loadNoDataText: '',
    scrollTop: 0,
    onPulling: undefined,
    onRefresh: undefined,
    onLoadmore: undefined,
});
// dora-result
React.createElement('dora-result', {
    prefixCls: 'dora-result',
    icon: '',
    title: '',
    label: '',
    buttons: [],
    extra: '',
    fixed: false,
    onClick: undefined,
});
// dora-safe-area
React.createElement('dora-safe-area', {
    prefixCls: 'dora-safe-area',
    safeArea: '',
    safeAreaStyle: '',
    forceRender: false,
    supports: false,
    wrapStyle: {},
});
// dora-search-bar
React.createElement('dora-search-bar', {
    prefixCls: 'dora-search-bar',
    defaultValue: '',
    value: '',
    placeholder: '',
    placeholderStyle: '',
    placeholderClass: '',
    disabled: false,
    maxlength: 0,
    cursorSpacing: 0,
    focus: false,
    confirmType: '',
    confirmHold: false,
    cursor: 0,
    selectionStart: 0,
    selectionEnd: 0,
    adjustPosition: false,
    clear: false,
    cancelText: '',
    showCancel: false,
    controlled: false,
    onlyShowClearWhenFocus: false,
    onChange: undefined,
    onFocus: undefined,
    onBlur: undefined,
    onConfirm: undefined,
    onClear: undefined,
    onCancel: undefined,
});
// dora-segmented-control
React.createElement('dora-segmented-control', {
    prefixCls: 'dora-segmented-control',
    theme: '',
    defaultCurrent: 0,
    current: 0,
    values: [],
    disabled: false,
    controlled: false,
    onChange: undefined,
});
// dora-select
React.createElement('dora-select', {
    prefixCls: 'dora-select',
    value: [],
    options: [],
    multiple: false,
    max: 0,
    notFoundContent: '',
    virtualized: false,
    toolbar: '',
});
// dora-selectable
React.createElement('dora-selectable', {
    prefixCls: 'dora-selectable',
    type: 'checkbox',
    value: '',
    defaultChecked: false,
    checked: false,
    disabled: false,
    readOnly: false,
    color: 'balanced',
    controlled: false,
    wrapStyle: '',
    iconSize: '',
    iconOn: '',
    iconOff: '',
    onChange: undefined,
});
// dora-selector-group
React.createElement('dora-selector-group', {
    prefixCls: 'dora-selector-group',
    theme: '',
    shape: '',
    columns: 0,
    gap: 0,
    options: [],
    defaultValue: [],
    value: [],
    controlled: false,
    multiple: false,
    showCheckMark: false,
    defaultFieldNames: '',
    onChange: undefined,
});
// dora-skeleton
React.createElement('dora-skeleton', {
    prefixCls: 'dora-skeleton',
    active: false,
});
// dora-skeleton-avatar
React.createElement('dora-skeleton-avatar', {
    prefixCls: 'dora-skeleton-avatar',
    size: '',
    shape: '',
    active: false,
});
// dora-skeleton-paragraph
React.createElement('dora-skeleton-paragraph', {
    prefixCls: 'dora-skeleton-paragraph',
    rows: 0,
    rounded: false,
    active: false,
});
// dora-slider
React.createElement('dora-slider', {
    prefixCls: 'dora-slider',
    min: 0,
    max: 0,
    step: 0,
    defaultValue: [],
    value: [],
    controlled: false,
    disabled: false,
    showMark: false,
    showValue: '',
    tipFormatter: '',
    markStyle: '',
    handleStyle: '',
    trackStyle: '',
    railStyle: '',
    wrapStyle: '',
    onChange: undefined,
    onAfterChange: undefined,
});
// dora-spin
React.createElement('dora-spin', {
    prefixCls: 'dora-spin',
    classNames: '',
    tip: '',
    size: '',
    spinning: false,
    nested: false,
    spinColor: '',
});
// dora-steps
React.createElement('dora-steps', {
    prefixCls: 'dora-steps',
    current: 0,
    direction: 'horizontal',
});
// dora-step
React.createElement('dora-step', {
    prefixCls: 'dora-step',
    status: '',
    title: '',
    content: '',
    icon: '',
});
// dora-sticky
React.createElement('dora-sticky', {
    prefixCls: 'dora-sticky',
    disabled: false,
    hoverClass: '',
    wrapStyle: {},
    onClick: undefined,
});
// dora-swipe-action
React.createElement('dora-swipe-action', {
    prefixCls: 'dora-swipe',
    autoClose: false,
    disabled: false,
    left: [],
    right: [],
    useSlots: false,
    data: '',
    onClick: undefined,
    onOpen: undefined,
    onClose: undefined,
});
// dora-switch
React.createElement('dora-switch', {
    prefixCls: 'dora-switch',
    value: false,
    disabled: false,
    loading: false,
    color: '',
    checkedText: '',
    uncheckedText: '',
    onChange: undefined,
});
// dora-tabbar
React.createElement('dora-tabbar', {
    prefixCls: 'dora-tabbar',
    defaultCurrent: '',
    current: '',
    controlled: false,
    theme: '',
    backgroundColor: '',
    position: '',
    safeArea: '',
    onChange: undefined,
});
// dora-tabbar-item
React.createElement('dora-tabbar-item', {
    prefixCls: 'dora-tabbar-item',
    tabKey: '',
    title: '',
    disabled: false,
    onClick: undefined,
});
// dora-tabs
React.createElement('dora-tabs', {
    prefixCls: 'dora-tabs',
    defaultCurrent: '',
    current: '',
    scroll: false,
    controlled: false,
    theme: 'balanced',
    direction: 'horizontal',
    justify: 'space-around',
    activeLineMode: 'auto',
    onChange: undefined,
});
// dora-tab
React.createElement('dora-tab', {
    prefixCls: 'dora-tabs__tab',
    key: '',
    title: '',
    disabled: false,
    onClick: undefined,
});
// dora-tag
React.createElement('dora-tag', {
    prefixCls: 'dora-tag',
    hoverClass: '',
    color: '',
    closable: false,
    defaultVisible: false,
    visible: false,
    controlled: false,
    onChange: undefined,
    onClick: undefined,
    onClose: undefined,
});
// dora-textarea
React.createElement('dora-textarea', {
    prefixCls: 'dora-textarea',
    label: '',
    extra: '',
    defaultValue: '',
    value: '',
    controlled: false,
    disabled: false,
    readOnly: false,
    rows: 0,
    hasCount: false,
    clear: false,
    error: false,
    placeholderStyle: '',
    onChange: undefined,
    onFocus: undefined,
    onBlur: undefined,
    onConfirm: undefined,
    onKeyboardheightchange: undefined,
    onClear: undefined,
    onError: undefined,
    onLinechange: undefined,
});
// dora-timeago
React.createElement('dora-timeago', {
    prefixCls: 'dora-timeago',
    to: '',
    from: '',
    refreshable: false,
    lang: '',
});
// dora-timeline
React.createElement('dora-timeline', {
    prefixCls: 'dora-timeline',
    pending: false,
    position: '',
});
// dora-timeline-item
React.createElement('dora-timeline-item', {
    prefixCls: 'dora-timeline-item',
    content: '',
    dotStyle: '',
    custom: false,
});
// dora-toast
React.createElement('dora-toast', {
    prefixCls: 'dora-toast',
    image: '',
    icon: '',
    iconColor: '',
    text: '',
    position: '',
    mask: false,
    maskClosable: false,
    visible: false,
    zIndex: 0,
    onClose: undefined,
    onClosed: undefined,
});
// dora-toptips
React.createElement('dora-toptips', {
    prefixCls: 'dora-toptips',
    classNames: '',
    icon: '',
    hidden: false,
    text: '',
    duration: 0,
});
// dora-touch-view
React.createElement('dora-touch-view', {
    prefixCls: 'dora-touch-view',
    hoverClass: '',
    hoverStopPropagation: false,
    hoverStartTime: 0,
    hoverStayTime: 0,
    wrapStyle: '',
    onClick: undefined,
});
// dora-upload
React.createElement('dora-upload', {
    prefixCls: 'dora-upload',
    max: 0,
    count: 0,
    defaultFileType: '',
    compressed: false,
    maxDuration: 0,
    camera: '',
    sizeType: [],
    sourceType: [],
    url: '',
    name: '',
    header: {},
    formData: {},
    uploaded: false,
    disabled: false,
    progress: false,
    listType: '',
    defaultFileList: [],
    fileList: [],
    controlled: false,
    showUploadList: false,
    showRemoveIcon: false,
    onBefore: undefined,
    onChange: undefined,
    onSuccess: undefined,
    onFail: undefined,
    onProgress: undefined,
    onComplete: undefined,
    onPreview: undefined,
    onRemove: undefined,
});
// dora-vcode
React.createElement('dora-vcode', {
    prefixCls: 'dora-vcode',
    str: '',
    num: 0,
    width: 0,
    height: 0,
    bgColor: '',
    fontColor: '',
    hasPoint: false,
    hasLine: false,
    canvasId: '',
    onChange: undefined,
    onError: undefined,
});
// dora-virtual-list
React.createElement('dora-virtual-list', {
    prefixCls: 'dora-virtual-list',
    itemHeight: 0,
    itemBuffer: 0,
    scrollToIndex: 0,
    upperThreshold: 0,
    lowerThreshold: 0,
    scrollWithAnimation: false,
    enableBackToTop: false,
    disableScroll: false,
    enablePageScroll: false,
    height: 0,
    debounce: 0,
    onChange: undefined,
    onScroll: undefined,
    onScrolltoupper: undefined,
    onScrolltolower: undefined,
});
// dora-water-mark
React.createElement('dora-water-mark', {
    prefixCls: 'dora-water-mark',
    content: [],
    fontColor: '',
    fontStyle: '',
    fontFamily: '',
    fontWeight: '',
    fontSize: 0,
    fullPage: false,
    gapX: 0,
    gapY: 0,
    width: 0,
    height: 0,
    image: '',
    imageHeight: 0,
    imageWidth: 0,
    rotate: 0,
    zIndex: 0,
    onLoad: undefined,
    onError: undefined,
});
// dora-white-space
React.createElement('dora-white-space', {
    prefixCls: 'dora-white-space',
    size: '',
    bodyStyle: '',
    onClick: undefined,
});
// dora-wing-blank
React.createElement('dora-wing-blank', {
    prefixCls: 'dora-wing-blank',
    size: '',
    bodyStyle: '',
});
// End of props registry

export { InnerAccordion as Accordion, AccordionPanel, ActionSheet, Alert, AnimationGroup, Avatar, Backdrop, Badge, Barcode, Button, Calendar, Card, Cascader, CascaderPickerView, CascaderView, InnerCheckbox as Checkbox, CheckboxGroup, Circle, Col, Countdown, Countup, DatePicker, DatePickerView, Dialog, Divider, ESign, Ellipsis, FabButton, Field, Filterbar, FloatingPanel, Footer, Form, Gallery, Grid, Icon, Image, InnerIndex as Index, IndexItem, Input, InputNumber, Keyboard, Landscape, InnerList as List, ListItem, Loading, Media, MultiPickerView, Navbar, NoticeBar, Notification, Pagination, Picker, PickerView, Popover, Popup, PopupSelect, Progress, Prompt, Qrcode, InnerRadio as Radio, RadioGroup, Rater, Refresher, Result, InnerRow as Row, SafeArea, SearchBar, SegmentedControl, Select, Selectable, SelectorGroup, InnerSkeleton as Skeleton, SkeletonAvatar, SkeletonParagraph, Slider, Spin, Step, InnerSteps as Steps, Sticky, SwipeAction, Switch, Tab, InnerTabbar as Tabbar, TabbarItem, InnerTabs as Tabs, Tag, Textarea, Timeago, InnerTimeline as Timeline, TimelineItem, Toast, Toptips, TouchView, Upload, Vcode, InnerVirtualList as VirtualList, VirtualListItem, WaterMark, WhiteSpace, WingBlank };
