/**
 * @doraemon-ui/miniprogram.floating-panel.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-07-02, 20:47:05.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.66.
 */

import { Doraemon, Prop, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';
import { getPointsNumber, getTouchPoints, getSystemInfoSync } from '@doraemon-ui/miniprogram.shared';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames, styleToCssString } = Doraemon.util;
function nearest(arr, target) {
    return arr.reduce((prev, current)=>{
        return Math.abs(prev - target) < Math.abs(current - target) ? prev : current;
    });
}
function clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
}
function rubberband(distance, dimension, constant) {
    if (dimension === 0 || Math.abs(dimension) === Infinity) {
        return Math.pow(distance, constant * 5);
    }
    return distance * dimension * constant / (dimension + constant * distance);
}
function rubberbandIfOutOfBounds(position, min, max, constant = 0.15) {
    if (constant === 0) return clamp(position, min, max);
    if (position < min) return -rubberband(min - position, max - min, constant) + min;
    if (position > max) return rubberband(position - max, max - min, constant) + max;
    return position;
}
let FloatingPanel = class FloatingPanel extends Doraemon {
    get classes() {
        const prefixCls = this.prefixCls;
        return {
            wrap: classNames(prefixCls),
            hd: `${prefixCls}__hd`,
            bd: `${prefixCls}__bd`,
            bar: `${prefixCls}__bar`,
            mask: `${prefixCls}__mask`
        };
    }
    buildWrapStyle(y, duration) {
        return styleToCssString({
            height: `${-this.bounds.top}px`,
            transform: `translate3d(0, calc(100% + ${y}px), 0)`,
            transition: duration ? `cubic-bezier(0, 0, 0.2, 1.15) ${duration}s` : 'none'
        });
    }
    setTransform(y, duration) {
        const wrapStyle = this.buildWrapStyle(y, duration);
        if (this.wrapStyle !== wrapStyle) {
            this.wrapStyle = wrapStyle;
            if (duration) {
                setTimeout(()=>{
                    this.wrapStyle = this.buildWrapStyle(y);
                }, duration * 1000);
            }
            this.$emit('heightChange', {
                height: -y,
                minHeight: -this.bounds.bottom,
                maxHeight: -this.bounds.top,
                animating: !!duration
            });
        }
    }
    setHeight(height, options = {
        immediate: false
    }) {
        this.setTransform(-height, options.immediate ? 0.3 : 0);
        this.lastY = -height;
    }
    onTouchStart(e) {
        if (this.moving || getPointsNumber(e) > 1) return;
        this.startY = getTouchPoints(e).y;
        this.moveY = 0;
        this.endY = 0;
        this.moving = true;
    }
    onTouchMove(e) {
        if (!this.moving || getPointsNumber(e) > 1) return;
        this.moveY = getTouchPoints(e).y;
        const deltaY = this.moveY - this.startY;
        const offsetY = rubberbandIfOutOfBounds(Math.abs(this.lastY + deltaY), -this.bounds.bottom, -this.bounds.top);
        this.setTransform(-Math.round(offsetY));
    }
    onTouchEnd(e) {
        if (!this.moving || getPointsNumber(e) > 1) return;
        this.endY = getTouchPoints(e).y;
        const deltaY = this.endY - this.startY;
        const offsetY = this.lastY + deltaY;
        this.lastY = nearest(this.possibles, offsetY);
        this.setTransform(Math.round(this.lastY), 0.3);
        setTimeout(()=>{
            this.moving = false;
        }, 300);
    }
    mounted() {
        const anchors = this.defaultAnchors.filter((x)=>typeof x === 'number' && x > 0);
        const windowHeight = getSystemInfoSync([
            'window'
        ]).windowHeight;
        const possibles = anchors.length === 0 ? [
            -windowHeight
        ] : anchors.map((x)=>-x);
        this.possibles = possibles;
        this.bounds = {
            top: Math.round(possibles[possibles.length - 1]),
            bottom: Math.round(possibles[0])
        };
        this.lastY = this.bounds.bottom;
        this.setTransform(this.bounds.bottom);
    }
    constructor(...args){
        super(...args);
        this.wrapStyle = '';
        this.possibles = [];
        this.moving = false;
        this.startY = 0;
        this.moveY = 0;
        this.endY = 0;
        this.lastY = 0;
        this.bounds = {
            top: -1,
            bottom: -1
        };
    }
};
_ts_decorate([
    Prop({
        type: Array,
        default: ()=>[]
    })
], FloatingPanel.prototype, "defaultAnchors", void 0);
FloatingPanel = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-floating-panel'
            }
        },
        expose: [
            'setHeight'
        ]
    })
], FloatingPanel);
var index = defineComponentHOC()(FloatingPanel);

export { FloatingPanel, index as default };
