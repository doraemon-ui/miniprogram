// This file registers component props with Taro's WXML template generator.
// It is parsed by TaroNormalModulesPlugin at build time to discover
// third-party component prop names.
import React from 'react'

// dora-accordion
React.createElement('dora-accordion', {
  prefixCls: 'dora-accordion',
  defaultCurrent: [],
  current: [],
  controlled: false,
  accordion: false,
  title: '',
  label: '',
})

// dora-accordion-panel
React.createElement('dora-accordion-panel', {
  prefixCls: 'dora-accordion-panel',
  key: '',
  thumb: '',
  title: '',
  content: '',
  disabled: false,
  showArrow: true,
})

// dora-action-sheet
React.createElement('dora-action-sheet', {
  prefixCls: 'dora-action-sheet',
  theme: 'ios',
  titleText: '',
  buttons: [],
  cancelText: '取消',
  destructiveText: '',
  visible: false,
  onClosed: undefined,
  onClose: undefined,
  onCancel: undefined,
  onAction: undefined,
  onDestructive: undefined,
})

// dora-alert
React.createElement('dora-alert', {
  prefixCls: 'dora-alert',
  classNames: 'dora-animate--fadeIn',
  theme: 'balanced',
  thumb: '',
  title: '',
  label: '',
  closable: false,
  onClick: undefined,
})

// dora-animation-group
React.createElement('dora-animation-group', {
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
  onChange: undefined,
  onClick: undefined,
})

// dora-avatar
React.createElement('dora-avatar', {
  prefixCls: 'dora-avatar',
  shape: 'circle',
  size: 'default',
  src: '',
  bodyStyle: null,
  scale: false,
})

// dora-backdrop
React.createElement('dora-backdrop', {
  prefixCls: 'dora-backdrop',
  transparent: false,
  zIndex: null,
  mountOnEnter: true,
  unmountOnExit: true,
  disableScroll: true,
  visible: false,
  classNames: 'dora-animate--fadeIn',
  wrapStyle: null,
  onShow: undefined,
  onShowed: undefined,
  onClose: undefined,
  onClosed: undefined,
  onClick: undefined,
})

// dora-badge
React.createElement('dora-badge', {
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
})

// dora-barcode
React.createElement('dora-barcode', {
  prefixCls: 'dora-barcode',
  width: 200,
  height: 100,
  number: '',
  options: { number: true, prefix: true, color: 'black', debug: false },
  canvasId: 'dora-barcode',
})

// dora-button
React.createElement('dora-button', {
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
  onClick: undefined,
})

// dora-calendar
React.createElement('dora-calendar', {
  prefixCls: 'dora-calendar',
})

// dora-card
React.createElement('dora-card', {
  prefixCls: 'dora-card',
  hoverClass: 'none',
  bordered: true,
  full: false,
  title: '',
  thumb: '',
  thumbStyle: null,
  extra: '',
  actions: [],
  onAction: undefined,
})

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
})

// dora-cascader-picker-view
React.createElement('dora-cascader-picker-view', {
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
  onValueChange: undefined,
})

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
})

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
  wrapStyle: null,
  hasLine: true,
  onChange: undefined,
})

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
  bodyStyle: null,
  hasLine: true,
  withListComponent: true,
  iconPosition: 'left',
  iconSize: '',
  iconOn: '',
  iconOff: '',
  onChange: undefined,
})

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
})

// dora-date-picker
React.createElement('dora-date-picker', {
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
  onVisibleChange: undefined,
  onChange: undefined,
  onConfirm: undefined,
  onCancel: undefined,
  onValueChange: undefined,
})

// dora-date-picker-view
React.createElement('dora-date-picker-view', {
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
  onValueChange: undefined,
})

// dora-dialog
React.createElement('dora-dialog', {
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
  onClose: undefined,
  onClosed: undefined,
  onAction: undefined,
})

// dora-divider
React.createElement('dora-divider', {
  prefixCls: 'dora-divider',
  position: 'center',
  dashed: false,
  text: '',
  showText: true,
  direction: 'horizontal',
})

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
})

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
})

// dora-fab-button
React.createElement('dora-fab-button', {
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
  onChange: undefined,
  onClick: undefined,
})

// dora-field
React.createElement('dora-field', {
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
})

// dora-filterbar
React.createElement('dora-filterbar', {
  prefixCls: 'dora-filterbar',
  disabled: false,
  hoverClass: 'default',
  wrapStyle: null,
  onClick: undefined,
})

