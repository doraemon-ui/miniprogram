/**
 * @doraemon-ui/taro-react.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-07, 18:09:15.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
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
    _transformProps(props) {
        const result = {};
        Object.keys(props).forEach((key) => {
            const value = props[key];
            if (key.startsWith('on') && typeof value === 'function') {
                const eventName = key[2].toLowerCase() + key.slice(3);
                result[`bind${eventName}`] = value;
            }
            else {
                result[key] = value;
            }
        });
        return result;
    }
    render() {
        const { compName, className, style, children, forwardedRef, ...rest } = this.props;
        const nativeProps = this._transformProps(rest);
        console.log('nativeProps====', nativeProps);
        const Comp = compName;
        return (React.createElement(Comp, { ref: this.nativeRef, "dora-class": className, "dora-style": styleToString(style), ...nativeProps }, Children.toArray(children)));
    }
}
function createHostComponent(compName) {
    return forwardRef((props, ref) => createElement(HostComponent, {
        ...props,
        compName,
        forwardedRef: ref,
    }));
}

const Accordion = createHostComponent('dora-accordion');
Accordion.displayName = 'DoraAccordion';

const AccordionPanel = createHostComponent('dora-accordion-panel');
AccordionPanel.displayName = 'DoraAccordionPanel';

const InnerAccordion = Accordion;
InnerAccordion.Panel = AccordionPanel;

const ActionSheet = createHostComponent('dora-action-sheet');
ActionSheet.displayName = 'DoraActionSheet';

const Alert = createHostComponent('dora-alert');
Alert.displayName = 'DoraAlert';

const AnimationGroup = createHostComponent('dora-animation-group');
AnimationGroup.displayName = 'DoraAnimationGroup';

const Avatar = createHostComponent('dora-avatar');
Avatar.displayName = 'DoraAvatar';

const Backdrop = createHostComponent('dora-backdrop');
Backdrop.displayName = 'DoraBackdrop';

const Badge = createHostComponent('dora-badge');
Badge.displayName = 'DoraBadge';

const Barcode = createHostComponent('dora-barcode');
Barcode.displayName = 'DoraBarcode';

const Button = createHostComponent('dora-button');
Button.displayName = 'DoraButton';

const Calendar = createHostComponent('dora-calendar');
Calendar.displayName = 'DoraCalendar';

const Card = createHostComponent('dora-card');
Card.displayName = 'DoraCard';

const Cascader = createHostComponent('dora-cascader');
Cascader.displayName = 'DoraCascader';

const CascaderPickerView = createHostComponent('dora-cascader-picker-view');
CascaderPickerView.displayName = 'DoraCascaderPickerView';

const CascaderView = createHostComponent('dora-cascader-view');
CascaderView.displayName = 'DoraCascaderView';

const Checkbox = createHostComponent('dora-checkbox');
Checkbox.displayName = 'DoraCheckbox';

const CheckboxGroup = createHostComponent('dora-checkbox-group');
CheckboxGroup.displayName = 'DoraCheckboxGroup';

const InnerCheckbox = Checkbox;
InnerCheckbox.Group = CheckboxGroup;

const Circle = createHostComponent('dora-circle');
Circle.displayName = 'DoraCircle';

const Col = createHostComponent('dora-col');
Col.displayName = 'DoraCol';

const Countdown = createHostComponent('dora-countdown');
Countdown.displayName = 'DoraCountdown';

const Countup = createHostComponent('dora-countup');
Countup.displayName = 'DoraCountup';

const DatePicker = createHostComponent('dora-date-picker');
DatePicker.displayName = 'DoraDatePicker';

const DatePickerView = createHostComponent('dora-date-picker-view');
DatePickerView.displayName = 'DoraDatePickerView';

const Dialog = createHostComponent('dora-dialog');
Dialog.displayName = 'DoraDialog';

const Divider = createHostComponent('dora-divider');
Divider.displayName = 'DoraDivider';

const ESign = createHostComponent('dora-e-sign');
ESign.displayName = 'DoraESign';

const Ellipsis = createHostComponent('dora-ellipsis');
Ellipsis.displayName = 'DoraEllipsis';

const FabButton = createHostComponent('dora-fab-button');
FabButton.displayName = 'DoraFabButton';

const Field = createHostComponent('dora-field');
Field.displayName = 'DoraField';

const Filterbar = createHostComponent('dora-filterbar');
Filterbar.displayName = 'DoraFilterbar';

const FloatingPanel = createHostComponent('dora-floating-panel');
FloatingPanel.displayName = 'DoraFloatingPanel';

const Footer = createHostComponent('dora-footer');
Footer.displayName = 'DoraFooter';

const Form = createHostComponent('dora-form');
Form.displayName = 'DoraForm';

const Gallery = createHostComponent('dora-gallery');
Gallery.displayName = 'DoraGallery';

const Grid = createHostComponent('dora-grid');
Grid.displayName = 'DoraGrid';

const Icon = createHostComponent('dora-icon');
Icon.displayName = 'DoraIcon';

const Image = createHostComponent('dora-image');
Image.displayName = 'DoraImage';

const Index = createHostComponent('dora-index');
Index.displayName = 'DoraIndex';

const IndexItem = createHostComponent('dora-index-item');
IndexItem.displayName = 'DoraIndexItem';

const InnerIndex = Index;
InnerIndex.Item = IndexItem;

const Input = createHostComponent('dora-input');
Input.displayName = 'DoraInput';

const InputNumber = createHostComponent('dora-input-number');
InputNumber.displayName = 'DoraInputNumber';

const Keyboard = createHostComponent('dora-keyboard');
Keyboard.displayName = 'DoraKeyboard';

const Landscape = createHostComponent('dora-landscape');
Landscape.displayName = 'DoraLandscape';

const List = createHostComponent('dora-list');
List.displayName = 'DoraList';

const ListItem = createHostComponent('dora-list-item');
ListItem.displayName = 'DoraListItem';

const InnerList = List;
InnerList.Item = ListItem;

const Loading = createHostComponent('dora-loading');
Loading.displayName = 'DoraLoading';

const Media = createHostComponent('dora-media');
Media.displayName = 'DoraMedia';

const MultiPickerView = createHostComponent('dora-multi-picker-view');
MultiPickerView.displayName = 'DoraMultiPickerView';

const Navbar = createHostComponent('dora-navbar');
Navbar.displayName = 'DoraNavbar';

const NoticeBar = createHostComponent('dora-notice-bar');
NoticeBar.displayName = 'DoraNoticeBar';

const Notification = createHostComponent('dora-notification');
Notification.displayName = 'DoraNotification';

const Pagination = createHostComponent('dora-pagination');
Pagination.displayName = 'DoraPagination';

const Picker = createHostComponent('dora-picker');
Picker.displayName = 'DoraPicker';

const PickerView = createHostComponent('dora-picker-view');
PickerView.displayName = 'DoraPickerView';

const Popover = createHostComponent('dora-popover');
Popover.displayName = 'DoraPopover';

const Popup = createHostComponent('dora-popup');
Popup.displayName = 'DoraPopup';

const PopupSelect = createHostComponent('dora-popup-select');
PopupSelect.displayName = 'DoraPopupSelect';

const Progress = createHostComponent('dora-progress');
Progress.displayName = 'DoraProgress';

const Prompt = createHostComponent('dora-prompt');
Prompt.displayName = 'DoraPrompt';

const Qrcode = createHostComponent('dora-qrcode');
Qrcode.displayName = 'DoraQrcode';

const Radio = createHostComponent('dora-radio');
Radio.displayName = 'DoraRadio';

const RadioGroup = createHostComponent('dora-radio-group');
RadioGroup.displayName = 'DoraRadioGroup';

const InnerRadio = Radio;
InnerRadio.Group = RadioGroup;

const Rater = createHostComponent('dora-rater');
Rater.displayName = 'DoraRater';

const Refresher = createHostComponent('dora-refresher');
Refresher.displayName = 'DoraRefresher';

const Result = createHostComponent('dora-result');
Result.displayName = 'DoraResult';

const Row = createHostComponent('dora-row');
Row.displayName = 'DoraRow';

const InnerRow = Row;
InnerRow.Col = Col;

const SafeArea = createHostComponent('dora-safe-area');
SafeArea.displayName = 'DoraSafeArea';

const SearchBar = createHostComponent('dora-search-bar');
SearchBar.displayName = 'DoraSearchBar';

const SegmentedControl = createHostComponent('dora-segmented-control');
SegmentedControl.displayName = 'DoraSegmentedControl';

const Select = createHostComponent('dora-select');
Select.displayName = 'DoraSelect';

const Selectable = createHostComponent('dora-selectable');
Selectable.displayName = 'DoraSelectable';

const SelectorGroup = createHostComponent('dora-selector-group');
SelectorGroup.displayName = 'DoraSelectorGroup';

const Skeleton = createHostComponent('dora-skeleton');
Skeleton.displayName = 'DoraSkeleton';

const SkeletonAvatar = createHostComponent('dora-skeleton-avatar');
SkeletonAvatar.displayName = 'DoraSkeletonAvatar';

const SkeletonParagraph = createHostComponent('dora-skeleton-paragraph');
SkeletonParagraph.displayName = 'DoraSkeletonParagraph';

const InnerSkeleton = Skeleton;
InnerSkeleton.Avatar = SkeletonAvatar;
InnerSkeleton.Paragraph = SkeletonParagraph;

const Slider = createHostComponent('dora-slider');
Slider.displayName = 'DoraSlider';

const Spin = createHostComponent('dora-spin');
Spin.displayName = 'DoraSpin';

const Step = createHostComponent('dora-step');
Step.displayName = 'DoraStep';

const Steps = createHostComponent('dora-steps');
Steps.displayName = 'DoraSteps';

const InnerSteps = Steps;
InnerSteps.Step = Step;

const Sticky = createHostComponent('dora-sticky');
Sticky.displayName = 'DoraSticky';

const SwipeAction = createHostComponent('dora-swipe-action');
SwipeAction.displayName = 'DoraSwipeAction';

const Switch = createHostComponent('dora-switch');
Switch.displayName = 'DoraSwitch';

const Tab = createHostComponent('dora-tab');
Tab.displayName = 'DoraTab';

const Tabbar = createHostComponent('dora-tabbar');
Tabbar.displayName = 'DoraTabbar';

const TabbarItem = createHostComponent('dora-tabbar-item');
TabbarItem.displayName = 'DoraTabbarItem';

const InnerTabbar = Tabbar;
InnerTabbar.Item = TabbarItem;

const Tabs = createHostComponent('dora-tabs');
Tabs.displayName = 'DoraTabs';

const InnerTabs = Tabs;
InnerTabs.Tab = Tab;

const Tag = createHostComponent('dora-tag');
Tag.displayName = 'DoraTag';

const Textarea = createHostComponent('dora-textarea');
Textarea.displayName = 'DoraTextarea';

const Timeago = createHostComponent('dora-timeago');
Timeago.displayName = 'DoraTimeago';

const Timeline = createHostComponent('dora-timeline');
Timeline.displayName = 'DoraTimeline';

const TimelineItem = createHostComponent('dora-timeline-item');
TimelineItem.displayName = 'DoraTimelineItem';

const InnerTimeline = Timeline;
InnerTimeline.Item = TimelineItem;

const Toast = createHostComponent('dora-toast');
Toast.displayName = 'DoraToast';

const Toptips = createHostComponent('dora-toptips');
Toptips.displayName = 'DoraToptips';

const TouchView = createHostComponent('dora-touch-view');
TouchView.displayName = 'DoraTouchView';

const Upload = createHostComponent('dora-upload');
Upload.displayName = 'DoraUpload';

const Vcode = createHostComponent('dora-vcode');
Vcode.displayName = 'DoraVcode';

const VirtualList = createHostComponent('dora-virtual-list');
VirtualList.displayName = 'DoraVirtualList';

const VirtualListItem = createHostComponent('dora-virtual-list-item');
VirtualListItem.displayName = 'DoraVirtualListItem';

const InnerVirtualList = VirtualList;
InnerVirtualList.Item = VirtualListItem;

const WaterMark = createHostComponent('dora-water-mark');
WaterMark.displayName = 'DoraWaterMark';

const WhiteSpace = createHostComponent('dora-white-space');
WhiteSpace.displayName = 'DoraWhiteSpace';

const WingBlank = createHostComponent('dora-wing-blank');
WingBlank.displayName = 'DoraWingBlank';

export { InnerAccordion as Accordion, AccordionPanel, ActionSheet, Alert, AnimationGroup, Avatar, Backdrop, Badge, Barcode, Button, Calendar, Card, Cascader, CascaderPickerView, CascaderView, InnerCheckbox as Checkbox, CheckboxGroup, Circle, Col, Countdown, Countup, DatePicker, DatePickerView, Dialog, Divider, ESign, Ellipsis, FabButton, Field, Filterbar, FloatingPanel, Footer, Form, Gallery, Grid, Icon, Image, InnerIndex as Index, IndexItem, Input, InputNumber, Keyboard, Landscape, InnerList as List, ListItem, Loading, Media, MultiPickerView, Navbar, NoticeBar, Notification, Pagination, Picker, PickerView, Popover, Popup, PopupSelect, Progress, Prompt, Qrcode, InnerRadio as Radio, RadioGroup, Rater, Refresher, Result, InnerRow as Row, SafeArea, SearchBar, SegmentedControl, Select, Selectable, SelectorGroup, InnerSkeleton as Skeleton, SkeletonAvatar, SkeletonParagraph, Slider, Spin, Step, InnerSteps as Steps, Sticky, SwipeAction, Switch, Tab, InnerTabbar as Tabbar, TabbarItem, InnerTabs as Tabs, Tag, Textarea, Timeago, InnerTimeline as Timeline, TimelineItem, Toast, Toptips, TouchView, Upload, Vcode, InnerVirtualList as VirtualList, VirtualListItem, WaterMark, WhiteSpace, WingBlank };
