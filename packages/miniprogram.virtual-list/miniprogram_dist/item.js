/**
 * @doraemon-ui/miniprogram.virtual-list.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-07, 16:47:52.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component } from '@doraemon-ui/miniprogram.core-js';
const { styleToCssString } = Doraemon.util;
let VirtualListItem = class VirtualListItem extends Doraemon {
    prefixCls;
    index = 0;
    wrapStyle = '';
    updated(index, height) {
        this.index = index;
        this.wrapStyle = styleToCssString({
            position: 'absolute',
            left: 0,
            top: index * height,
            width: '100%',
            height,
        });
    }
};
VirtualListItem = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-virtual-item',
            },
        },
        components: {
            VirtualList: () => ({
                module: './index',
                type: 'parent',
            }),
        },
    })
], VirtualListItem);
export { VirtualListItem };
export default defineComponentHOC()(VirtualListItem);
