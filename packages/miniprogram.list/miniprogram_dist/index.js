/**
 * @doraemon-ui/miniprogram.list.
 * © 2021 - 2024 Doraemon UI.
 * Built on 2024-03-31, 17:37:47.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.20.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js';
import { useRect } from '@doraemon-ui/miniprogram.shared';
const { classNames, styleToCssString } = Doraemon.util;
let List = class List extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof List
     */
    prefixCls;
    /**
     * 标题
     *
     * @type {string}
     * @memberof List
     */
    title;
    /**
     * 描述
     *
     * @type {string}
     * @memberof List
     */
    label;
    /**
     * 支持默认和卡片两种模式
     *
     * @type {('default' | 'card')}
     * @memberof List
     */
    mode;
    /**
     * 是否有底部横线
     *
     * @type {boolean}
     * @memberof List
     */
    hasLine;
    /**
     * 自定义样式
     *
     * @type {Partial<CSSStyleDeclaration>}
     * @memberof List
     */
    wrapStyle;
    /**
     * 自定义 body 样式
     *
     * @type {Partial<CSSStyleDeclaration>}
     * @memberof List
     */
    bodyStyle;
    get classes() {
        const { prefixCls, mode, hasLine } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--card`]: mode === 'card',
            [`${prefixCls}--has-line`]: hasLine,
        });
        const hd = `${prefixCls}__hd`;
        const bd = `${prefixCls}__bd`;
        const ft = `${prefixCls}__ft`;
        return {
            wrap,
            hd,
            bd,
            ft,
        };
    }
    get containerStyle() {
        return this.wrapStyle ? styleToCssString(this.wrapStyle) : '';
    }
    get internalBodyStyle() {
        return this.bodyStyle ? styleToCssString(this.bodyStyle) : '';
    }
    updateIsLast() {
        const elements = this.$children;
        if (elements.length > 0) {
            const lastIndex = elements.length - 1;
            elements.forEach((element, index) => {
                element.updateIsLast(index === lastIndex);
            });
        }
    }
    getBoundingClientRect() {
        return useRect(`.${this.prefixCls}`, this._renderProxy);
    }
    mounted() {
        this.updateIsLast();
    }
};
__decorate([
    Prop({
        type: String,
        default: ''
    })
], List.prototype, "title", void 0);
__decorate([
    Prop({
        type: String,
        default: ''
    })
], List.prototype, "label", void 0);
__decorate([
    Prop({
        type: String,
        default: 'default'
    })
], List.prototype, "mode", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: true
    })
], List.prototype, "hasLine", void 0);
__decorate([
    Prop({
        type: Object,
        default: null,
    })
], List.prototype, "wrapStyle", void 0);
__decorate([
    Prop({
        type: Object,
        default: null,
    })
], List.prototype, "bodyStyle", void 0);
List = __decorate([
    Component({
        components: {
            ListItem: () => ({
                module: './item',
                type: 'descendant',
                observer: 'updateIsLast',
            }),
        },
        props: {
            prefixCls: {
                type: String,
                default: 'dora-list',
            },
        },
        expose: ['getBoundingClientRect']
    })
], List);
export default defineComponentHOC({ multipleSlots: false })(List);
