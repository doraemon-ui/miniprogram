/**
 * @doraemon-ui/miniprogram.actionsheet.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-02-22, 01:44:13.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop, Watch, Event } from '@doraemon-ui/miniprogram.core-js';
const { classNames } = Doraemon.util;
let ActionSheet = 
/**
 * ActionSheet 动作面板组件
 *
 * @description 从底部弹出的操作菜单面板，提供两种主题风格（iOS / WeChat）。
 * @class ActionSheet
 * @extends {Doraemon}
 */
class ActionSheet extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof ActionSheet
     */
    prefixCls;
    /**
     * 主题风格
     *
     * @type {('ios' | 'wx')}
     * @default 'ios'
     * @memberof ActionSheet
     */
    theme;
    /**
     * 标题文本
     *
     * @type {string}
     * @default ''
     * @memberof ActionSheet
     */
    titleText;
    /**
     * 操作按钮列表
     *
     * @type {ActionSheetButton[]}
     * @default []
     * @memberof ActionSheet
     */
    buttons;
    /**
     * 取消按钮文本
     *
     * @type {string}
     * @default '取消'
     * @memberof ActionSheet
     */
    cancelText;
    /**
     * 删除按钮文本
     *
     * @type {string}
     * @default ''
     * @memberof ActionSheet
     */
    destructiveText;
    /**
     * 是否可见
     *
     * @type {boolean}
     * @default false
     * @memberof ActionSheet
     */
    visible;
    /**
     * 计算动作面板的 CSS 类名
     *
     * @readonly
     * @memberof ActionSheet
     */
    get classes() {
        const { prefixCls, theme, buttons: _buttons, cancelText } = this;
        const wrap = classNames(prefixCls);
        const popup = `${prefixCls}__popup`;
        const content = classNames(`${prefixCls}__content`, {
            [`${prefixCls}__content--theme-${theme}`]: theme,
            [`${prefixCls}__content--has-cancel`]: cancelText,
        });
        const options = classNames(`${prefixCls}__group`, {
            [`${prefixCls}__group--options`]: true,
        });
        const title = `${prefixCls}__title`;
        const destructive = classNames(`${prefixCls}__button`, {
            [`${prefixCls}__button--destructive`]: true,
        });
        const button = _buttons.map((btn) => {
            const wrap = classNames(`${prefixCls}__button`, {
                [`${prefixCls}__button--option`]: true,
                [`${prefixCls}__button--disabled`]: btn.disabled,
                [`${btn.className}`]: btn.className,
            });
            const hover = btn.hoverClass && btn.hoverClass !== 'default' ? btn.hoverClass : `${prefixCls}__button--hover`;
            return {
                wrap,
                hover,
            };
        });
        const icon = `${prefixCls}__icon`;
        const text = `${prefixCls}__text`;
        const group = classNames(`${prefixCls}__group`, {
            [`${prefixCls}__group--cancel`]: true,
        });
        const cancel = classNames(`${prefixCls}__button`, {
            [`${prefixCls}__button--cancel`]: true,
        });
        const hover = `${prefixCls}__button--hover`;
        return {
            wrap,
            popup,
            content,
            options,
            title,
            button,
            icon,
            text,
            destructive,
            group,
            cancel,
            hover,
        };
    }
    popupVisible = false;
    /**
     * 监听 visible 属性变化
     *
     * @param {boolean} visible
     * @memberof ActionSheet
     */
    onVisibleChange(visible) {
        this.setPopupVisible(visible);
    }
    setPopupVisible(popupVisible) {
        if (this.popupVisible !== popupVisible) {
            this.popupVisible = popupVisible;
        }
    }
    onPopupClose() {
        this.onCancel();
    }
    onPopupClosed() {
        this.$emit('closed');
    }
    onClose() {
        this.$emit('close');
    }
    onCancel() {
        this.$emit('cancel');
        this.onClose();
    }
    mounted() {
        this.setPopupVisible(this.visible);
    }
    async onAction(e, method, closable = false) {
        const { index } = e.currentTarget.dataset;
        const button = this.buttons[index];
        const eventName = method.replace(/^on/, '').toLowerCase();
        if (!button.disabled) {
            await Promise.all([
                button[method]?.({ method: eventName, button, index, detail: e.detail }),
                this.$emit('action', { method: eventName, button, index, detail: e.detail }),
            ]);
            if (closable) {
                this.onClose();
            }
        }
    }
    /**
     * 按钮点击事件
     *
     * @memberof ActionSheet
     */
    async onClick(e) {
        await this.onAction(e, 'onClick', true);
    }
    /**
     * 删除按钮点击事件
     *
     * @memberof ActionSheet
     */
    onDestructiveClick() {
        this.$emit('destructive');
        this.onClose();
    }
    async onGetUserInfo(e) {
        await this.onAction(e, 'onGetUserInfo');
    }
    async onContact(e) {
        await this.onAction(e, 'onContact');
    }
    async onGetPhoneNumber(e) {
        await this.onAction(e, 'onGetPhoneNumber');
    }
    async onLaunchApp(e) {
        await this.onAction(e, 'onLaunchApp');
    }
    async onError(e) {
        await this.onAction(e, 'onError');
    }
    async onOpenSetting(e) {
        await this.onAction(e, 'onOpenSetting');
    }
    async onChooseAvatar(e) {
        await this.onAction(e, 'onChooseAvatar');
    }
    async onCreateLiveActivity(e) {
        await this.onAction(e, 'onCreateLiveActivity');
    }
    async onGetRealtimePhoneNumber(e) {
        await this.onAction(e, 'onGetRealtimePhoneNumber');
    }
    async onAgreePrivacyAuthorization(e) {
        await this.onAction(e, 'onAgreePrivacyAuthorization');
    }
};
__decorate([
    Prop({
        type: String,
        default: 'ios',
    })
], ActionSheet.prototype, "theme", void 0);
__decorate([
    Prop({
        type: String,
        default: '',
    })
], ActionSheet.prototype, "titleText", void 0);
__decorate([
    Prop({
        type: Array,
        default: [],
    })
], ActionSheet.prototype, "buttons", void 0);
__decorate([
    Prop({
        type: String,
        default: '取消',
    })
], ActionSheet.prototype, "cancelText", void 0);
__decorate([
    Prop({
        type: String,
        default: '',
    })
], ActionSheet.prototype, "destructiveText", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: false,
    })
], ActionSheet.prototype, "visible", void 0);
__decorate([
    Watch('visible')
], ActionSheet.prototype, "onVisibleChange", null);
__decorate([
    Event()
], ActionSheet.prototype, "onClick", null);
__decorate([
    Event()
], ActionSheet.prototype, "onGetUserInfo", null);
__decorate([
    Event()
], ActionSheet.prototype, "onContact", null);
__decorate([
    Event()
], ActionSheet.prototype, "onGetPhoneNumber", null);
__decorate([
    Event()
], ActionSheet.prototype, "onLaunchApp", null);
__decorate([
    Event()
], ActionSheet.prototype, "onError", null);
__decorate([
    Event()
], ActionSheet.prototype, "onOpenSetting", null);
__decorate([
    Event()
], ActionSheet.prototype, "onChooseAvatar", null);
__decorate([
    Event()
], ActionSheet.prototype, "onCreateLiveActivity", null);
__decorate([
    Event()
], ActionSheet.prototype, "onGetRealtimePhoneNumber", null);
__decorate([
    Event()
], ActionSheet.prototype, "onAgreePrivacyAuthorization", null);
ActionSheet = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-actionsheet',
            },
        },
    })
    /**
     * ActionSheet 动作面板组件
     *
     * @description 从底部弹出的操作菜单面板，提供两种主题风格（iOS / WeChat）。
     * @class ActionSheet
     * @extends {Doraemon}
     */
], ActionSheet);
export default defineComponentHOC()(ActionSheet);
import * as actionsheet_1 from './actionsheet';
export { actionsheet_1 as actionsheet };
