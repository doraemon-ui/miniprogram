/**
 * @doraemon-ui/miniprogram.accordion.
 * © 2021 - 2021 Doraemon UI.
 * Built on 2021-11-30, 15:14:45.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.17.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Emit, Watch } from '@doraemon-ui/miniprogram.core-js';
let Accordion = class Accordion extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Button
     */
    prefixCls;
    /**
     * 当前的主题
     *
     * @type {string}
     * @memberof Button
     */
    darkmode;
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
        this.changeCurrent(activeKey);
    }
    changeCurrent(activeKey) {
        const elements = this.$children;
        if (elements.length > 0) {
            elements.forEach((element, index) => {
                const key = element.key || String(index);
                const current = this.accordion ?
                    activeKey[0] === key :
                    activeKey.indexOf(key) !== -1;
                this.$nextTick(() => element.changeCurrent(current, key));
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
            activeKey = activeKey.indexOf(key) !== -1 ?
                activeKey.filter((n) => n !== key) :
                [...activeKey, key];
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
            darkmode: {
                type: String,
                default: Doraemon.config.darkmode,
            },
            defaultCurrent: {
                type: Array,
                default: [],
            },
            current: {
                type: Array,
                default: [],
            },
            controlled: {
                type: Boolean,
                default: false,
            },
            accordion: {
                type: Boolean,
                default: false,
            },
            title: {
                type: String,
                default: '',
            },
            label: {
                type: String,
                default: '',
            },
        },
    })
], Accordion);
export default defineComponentHOC({ multipleSlots: false })(Accordion);