// dora-floating-panel
React.createElement('dora-floating-panel', {
  prefixCls: 'dora-floating-panel',
  disabled: false,
  hoverClass: 'default',
  wrapStyle: null,
  onClick: undefined,
})

// dora-footer
React.createElement('dora-footer', {
  prefixCls: 'dora-footer',
  disabled: false,
  hoverClass: 'default',
  wrapStyle: null,
  onClick: undefined,
})

// dora-form
React.createElement('dora-form', {
  prefixCls: 'dora-form',
  disabled: false,
  hoverClass: 'default',
  wrapStyle: null,
  onClick: undefined,
})

// dora-gallery
React.createElement('dora-gallery', {
  prefixCls: 'dora-gallery',
  disabled: false,
  hoverClass: 'default',
  wrapStyle: null,
  onClick: undefined,
})

// dora-grid
React.createElement('dora-grid', {
  prefixCls: 'dora-grid',
  disabled: false,
  hoverClass: 'default',
  wrapStyle: null,
  onClick: undefined,
})

// dora-icon
React.createElement('dora-icon', {
  prefixCls: 'doraicons',
  hidden: false,
  type: '',
  size: 32,
  color: '',
  onClick: undefined,
})

// dora-image
React.createElement('dora-image', {
  prefixCls: 'dora-image',
  disabled: false,
  hoverClass: 'default',
  wrapStyle: null,
  onClick: undefined,
})

// dora-index
React.createElement('dora-index', {
  prefixCls: 'dora-index',
  height: 300,
  showIndicator: true,
  indicatorPosition: 'center',
  parentOffsetTop: 0,
  onChange: undefined,
})

// dora-index-item
React.createElement('dora-index-item', {
  prefixCls: 'dora-index-item',
  name: '',
})

// dora-input
React.createElement('dora-input', {
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
  onChange: undefined,
  onFocus: undefined,
  onBlur: undefined,
  onConfirm: undefined,
  onKeyboardheightchange: undefined,
  onNicknamereview: undefined,
  onClear: undefined,
  onError: undefined,
})

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
})

// dora-keyboard
React.createElement('dora-keyboard', {
  prefixCls: 'dora-keyboard',
})

// dora-landscape
React.createElement('dora-landscape', {
  prefixCls: 'dora-landscape',
  visible: false,
  mask: true,
  maskClosable: false,
  closable: true,
  onClose: undefined,
})

// dora-row
React.createElement('dora-row', {
  prefixCls: 'dora-row',
  gutter: 0,
})

// dora-list
React.createElement('dora-list', {
  prefixCls: 'dora-list',
  title: '',
  label: '',
  mode: 'default',
  hasLine: true,
  wrapStyle: null,
  bodyStyle: null,
})

// dora-list-item
React.createElement('dora-list-item', {
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
  onClick: undefined,
})

// dora-loading
React.createElement('dora-loading', {
  prefixCls: 'dora-loading',
})

// dora-media
React.createElement('dora-media', {
  prefixCls: 'dora-media',
  thumb: '',
  thumbStyle: null,
  title: '',
  label: '',
  align: 'center',
})

// dora-navbar
React.createElement('dora-navbar', {
  prefixCls: 'dora-navbar',
  theme: 'light',
  title: '',
  leftText: '',
  rightText: '',
  onClick: undefined,
})

// dora-notice-bar
React.createElement('dora-notice-bar', {
  prefixCls: 'dora-notice-bar',
  icon: 'data:image/gif;base64,R0lGODlhAQABAAAAACw=',
  content: '',
  mode: '',
  action: 'data:image/gif;base64,R0lGODlhAQABAAAAACw=',
  loop: false,
  leading: 500,
  trailing: 800,
  speed: 25,
  onClick: undefined,
})

// dora-notification
React.createElement('dora-notification', {
  prefixCls: 'dora-notification',
  disabled: false,
  hoverClass: 'default',
  wrapStyle: null,
  onClick: undefined,
})

// dora-pagination
React.createElement('dora-pagination', {
  prefixCls: 'dora-pagination',
  mode: 'button',
  defaultCurrent: 1,
  current: 1,
  controlled: false,
  total: 0,
  simple: false,
})

// dora-picker
React.createElement('dora-picker', {
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
  onVisibleChange: undefined,
  onChange: undefined,
  onConfirm: undefined,
  onCancel: undefined,
  onValueChange: undefined,
})

