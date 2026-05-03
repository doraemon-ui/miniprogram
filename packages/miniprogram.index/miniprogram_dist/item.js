/**
 * @doraemon-ui/miniprogram.index.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:39:19.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { Doraemon, Prop, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';
import { useRect } from '@doraemon-ui/miniprogram.shared';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames } = Doraemon.util;
let IndexItem = class IndexItem extends Doraemon {
    get classes() {
        const { prefixCls } = this;
        return {
            wrap: classNames(prefixCls),
            hd: `${prefixCls}__hd`,
            bd: `${prefixCls}__bd`
        };
    }
    getParentInstance() {
        const proxy = this._renderProxy;
        const nodes = (proxy?.getRelationNodes?.('./index') || []).map((node)=>node.$component).filter(Boolean);
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
   */ updated(index) {
        this.index = index;
        this.refreshBrief();
        void useRect(`.${this.prefixCls}`, this._renderProxy).then((rect)=>{
            if (!rect) return;
            this.top = rect.top;
            this.height = rect.height;
            const hooks = this.getParentInstance()?.getInternalHooks('INDEX_HOOK_MARK');
            hooks?.updateChildren();
        });
    }
    mounted() {
        this.refreshBrief();
    }
    constructor(...args){
        super(...args);
        this.index = 0;
        this.top = 0;
        this.height = 0;
        this.brief = '';
    }
};
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], IndexItem.prototype, "name", void 0);
IndexItem = _ts_decorate([
    Component({
        components: {
            Index: ()=>({
                    module: './index',
                    type: 'parent'
                })
        },
        expose: [
            'updated'
        ],
        props: {
            prefixCls: {
                type: String,
                default: 'dora-index-item'
            },
            name: {
                type: String,
                default: ''
            }
        }
    })
], IndexItem);
var item = defineComponentHOC()(IndexItem);

export { IndexItem, item as default };
