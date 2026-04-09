/**
 * @doraemon-ui/miniprogram.timeline.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-06, 00:36:58.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js';
let Timeline = class Timeline extends Doraemon {
    prefixCls;
    pending;
    position;
    onChildrenChanged() {
        this.updateIsLastElement();
    }
    updateIsLastElement() {
        const proxy = this._renderProxy;
        let elements = [];
        if (proxy && typeof proxy.getRelationNodes === 'function') {
            elements = proxy.getRelationNodes('./timeline-item') || [];
        }
        if (elements.length > 0) {
            const lastIndex = elements.length - 1;
            elements.forEach((element, index) => {
                const isLast = this.pending ? index === Math.max(0, lastIndex - 1) : index === lastIndex;
                const isPending = this.pending && index === lastIndex;
                if (element && typeof element.updateIsLastElement === 'function') {
                    element.updateIsLastElement({
                        index,
                        isLast,
                        isPending,
                        pending: this.pending,
                        position: this.position,
                    });
                }
            });
        }
    }
    mounted() {
        this.updateIsLastElement();
    }
};
__decorate([
    Prop({ type: Boolean, default: false })
], Timeline.prototype, "pending", void 0);
__decorate([
    Prop({ type: String, default: 'left' })
], Timeline.prototype, "position", void 0);
Timeline = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-timeline',
            },
        },
        components: {
            TimelineItem: () => ({
                module: './timeline-item',
                type: 'child',
                observer: 'onChildrenChanged',
            }),
        },
    })
], Timeline);
export default defineComponentHOC()(Timeline);
