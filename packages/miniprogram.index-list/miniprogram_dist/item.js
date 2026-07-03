/**
 * @doraemon-ui/miniprogram.index-list.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-07-02, 20:46:53.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.66.
 */

import { Doraemon, Prop, Watch, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';
import { useRect } from '@doraemon-ui/miniprogram.shared';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames } = Doraemon.util;
let IndexListItem = class IndexListItem extends Doraemon {
    get classes() {
        const { prefixCls } = this;
        return {
            root: classNames(prefixCls),
            hd: `${prefixCls}__hd`,
            bd: `${prefixCls}__bd`
        };
    }
    getParentInstance() {
        return this.$parent;
    }
    refreshBrief() {
        const name = this.name || '';
        const brief = name ? name.charAt(0) : String(this.index);
        if (brief !== this.brief) {
            this.brief = brief;
        }
        this.getParentInstance()?.updateNavList();
    }
    /**
   * 更新 index item 位置信息
   */ updated(index) {
        useRect(`.${this.prefixCls}`, this._renderProxy).then((rect)=>{
            if (!rect) {
                return;
            }
            this.top = rect.top;
            this.height = rect.height;
            this.index = index;
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
], IndexListItem.prototype, "name", void 0);
_ts_decorate([
    Watch('name'),
    Watch('index'),
    Watch('top'),
    Watch('height')
], IndexListItem.prototype, "refreshBrief", null);
IndexListItem = _ts_decorate([
    Component({
        components: {
            IndexList: ()=>({
                    module: './index',
                    type: 'parent'
                })
        },
        props: {
            prefixCls: {
                type: String,
                default: 'dora-index-list-item'
            }
        }
    })
], IndexListItem);
var item = defineComponentHOC()(IndexListItem);

export { IndexListItem, item as default };
