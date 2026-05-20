/**
 * @doraemon-ui/miniprogram.fab-button.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-12, 20:57:14.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { Doraemon, Prop, Watch, Event, Emit, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';
import { useRect } from '@doraemon-ui/miniprogram.shared';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames } = Doraemon.util;
const setTransform = (translate = 0, scale = 1, delay = 300, isHorizontal = true)=>{
    const duration = `transition-duration: ${delay}ms`;
    const transform = `transform: scale(${scale}) translate3d(${isHorizontal ? translate : 0}px, ${isHorizontal ? 0 : translate}px, 0)`;
    return `opacity: 1; ${duration}; ${transform}`;
};
let FabButton = class FabButton extends Doraemon {
    get classes() {
        const { prefixCls, position, color, direction, reverse, buttonVisible, hideShadow, actionRotate, buttons, hoverClass } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--${position}`]: position,
            [`${prefixCls}--${direction}`]: direction,
            [`${prefixCls}--reverse`]: reverse,
            [`${prefixCls}--opened`]: buttonVisible,
            ['dora-color']: color,
            [`dora-color--${color}`]: color
        });
        const action = classNames(`${prefixCls}__action`, {
            [`${prefixCls}__action--hide-shadow`]: hideShadow
        });
        const text = classNames(`${prefixCls}__text`, {
            [`${prefixCls}__text--rotate`]: buttonVisible && actionRotate
        });
        const button = (buttons || []).map((item)=>{
            return {
                wrap: classNames(`${prefixCls}__button`, {
                    [`${prefixCls}__button--hide-shadow`]: !!item.hideShadow,
                    [`${prefixCls}__button--disabled`]: !!item.disabled,
                    [String(item.className || '')]: !!item.className
                }),
                hover: item.hoverClass && item.hoverClass !== 'default' ? item.hoverClass : `${prefixCls}__button--hover`
            };
        });
        const hover = hoverClass && hoverClass !== 'default' ? hoverClass : `${prefixCls}--hover`;
        return {
            wrap,
            action,
            text,
            button,
            icon: `${prefixCls}__icon`,
            label: `${prefixCls}__label`,
            backdrop: `${prefixCls}__backdrop`,
            hover
        };
    }
    onVisibleChange(newVal) {
        if (this.controlled) {
            this.updated(newVal);
        }
    }
    forceUpdateButtonStyle() {
        this.updateButtonStyle(!this.buttonVisible);
    }
    updated(buttonVisible) {
        if (this.buttonVisible !== buttonVisible) {
            this.buttonVisible = buttonVisible;
            this.updateButtonStyle(!buttonVisible);
        }
    }
    onChange(buttonVisible) {
        if (!this.controlled) {
            this.updated(buttonVisible);
        }
        this.$emit('change', {
            value: buttonVisible
        });
    }
    onToggle() {
        this.onChange(!this.buttonVisible);
    }
    onTap(e) {
        const { index, value } = e.currentTarget.dataset;
        const params = {
            index,
            value,
            buttons: this.buttons
        };
        if (!value.disabled) {
            this.$emit('click', params);
            this.onChange(false);
        }
    }
    updateButtonStyle(isReset) {
        const { prefixCls, buttons, duration, direction, spaceBetween, scale } = this;
        const buttonStyle = [];
        const sign = this.reverse ? 1 : -1;
        const isHorizontal = direction === 'horizontal';
        if (isReset) {
            buttons.forEach(()=>{
                buttonStyle.push('opacity: 0; transform: translate3d(0, 0, 0)');
            });
            this.buttonStyle = buttonStyle;
            return;
        }
        void useRect(`.${prefixCls}__action`, this._renderProxy).then((rect)=>{
            if (!rect || typeof rect.width !== 'number') {
                return;
            }
            if (direction === 'horizontal' || direction === 'vertical') {
                buttons.forEach((_, index)=>{
                    const offset = sign * (rect.width + spaceBetween) * (index + 1);
                    buttonStyle.push(setTransform(offset, scale, duration, isHorizontal));
                });
            } else {
                const radius = rect.width + spaceBetween;
                buttons.forEach((_, index)=>{
                    buttonStyle.push(this.getCircleStyle(index, radius));
                });
            }
            this.buttonStyle = buttonStyle;
        });
    }
    getCircleStyle(index, radius) {
        const { sAngle, eAngle, duration, scale } = this;
        const length = this.buttons.length;
        const { max, sin, cos, PI } = Math;
        const startAngle = sAngle * PI / 180;
        const endAngle = eAngle * PI / 180;
        const points = endAngle % (2 * PI) === 0 ? length : max(1, length - 1);
        const currentAngle = startAngle + (endAngle - startAngle) / points * index;
        const x = Number((sin(currentAngle) * radius).toFixed(6));
        const y = Number((cos(currentAngle) * radius).toFixed(6));
        const transform = `transform: scale(${scale}) translate3d(${x}px, ${y}px, 0)`;
        return `opacity: 1; transition-duration: ${duration}ms; ${transform}`;
    }
    onGetUserInfo(e) {
        return {
            ...e.detail,
            ...e.currentTarget.dataset
        };
    }
    onContact(e) {
        return {
            ...e.detail,
            ...e.currentTarget.dataset
        };
    }
    onGetPhoneNumber(e) {
        return {
            ...e.detail,
            ...e.currentTarget.dataset
        };
    }
    onLaunchApp(e) {
        return {
            ...e.detail,
            ...e.currentTarget.dataset
        };
    }
    onChooseAvatar(e) {
        return {
            ...e.detail,
            ...e.currentTarget.dataset
        };
    }
    onOpenSetting(e) {
        return {
            ...e.detail,
            ...e.currentTarget.dataset
        };
    }
    onCreateLiveActivity(e) {
        return {
            ...e.detail,
            ...e.currentTarget.dataset
        };
    }
    onGetRealtimePhoneNumber(e) {
        return {
            ...e.detail,
            ...e.currentTarget.dataset
        };
    }
    onAgreePrivacyAuthorization(e) {
        return {
            ...e.detail,
            ...e.currentTarget.dataset
        };
    }
    onError(e) {
        return {
            ...e.detail,
            ...e.currentTarget.dataset
        };
    }
    mounted() {
        const buttonVisible = this.controlled ? this.visible : this.defaultVisible;
        this.updated(buttonVisible);
    }
    constructor(...args){
        super(...args);
        this.buttonStyle = [];
        this.buttonVisible = false;
    }
};
_ts_decorate([
    Prop({
        type: String,
        default: 'default'
    })
], FabButton.prototype, "hoverClass", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'positive'
    })
], FabButton.prototype, "color", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'bottomRight'
    })
], FabButton.prototype, "position", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAHdElNRQfhBAQLCR5MtjrbAAAAjUlEQVRo3u3ZMRKAIAxEUbDirp4nXnctFFDHBtDQ/O1Nnk6aHUMgZCBKMkmmNAtgOmL9M+IQQGVM95zljy8DAAAAAAAAAAAAAACALsDZcppSx7Q+WdtUvA5xffUtrjeA8/qQ21S9gc15/3Nfzw0M5O0G2kM5BQAAAAAAAAAAAAAAQGk33q0qZ/p/Q/JFdmei9usomnwIAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA0LTA0VDExOjA5OjMwKzA4OjAw1U4c3wAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wNC0wNFQxMTowOTozMCswODowMKQTpGMAAAAASUVORK5CYII='
    })
], FabButton.prototype, "action", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: true
    })
], FabButton.prototype, "actionRotate", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], FabButton.prototype, "hideShadow", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], FabButton.prototype, "backdrop", void 0);
_ts_decorate([
    Prop({
        type: Array,
        default: ()=>[]
    })
], FabButton.prototype, "buttons", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'horizontal'
    })
], FabButton.prototype, "direction", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 10
    })
], FabButton.prototype, "spaceBetween", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 300
    })
], FabButton.prototype, "duration", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 0.9
    })
], FabButton.prototype, "scale", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], FabButton.prototype, "reverse", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 0
    })
], FabButton.prototype, "sAngle", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 360
    })
], FabButton.prototype, "eAngle", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], FabButton.prototype, "defaultVisible", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], FabButton.prototype, "visible", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], FabButton.prototype, "controlled", void 0);
_ts_decorate([
    Watch('visible')
], FabButton.prototype, "onVisibleChange", null);
_ts_decorate([
    Watch('buttons'),
    Watch('direction'),
    Watch('spaceBetween'),
    Watch('scale'),
    Watch('reverse'),
    Watch('sAngle'),
    Watch('eAngle')
], FabButton.prototype, "forceUpdateButtonStyle", null);
_ts_decorate([
    Event(),
    Emit('getuserinfo')
], FabButton.prototype, "onGetUserInfo", null);
_ts_decorate([
    Event(),
    Emit('contact')
], FabButton.prototype, "onContact", null);
_ts_decorate([
    Event(),
    Emit('getphonenumber')
], FabButton.prototype, "onGetPhoneNumber", null);
_ts_decorate([
    Event(),
    Emit('launchapp')
], FabButton.prototype, "onLaunchApp", null);
_ts_decorate([
    Event(),
    Emit('chooseavatar')
], FabButton.prototype, "onChooseAvatar", null);
_ts_decorate([
    Event(),
    Emit('opensetting')
], FabButton.prototype, "onOpenSetting", null);
_ts_decorate([
    Event(),
    Emit('createliveactivity')
], FabButton.prototype, "onCreateLiveActivity", null);
_ts_decorate([
    Event(),
    Emit('getrealtimephonenumber')
], FabButton.prototype, "onGetRealtimePhoneNumber", null);
_ts_decorate([
    Event(),
    Emit('agreeprivacyauthorization')
], FabButton.prototype, "onAgreePrivacyAuthorization", null);
_ts_decorate([
    Event(),
    Emit('error')
], FabButton.prototype, "onError", null);
FabButton = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-fab-button'
            }
        }
    })
], FabButton);
var index = defineComponentHOC()(FabButton);

export { FabButton, index as default };
