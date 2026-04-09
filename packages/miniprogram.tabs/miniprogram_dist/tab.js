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
import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js';
import { useRect } from '@doraemon-ui/miniprogram.shared';
const { classNames } = Doraemon.util;
const defaultContext = {
    scroll: false,
    theme: 'balanced',
    direction: 'horizontal',
    activeLineMode: 'auto',
};
let Tab = class Tab extends Doraemon {
    prefixCls;
    key;
    title;
    disabled;
    current = false;
    tabContext = defaultContext;
    get classes() {
        const { prefixCls, disabled, current } = this;
        const ctx = this.tabContext || defaultContext;
        const { direction, scroll, theme, activeLineMode } = ctx;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--${direction}`]: direction,
            [`${prefixCls}--${theme}`]: theme,
            [`${prefixCls}--scroll`]: scroll,
            [`${prefixCls}--current`]: current,
            [`${prefixCls}--disabled`]: disabled,
        });
        const title = `${prefixCls}-title`;
        const bar = classNames(`${prefixCls}-bar`, {
            [`${prefixCls}-bar--${activeLineMode}`]: activeLineMode,
        });
        return { wrap, title, bar };
    }
    activeTabRef() {
        const prefixCls = this.prefixCls;
        return useRect(`.${prefixCls}`, this._renderProxy).then((activeTab) => {
            return {
                activeTabLeft: activeTab.left,
                activeTabWidth: activeTab.width,
                activeTabTop: activeTab.top,
                activeTabHeight: activeTab.height,
            };
        });
    }
    changeCurrent({ current, context = defaultContext }) {
        this.current = current;
        this.tabContext = context;
    }
    onTap() {
        const { key, disabled } = this;
        if (disabled)
            return;
        this.$emit('click', { key });
        const parents = this._renderProxy?.getRelationNodes?.('./index') || [];
        const parent = parents[0]?.$component;
        parent?.setActiveKey?.(key);
    }
};
__decorate([
    Prop({ type: String, default: '' })
], Tab.prototype, "key", void 0);
__decorate([
    Prop({ type: String, default: '' })
], Tab.prototype, "title", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Tab.prototype, "disabled", void 0);
Tab = __decorate([
    Component({
        components: {
            Tabs: () => ({
                module: './index',
                type: 'parent',
            }),
        },
        props: {
            prefixCls: { type: String, default: 'dora-tabs__tab' },
            key: { type: String, default: '' },
            title: { type: String, default: '' },
            disabled: { type: Boolean, default: false },
        },
    })
], Tab);
export default defineComponentHOC()(Tab);
