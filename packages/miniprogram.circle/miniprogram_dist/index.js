/**
 * @doraemon-ui/miniprogram.circle.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:38:26.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { Doraemon, Prop, Watch, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';
import { useRef, getSystemInfoSync } from '@doraemon-ui/miniprogram.shared';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames } = Doraemon.util;
const toAngle = (a)=>a / 180 * Math.PI;
const toPercentAngle = (a)=>toAngle(a / 100 * 360);
const easeInOutCubic = (a, b, c, d)=>{
    let t = a / (d / 2);
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
};
let Circle = class Circle extends Doraemon {
    get classes() {
        const { prefixCls } = this;
        const wrap = classNames(prefixCls);
        const inner = `${prefixCls}__inner`;
        return {
            wrap,
            inner
        };
    }
    onSizeChange(newVal) {
        this.updateStyle(newVal);
    }
    onPercentChange(newVal) {
        this.redraw(newVal);
    }
    onSAngleChange(newVal) {
        this.beginAngle = toAngle(newVal);
    }
    async getCanvasNode(canvasId) {
        const ref = await useRef(`#${canvasId}`, this._renderProxy);
        return ref.node;
    }
    /**
   * 更新样式
   */ updateStyle(size = this.size) {
        this.style = `width: ${size}px; height: ${size}px;`;
    }
    /**
   * 着帧绘制 canvas
   */ redraw(value = this.percent) {
        const endAngle = toPercentAngle(value);
        const now = Date.now();
        const decrease = this.currentAngle > endAngle;
        const startAngle = !decrease ? this.currentAngle : this.endAngle;
        this.clearTimer();
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.animateFrame(now, now, decrease);
    }
    /**
   * 绘制 canvas
   */ async draw(hasLine = true) {
        const { lineCap, backgroundColor, color, size, strokeWidth, counterclockwise, background } = this;
        const position = size / 2;
        const radius = position - strokeWidth / 2;
        const p = 2 * Math.PI;
        const startAngle = counterclockwise ? p - this.beginAngle : this.beginAngle;
        const endAngle = counterclockwise ? p - (this.beginAngle + this.currentAngle) : this.beginAngle + this.currentAngle;
        const canvasId = this.classes.wrap;
        const canvas = await this.getCanvasNode(canvasId);
        const ctx = canvas.getContext('2d');
        const ratio = getSystemInfoSync([
            'window'
        ]).pixelRatio || 1;
        canvas.width = size * ratio;
        canvas.height = size * ratio;
        ctx.scale(ratio, ratio);
        ctx.fillRect(0, 0, size, size);
        ctx.clearRect(0, 0, size, size);
        if (background) {
            ctx.beginPath();
            ctx.arc(position, position, radius, 0, 2 * Math.PI);
            ctx.lineWidth = strokeWidth;
            ctx.strokeStyle = backgroundColor;
            ctx.stroke();
        }
        if (hasLine) {
            ctx.beginPath();
            ctx.arc(position, position, radius, startAngle, endAngle);
            ctx.lineWidth = strokeWidth;
            ctx.strokeStyle = color;
            ctx.lineCap = lineCap;
            ctx.stroke();
        }
        this.$emit('change', {
            value: this.currentAngle
        });
    }
    /**
   * 开始动画
   */ animateFrame(c, d, decrease) {
        const now = Date.now();
        const f = now - c < 1 ? 1 : now - c;
        const { animate, speed, startAngle, endAngle } = this;
        const isEnd = !decrease && 1000 * this.currentAngle <= Math.floor(1000 * endAngle) || decrease && 1000 * this.currentAngle >= Math.floor(1000 * endAngle);
        if (animate && c - d < 1.05 * speed && isEnd) {
            const value = easeInOutCubic((c - d) / f, startAngle, endAngle - startAngle, speed / f);
            const currentAngle = value < 0 ? 0 : value;
            c = Date.now();
            this.currentAngle = currentAngle;
            void this.draw(currentAngle !== 0);
            this.timer = setTimeout(()=>this.animateFrame(c, d, decrease), 1000 / 60);
            return;
        }
        this.currentAngle = endAngle;
        void this.draw(endAngle !== 0);
    }
    /**
   * 清除定时器
   */ clearTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }
    mounted() {
        this.updateStyle(this.size);
        this.beginAngle = toAngle(this.sAngle);
        this.redraw(this.percent);
    }
    detached() {
        this.clearTimer();
    }
    constructor(...args){
        super(...args);
        this.beginAngle = 0;
        this.startAngle = 0;
        this.endAngle = 0;
        this.currentAngle = 0;
        this.style = '';
        this.timer = null;
    }
};
_ts_decorate([
    Prop({
        type: Number,
        default: 0
    })
], Circle.prototype, "percent", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 10
    })
], Circle.prototype, "strokeWidth", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 120
    })
], Circle.prototype, "size", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'round'
    })
], Circle.prototype, "lineCap", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: '#f3f3f3'
    })
], Circle.prototype, "backgroundColor", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: '#33cd5f'
    })
], Circle.prototype, "color", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 0
    })
], Circle.prototype, "sAngle", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Circle.prototype, "counterclockwise", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 2000
    })
], Circle.prototype, "speed", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: true
    })
], Circle.prototype, "animate", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: true
    })
], Circle.prototype, "background", void 0);
_ts_decorate([
    Watch('size')
], Circle.prototype, "onSizeChange", null);
_ts_decorate([
    Watch('percent')
], Circle.prototype, "onPercentChange", null);
_ts_decorate([
    Watch('sAngle')
], Circle.prototype, "onSAngleChange", null);
Circle = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-circle'
            },
            percent: {
                type: Number,
                default: 0
            },
            strokeWidth: {
                type: Number,
                default: 10
            },
            size: {
                type: Number,
                default: 120
            },
            lineCap: {
                type: String,
                default: 'round'
            },
            backgroundColor: {
                type: String,
                default: '#f3f3f3'
            },
            color: {
                type: String,
                default: '#33cd5f'
            },
            sAngle: {
                type: Number,
                default: 0
            },
            counterclockwise: {
                type: Boolean,
                default: false
            },
            speed: {
                type: Number,
                default: 2000
            },
            animate: {
                type: Boolean,
                default: true
            },
            background: {
                type: Boolean,
                default: true
            }
        }
    })
], Circle);
var index = defineComponentHOC()(Circle);

export { Circle, index as default };
