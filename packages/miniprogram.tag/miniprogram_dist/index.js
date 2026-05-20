/**
 * @doraemon-ui/miniprogram.tag.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-20, 21:13:03.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { Doraemon, Prop, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';
import { useControlledState, isPresetColor, useCSSVarCls, useColorCls, useSemanticClassNames, FastColor, useSemanticStylesString } from '@doraemon-ui/miniprogram.shared';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames, styleToCssString } = Doraemon.util;
const { ControlledState, setControlledState } = useControlledState('visible');
let Tag = // const isPresetColor = (color: string) =>
//   /^(pink|red|yellow|orange|cyan|green|blue|purple|geekblue|magenta|volcano|gold|lime)(-inverse)?$/.test(color)
class Tag extends Doraemon {
    get classes() {
        const { prefixCls, hoverClass, color, fill } = this;
        const hover = hoverClass && hoverClass !== 'default' ? hoverClass : `${prefixCls}--hover`;
        const isPreset = isPresetColor(color);
        const internalClassNames = {
            root: classNames(prefixCls, useCSSVarCls(prefixCls), useColorCls(color), {
                [`${prefixCls}--${fill}`]: fill,
                [`${prefixCls}--${color}`]: isPreset
            }),
            icon: `${prefixCls}__icon`,
            hover
        };
        return useSemanticClassNames(undefined, internalClassNames, this.classNames);
    }
    get mergedStyles() {
        const { color, fill } = this;
        const isPreset = isPresetColor(color);
        const rootStyle = {};
        if (!isPreset && color) {
            if (fill === 'solid') {
                rootStyle.backgroundColor = color;
            } else {
                const hsl = new FastColor(color).toHsl();
                hsl.l = 0.95;
                rootStyle.backgroundColor = new FastColor(hsl).toHexString();
                rootStyle.color = color;
                if (fill === 'outline') {
                    rootStyle.borderColor = color;
                }
            }
        }
        return useSemanticStylesString({
            root: rootStyle
        }, this.styles);
    }
    // get rootStyle() {
    //   const { styles } = this
    //   return styles?.root ? styleToCssString(styles.root) : ''
    // }
    // @Watch('color')
    // onColorChange(c: string) {
    //   this.updateStyle(c)
    // }
    // updateStyle(color: string) {
    //   const isPreset = isPresetColor(color)
    //   this.className = isPreset ? `${this.prefixCls}--${color}` : ''
    //   this.tagStyle = !isPreset && color ? styleToCssString({ backgroundColor: color, color: '#fff' }) : ''
    // }
    onChange(tagVisible) {
        setControlledState(this, tagVisible, !this.controlled);
        this.$emit('change', {
            value: tagVisible
        });
    }
    onClick() {
        this.$emit('click');
    }
    onClose() {
        if (this.closable) {
            this.$emit('close');
            this.onChange(false);
        }
    }
    constructor(...args){
        super(...args);
        // className: string = ''
        // tagStyle: string = ''
        this.tagVisible = true;
    }
};
_ts_decorate([
    Prop({
        type: String,
        default: 'default'
    })
], Tag.prototype, "hoverClass", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Tag.prototype, "color", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'fill'
    })
], Tag.prototype, "fill", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Tag.prototype, "closable", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: true
    })
], Tag.prototype, "defaultVisible", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: true
    })
], Tag.prototype, "visible", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Tag.prototype, "controlled", void 0);
_ts_decorate([
    ControlledState()
], Tag.prototype, "tagVisible", void 0);
Tag = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-tag'
            },
            classNames: {
                type: Object,
                default: ()=>({})
            },
            styles: {
                type: Object,
                default: ()=>({})
            }
        }
    })
], Tag);
var index = defineComponentHOC()(Tag);

export { Tag, index as default };
