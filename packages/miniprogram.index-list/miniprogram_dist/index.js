/**
 * @doraemon-ui/miniprogram.index-list.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-06-11, 14:12:41.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.34.
 */

import { Doraemon, Prop, Watch, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';
import { vibrateShort, useRectAll } from '@doraemon-ui/miniprogram.shared';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames, styleToCssString } = Doraemon.util;
const findActiveByIndex = (current, currentName, children)=>{
    return children.filter((child)=>child.index === current && child.name === currentName)[0];
};
const findActiveByPosition = (scrollTop, offsetY, children)=>{
    return children.filter((child)=>scrollTop < child.top + child.height - offsetY && scrollTop >= child.top - offsetY)[0];
};
let IndexList = class IndexList extends Doraemon {
    get classes() {
        const { prefixCls, indicatorPosition } = this;
        return {
            root: classNames(prefixCls),
            nav: `${prefixCls}__nav`,
            navRow: `${prefixCls}__nav-row`,
            navCol: `${prefixCls}__nav-col`,
            navItem: `${prefixCls}__nav-item`,
            indicator: classNames(`${prefixCls}__indicator`, {
                [`${prefixCls}__indicator--${indicatorPosition}`]: indicatorPosition
            })
        };
    }
    onHeightChange(newVal) {
        this.updateStyle(newVal);
    }
    onChildrenChanged() {
        this.updated();
    }
    /**
   * 更新样式
   */ updateStyle(height = this.height) {
        const extStyle = styleToCssString({
            height
        });
        if (extStyle !== this.extStyle) {
            this.extStyle = extStyle;
        }
    }
    getChildNodes() {
        return this.$children;
    }
    updateNavList() {
        const navList = this.getChildNodes().map((child)=>({
                index: child.index,
                name: child.name,
                brief: child.brief
            }));
        this.navList = navList;
    }
    /**
   * 刷新元素数据
   */ updated() {
        const elements = this.getChildNodes();
        if (elements.length > 0) {
            elements.forEach((element, index)=>{
                element.updated(index);
            });
            setTimeout(()=>{
                this.getNavPoints().catch(()=>{});
            }, 0);
        }
        this.updateNavList();
    }
    /**
   * 设置当前激活项
   */ setActive(current, currentName) {
        if (current !== this.current || currentName !== this.currentName) {
            const target = findActiveByIndex(current, currentName, this.getChildNodes());
            const currentBrief = target ? target.brief : currentName.charAt(0);
            if (target) {
                const indicatorStyle = this.indicatorPosition === 'right' ? styleToCssString({
                    top: current * this.colHight + this.colHight / 2
                }) : '';
                this.current = current;
                this.currentName = currentName;
                this.currentBrief = currentBrief;
                this.scrollTop = target.top - this.parentOffsetTop;
                this.indicatorStyle = indicatorStyle;
            }
            vibrateShort({
                type: 'light'
            });
            this.$emit('change', {
                index: current,
                name: currentName,
                brief: currentBrief
            });
        }
    }
    onTouchStart(e) {
        if (this.moving) return;
        const index = Number(e.target.dataset?.index ?? -1);
        const name = String(e.target.dataset?.name ?? '');
        this.setActive(index, name);
        this.moving = true;
    }
    onTouchMove(e) {
        const touch = e.changedTouches?.[0];
        if (!touch) return;
        const target = this.getTargetFromPoint(touch.pageY);
        if (target) {
            const { index, name } = target.dataset;
            this.setActive(index, name);
        }
    }
    onTouchEnd() {
        if (!this.moving) return;
        setTimeout(()=>{
            this.moving = false;
        }, 300);
    }
    onScroll(e) {
        if (this.moving) return;
        this.checkActiveIndex(e.detail.scrollTop);
    }
    async getNavPoints() {
        const navColCls = `.${this.prefixCls}__nav-col`;
        const navItemCls = `.${this.prefixCls}__nav-item`;
        const list = await useRectAll([
            navColCls,
            navItemCls
        ], this._renderProxy);
        const cols = list[0] || [];
        const items = list[1] || [];
        if (!cols.length && !items.length) return;
        this.colHight = cols[0].height;
        this.points = items.map((n)=>({
                ...n,
                offsets: [
                    n.top,
                    n.top + n.height
                ]
            }));
    }
    getTargetFromPoint(y) {
        const points = this.points;
        let target;
        for(let i = points.length - 1; i >= 0; i--){
            const [a, b] = points[i].offsets;
            // 1.判断是否为第一个元素且大于最大坐标点
            // 2.判断是否为最后一个元素且小于最小坐标点
            // 3.判断是否包含于某个坐标系内
            if (i === points.length - 1 && y > b || i === 0 && y < a || y >= a && y <= b) {
                target = points[i];
                break;
            }
        }
        return target;
    }
    checkActiveIndex(scrollTop) {
        const target = findActiveByPosition(scrollTop, this.parentOffsetTop, this.getChildNodes());
        if (target) {
            const current = target.index;
            const currentName = target.name;
            const currentBrief = target.brief;
            if (current !== this.current || currentName !== this.currentName) {
                this.current = current;
                this.currentName = currentName;
                this.currentBrief = currentBrief;
                this.$emit('change', {
                    index: current,
                    name: currentName,
                    brief: currentBrief
                });
            }
        }
    }
    scrollTo(index) {
        const child = typeof index === 'number' ? this.getChildNodes().filter((item)=>item.index === index)[0] : this.getChildNodes().filter((item)=>item.name === index)[0];
        if (child) {
            this.moving = true;
            this.setActive(child.index, child.name);
            setTimeout(()=>{
                this.moving = false;
            }, 300);
        }
    }
    mounted() {
        this.updateStyle();
        this.getNavPoints();
        this.updateNavList();
    }
    constructor(...args){
        super(...args);
        this.colHight = 0;
        this.points = [];
        this.scrollTop = 0;
        this.navList = [];
        this.moving = false;
        this.current = 0;
        this.currentName = '';
        this.currentBrief = '';
        this.extStyle = '';
        this.indicatorStyle = '';
    }
};
_ts_decorate([
    Prop({
        type: null,
        default: 300
    })
], IndexList.prototype, "height", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: true
    })
], IndexList.prototype, "showIndicator", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'center'
    })
], IndexList.prototype, "indicatorPosition", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 0
    })
], IndexList.prototype, "parentOffsetTop", void 0);
_ts_decorate([
    Watch('height')
], IndexList.prototype, "onHeightChange", null);
IndexList = _ts_decorate([
    Component({
        components: {
            IndexListItem: ()=>({
                    module: './item',
                    type: 'child',
                    observer: 'onChildrenChanged'
                })
        },
        expose: [
            'scrollTo',
            'updateNavList'
        ],
        props: {
            prefixCls: {
                type: String,
                default: 'dora-index-list'
            }
        }
    })
], IndexList);
var index = defineComponentHOC()(IndexList);

export { IndexList, index as default };