// dora-picker-view
React.createElement('dora-picker-view', {
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
  onValueChange: undefined,
  onBeforeChange: undefined,
})

// dora-popover
React.createElement('dora-popover', {
  prefixCls: 'dora-popover',
  disabled: false,
  hoverClass: 'default',
  wrapStyle: null,
  onClick: undefined,
})

// dora-popup
React.createElement('dora-popup', {
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
  onShow: undefined,
  onShowed: undefined,
  onClose: undefined,
  onClosed: undefined,
})

// dora-popup-select
React.createElement('dora-popup-select', {
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
  onChange: undefined,
  onClosed: undefined,
  onCancel: undefined,
  onValueChange: undefined,
  onConfirm: undefined,
})

// dora-progress
React.createElement('dora-progress', {
  prefixCls: 'dora-progress',
  percent: 0,
  strokeWidth: 10,
  activeColor: '',
  backgroundColor: '#f3f3f3',
  status: 'normal',
  shape: 'round',
  barStyle: null,
  showInfo: false,
})

// dora-prompt
React.createElement('dora-prompt', {
  prefixCls: 'dora-prompt',
  disabled: false,
  hoverClass: 'default',
  wrapStyle: null,
  onClick: undefined,
})

// dora-qrcode
React.createElement('dora-qrcode', {
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
  onLoad: undefined,
  onError: undefined,
  onClick: undefined,
  onRefresh: undefined,
})

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
  wrapStyle: null,
  hasLine: true,
})

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
  bodyStyle: null,
  hasLine: true,
  withListComponent: true,
  iconPosition: 'right',
  iconSize: '',
  iconOn: '',
  iconOff: '',
  onChange: undefined,
})

// dora-rater
React.createElement('dora-rater', {
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
  onChange: undefined,
})

// dora-refresher
React.createElement('dora-refresher', {
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
  onPulling: undefined,
  onRefresh: undefined,
  onLoadmore: undefined,
})

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
})

// dora-safe-area
React.createElement('dora-safe-area', {
  prefixCls: 'dora-safe-area',
  safeArea: { top: false, bottom: false },
  safeAreaStyle: 'default',
  forceRender: false,
  supports: false,
  wrapStyle: null,
})

// dora-search-bar
React.createElement('dora-search-bar', {
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
  onChange: undefined,
  onFocus: undefined,
  onBlur: undefined,
  onConfirm: undefined,
  onClear: undefined,
  onCancel: undefined,
})

// dora-segmented-control
React.createElement('dora-segmented-control', {
  prefixCls: 'dora-segmented-control',
  theme: 'balanced',
  defaultCurrent: 0,
  current: 0,
  values: [],
  disabled: false,
  controlled: false,
  onChange: undefined,
})

// dora-select
React.createElement('dora-select', {
  prefixCls: 'dora-select',
  value: '',
  options: [],
  multiple: false,
  max: -1,
  notFoundContent: { icon: '', title: '', text: '暂无数据' },
  virtualized: false,
  toolbar: { title: '请选择', cancelText: '取消', confirmText: '确定' },
})

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
  wrapStyle: null,
  iconSize: '',
  iconOn: '',
  iconOff: '',
  onChange: undefined,
})

// dora-selector-group
React.createElement('dora-selector-group', {
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
  onChange: undefined,
})

// dora-skeleton
React.createElement('dora-skeleton', {
  prefixCls: 'dora-skeleton',
  active: false,
})

// dora-skeleton-avatar
React.createElement('dora-skeleton-avatar', {
  prefixCls: 'dora-skeleton-avatar',
  size: 'default',
  shape: 'circle',
  active: false,
})

// dora-skeleton-paragraph
React.createElement('dora-skeleton-paragraph', {
  prefixCls: 'dora-skeleton-paragraph',
  rows: 3,
  rounded: false,
  active: false,
})

// dora-slider
React.createElement('dora-slider', {
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
  onChange: undefined,
  onAfterChange: undefined,
})

// dora-spin
React.createElement('dora-spin', {
  prefixCls: 'dora-spin',
  classNames: 'dora-animate--fadeIn',
  tip: '',
  size: 'default',
  spinning: true,
  nested: false,
  spinColor: 'default',
})

// dora-steps
React.createElement('dora-steps', {
  prefixCls: 'dora-steps',
  current: 0,
  direction: 'horizontal',
})

// dora-step
React.createElement('dora-step', {
  prefixCls: 'dora-step',
  status: '',
  title: '',
  content: '',
  icon: '',
})

