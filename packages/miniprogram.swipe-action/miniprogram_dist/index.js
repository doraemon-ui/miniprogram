/**
 * @doraemon-ui/miniprogram.swipe-action.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-05, 22:47:04.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js';
import { getTouchPoints, getPointsNumber, getSwipeDirection, useRect } from '@doraemon-ui/miniprogram.shared';
const { classNames } = Doraemon.util;
let SwipeAction = class SwipeAction extends Doraemon {
    prefixCls;
    autoClose;
    disabled;
    left;
    right;
    useSlots;
    data;
    index = 0;
    swiping = false;
    showCover = false;
    offsetStyle = '';
    btnsLeftWidth = 0;
    btnsRightWidth = 0;
    openedLeft = false;
    openedRight = false;
    needShowLeft = false;
    needShowRight = false;
    start = { x: 0, y: 0 };
    move = { x: 0, y: 0 };
    end = { x: 0, y: 0 };
    get classes() {
        const p = this.prefixCls;
        const wrap = classNames(p, {
            [`${p}--swiping`]: this.swiping,
        });
        return {
            wrap,
            cover: `${p}__cover`,
            left: classNames(`${p}__actions`, {
                [`${p}__actions--left`]: true,
            }),
            right: classNames(`${p}__actions`, {
                [`${p}__actions--right`]: true,
            }),
            action: `${p}__action`,
            text: `${p}__text`,
            content: `${p}__content`,
        };
    }
    updated(index) {
        if (this.index !== index)
            this.index = index;
    }
    getContentEasing(value, limit) {
        const delta = Math.abs(value) - Math.abs(limit);
        const isOverflow = delta > 0;
        const factor = limit > 0 ? 1 : -1;
        if (isOverflow) {
            value = limit + Math.pow(delta, 0.85) * factor;
            return Math.abs(value) > Math.abs(limit) ? limit : value;
        }
        return value;
    }
    setStyle(value) {
        const limit = value > 0 ? this.btnsLeftWidth : -this.btnsRightWidth;
        const left = this.getContentEasing(value, limit);
        this.offsetStyle = `left: ${left}px`;
        this.showCover = Math.abs(value) > 0;
    }
    updateBtns() {
        const p = this.prefixCls;
        useRect([`.${p}__actions--left`, `.${p}__actions--right`], this._renderProxy).then((rects) => {
            const [leftRect, rightRect] = rects || [];
            this.btnsLeftWidth = leftRect?.width || 0;
            this.btnsRightWidth = rightRect?.width || 0;
        });
    }
    onTap(e) {
        const { type } = e.currentTarget.dataset;
        const params = {
            ...e.currentTarget.dataset,
            buttons: this[type] || [],
            data: this.data,
        };
        if (this.autoClose)
            this.onClose();
        this.$emit('click', params);
    }
    onAcitons() {
        if (this.autoClose)
            this.onClose();
    }
    onOpen(value, openedLeft, openedRight) {
        if (!this.openedLeft && !this.openedRight)
            this.$emit('open');
        this.openedLeft = openedLeft;
        this.openedRight = openedRight;
        this.setStyle(value);
    }
    onClose() {
        if (this.openedLeft || this.openedRight)
            this.$emit('close');
        this.openedLeft = false;
        this.openedRight = false;
        this.setStyle(0);
    }
    onOpenLeft() {
        this.onOpen(this.btnsLeftWidth, true, false);
    }
    onOpenRight() {
        this.onOpen(-this.btnsRightWidth, false, true);
    }
    onTouchStart(e) {
        if (this.disabled || getPointsNumber(e) > 1)
            return;
        this.start = getTouchPoints(e);
    }
    onTouchMove(e) {
        if (this.disabled || getPointsNumber(e) > 1)
            return;
        this.move = getTouchPoints(e);
        const deltaX = this.move.x - this.start.x;
        const direction = getSwipeDirection(this.start.x, this.move.x, this.start.y, this.move.y);
        const isLeft = direction === 'Left';
        const isRight = direction === 'Right';
        if (!isLeft && !isRight)
            return;
        this.needShowRight = isLeft && (this.useSlots || this.right.length > 0);
        this.needShowLeft = isRight && (this.useSlots || this.left.length > 0);
        if (this.needShowLeft || this.needShowRight) {
            this.swiping = true;
            this.setStyle(deltaX);
        }
    }
    onTouchEnd(e) {
        if (this.disabled || getPointsNumber(e) > 1 || !this.swiping)
            return;
        this.end = getTouchPoints(e);
        const deltaX = this.end.x - this.start.x;
        const needOpenRight = this.needShowRight && Math.abs(deltaX) > this.btnsRightWidth / 2;
        const needOpenLeft = this.needShowLeft && Math.abs(deltaX) > this.btnsLeftWidth / 2;
        if (needOpenRight)
            this.onOpenRight();
        else if (needOpenLeft)
            this.onOpenLeft();
        else
            this.onClose();
        this.swiping = false;
        this.needShowLeft = false;
        this.needShowRight = false;
    }
    noop() { }
    mounted() {
        this.updateBtns();
    }
};
__decorate([
    Prop({ type: Boolean, default: false })
], SwipeAction.prototype, "autoClose", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], SwipeAction.prototype, "disabled", void 0);
__decorate([
    Prop({ type: Array, default: [] })
], SwipeAction.prototype, "left", void 0);
__decorate([
    Prop({ type: Array, default: [] })
], SwipeAction.prototype, "right", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], SwipeAction.prototype, "useSlots", void 0);
__decorate([
    Prop({ type: null, default: null })
], SwipeAction.prototype, "data", void 0);
SwipeAction = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-swipe',
            },
        },
    })
], SwipeAction);
export default defineComponentHOC()(SwipeAction);
