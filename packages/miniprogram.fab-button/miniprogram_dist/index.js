/**
 * @doraemon-ui/miniprogram.fab-button.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-02-27, 00:50:35.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Doraemon, Component, Prop, Watch, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';
import { useRect } from '@doraemon-ui/miniprogram.shared';
const { classNames } = Doraemon.util;
const defaultAction = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAHdElNRQfhBAQLCR5MtjrbAAAAjUlEQVRo3u3ZMRKAIAxEUbDirp4nXnctFFDHBtDQ/O1Nnk6aHUMgZCBKMkmmNAtgOmL9M+IQQGVM95zljy8DAAAAAAAAAAAAAACALsDZcppSx7Q+WdtUvA5xffUtrjeA8/qQ21S9gc15/3Nfzw0M5O0G2kM5BQAAAAAAAAAAAAAAQGk33q0qZ/p/Q/JFdmei9usomnwIAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA0LTA0VDExOjA5OjMwKzA4OjAw1U4c3wAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wNC0wNFQxMTowOTozMCswODowMKQTpGMAAAAASUVORK5CYII=';
const setTransform = (translate = 0, scale = 1, delay = 300, isHorizontal = true) => {
    const duration = `transition-duration: ${delay}ms`;
    const transform = `transform: scale(${scale}) translate3d(${isHorizontal ? translate : 0}px, ${isHorizontal ? 0 : translate}px, 0)`;
    return `opacity: 1; ${duration}; ${transform}`;
};
let FabButton = class FabButton extends Doraemon {
    prefixCls;
    hoverClass;
    theme;
    position;
    action;
    actionRotate;
    hideShadow;
    backdrop;
    buttons;
    direction;
    spaceBetween;
    duration;
    scale;
    reverse;
    sAngle;
    eAngle;
    defaultVisible;
    visible;
    controlled;
    buttonStyle = [];
    buttonVisible = false;
    get classes() {
        const { prefixCls, position, theme, direction, reverse, buttonVisible, hideShadow, actionRotate, buttons, hoverClass } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--${position}`]: position,
            [`${prefixCls}--${theme}`]: theme,
            [`${prefixCls}--${direction}`]: direction,
            [`${prefixCls}--reverse`]: reverse,
            [`${prefixCls}--opened`]: buttonVisible,
        });
        const action = classNames(`${prefixCls}__action`, {
            [`${prefixCls}__action--hide-shadow`]: hideShadow,
        });
        const text = classNames(`${prefixCls}__text`, {
            [`${prefixCls}__text--rotate`]: buttonVisible && actionRotate,
        });
        const button = (buttons || []).map((item) => {
            return {
                wrap: classNames(`${prefixCls}__button`, {
                    [`${prefixCls}__button--hide-shadow`]: !!item.hideShadow,
                    [`${prefixCls}__button--disabled`]: !!item.disabled,
                    [String(item.className || '')]: !!item.className,
                }),
                hover: item.hoverClass && item.hoverClass !== 'default' ? item.hoverClass : `${prefixCls}__button--hover`,
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
            hover,
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
        this.$emit('change', { value: buttonVisible });
    }
    onToggle() {
        this.onChange(!this.buttonVisible);
    }
    onTap(e) {
        const index = typeof e?.currentTarget?.dataset?.index === 'number' ? e.currentTarget.dataset.index : -1;
        const value = (e?.currentTarget?.dataset?.value || {});
        const params = {
            index,
            value,
            buttons: this.buttons,
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
            buttons.forEach(() => {
                buttonStyle.push('opacity: 0; transform: translate3d(0, 0, 0)');
            });
            this.buttonStyle = buttonStyle;
            return;
        }
        void useRect(`.${prefixCls}__action`, this._renderProxy).then((rect) => {
            if (!rect || typeof rect.width !== 'number') {
                return;
            }
            if (direction === 'horizontal' || direction === 'vertical') {
                buttons.forEach((_, index) => {
                    const offset = sign * (rect.width + spaceBetween) * (index + 1);
                    buttonStyle.push(setTransform(offset, scale, duration, isHorizontal));
                });
            }
            else {
                const radius = rect.width + spaceBetween;
                buttons.forEach((_, index) => {
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
        const startAngle = (sAngle * PI) / 180;
        const endAngle = (eAngle * PI) / 180;
        const points = endAngle % (2 * PI) === 0 ? length : max(1, length - 1);
        const currentAngle = startAngle + ((endAngle - startAngle) / points) * index;
        const x = Number((sin(currentAngle) * radius).toFixed(6));
        const y = Number((cos(currentAngle) * radius).toFixed(6));
        const transform = `transform: scale(${scale}) translate3d(${x}px, ${y}px, 0)`;
        return `opacity: 1; transition-duration: ${duration}ms; ${transform}`;
    }
    emitOpenTypeEvent(name, e) {
        const eventLike = e;
        this.$emit(name, {
            ...(eventLike.detail || {}),
            ...(eventLike.currentTarget?.dataset || {}),
        });
    }
    bindgetuserinfo(e) {
        this.emitOpenTypeEvent('getuserinfo', e);
    }
    bindcontact(e) {
        this.emitOpenTypeEvent('contact', e);
    }
    bindgetphonenumber(e) {
        this.emitOpenTypeEvent('getphonenumber', e);
    }
    bindopensetting(e) {
        this.emitOpenTypeEvent('opensetting', e);
    }
    bindlaunchapp(e) {
        this.emitOpenTypeEvent('launchapp', e);
    }
    bindchooseavatar(e) {
        this.emitOpenTypeEvent('chooseavatar', e);
    }
    onError(e) {
        this.emitOpenTypeEvent('error', e);
    }
    mounted() {
        const buttonVisible = this.controlled ? this.visible : this.defaultVisible;
        this.updated(buttonVisible);
    }
};
__decorate([
    Prop({ type: String, default: 'default' })
], FabButton.prototype, "hoverClass", void 0);
__decorate([
    Prop({ type: String, default: 'balanced' })
], FabButton.prototype, "theme", void 0);
__decorate([
    Prop({ type: String, default: 'bottomRight' })
], FabButton.prototype, "position", void 0);
__decorate([
    Prop({ type: String, default: defaultAction })
], FabButton.prototype, "action", void 0);
__decorate([
    Prop({ type: Boolean, default: true })
], FabButton.prototype, "actionRotate", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], FabButton.prototype, "hideShadow", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], FabButton.prototype, "backdrop", void 0);
__decorate([
    Prop({ type: Array, default: () => [] })
], FabButton.prototype, "buttons", void 0);
__decorate([
    Prop({ type: String, default: 'horizontal' })
], FabButton.prototype, "direction", void 0);
__decorate([
    Prop({ type: Number, default: 10 })
], FabButton.prototype, "spaceBetween", void 0);
__decorate([
    Prop({ type: Number, default: 300 })
], FabButton.prototype, "duration", void 0);
__decorate([
    Prop({ type: Number, default: 0.9 })
], FabButton.prototype, "scale", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], FabButton.prototype, "reverse", void 0);
__decorate([
    Prop({ type: Number, default: 0 })
], FabButton.prototype, "sAngle", void 0);
__decorate([
    Prop({ type: Number, default: 360 })
], FabButton.prototype, "eAngle", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], FabButton.prototype, "defaultVisible", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], FabButton.prototype, "visible", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], FabButton.prototype, "controlled", void 0);
__decorate([
    Watch('visible')
], FabButton.prototype, "onVisibleChange", null);
__decorate([
    Watch('buttons'),
    Watch('direction'),
    Watch('spaceBetween'),
    Watch('scale'),
    Watch('reverse'),
    Watch('sAngle'),
    Watch('eAngle')
], FabButton.prototype, "forceUpdateButtonStyle", null);
FabButton = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-fab-button',
            },
            hoverClass: {
                type: String,
                default: 'default',
            },
            theme: {
                type: String,
                default: 'balanced',
            },
            position: {
                type: String,
                default: 'bottomRight',
            },
            action: {
                type: String,
                default: defaultAction,
            },
            actionRotate: {
                type: Boolean,
                default: true,
            },
            hideShadow: {
                type: Boolean,
                default: false,
            },
            backdrop: {
                type: Boolean,
                default: false,
            },
            buttons: {
                type: Array,
                default: () => [],
            },
            direction: {
                type: String,
                default: 'horizontal',
            },
            spaceBetween: {
                type: Number,
                default: 10,
            },
            duration: {
                type: Number,
                default: 300,
            },
            scale: {
                type: Number,
                default: 0.9,
            },
            reverse: {
                type: Boolean,
                default: false,
            },
            sAngle: {
                type: Number,
                default: 0,
            },
            eAngle: {
                type: Number,
                default: 360,
            },
            defaultVisible: {
                type: Boolean,
                default: false,
            },
            visible: {
                type: Boolean,
                default: false,
            },
            controlled: {
                type: Boolean,
                default: false,
            },
        },
    })
], FabButton);
export default defineComponentHOC()(FabButton);
