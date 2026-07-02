/**
 * @doraemon-ui/miniprogram.e-sign.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-07-02, 19:44:13.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.65.
 */

import { Doraemon, Prop, Watch, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';
import { useRef, getTouchPoints, getCanvasRef, getSystemInfoSync, toDataURL } from '@doraemon-ui/miniprogram.shared';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames, styleToCssString } = Doraemon.util;
let ESign = class ESign extends Doraemon {
    get classes() {
        const { prefixCls } = this;
        return {
            wrap: classNames(prefixCls),
            bd: `${prefixCls}__bd`,
            ft: `${prefixCls}__ft`,
            button: `${prefixCls}__button`
        };
    }
    onCanvasPropsChange() {
        this.setBodyStyle({
            width: this.width,
            height: this.height
        });
        this.resize();
    }
    /**
   * 获取并缓存 wrap ref
   */ getWrapRef(forceUpdate = false) {
        if (!this.wrapRef || forceUpdate) {
            this.wrapRef = useRef(`.${this.prefixCls}__bd`, this._renderProxy);
        }
        return this.wrapRef;
    }
    /**
   * 手指触摸动作开始
   */ onTouchStart() {
        if (!this.canvasRef) return;
        const props = this;
        void this.canvasRef.then(({ ctx })=>{
            if (!ctx) return;
            ctx.beginPath();
            ctx.lineWidth = props.lineWidth || 3;
            ctx.strokeStyle = props.lineColor || '#000000';
            this.$emit('start');
        });
    }
    /**
   * 手指触摸后移动
   */ onTouchMove(e) {
        if (!this.canvasRef) return false;
        if (this.isCanvasEmpty) {
            this.isCanvasEmpty = false;
        }
        Promise.all([
            this.wrapRef,
            this.canvasRef
        ]).then(([wrapRef, { ctx }])=>{
            if (!wrapRef || !ctx) return;
            const touch = getTouchPoints(e);
            const offsetLeft = wrapRef.clientLeft + wrapRef.left;
            const offsetTop = wrapRef.clientTop + wrapRef.top;
            const mouseX = touch.x - offsetLeft;
            const mouseY = touch.y - offsetTop;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
            this.$emit('signing', {
                mouseX,
                mouseY
            });
        });
    }
    /**
   * 手指触摸动作结束
   */ onTouchEnd() {
        if (this.isCanvasEmpty) {
            this.isCanvasEmpty = false;
        }
        this.$emit('end');
    }
    setBodyStyle(props) {
        const bodyStyle = styleToCssString({
            width: props.width === 'auto' ? 'auto' : `${props.width}px`,
            height: `${props.height}px`
        });
        if (this.bodyStyle !== bodyStyle) {
            this.bodyStyle = bodyStyle;
        }
    }
    async createCanvasContext(props, forceUpdate = false) {
        const renderCanvas = ()=>{
            return this.getWrapRef(forceUpdate).then(({ clientWidth: width, clientHeight: height })=>{
                return getCanvasRef(props.prefixCls, this._renderProxy).then((canvas)=>{
                    const ctx = canvas.getContext('2d');
                    const ratio = getSystemInfoSync([
                        'window'
                    ]).pixelRatio;
                    const canvasWidth = width * ratio;
                    const canvasHeight = height * ratio;
                    const setCanvasBgColor = (ctx)=>{
                        if (ctx && props.bgColor) {
                            ctx.fillStyle = props.bgColor;
                            ctx.fillRect(0, 0, width, height);
                        }
                    };
                    canvas.width = canvasWidth;
                    canvas.height = canvasHeight;
                    ctx.scale(ratio, ratio);
                    setCanvasBgColor(ctx);
                    const clear = ()=>{
                        ctx.clearRect(0, 0, width, height);
                        ctx.closePath();
                        // reset canvas bgColor
                        setCanvasBgColor(ctx);
                    };
                    const draw = ()=>{
                        return toDataURL({
                            width,
                            height,
                            type: props.type
                        }, canvas);
                    };
                    const resize = (updateCanvasContext)=>{
                        const data = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
                        updateCanvasContext().then(({ ctx: newCtx })=>{
                            newCtx.putImageData(data, 0, 0);
                        });
                    };
                    return {
                        ctx,
                        clear,
                        draw,
                        resize
                    };
                });
            });
        };
        return Promise.resolve().then(renderCanvas);
    }
    clear() {
        if (!this.canvasRef) return;
        void this.canvasRef.then(({ clear })=>{
            if (typeof clear === 'function') {
                clear();
            }
            this.isCanvasEmpty = true;
            this.$emit('clear');
        });
    }
    submit() {
        if (this.isCanvasEmpty) {
            this.$emit('submit', {
                base64Url: ''
            });
            return;
        }
        if (!this.canvasRef) return;
        void this.canvasRef.then(({ draw })=>{
            if (typeof draw === 'function') {
                void draw().then((base64Url)=>{
                    this.$emit('submit', {
                        base64Url
                    });
                });
                return;
            }
            this.$emit('submit', {
                base64Url: ''
            });
        });
    }
    resize() {
        if (!this.canvasRef) return;
        void this.canvasRef.then(({ resize })=>{
            resize(()=>{
                const nextRef = this.createCanvasContext(this, true);
                this.canvasRef = nextRef;
                return nextRef;
            });
        });
    }
    mounted() {
        this.setBodyStyle(this);
        this.canvasRef = this.createCanvasContext(this);
    }
    constructor(...args){
        super(...args);
        this.isCanvasEmpty = true;
        this.bodyStyle = '';
        this.canvasRef = null;
        this.wrapRef = null;
    }
};
_ts_decorate([
    Prop({
        type: String,
        default: 'png'
    })
], ESign.prototype, "type", void 0);
_ts_decorate([
    Prop({
        type: null,
        default: 'auto'
    })
], ESign.prototype, "width", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 200
    })
], ESign.prototype, "height", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: '#ffffff'
    })
], ESign.prototype, "bgColor", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 3
    })
], ESign.prototype, "lineWidth", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: '#000000'
    })
], ESign.prototype, "lineColor", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: true
    })
], ESign.prototype, "hasFooter", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: '重置'
    })
], ESign.prototype, "cancelText", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: '确定'
    })
], ESign.prototype, "confirmText", void 0);
_ts_decorate([
    Watch('width'),
    Watch('height'),
    Watch('bgColor')
], ESign.prototype, "onCanvasPropsChange", null);
ESign = _ts_decorate([
    Component({
        expose: [
            'resize'
        ],
        props: {
            prefixCls: {
                type: String,
                default: 'dora-e-sign'
            }
        }
    })
], ESign);
var index = defineComponentHOC()(ESign);

export { ESign, index as default };
