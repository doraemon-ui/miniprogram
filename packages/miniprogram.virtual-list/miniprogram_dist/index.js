/**
 * @doraemon-ui/miniprogram.virtual-list.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:41:44.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { Doraemon, Prop, Watch, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';
import { useRect } from '@doraemon-ui/miniprogram.shared';
import { mapVirtualToProps, getVisibleItemBounds, debounce } from './utils.js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames, styleToCssString } = Doraemon.util;
let VirtualList = class VirtualList extends Doraemon {
    get classes() {
        const p = this.prefixCls;
        const wrap = classNames(p);
        return {
            wrap,
            mask: `${p}__mask`,
            scrollView: `${p}__scroll-view`,
            scrollArea: `${p}__scroll-area`
        };
    }
    onItemHeightChange() {
        this.updated(this.itemHeight);
    }
    onHeightChange(v) {
        this.updatedStyle(v);
    }
    onDebounceChange(v) {
        this.setScrollHandler(v);
    }
    onViewportDepsChange() {
        if (this.firstRendered) this.onChange(this.scrollOffset, true);
    }
    onScrollToIndexPropChange(v) {
        if (this.firstRendered) this.scrollToIndexFn(v);
    }
    getChildrenItems() {
        const proxy = this._renderProxy;
        if (proxy && typeof proxy.getRelationNodes === 'function') {
            return (proxy.getRelationNodes('./item') || []).map((n)=>n.$component).filter(Boolean);
        }
        return [];
    }
    onChildrenChanged() {
        this.updated();
    }
    updated(itemHeight = this.itemHeight) {
        const elements = this.getChildrenItems();
        elements.forEach((element, index)=>{
            element.updated(this.startIndex + index, itemHeight);
        });
    }
    updatedStyle(height) {
        this.wrapStyle = styleToCssString({
            height
        });
    }
    loadData(callback) {
        const values = mapVirtualToProps({
            items: this.items,
            itemHeight: this.itemHeight
        }, {
            startIndex: this.startIndex,
            endIndex: this.endIndex
        });
        this.virtual = values.virtual;
        if (typeof callback === 'function') callback({
            ...values,
            startIndex: this.startIndex,
            endIndex: this.endIndex,
            scrollOffset: this.scrollOffset
        });
    }
    onChange(scrollOffset, scrolled, callback) {
        const itemCount = Math.max(0, this.items.length - 1);
        const listTop = this.enablePageScroll ? this.offsetTop || 0 : 0;
        const viewTop = scrollOffset - listTop;
        const state = getVisibleItemBounds(viewTop, this.height, itemCount, this.itemHeight, this.itemBuffer);
        const hasChanged = state.startIndex !== this.startIndex || state.endIndex !== this.endIndex;
        const direction = scrollOffset > this.scrollOffset ? 'Down' : 'Up';
        const firstItemVisible = direction === 'Up' && viewTop < this.startIndex * this.itemHeight;
        const lastItemVisible = direction === 'Down' && viewTop > this.endIndex * this.itemHeight - this.height;
        if (state.startIndex > state.endIndex) return;
        if (hasChanged && (firstItemVisible || lastItemVisible) || scrolled) {
            this.startIndex = state.startIndex;
            this.endIndex = state.endIndex;
            this.loadData((values)=>{
                if (scrolled) this.innerScrollOffset = scrollOffset;
                this.$emit('change', {
                    ...values,
                    direction,
                    scrollOffset
                });
                callback?.({
                    ...values,
                    direction,
                    scrollOffset
                });
            });
        }
        this.scrollOffset = scrollOffset;
    }
    onScroll(e) {
        this.onChange(e.detail.scrollTop);
        this.$emit('scroll', e.detail);
    }
    onScrollToUpper(e) {
        this.$emit('scrolltoupper', e.detail);
    }
    onScrollToLower(e) {
        this.$emit('scrolltolower', e.detail);
    }
    getOffsetForIndex(index, itemHeight = this.itemHeight, itemSize = this.items.length) {
        const realIndex = Math.max(0, Math.min(index, itemSize - 1));
        return realIndex * itemHeight;
    }
    render(items, success) {
        let scrollOffset = this.scrollOffset;
        if (Array.isArray(items)) this.items = items;
        if (!this.firstRendered) {
            this.firstRendered = true;
            scrollOffset = this.getOffsetForIndex(this.scrollToIndex);
        }
        this.getBoundingClientRect(()=>this.onChange(scrollOffset, true, success), true);
    }
    scrollTo(scrollOffset, success) {
        if (typeof scrollOffset === 'number') {
            const offset = Math.max(0, Math.min(scrollOffset, this.items.length * this.itemHeight));
            this.onChange(offset, true, success);
        }
    }
    scrollToIndexFn(index, success) {
        if (typeof index === 'number') this.onChange(this.getOffsetForIndex(index), true, success);
    }
    setScrollHandler(useDebounce = this.debounce) {
        this.scrollHandler = useDebounce ? debounce(this.onScroll.bind(this), useDebounce) : this.onScroll.bind(this);
    }
    noop() {}
    async getBoundingClientRect(callback, isForce) {
        if (this.offsetTop !== undefined && !isForce) {
            callback?.();
            return;
        }
        const rect = await useRect(`.${this.prefixCls}`, this._renderProxy);
        if (!rect) return;
        this.offsetTop = rect.top;
        callback?.();
    }
    mounted() {
        this.updatedStyle(this.height);
        this.setScrollHandler(this.debounce);
        void this.getBoundingClientRect(()=>this.loadData());
    }
    constructor(...args){
        super(...args);
        this.wrapStyle = '';
        this.scrollOffset = 0;
        this.innerScrollOffset = 0;
        this.startIndex = 0;
        this.endIndex = -1;
        this.virtual = {
            items: [],
            style: ''
        };
        this.items = [];
        this.firstRendered = false;
        this.scrollHandler = ()=>{};
    }
};
_ts_decorate([
    Prop({
        type: Number,
        default: 50
    })
], VirtualList.prototype, "itemHeight", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 0
    })
], VirtualList.prototype, "itemBuffer", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 0
    })
], VirtualList.prototype, "scrollToIndex", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 50
    })
], VirtualList.prototype, "upperThreshold", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 50
    })
], VirtualList.prototype, "lowerThreshold", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], VirtualList.prototype, "scrollWithAnimation", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], VirtualList.prototype, "enableBackToTop", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], VirtualList.prototype, "disableScroll", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], VirtualList.prototype, "enablePageScroll", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 300
    })
], VirtualList.prototype, "height", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 0
    })
], VirtualList.prototype, "debounce", void 0);
_ts_decorate([
    Watch('itemHeight')
], VirtualList.prototype, "onItemHeightChange", null);
_ts_decorate([
    Watch('height')
], VirtualList.prototype, "onHeightChange", null);
_ts_decorate([
    Watch('debounce')
], VirtualList.prototype, "onDebounceChange", null);
_ts_decorate([
    Watch('enablePageScroll'),
    Watch('itemBuffer')
], VirtualList.prototype, "onViewportDepsChange", null);
_ts_decorate([
    Watch('scrollToIndex')
], VirtualList.prototype, "onScrollToIndexPropChange", null);
VirtualList = _ts_decorate([
    Component({
        components: {
            VirtualItem: ()=>({
                    module: './item',
                    type: 'child',
                    observer: 'onChildrenChanged'
                })
        },
        props: {
            prefixCls: {
                type: String,
                default: 'dora-virtual-list'
            }
        }
    })
], VirtualList);
var index = defineComponentHOC()(VirtualList);

export { VirtualList, index as default };
