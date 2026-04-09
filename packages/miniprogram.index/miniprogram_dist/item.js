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
import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js';
import { useRect } from '@doraemon-ui/miniprogram.shared';
const { classNames } = Doraemon.util;
let IndexItem = class IndexItem extends Doraemon {
    /**
     * 自定义类名前缀
     */
    prefixCls;
    /**
     * 分组名称
     */
    name;
    index = 0;
    top = 0;
    height = 0;
    brief = '';
    get classes() {
        const { prefixCls } = this;
        return {
            wrap: classNames(prefixCls),
            hd: `${prefixCls}__hd`,
            bd: `${prefixCls}__bd`,
        };
    }
    getParentInstance() {
        const proxy = this._renderProxy;
        const nodes = (proxy?.getRelationNodes?.('./index') || [])
            .map((node) => node.$component)
            .filter(Boolean);
        return nodes[0];
    }
    refreshBrief() {
        const name = this.name || '';
        const brief = name ? name.charAt(0) : String(this.index);
        if (brief !== this.brief) {
            this.brief = brief;
        }
    }
    /**
     * 更新 index item 位置信息
     */
    updated(index) {
        this.index = index;
        this.refreshBrief();
        void useRect(`.${this.prefixCls}`, this._renderProxy).then((rect) => {
            if (!rect)
                return;
            this.top = rect.top;
            this.height = rect.height;
            const hooks = this.getParentInstance()?.getInternalHooks('INDEX_HOOK_MARK');
            hooks?.updateChildren();
        });
    }
    mounted() {
        this.refreshBrief();
    }
};
__decorate([
    Prop({ type: String, default: '' })
], IndexItem.prototype, "name", void 0);
IndexItem = __decorate([
    Component({
        components: {
            Index: () => ({
                module: './index',
                type: 'parent',
            }),
        },
        expose: ['updated'],
        props: {
            prefixCls: {
                type: String,
                default: 'dora-index-item',
            },
            name: {
                type: String,
                default: '',
            },
        },
    })
], IndexItem);
export default defineComponentHOC()(IndexItem);
