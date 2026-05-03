/**
 * @doraemon-ui/miniprogram.refresher.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:40:27.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { Doraemon, Prop, Watch, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';
import { useRect, getSystemInfoSync } from '@doraemon-ui/miniprogram.shared';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames } = Doraemon.util;
const defaultStyle = 'transition: transform .4s; transform: translate3d(0px, 0px, 0px) scale(1);';
let Refresher = class Refresher extends Doraemon {
    get classes() {
        const { prefixCls, pullingText, refreshingText, disablePullingRotation, visible, active, refreshing, tail, prefixLCls, loading, noData } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--hidden`]: !visible,
            [`${prefixCls}--visible`]: visible,
            [`${prefixCls}--active`]: active,
            [`${prefixCls}--refreshing`]: refreshing,
            [`${prefixCls}--refreshing-tail`]: tail
        });
        const content = classNames(`${prefixCls}__content`, {
            [`${prefixCls}__content--text`]: !!(pullingText || refreshingText)
        });
        const iconPulling = classNames(`${prefixCls}__icon-pulling`, {
            [`${prefixCls}__icon-pulling--disabled`]: disablePullingRotation
        });
        const pIcon = this.pullingIcon || `${prefixCls}__icon--arrow-down`;
        const rIcon = this.refreshingIcon || `${prefixCls}__icon--refresher`;
        const lWrap = classNames(prefixLCls, {
            [`${prefixLCls}--hidden`]: !loading,
            [`${prefixLCls}--visible`]: loading,
            [`${prefixLCls}--end`]: noData
        });
        return {
            wrap,
            content,
            iconPulling,
            textPulling: `${prefixCls}__text-pulling`,
            iconRefreshing: `${prefixCls}__icon-refreshing`,
            textRefreshing: `${prefixCls}__text-refreshing`,
            pIcon,
            rIcon,
            lWrap,
            lContent: `${prefixLCls}__content`,
            loadingText: `${prefixLCls}__text-loading`
        };
    }
    onScrollPropChange(n) {
        this.onScroll(n);
    }
    activate() {
        this.style = defaultStyle;
        this.visible = true;
    }
    deactivate() {
        this.activated = false;
        this.style = defaultStyle;
        this.visible = false;
        this.active = false;
        this.refreshing = false;
        this.tail = false;
    }
    doRefreshing() {
        this.style = 'transition: transform .4s; transform: translate3d(0, 50px, 0) scale(1);';
        this.visible = true;
        this.active = true;
        this.refreshing = true;
        this.loading = false;
        this.noData = false;
        this.newContentHeight = 0;
        this.oldContentHeight = 0;
        this.lVisible = false;
    }
    doTail() {
        this.visible = true;
        this.active = true;
        this.refreshing = true;
        this.tail = true;
    }
    hide() {
        this.lVisible = false;
    }
    translate(diffY) {
        this.style = `transition-duration: 0s; transform: translate3d(0, ${diffY}px, 0) scale(1);`;
        if (diffY < this.distance) {
            this.visible = true;
            this.active = false;
        } else {
            this.visible = true;
            this.active = true;
        }
    }
    isRefreshing() {
        return this.refreshing;
    }
    isLoading() {
        return this.loading;
    }
    getTouchPoints(e, index = 0) {
        const p = e.touches[index] || e.changedTouches[index];
        return {
            x: p.pageX,
            y: p.pageY
        };
    }
    getSwipeDirection(x1, x2, y1, y2) {
        return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? x1 - x2 > 0 ? 'Left' : 'Right' : y1 - y2 > 0 ? 'Up' : 'Down';
    }
    requestAnimationFrame(callback) {
        const currTime = new Date().getTime();
        const timeToCall = Math.max(0, 16 - (currTime - this.lastTime));
        const timeout = setTimeout(()=>callback.bind(this)(), timeToCall);
        this.lastTime = currTime + timeToCall;
        return timeout;
    }
    finishPullToRefresh() {
        setTimeout(()=>{
            this.requestAnimationFrame(this.doTail);
            setTimeout(()=>this.deactivate(), 200);
        }, 200);
    }
    finishLoadmore(isEnd) {
        if (isEnd === true) {
            setTimeout(()=>{
                this.noData = true;
                this.loading = false;
            }, 200);
        } else {
            setTimeout(()=>{
                this.noData = false;
                this.loading = false;
                this.requestAnimationFrame(this.hide);
                setTimeout(()=>this.deactivate(), 200);
            }, 200);
        }
    }
    onTouchStart(e) {
        if (this.isRefreshing() || this.isLoading()) return;
        this.start = this.getTouchPoints(e);
        this.diffX = this.diffY = 0;
        this.isMoved = false;
        this.direction = '';
        this.activate();
    }
    onTouchMove(e) {
        if (!this.start || this.isRefreshing() || this.isLoading()) return;
        if (!this.isMoved) this.isMoved = true;
        this.move = this.getTouchPoints(e);
        this.diffX = this.move.x - this.start.x;
        this.diffY = this.move.y - this.start.y;
        this.direction = this.getSwipeDirection(this.start.x, this.move.x, this.start.y, this.move.y);
        if (this.diffY < 0 || this.direction !== 'Down') return;
        this.diffY = Math.pow(this.diffY, 0.8);
        this.triggerPull(this.diffY);
    }
    onTouchEnd() {
        if (!this.isMoved) return;
        this.start = false;
        this.isMoved = false;
        if (this.diffY <= 0 || this.direction !== 'Down' || this.isRefreshing() || this.isLoading()) return;
        this.triggerRefresh(this.diffY);
    }
    triggerPull(diffY) {
        if (!this.activated && diffY > this.distance) {
            this.activated = true;
            this.$emit('pulling');
        } else if (this.activated && diffY < this.distance) {
            this.activated = false;
        }
        this.translate(diffY);
    }
    triggerRefresh(diffY = this.distance) {
        this.triggerPull(diffY);
        this.deactivate();
        if (Math.abs(diffY) >= this.distance) {
            this.doRefreshing();
            this.$emit('refresh');
        }
    }
    onScroll(n) {
        if (this.isMoved) return;
        useRect('.dora-refresher__container', this._renderProxy).then((res)=>{
            if (!res) return;
            const newContentHeight = res.height;
            if (this.newContentHeight !== newContentHeight) this.newContentHeight = newContentHeight;
            if (this.windowHeight && !this.isRefreshing()) {
                if (n > newContentHeight - this.windowHeight - this.distance * 1.5 && this.loading === false && this.noData === false && newContentHeight !== this.oldContentHeight) {
                    this.loading = true;
                    this.refreshing = false;
                    this.oldContentHeight = newContentHeight;
                    this.$emit('loadmore');
                } else if (this.loading === false && this.noData === false) {
                    this.hide();
                } else if (this.loading === true) {
                    this.oldContentHeight = newContentHeight;
                }
                this.deactivate();
            }
        });
    }
    noop() {}
    mounted() {
        this.windowHeight = getSystemInfoSync().windowHeight;
    }
    constructor(...args){
        super(...args);
        this.style = defaultStyle;
        this.visible = false;
        this.active = false;
        this.refreshing = false;
        this.tail = false;
        this.lVisible = false;
        this.noData = false;
        this.windowHeight = 0;
        this.newContentHeight = 0;
        this.oldContentHeight = 0;
        this.loading = false;
        this.lastTime = 0;
        this.activated = false;
        this.start = false;
        this.move = false;
        this.diffX = 0;
        this.diffY = 0;
        this.isMoved = false;
        this.direction = '';
    }
};
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Refresher.prototype, "pullingIcon", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: '下拉刷新'
    })
], Refresher.prototype, "pullingText", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Refresher.prototype, "refreshingIcon", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: '正在刷新'
    })
], Refresher.prototype, "refreshingText", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Refresher.prototype, "disablePullingRotation", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 30
    })
], Refresher.prototype, "distance", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'dora-loader'
    })
], Refresher.prototype, "prefixLCls", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Refresher.prototype, "isShowLoadingText", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: '正在加载'
    })
], Refresher.prototype, "loadingText", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: '没有更多数据'
    })
], Refresher.prototype, "loadNoDataText", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 0
    })
], Refresher.prototype, "scrollTop", void 0);
_ts_decorate([
    Watch('scrollTop')
], Refresher.prototype, "onScrollPropChange", null);
Refresher = _ts_decorate([
    Component({
        expose: [
            'triggerRefresh',
            'finishPullToRefresh',
            'finishLoadmore'
        ],
        props: {
            prefixCls: {
                type: String,
                default: 'dora-refresher'
            }
        }
    })
], Refresher);
const $startWuxRefresher = (selector = '#dora-refresher', context)=>{
    const page = context || getCurrentPages()[getCurrentPages().length - 1];
    const comp = page?.selectComponent?.(selector);
    comp?.triggerRefresh?.();
};
const $stopWuxRefresher = (selector = '#dora-refresher', context)=>{
    const page = context || getCurrentPages()[getCurrentPages().length - 1];
    const comp = page?.selectComponent?.(selector);
    comp?.finishPullToRefresh?.();
};
const $stopWuxLoader = (selector = '#dora-refresher', context, isEnd)=>{
    const page = context || getCurrentPages()[getCurrentPages().length - 1];
    const comp = page?.selectComponent?.(selector);
    comp?.finishLoadmore?.(isEnd);
};
var index = defineComponentHOC()(Refresher);

export { $startWuxRefresher, $stopWuxLoader, $stopWuxRefresher, Refresher, index as default };
