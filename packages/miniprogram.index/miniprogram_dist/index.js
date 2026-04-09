/**
 * @doraemon-ui/miniprogram.index.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-02-27, 01:07:21.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js';
import { useRectAll, vibrateShort } from '@doraemon-ui/miniprogram.shared';
const { classNames, styleToCssString } = Doraemon.util;
const findActiveByIndex = (current, currentName, children) => {
    return children.filter((child) => child.index === current && child.name === currentName)[0];
};
const findActiveByPosition = (scrollTop, offsetY, children) => {
    return children.filter((child) => scrollTop < child.top + child.height - offsetY && scrollTop >= child.top - offsetY)[0];
};
let Index = class Index extends Doraemon {
    /**
     * 自定义类名前缀
     */
    prefixCls;
    /**
     * 组件高度
     */
    height;
    /**
     * 是否显示提示指示器
     */
    showIndicator;
    /**
     * 提示指示器位置
     */
    indicatorPosition;
    /**
     * 父容器顶部偏移
     */
    parentOffsetTop;
    colHight = 0;
    points = [];
    scrollTop = 0;
    children = [];
    moving = false;
    current = 0;
    currentName = '';
    currentBrief = '';
    extStyle = '';
    indicatorStyle = '';
    get classes() {
        const { prefixCls, indicatorPosition } = this;
        return {
            wrap: classNames(prefixCls),
            nav: `${prefixCls}__nav`,
            navRow: `${prefixCls}__nav-row`,
            navCol: `${prefixCls}__nav-col`,
            navItem: `${prefixCls}__nav-item`,
            indicator: classNames(`${prefixCls}__indicator`, {
                [`${prefixCls}__indicator--${indicatorPosition}`]: indicatorPosition,
            }),
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
     */
    updateStyle(height = this.height) {
        const extStyle = styleToCssString({ height });
        if (extStyle !== this.extStyle) {
            this.extStyle = extStyle;
        }
    }
    getChildrenNodes() {
        const nodes = (this._renderProxy.getRelationNodes?.('./item') || [])
            .map((node) => node.$component)
            .filter(Boolean);
        return nodes;
    }
    /**
     * 刷新元素数据
     */
    updated() {
        const elements = this.getChildrenNodes();
        if (elements.length > 0) {
            elements.forEach((element, index) => {
                const expose = element;
                expose.updated(index);
            });
            setTimeout(() => {
                this.getNavPoints().catch(() => { });
            }, 0);
        }
        this.updateChildren();
    }
    /**
     * 设置当前激活项
     */
    setActive(current, currentName) {
        if (current !== this.current || currentName !== this.currentName) {
            const target = findActiveByIndex(current, currentName, this.children);
            const currentBrief = target ? target.brief : currentName.charAt(0);
            if (target) {
                const indicatorStyle = this.indicatorPosition === 'right'
                    ? styleToCssString({ top: current * this.colHight + this.colHight / 2 })
                    : '';
                this.current = current;
                this.currentName = currentName;
                this.currentBrief = currentBrief;
                this.scrollTop = target.top - this.parentOffsetTop;
                this.indicatorStyle = indicatorStyle;
            }
            void vibrateShort({ type: 'light' });
            this.$emit('change', { index: current, name: currentName, brief: currentBrief });
        }
    }
    onTouchStart(e) {
        if (this.moving)
            return;
        const index = Number(e?.target?.dataset?.index ?? -1);
        const name = String(e?.target?.dataset?.name ?? '');
        this.setActive(index, name);
        this.moving = true;
    }
    onTouchMove(e) {
        const touch = e.changedTouches?.[0];
        if (!touch)
            return;
        const target = this.getTargetFromPoint(touch.pageY);
        if (target) {
            const { index, name } = target.dataset;
            this.setActive(index, name);
        }
    }
    onTouchEnd() {
        if (!this.moving)
            return;
        setTimeout(() => {
            this.moving = false;
        }, 300);
    }
    onScroll(e) {
        if (this.moving)
            return;
        this.checkActiveIndex(e.detail.scrollTop);
    }
    async getNavPoints() {
        const navColCls = `.${this.prefixCls}__nav-col`;
        const navItemCls = `.${this.prefixCls}__nav-item`;
        const list = (await useRectAll([navColCls, navItemCls], this._renderProxy));
        const cols = list[0] || [];
        const items = list[1] || [];
        if (!cols.length && !items.length)
            return;
        this.colHight = cols[0].height;
        this.points = items.map((n) => ({ ...n, offsets: [n.top, n.top + n.height] }));
    }
    getTargetFromPoint(y) {
        const points = this.points;
        let target;
        for (let i = points.length - 1; i >= 0; i--) {
            const [a, b] = points[i].offsets;
            if ((i === points.length - 1 && y > b) || (i === 0 && y < a) || (y >= a && y <= b)) {
                target = points[i];
                break;
            }
        }
        return target;
    }
    checkActiveIndex(scrollTop) {
        const target = findActiveByPosition(scrollTop, this.parentOffsetTop, this.children);
        if (target) {
            const current = target.index;
            const currentName = target.name;
            const currentBrief = target.brief;
            if (current !== this.current || currentName !== this.currentName) {
                this.current = current;
                this.currentName = currentName;
                this.currentBrief = currentBrief;
                this.$emit('change', { index: current, name: currentName, brief: currentBrief });
            }
        }
    }
    updateChildren() {
        const nodes = this.getChildrenNodes();
        this.children = nodes.map((node) => {
            const item = node;
            return {
                name: item.name,
                index: item.index,
                top: item.top,
                height: item.height,
                brief: item.brief,
            };
        });
    }
    getInternalHooks(key) {
        if (key === 'INDEX_HOOK_MARK') {
            return {
                updateChildren: this.updateChildren.bind(this),
            };
        }
        return null;
    }
    scrollTo(index) {
        const child = typeof index === 'number' ? this.children.filter((item) => item.index === index)[0] : this.children.filter((item) => item.name === index)[0];
        if (child) {
            this.moving = true;
            this.setActive(child.index, child.name);
            setTimeout(() => {
                this.moving = false;
            }, 300);
        }
    }
    mounted() {
        this.updateStyle();
        void this.getNavPoints();
        this.updateChildren();
    }
};
__decorate([
    Prop({ type: null, default: 300 })
], Index.prototype, "height", void 0);
__decorate([
    Prop({ type: Boolean, default: true })
], Index.prototype, "showIndicator", void 0);
__decorate([
    Prop({ type: String, default: 'center' })
], Index.prototype, "indicatorPosition", void 0);
__decorate([
    Prop({ type: Number, default: 0 })
], Index.prototype, "parentOffsetTop", void 0);
__decorate([
    Watch('height')
], Index.prototype, "onHeightChange", null);
Index = __decorate([
    Component({
        components: {
            IndexItem: () => ({
                module: './item',
                type: 'child',
                observer: 'onChildrenChanged',
            }),
        },
        expose: ['scrollTo', 'getInternalHooks'],
        props: {
            prefixCls: {
                type: String,
                default: 'dora-index',
            },
            height: {
                type: null,
                default: 300,
            },
            showIndicator: {
                type: Boolean,
                default: true,
            },
            indicatorPosition: {
                type: String,
                default: 'center',
            },
            parentOffsetTop: {
                type: Number,
                default: 0,
            },
        },
    })
], Index);
export default defineComponentHOC()(Index);
