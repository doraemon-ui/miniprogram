/**
 * @doraemon-ui/miniprogram.steps.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-05, 18:30:15.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js';
let Steps = class Steps extends Doraemon {
    prefixCls;
    current;
    direction;
    onCurrentChange() {
        this.updateCurrent();
    }
    getChildrenSteps() {
        const nodes = this._renderProxy?.getRelationNodes?.('./step') || [];
        return nodes.map((n) => n?.$component).filter(Boolean);
    }
    onChildrenChanged() {
        this.updateCurrent();
    }
    updateCurrent() {
        const elements = this.getChildrenSteps();
        const { current, direction } = this;
        elements.forEach((element, index) => {
            element.updateCurrent({
                length: elements.length,
                index,
                current,
                direction,
            });
        });
    }
    mounted() {
        this.updateCurrent();
    }
};
__decorate([
    Prop({ type: Number, default: 0 })
], Steps.prototype, "current", void 0);
__decorate([
    Prop({ type: String, default: 'horizontal' })
], Steps.prototype, "direction", void 0);
__decorate([
    Watch('current')
], Steps.prototype, "onCurrentChange", null);
Steps = __decorate([
    Component({
        components: {
            Step: () => ({
                module: './step',
                type: 'child',
                observer: 'onChildrenChanged',
            }),
        },
        props: {
            prefixCls: {
                type: String,
                default: 'dora-steps',
            },
            current: {
                type: Number,
                default: 0,
            },
            direction: {
                type: String,
                default: 'horizontal',
            },
        },
    })
], Steps);
export default defineComponentHOC()(Steps);