// dora-sticky
React.createElement('dora-sticky', {
  prefixCls: 'dora-sticky',
  disabled: false,
  hoverClass: 'default',
  wrapStyle: null,
  onClick: undefined,
})

// dora-swipe-action
React.createElement('dora-swipe-action', {
  prefixCls: 'dora-swipe',
  autoClose: false,
  disabled: false,
  left: [],
  right: [],
  useSlots: false,
  data: null,
  onClick: undefined,
  onOpen: undefined,
  onClose: undefined,
})

// dora-switch
React.createElement('dora-switch', {
  prefixCls: 'dora-switch',
  value: false,
  disabled: false,
  loading: false,
  color: 'balanced',
  checkedText: '',
  uncheckedText: '',
  onChange: undefined,
})

// dora-tabbar
React.createElement('dora-tabbar', {
  prefixCls: 'dora-tabbar',
  defaultCurrent: '',
  current: '',
  controlled: false,
  theme: 'balanced',
  backgroundColor: '#fff',
  position: '',
  safeArea: false,
  onChange: undefined,
})

// dora-tabbar-item
React.createElement('dora-tabbar-item', {
  prefixCls: 'dora-tabbar-item',
  tabKey: '',
  title: '',
  disabled: false,
  onClick: undefined,
})

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
})

// dora-tab
React.createElement('dora-tab', {
  prefixCls: 'dora-tabs__tab',
  key: '',
  title: '',
  disabled: false,
  onClick: undefined,
})

// dora-tag
React.createElement('dora-tag', {
  prefixCls: 'dora-tag',
  hoverClass: 'default',
  color: '',
  closable: false,
  defaultVisible: true,
  visible: true,
  controlled: false,
  onChange: undefined,
  onClick: undefined,
  onClose: undefined,
})

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
  rows: 1,
  hasCount: false,
  clear: false,
  error: false,
  placeholderStyle: null,
  onChange: undefined,
  onFocus: undefined,
  onBlur: undefined,
  onConfirm: undefined,
  onKeyboardheightchange: undefined,
  onClear: undefined,
  onError: undefined,
  onLinechange: undefined,
})

// dora-timeago
React.createElement('dora-timeago', {
  prefixCls: 'dora-timeago',
  to: null,
  from: null,
  refreshable: false,
  lang: 'zh_CN',
})

// dora-timeline
React.createElement('dora-timeline', {
  prefixCls: 'dora-timeline',
  pending: false,
  position: 'left',
})

// dora-timeline-item
React.createElement('dora-timeline-item', {
  prefixCls: 'dora-timeline-item',
  content: '',
  dotStyle: null,
  custom: false,
})

// dora-toast
React.createElement('dora-toast', {
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
  onClose: undefined,
  onClosed: undefined,
})

// dora-toptips
React.createElement('dora-toptips', {
  prefixCls: 'dora-toptips',
  classNames: 'dora-animate--slideInDown',
  icon: 'cancel',
  hidden: false,
  text: '',
  duration: 3000,
})

// dora-touch-view
React.createElement('dora-touch-view', {
  prefixCls: 'dora-touch-view',
  hoverClass: 'none',
  hoverStopPropagation: false,
  hoverStartTime: 20,
  hoverStayTime: 70,
  wrapStyle: null,
  onClick: undefined,
})

// dora-upload
React.createElement('dora-upload', {
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
  onBefore: undefined,
  onChange: undefined,
  onSuccess: undefined,
  onFail: undefined,
  onProgress: undefined,
  onComplete: undefined,
  onPreview: undefined,
  onRemove: undefined,
})

// dora-vcode
React.createElement('dora-vcode', {
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
  onChange: undefined,
  onError: undefined,
})

// dora-virtual-list
React.createElement('dora-virtual-list', {
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
  onChange: undefined,
  onScroll: undefined,
  onScrolltoupper: undefined,
  onScrolltolower: undefined,
})

// dora-water-mark
React.createElement('dora-water-mark', {
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
  onLoad: undefined,
  onError: undefined,
})

// dora-white-space
React.createElement('dora-white-space', {
  prefixCls: 'dora-white-space',
  size: 'default',
  bodyStyle: null,
  onClick: undefined,
})

// dora-wing-blank
React.createElement('dora-wing-blank', {
  prefixCls: 'dora-wing-blank',
  size: 'default',
  bodyStyle: null,
})

// End of props registry
