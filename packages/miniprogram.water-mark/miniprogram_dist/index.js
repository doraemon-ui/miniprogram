/**
 * @doraemon-ui/miniprogram.water-mark.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-06, 05:31:24.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js';
import { useRef, getSystemInfoSync } from '@doraemon-ui/miniprogram.shared';
const { classNames, styleToCssString } = Doraemon.util;
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
let WaterMark = class WaterMark extends Doraemon {
    prefixCls;
    content;
    fontColor;
    fontStyle;
    fontFamily;
    fontWeight;
    fontSize;
    fullPage;
    gapX;
    gapY;
    width;
    height;
    image;
    imageHeight;
    imageWidth;
    rotate;
    zIndex;
    wrapStyle = '';
    base64Url = '';
    get classes() {
        const p = this.prefixCls;
        return {
            wrap: classNames(p, { [`${p}--full-page`]: this.fullPage }),
            canvas: `${p}__canvas`,
        };
    }
    onStyleDepsChange() {
        this.updateStyle(this.zIndex, this.gapX, this.width, this.base64Url);
    }
    onPaintDepsChange() {
        void this.createCanvasContext();
    }
    async createCanvasContext() {
        try {
            const canvasId = this.classes.canvas;
            const ref = (await useRef(`#${canvasId}`, this._renderProxy));
            const canvas = ref.node;
            const ctx = canvas.getContext('2d');
            const ratio = getSystemInfoSync(['window']).pixelRatio || 1;
            const canvasWidth = (this.gapX + this.width) * ratio;
            const canvasHeight = (this.gapY + this.height) * ratio;
            const markWidth = this.width * ratio;
            const markHeight = this.height * ratio;
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            ctx.translate(markWidth / 2, markHeight / 2);
            ctx.rotate((Math.PI / 180) * Number(this.rotate));
            if (this.image) {
                const image = canvas.createImage ? canvas.createImage() : null;
                if (image) {
                    await new Promise((resolve) => {
                        image.onload = () => {
                            ctx.drawImage(image, -(this.imageWidth / 2), -(this.imageHeight / 2), this.imageWidth, this.imageHeight);
                            resolve();
                        };
                        image.onerror = () => resolve();
                        image.src = this.image;
                    });
                }
            }
            else if (this.content) {
                ctx.textBaseline = 'middle';
                ctx.textAlign = 'center';
                const markSize = Number(this.fontSize) * ratio;
                ctx.font = `${this.fontStyle} normal ${this.fontWeight} ${markSize}px/${markHeight}px ${this.fontFamily}`;
                ctx.fillStyle = this.fontColor;
                if (Array.isArray(this.content)) {
                    this.content.forEach((item, index) => ctx.fillText(item, 0, index * markSize));
                }
                else {
                    ctx.fillText(this.content, 0, 0);
                }
            }
            const base64Url = await toDataURL(this.width, this.height, canvas);
            if (ctx.restore)
                ctx.restore();
            if (this.base64Url !== base64Url) {
                this.base64Url = base64Url;
                this.$emit('load', { base64Url });
            }
        }
        catch (err) {
            this.$emit('error', err);
        }
    }
    updateStyle(zIndex, gapX, width, base64Url) {
        this.wrapStyle = styleToCssString({
            zIndex,
            backgroundSize: `${gapX + width}px`,
            backgroundImage: base64Url ? `url('${base64Url}')` : 'unset',
        });
    }
    mounted() {
        this.updateStyle(this.zIndex, this.gapX, this.width, this.base64Url);
        void this.createCanvasContext();
    }
};
__decorate([
    Prop({ type: null, default: '' })
], WaterMark.prototype, "content", void 0);
__decorate([
    Prop({ type: String, default: 'rgba(0, 0, 0, .15)' })
], WaterMark.prototype, "fontColor", void 0);
__decorate([
    Prop({ type: String, default: 'normal' })
], WaterMark.prototype, "fontStyle", void 0);
__decorate([
    Prop({ type: String, default: 'sans-serif' })
], WaterMark.prototype, "fontFamily", void 0);
__decorate([
    Prop({ type: String, default: 'normal' })
], WaterMark.prototype, "fontWeight", void 0);
__decorate([
    Prop({ type: Number, default: 14 })
], WaterMark.prototype, "fontSize", void 0);
__decorate([
    Prop({ type: Boolean, default: true })
], WaterMark.prototype, "fullPage", void 0);
__decorate([
    Prop({ type: Number, default: 24 })
], WaterMark.prototype, "gapX", void 0);
__decorate([
    Prop({ type: Number, default: 48 })
], WaterMark.prototype, "gapY", void 0);
__decorate([
    Prop({ type: Number, default: 120 })
], WaterMark.prototype, "width", void 0);
__decorate([
    Prop({ type: Number, default: 64 })
], WaterMark.prototype, "height", void 0);
__decorate([
    Prop({ type: String, default: '' })
], WaterMark.prototype, "image", void 0);
__decorate([
    Prop({ type: Number, default: 64 })
], WaterMark.prototype, "imageHeight", void 0);
__decorate([
    Prop({ type: Number, default: 128 })
], WaterMark.prototype, "imageWidth", void 0);
__decorate([
    Prop({ type: Number, default: -22 })
], WaterMark.prototype, "rotate", void 0);
__decorate([
    Prop({ type: Number, default: 2000 })
], WaterMark.prototype, "zIndex", void 0);
__decorate([
    Watch('zIndex'),
    Watch('gapX'),
    Watch('width')
], WaterMark.prototype, "onStyleDepsChange", null);
__decorate([
    Watch('content'),
    Watch('image'),
    Watch('fontColor'),
    Watch('fontStyle'),
    Watch('fontFamily'),
    Watch('fontWeight'),
    Watch('fontSize'),
    Watch('fullPage'),
    Watch('gapX'),
    Watch('gapY'),
    Watch('width'),
    Watch('height'),
    Watch('imageHeight'),
    Watch('imageWidth'),
    Watch('rotate')
], WaterMark.prototype, "onPaintDepsChange", null);
WaterMark = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-water-mark',
            },
        },
    })
], WaterMark);
export default defineComponentHOC()(WaterMark);
