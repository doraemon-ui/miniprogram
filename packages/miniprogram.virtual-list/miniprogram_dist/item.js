/**
 * @doraemon-ui/miniprogram.virtual-list.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:41:44.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { Doraemon, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { styleToCssString } = Doraemon.util;
let VirtualListItem = class VirtualListItem extends Doraemon {
    updated(index, height) {
        this.index = index;
        this.wrapStyle = styleToCssString({
            position: 'absolute',
            left: 0,
            top: index * height,
            width: '100%',
            height
        });
    }
    constructor(...args){
        super(...args);
        this.index = 0;
        this.wrapStyle = '';
    }
};
VirtualListItem = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-virtual-item'
            }
        },
        components: {
            VirtualList: ()=>({
                    module: './index',
                    type: 'parent'
                })
        }
    })
], VirtualListItem);
var item = defineComponentHOC()(VirtualListItem);

export { VirtualListItem, item as default };
