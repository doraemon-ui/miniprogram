/**
 * @doraemon-ui/miniprogram.barcode.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-07-02, 20:47:00.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.66.
 */

import { Prop, Watch, Component, defineComponentHOC, Doraemon } from '@doraemon-ui/miniprogram.core-js';
import { getSystemInfoSync, getCanvasRef, toDataURL } from '@doraemon-ui/miniprogram.shared';
import EAN13 from './barcode.js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const defaultOptions = {
    number: true,
    prefix: true,
    color: 'black',
    debug: false
};
let Barcode = class Barcode extends Doraemon {
    onPropsChange() {
        this.draw().catch(()=>{
        /**
       * Ignore
       */ });
    }
    async draw(opts = {}) {
        const props = {
            canvasId: this.canvasId,
            number: this.number,
            width: this.width,
            height: this.height,
            options: this.options,
            ...opts
        };
        const { canvasId, number: value, width, height, options: oldOptions } = props;
        if (!value) {
            return;
        }
        const mergedOptions = {
            ...defaultOptions,
            ...oldOptions || {}
        };
        const ratio = getSystemInfoSync([
            'window'
        ]).pixelRatio || 1;
        const canvas = await getCanvasRef(canvasId, this._renderProxy);
        new EAN13(canvas, ratio, value, Object.assign({
            width,
            height
        }, {
            number: mergedOptions.number,
            prefix: mergedOptions.prefix,
            color: mergedOptions.color,
            debug: mergedOptions.debug,
            onValid: ()=>{
                this.$emit('valid');
            },
            onInvalid: ()=>{
                this.$emit('invalid');
            },
            onSuccess: async ()=>{
                const base64Url = await toDataURL({
                    width,
                    height
                }, canvas);
                try {
                    const ctx = canvas.getContext('2d');
                    ctx.restore?.();
                } catch (e) {
                /**
               * Ignore
               */ }
                this.$emit('load', {
                    base64Url
                });
                this.$emit('success', {
                    base64Url
                });
            },
            onError: ()=>{
                this.$emit('error');
            }
        }));
    }
    mounted() {
        this.onPropsChange();
    }
};
_ts_decorate([
    Prop({
        type: Number,
        default: 200
    })
], Barcode.prototype, "width", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 100
    })
], Barcode.prototype, "height", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Barcode.prototype, "number", void 0);
_ts_decorate([
    Prop({
        type: Object,
        default: ()=>({
                ...defaultOptions
            })
    })
], Barcode.prototype, "options", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'dora-barcode'
    })
], Barcode.prototype, "canvasId", void 0);
_ts_decorate([
    Watch('canvasId'),
    Watch('number'),
    Watch('width'),
    Watch('height'),
    Watch('options')
], Barcode.prototype, "onPropsChange", null);
Barcode = _ts_decorate([
    Component({
        expose: [
            'draw'
        ],
        props: {
            prefixCls: {
                type: String,
                default: 'dora-barcode'
            }
        }
    })
], Barcode);
var index = defineComponentHOC()(Barcode);

export { Barcode, index as default };
