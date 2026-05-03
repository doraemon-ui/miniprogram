/**
 * @doraemon-ui/miniprogram.ellipsis.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:38:48.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { Doraemon, Prop, Watch, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames, styleToCssString } = Doraemon.util;
function getSubString(chars, start, end) {
    return chars.slice(start, end).join('');
}
let Ellipsis = class Ellipsis extends Doraemon {
    get classes() {
        const { prefixCls } = this;
        return {
            wrap: classNames(prefixCls),
            container: classNames(prefixCls, `${prefixCls}--container`),
            expanded: `${prefixCls}__expanded`,
            collapsed: `${prefixCls}__collapsed`
        };
    }
    onPropsChange() {
        this.calcEllipsised();
    }
    /**
   * 点击组件
   */ onTap() {
        this.$emit('click');
    }
    /**
   * 展开/收起
   */ setExpanded(e) {
        const expanded = String(e?.target?.dataset?.expanded || '0');
        this.expanded = expanded === '1';
        this.calcEllipsised();
    }
    /**
   * 计算省略文案
   * 注：按字符数近似计算，避免运行时测量抖动
   */ calcEllipsised() {
        const chars = Array.from(this.content || '');
        const end = chars.length;
        const maxChars = Math.max(1, Number(this.rows || 1) * 26);
        this.innerText = this.content;
        this.end = end;
        this.containerStyle = styleToCssString({
            width: '100%',
            wordBreak: 'break-word'
        });
        if (this.expanded || end <= maxChars) {
            this.exceeded = false;
            this.ellipsised = {
                leading: this.content,
                tailing: ''
            };
            return;
        }
        this.exceeded = true;
        if (this.direction === 'start') {
            this.ellipsised = {
                leading: '',
                tailing: '...' + getSubString(chars, Math.max(0, end - maxChars), end)
            };
            return;
        }
        if (this.direction === 'middle') {
            const left = Math.floor(maxChars / 2);
            const right = end - Math.ceil(maxChars / 2);
            this.ellipsised = {
                leading: getSubString(chars, 0, left) + '...',
                tailing: '...' + getSubString(chars, Math.max(left, right), end)
            };
            return;
        }
        this.ellipsised = {
            leading: getSubString(chars, 0, maxChars) + '...',
            tailing: ''
        };
    }
    mounted() {
        this.expanded = this.defaultExpanded;
        this.calcEllipsised();
    }
    constructor(...args){
        super(...args);
        this.ellipsised = {
            leading: '',
            tailing: ''
        };
        this.expanded = false;
        this.exceeded = false;
        this.innerText = '';
        this.end = -1;
        this.containerStyle = '';
    }
};
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Ellipsis.prototype, "content", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'end'
    })
], Ellipsis.prototype, "direction", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Ellipsis.prototype, "defaultExpanded", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Ellipsis.prototype, "expandText", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Ellipsis.prototype, "collapseText", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 1
    })
], Ellipsis.prototype, "rows", void 0);
_ts_decorate([
    Watch('prefixCls'),
    Watch('content'),
    Watch('direction'),
    Watch('rows'),
    Watch('expandText'),
    Watch('collapseText')
], Ellipsis.prototype, "onPropsChange", null);
Ellipsis = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-ellipsis'
            },
            content: {
                type: String,
                default: ''
            },
            direction: {
                type: String,
                default: 'end'
            },
            defaultExpanded: {
                type: Boolean,
                default: false
            },
            expandText: {
                type: String,
                default: ''
            },
            collapseText: {
                type: String,
                default: ''
            },
            rows: {
                type: Number,
                default: 1
            }
        }
    })
], Ellipsis);
var index = defineComponentHOC()(Ellipsis);

export { Ellipsis, index as default };
