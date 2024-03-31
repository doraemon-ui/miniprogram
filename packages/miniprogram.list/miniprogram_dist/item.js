/**
 * @doraemon-ui/miniprogram.list.
 * © 2021 - 2024 Doraemon UI.
 * Built on 2024-03-31, 14:38:14.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.20.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Emit, Event, Prop } from '@doraemon-ui/miniprogram.core-js';
import { useNativeRoute, NATIVE_ROUTES } from '@doraemon-ui/miniprogram.shared';
const { classNames, styleToCssString } = Doraemon.util;
let ListItem = class ListItem extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Button
     */
    prefixCls;
    /**
     * 左侧缩略图
     *
     * @type {string}
     * @memberof ListItem
     */
    thumb;
    /**
     * 左侧标题
     *
     * @type {string}
     * @memberof ListItem
     */
    title;
    /**
     * 标题下方的描述信息
     *
     * @type {string}
     * @memberof ListItem
     */
    label;
    /**
     * 右侧内容
     *
     * @type {string}
     * @memberof ListItem
     */
    extra;
    /**
     * 是否有底部横线
     *
     * @type {boolean}
     * @memberof ListItem
     */
    hasLine;
    /**
     * 是否展示右侧箭头并开启尝试以 url 跳转
     *
     * @type {boolean}
     * @memberof ListItem
     */
    isLink;
    /**
     * 对齐方式
     *
     * @type {('flex-start' | 'center')}
     * @memberof ListItem
     */
    align;
    /**
     * 自定义样式
     *
     * @type {Partial<CSSStyleDeclaration>}
     * @memberof ListItem
     */
    wrapStyle;
    // native route props
    url;
    urlParams;
    delta;
    openType;
    // native button props
    // @see https://developers.weixin.qq.com/miniprogram/dev/component/button.html
    disabled;
    // openType!: NativeButtonOpenType
    hoverClass;
    hoverStopPropagation;
    hoverStartTime;
    hoverStayTime;
    lang;
    sessionFrom;
    sendMessageTitle;
    sendMessagePath;
    sendMessageImg;
    showMessageCard;
    phoneNumberNoQuotaToast;
    appParameter;
    get classes() {
        const { prefixCls, hoverClass, isLast, hasLine, isLink, align, disabled } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--last`]: isLast,
            [`${prefixCls}--has-line`]: hasLine,
            [`${prefixCls}--access`]: isLink,
            [`${prefixCls}--align-${align}`]: align,
            [`${prefixCls}--disabled`]: disabled,
        });
        const hd = `${prefixCls}__hd`;
        const thumb = `${prefixCls}__thumb`;
        const bd = `${prefixCls}__bd`;
        const title = `${prefixCls}__title`;
        const description = `${prefixCls}__description`;
        const ft = `${prefixCls}__ft`;
        const arrow = `${prefixCls}__arrow`;
        const hover = hoverClass && hoverClass !== 'default' ? hoverClass : `${prefixCls}--hover`;
        return {
            wrap,
            hd,
            thumb,
            bd,
            title,
            description,
            ft,
            arrow,
            hover,
        };
    }
    get containerStyle() {
        return this.wrapStyle ? styleToCssString(this.wrapStyle) : '';
    }
    isLast = false;
    onClick() {
        if (!this.disabled) {
            this.$emit('click');
            this.linkTo();
        }
    }
    onGetUserInfo(e) {
        return e.target;
    }
    onContact(e) {
        return e.target;
    }
    onGetPhoneNumber(e) {
        return e.target;
    }
    onLaunchApp(e) {
        return e.target;
    }
    onChooseAvatar(e) {
        return e.target;
    }
    onOpenSetting(e) {
        return e.target;
    }
    onCreateLiveActivity(e) {
        return e.target;
    }
    onGetRealtimePhoneNumber(e) {
        return e.target;
    }
    onAgreePrivacyAuthorization(e) {
        return e.target;
    }
    onError(e) {
        return e.target;
    }
    linkTo() {
        const { url, urlParams, isLink, openType: _ot, delta } = this;
        const openType = (NATIVE_ROUTES.includes(_ot) ? _ot : 'navigateTo');
        if (isLink && url) {
            useNativeRoute({
                url,
                urlParams,
                openType,
                delta,
            }, this._renderProxy);
        }
    }
    updateIsLast(isLast) {
        this.$nextTick(() => {
            if (isLast !== this.isLast) {
                this.isLast = isLast;
            }
        });
    }
};
__decorate([
    Prop({
        type: String,
        default: ''
    })
], ListItem.prototype, "thumb", void 0);
__decorate([
    Prop({
        type: String,
        default: ''
    })
], ListItem.prototype, "title", void 0);
__decorate([
    Prop({
        type: String,
        default: ''
    })
], ListItem.prototype, "label", void 0);
__decorate([
    Prop({
        type: String,
        default: ''
    })
], ListItem.prototype, "extra", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: true
    })
], ListItem.prototype, "hasLine", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: false
    })
], ListItem.prototype, "isLink", void 0);
__decorate([
    Prop({
        type: String,
        default: 'center'
    })
], ListItem.prototype, "align", void 0);
__decorate([
    Prop({
        type: Object,
        default: null,
    })
], ListItem.prototype, "wrapStyle", void 0);
__decorate([
    Event(),
    Emit('getuserinfo')
], ListItem.prototype, "onGetUserInfo", null);
__decorate([
    Event(),
    Emit('contact')
], ListItem.prototype, "onContact", null);
__decorate([
    Event(),
    Emit('getphonenumber')
], ListItem.prototype, "onGetPhoneNumber", null);
__decorate([
    Event(),
    Emit('launchapp')
], ListItem.prototype, "onLaunchApp", null);
__decorate([
    Event(),
    Emit('chooseavatar')
], ListItem.prototype, "onChooseAvatar", null);
__decorate([
    Event(),
    Emit('opensetting')
], ListItem.prototype, "onOpenSetting", null);
__decorate([
    Event(),
    Emit('createliveactivity')
], ListItem.prototype, "onCreateLiveActivity", null);
__decorate([
    Event(),
    Emit('getrealtimephonenumber')
], ListItem.prototype, "onGetRealtimePhoneNumber", null);
__decorate([
    Event(),
    Emit('agreeprivacyauthorization')
], ListItem.prototype, "onAgreePrivacyAuthorization", null);
__decorate([
    Event(),
    Emit('error')
], ListItem.prototype, "onError", null);
ListItem = __decorate([
    Component({
        components: {
            List: () => ({
                module: './index',
                type: 'ancestor',
            }),
        },
        props: {
            prefixCls: {
                type: String,
                default: 'dora-list-item',
            },
            url: {
                type: String,
                default: '',
            },
            urlParams: {
                type: Object,
                default: null,
            },
            delta: {
                type: Number,
                default: 1,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            openType: {
                type: String,
                default: '',
            },
            hoverClass: {
                type: String,
                default: 'default',
            },
            hoverStopPropagation: {
                type: Boolean,
                default: false,
            },
            hoverStartTime: {
                type: Number,
                default: 20,
            },
            hoverStayTime: {
                type: Number,
                default: 70,
            },
            lang: {
                type: String,
                default: 'en',
            },
            sessionFrom: {
                type: String,
                default: '',
            },
            sendMessageTitle: {
                type: String,
                default: '',
            },
            sendMessagePath: {
                type: String,
                default: '',
            },
            sendMessageImg: {
                type: String,
                default: '',
            },
            showMessageCard: {
                type: Boolean,
                default: false,
            },
            phoneNumberNoQuotaToast: {
                type: Boolean,
                default: true,
            },
            appParameter: {
                type: String,
                default: '',
            },
        },
        expose: ['updateIsLast']
    })
], ListItem);
export default defineComponentHOC()(ListItem);
