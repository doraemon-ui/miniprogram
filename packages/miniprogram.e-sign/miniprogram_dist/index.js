/**
 * @doraemon-ui/miniprogram.e-sign.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-02-26, 16:13:22.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js';
import { useRef, getSystemInfoSync, getTouchPoints } from '@doraemon-ui/miniprogram.shared';
const { classNames, styleToCssString } = Doraemon.util;
async function toDataURL({ width, height, type = 'png', quality = 1 }, canvas) {
    const fileType = type === 'jpg' || type === 'jpeg' ? 'jpeg' : type;
    if (typeof canvas.toDataURL === 'function') {
        const fn = canvas.toDataURL;
        return fn.call(canvas, `image/${fileType}`, quality);
    }
    if (typeof wx !== 'undefined' && typeof wx.canvasToTempFilePath === 'function') {
        const ratio = getSystemInfoSync(['window']).pixelRatio || 1;
        const tempFileType = type === 'jpg' || type === 'jpeg' ? 'jpg' : 'png';
        return await new Promise((resolve) => {
            wx.canvasToTempFilePath({
                destWidth: width * ratio,
                destHeight: height * ratio,
                canvas,
                fileType: tempFileType,
                quality,
                success: (res) => resolve(res.tempFilePath || ''),
                fail: () => resolve(''),
            });
        });
    }
    return '';
}
let ESign = class ESign extends Doraemon {
    /**
     * 自定义类名前缀
     */
    prefixCls;
    /**
     * 导出图片类型
     */
    type;
    /**
     * 画布宽度（px 或 auto）
     */
    width;
    /**
     * 画布高度（px）
     */
    height;
    /**
     * 画布背景色
     */
    bgColor;
    /**
     * 画线宽度
     */
    lineWidth;
    /**
     * 画线颜色
     */
    lineColor;
    /**
     * 是否显示底部操作栏
     */
    hasFooter;
    /**
     * 重置按钮文本
     */
    cancelText;
    /**
     * 确定按钮文本
     */
    confirmText;
    isCanvasEmpty = true;
    bodyStyle = '';
    canvasRef = null;
    get classes() {
        const { prefixCls } = this;
        return {
            wrap: classNames(prefixCls),
            bd: `${prefixCls}__bd`,
            ft: `${prefixCls}__ft`,
            button: `${prefixCls}__button`,
        };
    }
    onCanvasPropsChange() {
        this.setBodyStyle({
            width: this.width,
            height: this.height,
        });
        this.resize();
    }
    async getCanvasNode(canvasId) {
        const ref = (await useRef(`#${canvasId}`, this._renderProxy));
        return ref.node;
    }
    resolveCanvasRef() {
        const ref = this.canvasRef;
        if (!ref)
            return null;
        return typeof ref.then === 'function' ? ref : Promise.resolve(ref);
    }
    /**
     * 手指触摸动作开始
     */
    onTouchStart() {
        const ref = this.resolveCanvasRef();
        if (!ref)
            return false;
        const props = this;
        void ref.then(({ value: ctx }) => {
            if (!ctx)
                return;
            ctx.beginPath();
            ctx.lineWidth = props.lineWidth || 3;
            ctx.strokeStyle = props.lineColor || '#000000';
            this.$emit('start');
        });
        return true;
    }
    /**
     * 手指触摸后移动
     */
    onTouchMove(e) {
        const ref = this.resolveCanvasRef();
        if (!ref)
            return false;
        if (this.isCanvasEmpty) {
            this.isCanvasEmpty = false;
        }
        const touch = getTouchPoints(e);
        const mouseX = touch.x - (e.currentTarget?.offsetLeft || 0);
        const mouseY = touch.y - (e.currentTarget?.offsetTop || 0);
        void ref.then(({ value: ctx }) => {
            if (!ctx)
                return;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
            this.$emit('signing', { mouseX, mouseY });
        });
        return true;
    }
    /**
     * 手指触摸动作结束
     */
    onTouchEnd() {
        if (this.isCanvasEmpty) {
            this.isCanvasEmpty = false;
        }
        this.$emit('end');
    }
    setBodyStyle(props) {
        const bodyStyle = styleToCssString({
            width: props.width === 'auto' ? 'auto' : `${props.width}px`,
            height: `${props.height}px`,
        });
        if (this.bodyStyle !== bodyStyle) {
            this.bodyStyle = bodyStyle;
        }
    }
    async createCanvasContext(props) {
        const getWrapRef = async () => {
            if (props.width === 'auto') {
                const wrap = (await useRef(`.${props.prefixCls}__bd`, this._renderProxy));
                return { width: wrap.clientWidth, height: wrap.clientHeight };
            }
            return { width: Number(props.width), height: props.height };
        };
        const { width, height } = await getWrapRef();
        const canvas = await this.getCanvasNode(props.prefixCls);
        const ctx = canvas.getContext('2d');
        const ratio = getSystemInfoSync(['window']).pixelRatio || 1;
        const canvasWidth = width * ratio;
        const canvasHeight = height * ratio;
        const setCanvasBgColor = () => {
            if (props.bgColor) {
                ctx.fillStyle = props.bgColor;
                ctx.fillRect(0, 0, width, height);
            }
        };
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        ctx.scale(ratio, ratio);
        setCanvasBgColor();
        const clear = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.closePath();
            setCanvasBgColor();
        };
        const draw = () => {
            return toDataURL({ width, height, type: props.type }, canvas);
        };
        const resize = (create) => {
            const data = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
            void create().then(({ value: newCtx }) => {
                newCtx.putImageData(data, 0, 0);
            });
        };
        return { value: ctx, clear, draw, resize };
    }
    clear() {
        const ref = this.resolveCanvasRef();
        if (!ref)
            return;
        void ref.then(({ clear }) => {
            if (typeof clear === 'function') {
                clear();
            }
            this.isCanvasEmpty = true;
            this.$emit('clear');
        });
    }
    submit() {
        if (this.isCanvasEmpty) {
            this.$emit('submit', { base64Url: '' });
            return;
        }
        const ref = this.resolveCanvasRef();
        if (!ref)
            return;
        void ref.then(({ draw }) => {
            if (typeof draw === 'function') {
                void draw().then((base64Url) => {
                    this.$emit('submit', { base64Url });
                });
                return;
            }
            this.$emit('submit', { base64Url: '' });
        });
    }
    resize() {
        const ref = this.resolveCanvasRef();
        if (!ref)
            return;
        void ref.then(({ resize }) => {
            resize(() => {
                const nextRef = this.createCanvasContext(this);
                this.canvasRef = nextRef;
                return nextRef;
            });
        });
    }
    mounted() {
        this.setBodyStyle(this);
        this.canvasRef = this.createCanvasContext(this);
    }
};
__decorate([
    Prop({ type: String, default: 'png' })
], ESign.prototype, "type", void 0);
__decorate([
    Prop({ type: null, default: 'auto' })
], ESign.prototype, "width", void 0);
__decorate([
    Prop({ type: Number, default: 200 })
], ESign.prototype, "height", void 0);
__decorate([
    Prop({ type: String, default: '#ffffff' })
], ESign.prototype, "bgColor", void 0);
__decorate([
    Prop({ type: Number, default: 3 })
], ESign.prototype, "lineWidth", void 0);
__decorate([
    Prop({ type: String, default: '#000000' })
], ESign.prototype, "lineColor", void 0);
__decorate([
    Prop({ type: Boolean, default: true })
], ESign.prototype, "hasFooter", void 0);
__decorate([
    Prop({ type: String, default: '重置' })
], ESign.prototype, "cancelText", void 0);
__decorate([
    Prop({ type: String, default: '确定' })
], ESign.prototype, "confirmText", void 0);
__decorate([
    Watch('width'),
    Watch('height'),
    Watch('bgColor')
], ESign.prototype, "onCanvasPropsChange", null);
ESign = __decorate([
    Component({
        expose: ['resize'],
        props: {
            prefixCls: {
                type: String,
                default: 'dora-e-sign',
            },
            type: {
                type: String,
                default: 'png',
            },
            width: {
                type: null,
                default: 'auto',
            },
            height: {
                type: Number,
                default: 200,
            },
            bgColor: {
                type: String,
                default: '#ffffff',
            },
            lineWidth: {
                type: Number,
                default: 3,
            },
            lineColor: {
                type: String,
                default: '#000000',
            },
            hasFooter: {
                type: Boolean,
                default: true,
            },
            cancelText: {
                type: String,
                default: '重置',
            },
            confirmText: {
                type: String,
                default: '确定',
            },
        },
    })
], ESign);
export default defineComponentHOC()(ESign);
