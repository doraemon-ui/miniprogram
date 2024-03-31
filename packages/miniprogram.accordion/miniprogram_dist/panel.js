/**
 * @doraemon-ui/miniprogram.accordion.
 * © 2021 - 2024 Doraemon UI.
 * Built on 2024-03-31, 17:36:25.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.20.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js';
const { classNames } = Doraemon.util;
let Panel = class Panel extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Panel
     */
    prefixCls;
    /**
     * 当前激活 tab 索引
     *
     * @type {string}
     * @memberof Panel
     */
    key;
    /**
     * 左侧缩略图
     *
     * @type {string}
     * @memberof Panel
     */
    thumb;
    /**
     * 左侧标题
     *
     * @type {string}
     * @memberof Panel
     */
    title;
    /**
     * 面板内容
     *
     * @type {string}
     * @memberof Panel
     */
    content;
    /**
     * 是否禁用
     *
     * @type {boolean}
     * @memberof Panel
     */
    disabled;
    /**
     * 是否显示箭头图标
     *
     * @type {boolean}
     * @memberof Panel
     */
    showArrow;
    get classes() {
        const { prefixCls, current, disabled } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--current`]: current,
            [`${prefixCls}--disabled`]: disabled,
        });
        const hd = `${prefixCls}__hd`;
        const thumb = `${prefixCls}__thumb`;
        const title = `${prefixCls}__title`;
        const arrow = `${prefixCls}__arrow`;
        const bd = `${prefixCls}__bd`;
        const content = `${prefixCls}__content`;
        return {
            wrap,
            hd,
            thumb,
            title,
            arrow,
            bd,
            content,
        };
    }
    /**
     * 是否激动当前面板
     *
     * @type {boolean}
     * @memberof Panel
     */
    current = false;
    /**
     * 对应 Key 值。如果没有设置 key，默认取 index 索引值
     *
     * @type {string}
     * @memberof Panel
     */
    index = '0';
    updateCurrentAndIndex(current, index) {
        this.$nextTick(() => {
            this.current = current;
            this.index = index;
        });
    }
    onClick() {
        const { index, disabled } = this;
        if (!disabled) {
            this.$parent?.onClickItem(index);
        }
    }
};
__decorate([
    Prop({
        type: String,
        default: ''
    })
], Panel.prototype, "key", void 0);
__decorate([
    Prop({
        type: String,
        default: ''
    })
], Panel.prototype, "thumb", void 0);
__decorate([
    Prop({
        type: String,
        default: ''
    })
], Panel.prototype, "title", void 0);
__decorate([
    Prop({
        type: String,
        default: ''
    })
], Panel.prototype, "content", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Panel.prototype, "disabled", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: true
    })
], Panel.prototype, "showArrow", void 0);
Panel = __decorate([
    Component({
        components: {
            Accordion: () => ({
                module: './index',
                type: 'parent',
            }),
        },
        props: {
            prefixCls: {
                type: String,
                default: 'dora-accordion-panel',
            },
        },
    })
], Panel);
export default defineComponentHOC()(Panel);
