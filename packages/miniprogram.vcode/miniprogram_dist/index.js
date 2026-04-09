/**
 * @doraemon-ui/miniprogram.vcode.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-06, 05:00:48.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js';
import { useRef, getSystemInfoSync } from '@doraemon-ui/miniprogram.shared';
const randomNum = (min, max) => Math.floor(Math.random() * (max - min) + min);
const randomColor = (min, max) => `rgb(${randomNum(min, max)}, ${randomNum(min, max)}, ${randomNum(min, max)})`;
async function toDataURL(width, height, canvas) {
    if (typeof canvas.toDataURL === 'function')
        return canvas.toDataURL('image/png', 1);
    if (typeof wx !== 'undefined' && typeof wx.canvasToTempFilePath === 'function') {
        const ratio = getSystemInfoSync(['window']).pixelRatio || 1;
        return await new Promise((resolve) => {
            wx.canvasToTempFilePath({
                destWidth: width * ratio,
                destHeight: height * ratio,
                canvas,
                fileType: 'png',
                quality: 1,
                success: (res) => resolve(res.tempFilePath || ''),
                fail: () => resolve(''),
            });
        });
    }
    return '';
}
function render(ctx, props) {
    const ratio = getSystemInfoSync(['window']).pixelRatio || 1;
    let vcode = '';
    ctx.textBaseline = 'bottom';
    ctx.fillStyle = props.bgColor || randomColor(180, 240);
    ctx.scale(ratio, ratio);
    ctx.fillRect(0, 0, props.width, props.height);
    for (let i = 0; i < props.num; i++) {
        const x = ((props.width - 10) / props.num) * i + 10;
        const y = randomNum(props.height / 2, props.height);
        const deg = randomNum(-45, 45);
        const txt = props.str[randomNum(0, props.str.length)];
        const fontSize = randomNum(16, 40);
        const halfHeight = parseInt(String(props.height / 2), 10);
        vcode += txt;
        ctx.fillStyle = props.fontColor || randomColor(10, 100);
        ctx.font = `normal normal normal ${fontSize > halfHeight ? halfHeight : fontSize}px sans-serif`;
        ctx.translate(x, y);
        ctx.rotate((deg * Math.PI) / 180);
        ctx.fillText(txt, 0, 0);
        ctx.rotate((-deg * Math.PI) / 180);
        ctx.translate(-x, -y);
    }
    if (props.hasLine) {
        for (let i = 0; i < props.num; i++) {
            ctx.strokeStyle = randomColor(90, 180);
            ctx.beginPath();
            ctx.moveTo(randomNum(0, props.width), randomNum(0, props.height));
            ctx.lineTo(randomNum(0, props.width), randomNum(0, props.height));
            ctx.stroke();
        }
    }
    if (props.hasPoint) {
        for (let i = 0; i < props.num * 10; i++) {
            ctx.fillStyle = randomColor(0, 255);
            ctx.beginPath();
            ctx.arc(randomNum(0, props.width), randomNum(0, props.height), 1, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
    return vcode;
}
let Vcode = class Vcode extends Doraemon {
    prefixCls;
    str;
    num;
    width;
    height;
    bgColor;
    fontColor;
    hasPoint;
    hasLine;
    canvasId;
    async createCanvasContext() {
        try {
            const ref = (await useRef(`#${this.canvasId}`, this._renderProxy));
            const canvas = ref.node;
            const ctx = canvas.getContext('2d');
            const ratio = getSystemInfoSync(['window']).pixelRatio || 1;
            canvas.width = this.width * ratio;
            canvas.height = this.height * ratio;
            const value = render(ctx, this);
            const base64Url = await toDataURL(this.width, this.height, canvas);
            if (ctx.restore)
                ctx.restore();
            this.$emit('change', { value, base64Url });
        }
        catch (err) {
            this.$emit('error', err);
        }
    }
    draw() {
        void this.createCanvasContext();
    }
    mounted() {
        void this.createCanvasContext();
    }
};
__decorate([
    Prop({ type: String, default: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' })
], Vcode.prototype, "str", void 0);
__decorate([
    Prop({ type: Number, default: 6 })
], Vcode.prototype, "num", void 0);
__decorate([
    Prop({ type: Number, default: 120 })
], Vcode.prototype, "width", void 0);
__decorate([
    Prop({ type: Number, default: 40 })
], Vcode.prototype, "height", void 0);
__decorate([
    Prop({ type: String, default: '' })
], Vcode.prototype, "bgColor", void 0);
__decorate([
    Prop({ type: String, default: '' })
], Vcode.prototype, "fontColor", void 0);
__decorate([
    Prop({ type: Boolean, default: true })
], Vcode.prototype, "hasPoint", void 0);
__decorate([
    Prop({ type: Boolean, default: true })
], Vcode.prototype, "hasLine", void 0);
__decorate([
    Prop({ type: String, default: 'dora-vcode' })
], Vcode.prototype, "canvasId", void 0);
Vcode = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-vcode',
            },
        },
    })
], Vcode);
export default defineComponentHOC()(Vcode);
