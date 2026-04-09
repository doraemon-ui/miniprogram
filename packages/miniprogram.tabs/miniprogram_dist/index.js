/**
 * @doraemon-ui/miniprogram.tabs.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-02-26, 00:33:53.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js';
import { useRef } from '@doraemon-ui/miniprogram.shared';
const { classNames, styleToCssString } = Doraemon.util;
const bound = (x, min, max) => Math.min(Math.max(x, min), max);
const getDefaultActiveKey = (elements) => {
    const target = elements.filter((e) => !e.disabled)[0];
    return target ? target.key : null;
};
const activeKeyIsValid = (elements, key) => elements.map((e) => e.key).includes(key);
const getActiveKey = (elements, activeKey) => {
    const defaultActiveKey = getDefaultActiveKey(elements);
    return !activeKey ? defaultActiveKey : !activeKeyIsValid(elements, activeKey) ? defaultActiveKey : activeKey;
};
let Tabs = class Tabs extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Tabs
     */
    prefixCls;
    defaultCurrent;
    current;
    scroll;
    controlled;
    theme;
    direction;
    justify;
    activeLineMode;
    activeKey = '';
    keys = [];
    scrollLeft = 0;
    scrollTop = 0;
    showPrevMask = false;
    showNextMask = false;
    scrollViewStyle = '';
    updateMask;
    onCurrentChange(newVal) {
        if (this.controlled) {
            this.updated(newVal);
        }
    }
    onJustifyChange(newVal) {
        this.setStyles(newVal);
    }
    get classes() {
        const { prefixCls, direction, scroll } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--${direction}`]: direction,
            [`${prefixCls}--scroll`]: scroll,
        });
        const scrollView = `${prefixCls}__scroll-view`;
        const prev = classNames([`${prefixCls}__mask`, `${prefixCls}__mask--prev`]);
        const next = classNames([`${prefixCls}__mask`, `${prefixCls}__mask--next`]);
        return {
            wrap,
            scrollView,
            prev,
            next,
        };
    }
    tabsContainerRef() {
        const prefixCls = this.prefixCls;
        return useRef(`.${prefixCls}__scroll-view`, this._renderProxy).then((container) => {
            return {
                containerWidth: container.width,
                containerHeight: container.height,
                containerScrollWidth: container.scrollWidth,
                containerScrollHeight: container.scrollHeight,
                containerScrollLeft: container.scrollLeft,
                containerScrollTop: container.scrollTop,
                containerOffsetX: container.left,
                containerOffsetY: container.top,
            };
        });
    }
    onScrollFix() {
        const { direction } = this;
        if (direction === 'horizontal') {
            if (!this.updateMask) {
                this.updateMask = () => {
                    this.tabsContainerRef().then((container) => {
                        const scrollLeft = container.containerScrollLeft;
                        const showPrevMask = scrollLeft > 0;
                        const showNextMask = Math.round(scrollLeft + container.containerWidth) < Math.round(container.containerScrollWidth);
                        this.showPrevMask = showPrevMask;
                        this.showNextMask = showNextMask;
                    });
                };
            }
            this.updateMask();
        }
        if (direction === 'vertical') {
            if (!this.updateMask) {
                this.updateMask = () => {
                    this.tabsContainerRef().then((container) => {
                        const scrollTop = container.containerScrollTop;
                        const showPrevMask = scrollTop > 0;
                        const showNextMask = Math.round(scrollTop + container.containerHeight) < Math.round(container.containerScrollHeight);
                        this.showPrevMask = showPrevMask;
                        this.showNextMask = showNextMask;
                    });
                };
            }
            this.updateMask();
        }
    }
    async setNextScroll(activeElement) {
        const { direction, scroll } = this;
        if (!scroll)
            return;
        const [container, activeTab] = await Promise.all([this.tabsContainerRef(), activeElement.activeTabRef()]);
        if (direction === 'horizontal') {
            const maxScrollDistance = container.containerScrollWidth - container.containerWidth;
            if (maxScrollDistance <= 0)
                return;
            const nextScrollLeft = Math.round(bound(container.containerScrollLeft + (activeTab.activeTabLeft - container.containerOffsetX) - (container.containerWidth - activeTab.activeTabWidth) / 2, 0, maxScrollDistance));
            this.scrollLeft = nextScrollLeft;
            this.onScrollFix();
        }
        if (direction === 'vertical') {
            const maxScrollDistance = container.containerScrollHeight - container.containerHeight;
            if (maxScrollDistance <= 0)
                return;
            const nextScrollTop = Math.round(bound(container.containerScrollTop + (activeTab.activeTabTop - container.containerOffsetY) - (container.containerHeight - activeTab.activeTabHeight) / 2, 0, maxScrollDistance));
            this.scrollTop = nextScrollTop;
            this.onScrollFix();
        }
    }
    getChildrenTabs() {
        const nodes = this._renderProxy?.getRelationNodes?.('./tab') || [];
        return nodes.map((n) => n?.$component).filter(Boolean);
    }
    onChildrenChanged() {
        // 关系节点变动时，刷新 keys 和 active 状态
        this.updated(this.activeKey);
    }
    updated(value = this.activeKey) {
        const children = this.getChildrenTabs();
        const elements = children.map((c) => ({ key: c.key, title: c.title, disabled: !!c.disabled }));
        const activeKey = getActiveKey(elements, value) || '';
        this.keys = elements;
        if (this.activeKey !== activeKey) {
            this.activeKey = activeKey;
        }
        const context = {
            scroll: this.scroll,
            theme: this.theme,
            direction: this.direction,
            activeLineMode: this.activeLineMode,
        };
        children.forEach((child) => {
            child.changeCurrent({
                current: child.key === activeKey,
                context,
            });
            if (child.key === activeKey) {
                this.setNextScroll(child).catch(() => { });
            }
        });
    }
    emitEvent(key) {
        this.$emit('change', {
            key,
            keys: this.keys,
        });
    }
    setActiveKey(activeKey) {
        if (!this.controlled) {
            this.activeKey = activeKey;
        }
        this.updated(activeKey);
        this.emitEvent(activeKey);
    }
    setStyles(justify) {
        if (this.direction === 'horizontal') {
            const scrollViewStyle = styleToCssString({ 'justify-content': justify });
            if (this.scrollViewStyle !== scrollViewStyle) {
                this.scrollViewStyle = scrollViewStyle;
            }
        }
    }
    mounted() {
        const activeKey = this.controlled ? this.current : this.defaultCurrent;
        this.activeKey = activeKey;
        this.setStyles(this.justify);
        this.updated(activeKey);
    }
};
__decorate([
    Prop({
        type: String,
        default: '',
    })
], Tabs.prototype, "defaultCurrent", void 0);
__decorate([
    Prop({ type: String, default: '' })
], Tabs.prototype, "current", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Tabs.prototype, "scroll", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Tabs.prototype, "controlled", void 0);
__decorate([
    Prop({ type: String, default: 'balanced' })
], Tabs.prototype, "theme", void 0);
__decorate([
    Prop({ type: String, default: 'horizontal' })
], Tabs.prototype, "direction", void 0);
__decorate([
    Prop({ type: String, default: 'space-around' })
], Tabs.prototype, "justify", void 0);
__decorate([
    Prop({ type: String, default: 'auto' })
], Tabs.prototype, "activeLineMode", void 0);
__decorate([
    Watch('current')
], Tabs.prototype, "onCurrentChange", null);
__decorate([
    Watch('justify')
], Tabs.prototype, "onJustifyChange", null);
Tabs = __decorate([
    Component({
        components: {
            Tab: () => ({
                module: './tab',
                type: 'child',
                observer: 'onChildrenChanged',
            }),
        },
        props: {
            prefixCls: {
                type: String,
                default: 'dora-tabs',
            },
            defaultCurrent: {
                type: String,
                default: '',
            },
            current: {
                type: String,
                default: '',
            },
            scroll: {
                type: Boolean,
                default: false,
            },
            controlled: {
                type: Boolean,
                default: false,
            },
            theme: {
                type: String,
                default: 'balanced',
            },
            direction: {
                type: String,
                default: 'horizontal',
            },
            justify: {
                type: String,
                default: 'space-around',
            },
            activeLineMode: {
                type: String,
                default: 'auto',
            },
        },
        expose: ['setActiveKey'],
    })
], Tabs);
export default defineComponentHOC()(Tabs);
