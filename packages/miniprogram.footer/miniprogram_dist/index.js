/**
 * @doraemon-ui/miniprogram.footer.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-07-02, 20:46:54.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.66.
 */

import { Doraemon, Prop, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';
import { useNativeRoute } from '@doraemon-ui/miniprogram.shared';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames } = Doraemon.util;
let Footer = class Footer extends Doraemon {
    get classes() {
        const { prefixCls, color } = this;
        return {
            wrap: classNames(prefixCls, {
                'dora-color': color,
                [`dora-color--${color}`]: color
            }),
            label: `${prefixCls}__label`,
            content: `${prefixCls}__content`,
            links: `${prefixCls}__links`,
            link: `${prefixCls}__link`,
            chips: `${prefixCls}__chips`,
            chip: `${prefixCls}__chip`,
            chipLink: `${prefixCls}__chip--link`
        };
    }
    onLinkClick(e) {
        const { index } = e.currentTarget.dataset;
        const item = this.links[index];
        if (!item) return;
        if (item.url !== undefined) {
            useNativeRoute({
                url: item.url,
                urlParams: item.urlParams,
                openType: item.openType,
                delta: item.delta
            }, this);
        }
        this.$emit('linkClick', {
            item,
            index
        });
    }
    onChipClick(e) {
        const { index } = e.currentTarget.dataset;
        const item = this.chips[index];
        if (!item || item.type !== 'link') return;
        this.$emit('chipClick', {
            item,
            index
        });
    }
};
_ts_decorate([
    Prop({
        type: String,
        default: 'positive'
    })
], Footer.prototype, "color", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Footer.prototype, "label", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Footer.prototype, "content", void 0);
_ts_decorate([
    Prop({
        type: Array,
        default: ()=>[]
    })
], Footer.prototype, "links", void 0);
_ts_decorate([
    Prop({
        type: Array,
        default: ()=>[]
    })
], Footer.prototype, "chips", void 0);
Footer = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-footer'
            }
        }
    })
], Footer);
var index = defineComponentHOC()(Footer);

export { Footer, index as default };
