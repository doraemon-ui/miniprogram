/**
 * @doraemon-ui/miniprogram.grid.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-02-26, 21:20:50.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js';
const { classNames } = Doraemon.util;
let Grids = class Grids extends Doraemon {
    prefixCls;
    col;
    bordered;
    square;
    get classes() {
        const { prefixCls, bordered } = this;
        return {
            wrap: classNames(prefixCls, {
                [`${prefixCls}--bordered`]: bordered,
            }),
        };
    }
    onPropsChange() {
        this.changeCurrent();
    }
    onChildrenChanged() {
        this.changeCurrent();
    }
    changeCurrent() {
        const elements = this.$children;
        const colNum = Number(this.col) > 0 ? Number(this.col) : 1;
        const width = `${100 / colNum}%`;
        if (elements.length > 0) {
            elements.forEach((element, index) => {
                element.changeCurrent(width, this.bordered, this.square, index);
            });
        }
    }
    mounted() {
        this.changeCurrent();
    }
};
__decorate([
    Prop({ type: Number, default: 3 })
], Grids.prototype, "col", void 0);
__decorate([
    Prop({ type: Boolean, default: true })
], Grids.prototype, "bordered", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Grids.prototype, "square", void 0);
__decorate([
    Watch('col'),
    Watch('bordered'),
    Watch('square')
], Grids.prototype, "onPropsChange", null);
Grids = __decorate([
    Component({
        components: {
            Grid: () => ({
                module: './item',
                type: 'descendant',
                observer: 'onChildrenChanged',
            }),
        },
        props: {
            prefixCls: {
                type: String,
                default: 'dora-grids',
            },
        },
    })
], Grids);
export default defineComponentHOC()(Grids);
