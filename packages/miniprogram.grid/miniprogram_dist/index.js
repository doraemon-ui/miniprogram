/**
 * @doraemon-ui/miniprogram.grid.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-07-02, 19:40:44.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.65.
 */

import { Doraemon, Prop, Watch, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames } = Doraemon.util;
let Grid = class Grid extends Doraemon {
    get classes() {
        const { prefixCls, bordered } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--bordered`]: bordered
        });
        return {
            wrap
        };
    }
    onPropsChange() {
        this.changeCurrent();
    }
    changeCurrent() {
        const elements = this.$children;
        const { col, bordered, square } = this;
        const colNum = col > 0 ? col : 1;
        const width = `${100 / colNum}%`;
        if (elements.length > 0) {
            elements.forEach((element, index)=>{
                element.changeCurrent(width, bordered, square, index);
            });
        }
    }
    onChildrenChanged() {
        this.changeCurrent();
    }
};
_ts_decorate([
    Prop({
        type: Number,
        default: 3
    })
], Grid.prototype, "col", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: true
    })
], Grid.prototype, "bordered", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Grid.prototype, "square", void 0);
_ts_decorate([
    Watch('col'),
    Watch('bordered'),
    Watch('square')
], Grid.prototype, "onPropsChange", null);
Grid = _ts_decorate([
    Component({
        components: {
            GridItem: ()=>({
                    module: './item',
                    type: 'child',
                    observer: 'onChildrenChanged'
                })
        },
        props: {
            prefixCls: {
                type: String,
                default: 'dora-grid'
            }
        }
    })
], Grid);
var index = defineComponentHOC()(Grid);

export { Grid, index as default };
