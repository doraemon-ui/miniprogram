/**
 * @doraemon-ui/miniprogram.gallery.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-02-26, 20:54:47.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js';
import { getTouchPoints, getPointsNumber, getPointsDistance } from '@doraemon-ui/miniprogram.shared';
const { classNames } = Doraemon.util;
const MIN_RATIO = 1;
const MAX_RATIO = 1.2;
const defaultTouchOptions = {
    scale: 1,
    offset: [0.5, 3],
};
let Gallery = class Gallery extends Doraemon {
    prefixCls;
    classNames;
    indicatorDots;
    indicatorColor;
    indicatorActiveColor;
    autoplay;
    interval;
    duration;
    circular;
    vertical;
    icon;
    showDelete;
    allowScale;
    current;
    urls;
    popupIn = false;
    images = [];
    transition = '';
    allowItemClick = true;
    touching = false;
    isRendered = false;
    prevDistance = 0;
    fns = {
        delete: () => false,
        cancel: () => { },
        onChange: () => { },
        onTap: () => true,
    };
    get classes() {
        const { prefixCls } = this;
        return {
            swiper: `${prefixCls}__swiper`,
            item: `${prefixCls}__item`,
            img: `${prefixCls}__img`,
            remark: `${prefixCls}__remark`,
            opr: `${prefixCls}__opr`,
            del: `${prefixCls}__del`,
            icon: `${prefixCls}__icon`,
        };
    }
    normalizeImages(urls = []) {
        return urls.map((n) => {
            if (typeof n !== 'object') {
                return {
                    image: n,
                    remark: '',
                    touch: { ...defaultTouchOptions },
                };
            }
            return {
                image: n.image,
                remark: n.remark || '',
                touch: { ...defaultTouchOptions },
            };
        });
    }
    hide() {
        this.popupIn = false;
        this.fns.cancel();
    }
    show(opts = {}) {
        this.popupIn = true;
        this.classNames = opts.classNames ?? this.classNames;
        this.indicatorDots = opts.indicatorDots ?? this.indicatorDots;
        this.indicatorColor = opts.indicatorColor ?? this.indicatorColor;
        this.indicatorActiveColor = opts.indicatorActiveColor ?? this.indicatorActiveColor;
        this.autoplay = opts.autoplay ?? this.autoplay;
        this.interval = opts.interval ?? this.interval;
        this.duration = opts.duration ?? this.duration;
        this.circular = opts.circular ?? this.circular;
        this.vertical = opts.vertical ?? this.vertical;
        this.icon = opts.icon ?? this.icon;
        this.showDelete = opts.showDelete ?? this.showDelete;
        this.allowScale = opts.allowScale ?? this.allowScale;
        this.current = opts.current ?? this.current;
        this.urls = opts.urls ?? this.urls;
        this.images = this.normalizeImages(this.urls);
        this.transition = '';
        this.fns = {
            delete: opts.delete || (() => false),
            cancel: opts.cancel || (() => { }),
            onChange: opts.onChange || (() => { }),
            onTap: opts.onTap || (() => true),
        };
    }
    onTap(e) {
        if (!this.allowItemClick)
            return;
        const dataset = e.currentTarget?.dataset;
        const index = typeof dataset?.index === 'number' ? dataset.index : 0;
        if (this.fns.onTap(index, this.urls) === true) {
            this.hide();
        }
    }
    onTouchStart(e) {
        this.allowItemClick = true;
        const evt = e;
        if (!this.allowScale || getPointsNumber(evt) === 1 || this.touching)
            return false;
        const p1 = getTouchPoints(evt);
        const p2 = getTouchPoints(evt, 1);
        this.prevDistance = getPointsDistance(p1, p2);
        this.touching = false;
        this.transition = 'none';
        return true;
    }
    onTouchMove(e) {
        const evt = e;
        if (!this.allowScale || getPointsNumber(evt) === 1 || this.isRendered)
            return false;
        const dataset = e.currentTarget?.dataset;
        const touch = dataset?.touch;
        const index = typeof dataset?.index === 'number' ? dataset.index : -1;
        if (!touch || index !== this.current || !this.images[index])
            return false;
        const p1 = getTouchPoints(evt);
        const p2 = getTouchPoints(evt, 1);
        const distance = getPointsDistance(p1, p2);
        const distanceDiff = distance - this.prevDistance;
        let scale = touch.scale + 0.005 * distanceDiff;
        if (scale <= touch.offset[0] * MIN_RATIO)
            scale = touch.offset[0] * MIN_RATIO;
        if (scale >= touch.offset[1] * MAX_RATIO)
            scale = touch.offset[1] * MAX_RATIO;
        const images = [...this.images];
        images[index] = {
            ...images[index],
            touch: { ...images[index].touch, scale },
        };
        this.images = images;
        this.touching = true;
        this.prevDistance = distance;
        this.allowItemClick = false;
        return true;
    }
    onTouchEnd(e) {
        if (!this.allowScale || !this.touching)
            return false;
        const dataset = e.currentTarget?.dataset;
        const touch = dataset?.touch;
        const index = typeof dataset?.index === 'number' ? dataset.index : -1;
        if (!touch || !this.images[index])
            return false;
        let scale = touch.scale;
        if (scale <= 1)
            scale = 1;
        if (scale >= touch.offset[1] * MAX_RATIO)
            scale = touch.offset[1];
        const images = [...this.images];
        images[index] = {
            ...images[index],
            touch: { ...images[index].touch, scale },
        };
        this.images = images;
        this.transition = 'transform .3s';
        this.touching = false;
        setTimeout(() => {
            this.allowItemClick = true;
        }, 400);
        return true;
    }
    onDelete() {
        if (this.fns.delete(this.current, this.urls) === true) {
            this.hide();
        }
    }
    onChange(e) {
        this.current = e.detail.current;
        this.fns.onChange(e);
    }
    slideTo(current = 0, duration = 0) {
        const max = this.urls.length - 1;
        let target = current;
        if (target < 0)
            target = this.circular ? max : 0;
        if (target > max)
            target = this.circular ? 0 : max;
        if (duration > 0) {
            setTimeout(() => {
                this.current = target;
            }, duration);
            return;
        }
        this.current = target;
    }
    slideNext(duration = 0) {
        this.slideTo(this.current + 1, duration);
    }
    slidePrev(duration = 0) {
        this.slideTo(this.current - 1, duration);
    }
};
__decorate([
    Prop({ type: String, default: 'dora-animate--slideInRight' })
], Gallery.prototype, "classNames", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Gallery.prototype, "indicatorDots", void 0);
__decorate([
    Prop({ type: String, default: 'rgba(0, 0, 0, .3)' })
], Gallery.prototype, "indicatorColor", void 0);
__decorate([
    Prop({ type: String, default: '#000000' })
], Gallery.prototype, "indicatorActiveColor", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Gallery.prototype, "autoplay", void 0);
__decorate([
    Prop({ type: Number, default: 5000 })
], Gallery.prototype, "interval", void 0);
__decorate([
    Prop({ type: Number, default: 500 })
], Gallery.prototype, "duration", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Gallery.prototype, "circular", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Gallery.prototype, "vertical", void 0);
__decorate([
    Prop({ type: String, default: '' })
], Gallery.prototype, "icon", void 0);
__decorate([
    Prop({ type: Boolean, default: true })
], Gallery.prototype, "showDelete", void 0);
__decorate([
    Prop({ type: Boolean, default: true })
], Gallery.prototype, "allowScale", void 0);
__decorate([
    Prop({ type: Number, default: 0 })
], Gallery.prototype, "current", void 0);
__decorate([
    Prop({ type: Array, default: () => [] })
], Gallery.prototype, "urls", void 0);
Gallery = __decorate([
    Component({
        expose: ['show', 'hide', 'slideTo', 'slideNext', 'slidePrev'],
        props: {
            prefixCls: {
                type: String,
                default: 'dora-gallery',
            },
            classNames: {
                type: String,
                default: 'dora-animate--slideInRight',
            },
            indicatorDots: {
                type: Boolean,
                default: false,
            },
            indicatorColor: {
                type: String,
                default: 'rgba(0, 0, 0, .3)',
            },
            indicatorActiveColor: {
                type: String,
                default: '#000000',
            },
            autoplay: {
                type: Boolean,
                default: false,
            },
            interval: {
                type: Number,
                default: 5000,
            },
            duration: {
                type: Number,
                default: 500,
            },
            circular: {
                type: Boolean,
                default: false,
            },
            vertical: {
                type: Boolean,
                default: false,
            },
            icon: {
                type: String,
                default: '',
            },
            showDelete: {
                type: Boolean,
                default: true,
            },
            allowScale: {
                type: Boolean,
                default: true,
            },
            current: {
                type: Number,
                default: 0,
            },
            urls: {
                type: Array,
                default: () => [],
            },
        },
    })
], Gallery);
export default defineComponentHOC()(Gallery);
