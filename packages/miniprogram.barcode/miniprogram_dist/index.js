/**
 * @doraemon-ui/miniprogram.barcode.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:38:07.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { Prop, Watch, Component, defineComponentHOC, Doraemon } from '@doraemon-ui/miniprogram.core-js';
import { useRef, getSystemInfoSync } from '@doraemon-ui/miniprogram.shared';
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
    debug: false,
    onValid: ()=>{},
    onInvalid: ()=>{},
    onSuccess: ()=>{},
    onError: ()=>{}
};
async function toDataURL({ width, height, type = 'png', quality = 1 }, canvas) {
    const fileType = type === 'jpg' || type === 'jpeg' ? 'jpeg' : type;
    if (typeof canvas.toDataURL === 'function') {
        const fn = canvas.toDataURL;
        return fn.call(canvas, `image/${fileType}`, quality);
    }
    if (typeof wx !== 'undefined' && typeof wx.canvasToTempFilePath === 'function') {
        const ratio = getSystemInfoSync([
            'window'
        ]).pixelRatio || 1;
        const tempFileType = type === 'jpg' || type === 'jpeg' ? 'jpg' : 'png';
        return await new Promise((resolve)=>{
            wx.canvasToTempFilePath({
                destWidth: width * ratio,
                destHeight: height * ratio,
                canvas,
                fileType: tempFileType,
                quality,
                success: (res)=>resolve(res.tempFilePath || ''),
                fail: ()=>resolve('')
            });
        });
    }
    return '';
}
let Barcode = class Barcode extends Doraemon {
    onPropsChange() {
        this.draw().catch(()=>{
        /**
       * Ignore
       */ });
    }
    async getCanvasNode(canvasId) {
        const ref = await useRef(`#${canvasId}`, this._renderProxy);
        return ref.node;
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
        const canvas = await this.getCanvasNode(canvasId);
        const emit = (event, detail)=>{
            if (detail !== undefined) {
                this.$emit(event, detail);
            } else {
                this.$emit(event);
            }
        };
        const buildHook = (hookName)=>{
            const userCb = mergedOptions[hookName];
            return async ()=>{
                if (typeof userCb === 'function') {
                    userCb();
                }
                if (hookName === 'onSuccess') {
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
                    emit('load', {
                        base64Url
                    });
                }
                emit(hookName.replace(/^on/, '').toLowerCase());
            };
        };
        new EAN13(canvas, ratio, value, Object.assign({
            width,
            height
        }, {
            number: mergedOptions.number,
            prefix: mergedOptions.prefix,
            color: mergedOptions.color,
            debug: mergedOptions.debug,
            onValid: ()=>{
                void buildHook('onValid')();
            },
            onInvalid: ()=>{
                void buildHook('onInvalid')();
            },
            onSuccess: ()=>{
                void buildHook('onSuccess')();
            },
            onError: ()=>{
                void buildHook('onError')();
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
