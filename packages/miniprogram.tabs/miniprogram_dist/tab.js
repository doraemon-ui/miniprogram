/**
 * @doraemon-ui/miniprogram.tabs.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-07-02, 20:46:48.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.66.
 */

import { Doraemon, Prop, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';
import { getDefaultContext, useRect } from '@doraemon-ui/miniprogram.shared';
import { tabsProps } from './props.js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames } = Doraemon.util;
const defaultContext = {
    ...getDefaultContext(tabsProps, [
        'scroll',
        'color',
        'direction',
        'activeLineMode'
    ])
};
let Tab = class Tab extends Doraemon {
    get classes() {
        const { prefixCls, disabled, current, context } = this;
        const wrap = classNames(prefixCls, {
            ['dora-color']: context?.color,
            [`dora-color--${context?.color}`]: context?.color,
            [`${prefixCls}--${context?.direction}`]: context?.direction,
            [`${prefixCls}--scroll`]: context?.scroll,
            [`${prefixCls}--current`]: current,
            [`${prefixCls}--disabled`]: disabled
        });
        const title = `${prefixCls}-title`;
        const bar = classNames(`${prefixCls}-bar`, {
            [`${prefixCls}-bar--${context?.activeLineMode}`]: context?.activeLineMode
        });
        return {
            wrap,
            title,
            bar
        };
    }
    async activeTabRef() {
        const prefixCls = this.prefixCls;
        const activeTab = await useRect(`.${prefixCls}`, this._renderProxy);
        return {
            activeTabLeft: activeTab.left,
            activeTabWidth: activeTab.width,
            activeTabTop: activeTab.top,
            activeTabHeight: activeTab.height
        };
    }
    changeCurrent({ current, context = defaultContext }) {
        this.current = current;
        this.context = context;
    }
    onTap() {
        const { key, disabled } = this;
        if (disabled) return;
        this.$emit('click', {
            key
        });
        const parent = this.$parent;
        parent?.setActiveKey?.(key);
    }
    constructor(...args){
        super(...args);
        this.current = false;
        this.context = defaultContext;
    }
};
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Tab.prototype, "key", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Tab.prototype, "title", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Tab.prototype, "disabled", void 0);
Tab = _ts_decorate([
    Component({
        components: {
            Tabs: ()=>({
                    module: './index',
                    type: 'parent'
                })
        },
        props: {
            prefixCls: {
                type: String,
                default: 'dora-tabs__tab'
            }
        }
    })
], Tab);
var tab = defineComponentHOC()(Tab);

export { Tab, tab as default };
