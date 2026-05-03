/**
 * @doraemon-ui/miniprogram.steps.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:41:00.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { Prop, Watch, Component, defineComponentHOC, Doraemon } from '@doraemon-ui/miniprogram.core-js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let Steps = class Steps extends Doraemon {
    onCurrentChange() {
        this.updateCurrent();
    }
    getChildrenSteps() {
        const nodes = this._renderProxy?.getRelationNodes?.('./step') || [];
        return nodes.map((n)=>n?.$component).filter(Boolean);
    }
    onChildrenChanged() {
        this.updateCurrent();
    }
    updateCurrent() {
        const elements = this.getChildrenSteps();
        const { current, direction } = this;
        elements.forEach((element, index)=>{
            element.updateCurrent({
                length: elements.length,
                index,
                current,
                direction
            });
        });
    }
    mounted() {
        this.updateCurrent();
    }
};
_ts_decorate([
    Prop({
        type: Number,
        default: 0
    })
], Steps.prototype, "current", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'horizontal'
    })
], Steps.prototype, "direction", void 0);
_ts_decorate([
    Watch('current')
], Steps.prototype, "onCurrentChange", null);
Steps = _ts_decorate([
    Component({
        components: {
            Step: ()=>({
                    module: './step',
                    type: 'child',
                    observer: 'onChildrenChanged'
                })
        },
        props: {
            prefixCls: {
                type: String,
                default: 'dora-steps'
            },
            current: {
                type: Number,
                default: 0
            },
            direction: {
                type: String,
                default: 'horizontal'
            }
        }
    })
], Steps);
var index = defineComponentHOC()(Steps);

export { Steps, index as default };
