/**
 * @doraemon-ui/miniprogram.image.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-07-02, 19:44:32.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.65.
 */

import { Doraemon, Prop, Watch, Event, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';
import { useExternalCls, useMergeSemanticClassNames, useMergeSemanticStylesString, getFontSize } from '@doraemon-ui/miniprogram.shared';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames, styleToCssString } = Doraemon.util;
const EMPTY = 'empty';
const LOADING = 'loading';
const LOADED = 'loaded';
const ERROR = 'error';
const UNMOUNTED = 'unmounted';
let Image = class Image extends Doraemon {
    get classes() {
        const { prefixCls, rootClassName, shape, mode, status, empty, loading, error } = this;
        const internalClassNames = {
            root: classNames(prefixCls, rootClassName, {
                [`${prefixCls}--${shape}`]: shape,
                [`${prefixCls}--${mode}`]: mode,
                [`${prefixCls}--${status}`]: status
            }),
            inner: `${prefixCls}__inner`,
            thumb: `${prefixCls}__thumb`,
            mask: classNames(`${prefixCls}__mask`, {
                [`${prefixCls}__mask--text`]: empty || loading || error
            }),
            text: `${prefixCls}__text`
        };
        return useMergeSemanticClassNames([
            internalClassNames,
            this.classNames
        ], {
            props: this
        });
    }
    get mergedStyles() {
        const { rootStyle = {}, internalRootStyle = {} } = this;
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
    onSrcChange(src) {
        this.updated(src);
    }
    onWidthChange() {
        this.updateStyle(this.width, this.height);
    }
    onHeightChange() {
        this.updateStyle(this.width, this.height);
    }
    updated(src) {
        this.updateStatus(src ? LOADING : this.unmountOnEmpty ? UNMOUNTED : EMPTY);
    }
    updateStyle(width, height) {
        this.internalRootStyle = {
            width: getFontSize(width),
            height: getFontSize(height)
        };
    }
    updateStatus(status) {
        if (this.status !== status) {
            this.status = status;
        }
        this.$emit('change', {
            status
        });
    }
    onLoad(e) {
        this.updateStatus(LOADED);
        this.$emit('load', {
            ...e.detail,
            status: LOADED
        });
    }
    onError(e) {
        const status = this.unmountOnError ? UNMOUNTED : ERROR;
        this.updateStatus(status);
        this.$emit('error', {
            ...e.detail,
            status
        });
    }
    onTap(e) {
        this.$emit('click', {
            ...e.detail,
            status: this.status
        });
    }
    mounted() {
        this.updateStyle(this.width, this.height);
        this.updated(this.src);
    }
    constructor(...args){
        super(...args);
        this.status = EMPTY;
        this.internalRootStyle = {};
    }
};
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Image.prototype, "src", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'scaleToFill'
    })
], Image.prototype, "mode", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Image.prototype, "webp", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Image.prototype, "lazyLoad", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Image.prototype, "showMenuByLongpress", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Image.prototype, "forceHttps", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'normal'
    })
], Image.prototype, "shape", void 0);
_ts_decorate([
    Prop({
        type: null,
        default: 300
    })
], Image.prototype, "width", void 0);
_ts_decorate([
    Prop({
        type: null,
        default: 225
    })
], Image.prototype, "height", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Image.prototype, "unmountOnEmpty", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Image.prototype, "unmountOnError", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Image.prototype, "empty", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Image.prototype, "loading", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Image.prototype, "error", void 0);
_ts_decorate([
    Watch('src')
], Image.prototype, "onSrcChange", null);
_ts_decorate([
    Watch('width')
], Image.prototype, "onWidthChange", null);
_ts_decorate([
    Watch('height')
], Image.prototype, "onHeightChange", null);
_ts_decorate([
    Event()
], Image.prototype, "onLoad", null);
_ts_decorate([
    Event()
], Image.prototype, "onError", null);
_ts_decorate([
    Event()
], Image.prototype, "onTap", null);
Image = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-image'
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
], Image);
var index = defineComponentHOC({
    externalClasses: useExternalCls([
        'image'
    ])
})(Image);

export { Image, index as default };
