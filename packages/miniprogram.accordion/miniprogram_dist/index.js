/**
 * @doraemon-ui/miniprogram.accordion.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-02-22, 01:41:16.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Emit, Watch, Prop } from '@doraemon-ui/miniprogram.core-js';
let Accordion = class Accordion extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Accordion
     */
    prefixCls;
    /**
     * 默认激活 tab 面板的 key，当 `controlled` 为 `false` 时才生效
     *
     * @type {string[]}
     * @memberof Accordion
     */
    defaultCurrent;
    /**
     * 用于手动激活 tab 面板的 key，当 `controlled` 为 `true` 时才生效
     *
     * @type {string[]}
     * @memberof Accordion
     */
    current;
    /**
     * 是否受控
     *
     * @type {boolean}
     * @memberof Accordion
     */
    controlled;
    /**
     * 是否手风琴模式
     *
     * @type {boolean}
     * @memberof Accordion
     */
    accordion;
    /**
     * 标题
     *
     * @type {string}
     * @memberof Accordion
     */
    title;
    /**
     * 描述
     *
     * @type {string}
     * @memberof Accordion
     */
    label;
    get classes() {
        const { prefixCls } = this;
        const wrap = prefixCls;
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
    activeKey = [];
    keys = [];
    watchCurrent(newVal) {
        if (this.controlled) {
            this.updated(newVal);
        }
    }
    updated(activeKey = this.activeKey) {
        if (this.activeKey !== activeKey) {
            this.activeKey = activeKey;
        }
        this.updateCurrentAndIndex(activeKey);
    }
    updateCurrentAndIndex(activeKey) {
        const elements = this.$children;
        if (elements.length > 0) {
            elements.forEach((element, index) => {
                const key = element.key || String(index);
                const current = this.accordion ? activeKey[0] === key : activeKey.indexOf(key) !== -1;
                element.updateCurrentAndIndex(current, key);
            });
        }
        if (this.keys.length !== elements.length) {
            this.keys = elements.map((element) => element.$data);
        }
    }
    setActiveKey(activeKey) {
        if (!this.controlled) {
            this.updated(activeKey);
        }
        return {
            key: this.accordion ? activeKey[0] : activeKey,
            keys: this.keys,
        };
    }
    onClickItem(key) {
        let activeKey = [...this.activeKey];
        if (this.accordion) {
            activeKey = activeKey[0] === key ? [] : [key];
        }
        else {
            activeKey = activeKey.indexOf(key) !== -1 ? activeKey.filter((n) => n !== key) : [...activeKey, key];
        }
        this.setActiveKey(activeKey);
    }
    mounted() {
        const { defaultCurrent, current, controlled } = this;
        const activeKey = controlled ? current : defaultCurrent;
        this.updated(activeKey);
    }
};
__decorate([
    Prop({
        type: Array,
        default: [],
    })
], Accordion.prototype, "defaultCurrent", void 0);
__decorate([
    Prop({
        type: Array,
        default: [],
    })
], Accordion.prototype, "current", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: false,
    })
], Accordion.prototype, "controlled", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: false,
    })
], Accordion.prototype, "accordion", void 0);
__decorate([
    Prop({
        type: String,
        default: '',
    })
], Accordion.prototype, "title", void 0);
__decorate([
    Prop({
        type: String,
        default: '',
    })
], Accordion.prototype, "label", void 0);
__decorate([
    Watch('current')
], Accordion.prototype, "watchCurrent", null);
__decorate([
    Emit('change')
], Accordion.prototype, "setActiveKey", null);
Accordion = __decorate([
    Component({
        components: {
            Panel: () => ({
                module: './panel',
                type: 'child',
                observer: 'updated',
            }),
        },
        props: {
            prefixCls: {
                type: String,
                default: 'dora-accordion',
            },
        },
    })
], Accordion);
export default defineComponentHOC({ multipleSlots: false })(Accordion);
