/**
 * @doraemon-ui/miniprogram.gallery.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-07-02, 19:40:39.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.65.
 */

import { Doraemon, Prop, Watch, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';
import { getPointsNumber, getTouchPoints, getPointsDistance } from '@doraemon-ui/miniprogram.shared';
import * as gallery from './gallery.js';
export { gallery };

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames } = Doraemon.util;
const MIN_RATIO = 1;
const MAX_RATIO = 1.2;
const defaultTouchOptions = {
    scale: 1,
    offset: [
        0.5,
        3
    ]
};
const getImages = (urls = [])=>{
    return urls.map((item)=>{
        if (typeof item !== 'object') {
            return {
                image: item,
                remark: '',
                touch: {
                    ...defaultTouchOptions
                }
            };
        }
        return {
            image: item.image,
            remark: item.remark || '',
            touch: {
                ...defaultTouchOptions
            }
        };
    });
};
let Gallery = class Gallery extends Doraemon {
    get classes() {
        const { prefixCls } = this;
        return {
            wrap: classNames(prefixCls),
            swiper: `${prefixCls}__swiper`,
            item: `${prefixCls}__item`,
            img: `${prefixCls}__img`,
            remark: `${prefixCls}__remark`,
            opr: `${prefixCls}__opr`,
            del: `${prefixCls}__del`,
            icon: classNames(`${prefixCls}__icon`, {
                [`${prefixCls}__icon--img`]: this.icon
            })
        };
    }
    onPropsChange() {
        this.syncFromProps();
    }
    syncFromProps() {
        this.galleryVisible = this.visible;
        this.images = getImages(this.urls);
    }
    hide() {
        this.galleryVisible = false;
        this.onCancel();
        this.onClose();
    }
    /** May be rewritten */ onCancel() {
        this.$emit('cancel');
    }
    /** May be rewritten */ onClose() {
        this.$emit('close');
    }
    /** May be rewritten */ onClosed() {
        this.$emit('closed');
    }
    onItemClick(e) {
        if (!this._allowItemClick) return;
        const { index } = e.currentTarget.dataset;
        const res = this.onClick(index, this.urls);
        if (res !== false) {
            this.hide();
        }
    }
    /** May be rewritten */ onClick(current, urls) {
        this.$emit('click', {
            current,
            urls
        });
    }
    onTouchStart(e) {
        this._allowItemClick = true;
        if (!this.allowScale || getPointsNumber(e) === 1 || this._touching) {
            return;
        }
        const p1 = getTouchPoints(e);
        const p2 = getTouchPoints(e, 1);
        const distance = getPointsDistance(p1, p2);
        this._touching = false;
        this._prevDistance = distance;
        this.transition = 'none';
    }
    onTouchMove(e) {
        if (!this.allowScale || getPointsNumber(e) === 1 || this._isRendered) {
            return;
        }
        const p1 = getTouchPoints(e);
        const p2 = getTouchPoints(e, 1);
        const distance = getPointsDistance(p1, p2);
        const { touch, index } = e.currentTarget.dataset;
        const distanceDiff = distance - this._prevDistance;
        let scale = touch.scale + 0.005 * distanceDiff;
        if (index !== this.current) {
            return;
        }
        if (scale <= touch.offset[0] * MIN_RATIO) {
            scale = touch.offset[0] * MIN_RATIO;
        } else if (scale >= touch.offset[1] * MAX_RATIO) {
            scale = touch.offset[1] * MAX_RATIO;
        }
        const nextImages = [
            ...this.images
        ];
        nextImages[index] = {
            ...nextImages[index],
            touch: {
                ...nextImages[index].touch,
                scale
            }
        };
        if (!this._touching) {
            this._touching = true;
        }
        this._prevDistance = distance;
        this._allowItemClick = false;
        this._isRendered = true;
        this.images = nextImages;
        this.$nextTick(()=>{
            this._isRendered = false;
        });
    }
    onTouchEnd(e) {
        if (!this.allowScale || !this._touching) {
            return;
        }
        const { touch, index } = e.currentTarget.dataset;
        let scale = touch.scale;
        if (scale <= 1) {
            scale = 1;
        } else if (scale >= touch.offset[1] * MAX_RATIO) {
            scale = touch.offset[1];
        }
        const nextImages = [
            ...this.images
        ];
        nextImages[index] = {
            ...nextImages[index],
            touch: {
                ...nextImages[index].touch,
                scale
            }
        };
        this._touching = false;
        this.images = nextImages;
        this.transition = 'transform .3s';
        setTimeout(()=>{
            this._allowItemClick = true;
        }, 400);
    }
    onItemDelete() {
        const res = this.onDelete(this.current, this.urls);
        if (res !== false) {
            this.hide();
        }
    }
    /** May be rewritten */ onDelete(current, urls) {
        this.$emit('delete', {
            current,
            urls
        });
    }
    onSwiperChange(e) {
        this.current = e.detail.current;
        this.onChange(e.detail);
    }
    /** May be rewritten */ onChange(detail) {
        this.$emit('change', detail);
    }
    mounted() {
        this.syncFromProps();
    }
    constructor(...args){
        super(...args);
        this.galleryVisible = false;
        this.images = [];
        this.transition = '';
        this._allowItemClick = true;
        this._touching = false;
        this._isRendered = false;
        this._prevDistance = 0;
    }
};
_ts_decorate([
    Prop({
        type: null,
        default: 'dora-animate--slideInRight'
    })
], Gallery.prototype, "classNames", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Gallery.prototype, "visible", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Gallery.prototype, "indicatorDots", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'rgba(0, 0, 0, .3)'
    })
], Gallery.prototype, "indicatorColor", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: '#000000'
    })
], Gallery.prototype, "indicatorActiveColor", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Gallery.prototype, "autoplay", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 5000
    })
], Gallery.prototype, "interval", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 500
    })
], Gallery.prototype, "duration", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Gallery.prototype, "circular", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Gallery.prototype, "vertical", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Gallery.prototype, "icon", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: true
    })
], Gallery.prototype, "showDelete", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: true
    })
], Gallery.prototype, "allowScale", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 0
    })
], Gallery.prototype, "current", void 0);
_ts_decorate([
    Prop({
        type: Array,
        default: []
    })
], Gallery.prototype, "urls", void 0);
_ts_decorate([
    Watch('visible'),
    Watch('indicatorDots'),
    Watch('indicatorColor'),
    Watch('indicatorActiveColor'),
    Watch('autoplay'),
    Watch('interval'),
    Watch('duration'),
    Watch('circular'),
    Watch('vertical'),
    Watch('icon'),
    Watch('showDelete'),
    Watch('allowScale'),
    Watch('current'),
    Watch('urls')
], Gallery.prototype, "onPropsChange", null);
Gallery = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-gallery'
            }
        }
    })
], Gallery);
var index = defineComponentHOC()(Gallery);

export { Gallery, index as default };
