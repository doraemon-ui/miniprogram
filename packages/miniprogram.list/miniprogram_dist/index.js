/**
 * @doraemon-ui/miniprogram.list.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:42:13.
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
const { classNames, styleToCssString } = Doraemon.util;
let List = class List extends Doraemon {
    get classes() {
        const { prefixCls, mode, hasLine } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--card`]: mode === 'card',
            [`${prefixCls}--has-line`]: hasLine
        });
        const hd = `${prefixCls}__hd`;
        const bd = `${prefixCls}__bd`;
        const ft = `${prefixCls}__ft`;
        return {
            wrap,
            hd,
            bd,
            ft
        };
    }
    get containerStyle() {
        return this.wrapStyle ? styleToCssString(this.wrapStyle) : '';
    }
    get internalBodyStyle() {
        return this.bodyStyle ? styleToCssString(this.bodyStyle) : '';
    }
    updateIsLast() {
        const elements = this.$children;
        if (elements.length > 0) {
            const lastIndex = elements.length - 1;
            elements.forEach((element, index)=>{
                element.updateIsLast(index === lastIndex);
            });
        }
    }
    getBoundingClientRect() {
        return useRect(`.${this.prefixCls}`, this._renderProxy);
    }
    mounted() {
        this.updateIsLast();
    }
};
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], List.prototype, "title", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], List.prototype, "label", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'default'
    })
], List.prototype, "mode", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: true
    })
], List.prototype, "hasLine", void 0);
_ts_decorate([
    Prop({
        type: Object,
        default: null
    })
], List.prototype, "wrapStyle", void 0);
_ts_decorate([
    Prop({
        type: Object,
        default: null
    })
], List.prototype, "bodyStyle", void 0);
List = _ts_decorate([
    Component({
        components: {
            ListItem: ()=>({
                    module: './item',
                    type: 'descendant',
                    observer: 'updateIsLast'
                })
        },
        props: {
            prefixCls: {
                type: String,
                default: 'dora-list'
            }
        },
        expose: [
            'getBoundingClientRect'
        ]
    })
], List);
var index = defineComponentHOC({
    multipleSlots: false
})(List);

export { List, index as default };
