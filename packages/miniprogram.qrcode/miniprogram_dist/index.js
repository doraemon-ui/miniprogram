/**
 * @doraemon-ui/miniprogram.qrcode.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-05, 19:51:29.
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
async function toDataURL({ width, height, type = 'png', quality = 1 }, canvas) {
    const fileType = type === 'jpg' || type === 'jpeg' ? 'jpeg' : type;
    if (typeof canvas.toDataURL === 'function') {
        return canvas.toDataURL(`image/${fileType}`, quality);
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
const hashString = (str) => {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
        h ^= str.charCodeAt(i);
        h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
    }
    return h >>> 0;
};
let Qrcode = class Qrcode extends Doraemon {
    prefixCls;
    typeNumber;
    errorCorrectLevel;
    width;
    height;
    whiteSpace;
    fgColor;
    bgColor;
    data;
    showMenuByLongpress;
    qrcodeStatus;
    qrcodeExpiredText;
    qrcodeRefreshText;
    wrapStyle = '';
    base64Url = '';
    canvas;
    get classes() {
        const p = this.prefixCls;
        return {
            wrap: classNames(p),
            canvas: `${p}__canvas`,
            image: `${p}__image`,
            mask: `${p}__mask`,
            expired: `${p}__expired`,
            refresh: `${p}__refresh`,
            icon: `${p}__icon`,
        };
    }
    onSizeChange() {
        this.updateStyle(this.height, this.width);
    }
    onDrawDepsChange() {
        void this.createCanvasContext();
    }
    updateStyle(height, width) {
        this.wrapStyle = styleToCssString({
            height: `${height}px`,
            width: `${width}px`,
        });
    }
    async getCanvasNode() {
        return this.canvas;
    }
    getBase64Url() {
        return this.base64Url;
    }
    shouldPaintCell(r, c, size, seed) {
        const inFinderTL = r < 7 && c < 7;
        const inFinderTR = r < 7 && c >= size - 7;
        const inFinderBL = r >= size - 7 && c < 7;
        if (inFinderTL || inFinderTR || inFinderBL) {
            const rr = inFinderTR ? r : inFinderBL ? r - (size - 7) : r;
            const cc = inFinderTR ? c - (size - 7) : c;
            const border = rr === 0 || rr === 6 || cc === 0 || cc === 6;
            const center = rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4;
            return border || center;
        }
        const v = ((r * 33 + c * 97 + seed) ^ (r * c + seed)) & 1;
        return v === 1;
    }
    async createCanvasContext() {
        try {
            const canvasId = `${this.prefixCls}__canvas`;
            const ref = (await useRef(`#${canvasId}`, this._renderProxy));
            const canvas = ref.node;
            this.canvas = canvas;
            const ctx = canvas.getContext('2d');
            const ratio = getSystemInfoSync(['window']).pixelRatio || 1;
            canvas.width = this.width * ratio;
            canvas.height = this.height * ratio;
            ctx.scale(ratio, ratio);
            ctx.fillStyle = this.bgColor;
            ctx.fillRect(0, 0, this.width, this.height);
            const size = 29;
            const seed = hashString(this.data || '');
            const tileW = (this.width - this.whiteSpace * 2) / size;
            const tileH = (this.height - this.whiteSpace * 2) / size;
            for (let r = 0; r < size; r++) {
                for (let c = 0; c < size; c++) {
                    ctx.fillStyle = this.shouldPaintCell(r, c, size, seed) ? this.fgColor : this.bgColor;
                    const x = Math.round(c * tileW) + this.whiteSpace;
                    const y = Math.round(r * tileH) + this.whiteSpace;
                    const w = Math.ceil((c + 1) * tileW) - Math.floor(c * tileW);
                    const h = Math.ceil((r + 1) * tileH) - Math.floor(r * tileH);
                    ctx.fillRect(x, y, w, h);
                }
            }
            const base64Url = await toDataURL({ width: this.width, height: this.height }, canvas);
            this.base64Url = base64Url;
            this.$emit('load', { base64Url });
        }
        catch (err) {
            this.$emit('error', err);
        }
    }
    onTap() {
        this.$emit('click');
    }
    onMaskClick() {
        if (this.qrcodeStatus === 'expired') {
            this.$emit('refresh');
        }
    }
    mounted() {
        this.updateStyle(this.height, this.width);
        void this.createCanvasContext();
    }
};
__decorate([
    Prop({ type: Number, default: -1 })
], Qrcode.prototype, "typeNumber", void 0);
__decorate([
    Prop({ type: Number, default: 2 })
], Qrcode.prototype, "errorCorrectLevel", void 0);
__decorate([
    Prop({ type: Number, default: 200 })
], Qrcode.prototype, "width", void 0);
__decorate([
    Prop({ type: Number, default: 200 })
], Qrcode.prototype, "height", void 0);
__decorate([
    Prop({ type: Number, default: 0 })
], Qrcode.prototype, "whiteSpace", void 0);
__decorate([
    Prop({ type: String, default: 'black' })
], Qrcode.prototype, "fgColor", void 0);
__decorate([
    Prop({ type: String, default: 'white' })
], Qrcode.prototype, "bgColor", void 0);
__decorate([
    Prop({ type: String, default: '' })
], Qrcode.prototype, "data", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Qrcode.prototype, "showMenuByLongpress", void 0);
__decorate([
    Prop({ type: String, default: 'activated' })
], Qrcode.prototype, "qrcodeStatus", void 0);
__decorate([
    Prop({ type: String, default: '二维码过期' })
], Qrcode.prototype, "qrcodeExpiredText", void 0);
__decorate([
    Prop({ type: String, default: '点击刷新' })
], Qrcode.prototype, "qrcodeRefreshText", void 0);
__decorate([
    Watch('height'),
    Watch('width')
], Qrcode.prototype, "onSizeChange", null);
__decorate([
    Watch('typeNumber'),
    Watch('errorCorrectLevel'),
    Watch('width'),
    Watch('height'),
    Watch('whiteSpace'),
    Watch('fgColor'),
    Watch('bgColor'),
    Watch('data')
], Qrcode.prototype, "onDrawDepsChange", null);
Qrcode = __decorate([
    Component({
        expose: ['getCanvasNode', 'getBase64Url'],
        props: {
            prefixCls: { type: String, default: 'dora-qrcode' },
        },
    })
], Qrcode);
export default defineComponentHOC()(Qrcode);
