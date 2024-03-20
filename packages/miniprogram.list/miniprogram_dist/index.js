/**
 * @doraemon-ui/miniprogram.list.
 * © 2021 - 2024 Doraemon UI.
 * Built on 2024-03-20, 18:18:01.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.18.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component } from '@doraemon-ui/miniprogram.core-js';
let List = class List extends Doraemon {
    get classes() {
        const { prefixCls } = this;
        const wrap = prefixCls;
        const hd = `${prefixCls}__hd`;
        const bd = `${prefixCls}__bd`;
        const ft = `${prefixCls}__ft`;
        return {
            wrap,
            hd,
            bd,
            ft,
        };
    }
    updateIsLastElement() {
        const elements = this.$children;
        if (elements.length > 0) {
            const lastIndex = elements.length - 1;
            elements.forEach((element, index) => {
                element.updateIsLastElement(index === lastIndex);
            });
        }
    }
};
List = __decorate([
    Component({
        components: {
            ListItem: () => ({
                module: './item',
                type: 'descendant',
                observer: 'updateIsLastElement',
            }),
        },
        props: {
            prefixCls: {
                type: String,
                default: 'dora-list',
            },
            title: {
                type: String,
                default: '',
            },
            label: {
                type: String,
                default: '',
            },
        },
    })
], List);
export default defineComponentHOC({ multipleSlots: false })(List);
