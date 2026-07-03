/**
 * @doraemon-ui/miniprogram.tag.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-07-02, 20:46:57.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.66.
 */

import { Doraemon, Prop, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';
import { useControlledState, isPresetColor, useHoverCls, useCSSVarCls, useColorCls, useMergeSemanticClassNames, FastColor, useMergeSemanticStylesString } from '@doraemon-ui/miniprogram.shared';

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
        const { prefixCls, rootClassName, hoverClass, color, fill } = this;
        const isPreset = isPresetColor(color);
        const internalClassNames = {
            root: classNames(prefixCls, rootClassName, useCSSVarCls(prefixCls), useColorCls(color), {
                [`${prefixCls}--${fill}`]: fill,
                [`${prefixCls}--${color}`]: isPreset
            }),
            icon: `${prefixCls}__icon`,
            hover: useHoverCls(prefixCls, hoverClass)
        };
        return useMergeSemanticClassNames([
            internalClassNames,
            this.classNames
        ], {
            props: this
        });
    }
    get mergedStyles() {
        const { rootStyle = {}, color, fill } = this;
        const isPreset = isPresetColor(color);
        const internalRootStyle = {};
        if (!isPreset && color) {
            if (fill === 'solid') {
                internalRootStyle.backgroundColor = color;
            } else {
                const base = new FastColor(color);
                internalRootStyle.backgroundColor = base.tint(88).toHexString();
                internalRootStyle.color = color;
                if (fill === 'outline') {
                    internalRootStyle.borderColor = color;
                }
            }
        }
        return useMergeSemanticStylesString([
            {
                root: rootStyle
            },
            {
                root: internalRootStyle
            },
            this.styles
        ], {
            props: this
        });
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
            rootClassName: {
                type: String,
                default: ''
            },
            rootStyle: {
                type: null,
                default: null
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
