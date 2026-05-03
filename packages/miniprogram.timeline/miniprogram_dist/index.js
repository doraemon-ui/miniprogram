/**
 * @doraemon-ui/miniprogram.timeline.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:41:28.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { Prop, Component, defineComponentHOC, Doraemon } from '@doraemon-ui/miniprogram.core-js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let Timeline = class Timeline extends Doraemon {
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
            elements.forEach((element, index)=>{
                const isLast = this.pending ? index === Math.max(0, lastIndex - 1) : index === lastIndex;
                const isPending = this.pending && index === lastIndex;
                if (element && typeof element.updateIsLastElement === 'function') {
                    element.updateIsLastElement({
                        index,
                        isLast,
                        isPending,
                        pending: this.pending,
                        position: this.position
                    });
                }
            });
        }
    }
    mounted() {
        this.updateIsLastElement();
    }
};
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Timeline.prototype, "pending", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'left'
    })
], Timeline.prototype, "position", void 0);
Timeline = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-timeline'
            }
        },
        components: {
            TimelineItem: ()=>({
                    module: './timeline-item',
                    type: 'child',
                    observer: 'onChildrenChanged'
                })
        }
    })
], Timeline);
var index = defineComponentHOC()(Timeline);

export { Timeline, index as default };
