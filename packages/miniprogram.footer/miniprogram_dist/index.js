/**
 * @doraemon-ui/miniprogram.footer.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-02-26, 19:31:57.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js';
import { useNativeRoute } from '@doraemon-ui/miniprogram.shared';
const { classNames } = Doraemon.util;
let Footer = class Footer extends Doraemon {
    /**
     * 自定义类名前缀
     */
    prefixCls;
    /**
     * 主题色
     */
    theme;
    /**
     * 标题文案
     */
    label;
    /**
     * 内容文案
     */
    content;
    /**
     * 链接数组
     */
    links;
    /**
     * 标签数组
     */
    chips;
    get classes() {
        const { prefixCls, theme } = this;
        return {
            wrap: classNames(prefixCls, {
                [`${prefixCls}--${theme}`]: theme,
            }),
            label: `${prefixCls}__label`,
            content: `${prefixCls}__content`,
            links: `${prefixCls}__links`,
            link: `${prefixCls}__link`,
            chips: `${prefixCls}__chips`,
            chip: `${prefixCls}__chip`,
        };
    }
    clickLinkItem(e) {
        const index = Number(e?.target?.dataset?.index);
        const link = this.links[index];
        if (link) {
            if (link.url !== undefined) {
                useNativeRoute({
                    url: link.url,
                    openType: link.openType,
                    delta: link.delta,
                }, this._renderProxy);
            }
            this.$emit('linkClick', {
                item: link,
                index,
            });
        }
    }
    clickChipItem(e) {
        const index = Number(e?.target?.dataset?.index);
        const chip = this.chips[index];
        if (chip && chip.type === 'link') {
            this.$emit('chipClick', {
                item: chip,
                index,
            });
        }
    }
};
__decorate([
    Prop({ type: String, default: 'balanced' })
], Footer.prototype, "theme", void 0);
__decorate([
    Prop({ type: String, default: '' })
], Footer.prototype, "label", void 0);
__decorate([
    Prop({ type: String, default: '' })
], Footer.prototype, "content", void 0);
__decorate([
    Prop({ type: Array, default: () => [] })
], Footer.prototype, "links", void 0);
__decorate([
    Prop({ type: Array, default: () => [] })
], Footer.prototype, "chips", void 0);
Footer = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-footer',
            },
            theme: {
                type: String,
                default: 'balanced',
            },
            label: {
                type: String,
                default: '',
            },
            content: {
                type: String,
                default: '',
            },
            links: {
                type: Array,
                default: () => [],
            },
            chips: {
                type: Array,
                default: () => [],
            },
        },
    })
], Footer);
export default defineComponentHOC()(Footer);
