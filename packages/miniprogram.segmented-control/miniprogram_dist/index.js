/**
 * @doraemon-ui/miniprogram.segmented-control.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:40:37.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { Doraemon, Prop, Watch, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames } = Doraemon.util;
let SegmentedControl = class SegmentedControl extends Doraemon {
    get classes() {
        const { prefixCls, theme, disabled } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--${theme}`]: !!theme,
            [`${prefixCls}--disabled`]: disabled
        });
        return {
            wrap,
            item: `${prefixCls}__item`
        };
    }
    onCurrentChange(v) {
        if (this.controlled) this.activeKey = v;
    }
    onTap(e) {
        if (this.disabled) return;
        this.setActiveKey(e.currentTarget.dataset.index);
    }
    emitEvent(key) {
        this.$emit('change', {
            key,
            values: this.values
        });
    }
    setActiveKey(activeKey) {
        if (this.activeKey !== activeKey) {
            if (!this.controlled) this.activeKey = activeKey;
        }
        this.emitEvent(activeKey);
    }
    mounted() {
        const activeKey = this.controlled ? this.current : this.defaultCurrent;
        if (this.activeKey !== activeKey) this.activeKey = activeKey;
    }
    constructor(...args){
        super(...args);
        this.activeKey = 0;
    }
};
_ts_decorate([
    Prop({
        type: String,
        default: 'balanced'
    })
], SegmentedControl.prototype, "theme", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 0
    })
], SegmentedControl.prototype, "defaultCurrent", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 0
    })
], SegmentedControl.prototype, "current", void 0);
_ts_decorate([
    Prop({
        type: Array,
        default: []
    })
], SegmentedControl.prototype, "values", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], SegmentedControl.prototype, "disabled", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], SegmentedControl.prototype, "controlled", void 0);
_ts_decorate([
    Watch('current')
], SegmentedControl.prototype, "onCurrentChange", null);
SegmentedControl = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-segmented-control'
            }
        }
    })
], SegmentedControl);
var index = defineComponentHOC()(SegmentedControl);

export { SegmentedControl, index as default };
