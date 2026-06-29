import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance, CSSStylePropertiesWithVars, CustomEvent } from '@doraemon-ui/miniprogram.core-js';

declare class Image extends Doraemon {
    prefixCls: string;
    rootClassName: string;
    rootStyle: string | Partial<CSSStylePropertiesWithVars>;
    classNames: Partial<Record<SemanticName, string>>;
    styles: Partial<Record<SemanticName, CSSStylePropertiesWithVars | string>>;
    src: string;
    mode: ImageMode;
    webp: boolean;
    lazyLoad: boolean;
    showMenuByLongpress: boolean;
    forceHttps: boolean;
    shape: ImageShape;
    width: string | number;
    height: string | number;
    unmountOnEmpty: boolean;
    unmountOnError: boolean;
    empty: string;
    loading: string;
    error: string;
    status: ImageStatus;
    internalRootStyle: Partial<CSSStylePropertiesWithVars>;
    get classes(): Partial<Record<string, any>>;
    get mergedStyles(): Record<string, any>;
    onSrcChange(src: string): void;
    onWidthChange(): void;
    onHeightChange(): void;
    updated(src: string): void;
    updateStyle(width: string | number, height: string | number): void;
    updateStatus(status: ImageStatus): void;
    onLoad(e: CustomEvent): void;
    onError(e: CustomEvent): void;
    onTap(e: CustomEvent): void;
    mounted(): void;
}

export { Image };

/**
 * SemanticName类型定义
 *
 * - root: 根元素，设置容器样式和布局
 * - thumb: 图片元素，设置图片样式
 */
export type SemanticName = 'root' | 'thumb';

export type ImageStatus = 'empty' | 'loading' | 'loaded' | 'error' | 'unmounted';

export type ImageShape = 'normal' | 'rounded' | 'circle' | 'thumbnail';

export type ImageMode = 'scaleToFill' | 'aspectFit' | 'aspectFill' | 'widthFix' | 'heightFix' | 'top' | 'bottom' | 'center' | 'left' | 'right' | 'top left' | 'top right' | 'bottom left' | 'bottom right';

export interface ImageProps {
    prefixCls?: string;
    rootClassName?: string;
    rootStyle?: string | Partial<CSSStylePropertiesWithVars>;
    classNames?: Partial<Record<SemanticName, string>>;
    styles?: Partial<Record<SemanticName, CSSStylePropertiesWithVars | string>>;
    src?: string;
    mode?: ImageMode;
    webp?: boolean;
    lazyLoad?: boolean;
    showMenuByLongpress?: boolean;
    shape?: ImageShape;
    width?: string | number;
    height?: string | number;
    unmountOnEmpty?: boolean;
    unmountOnError?: boolean;
    empty?: string;
    loading?: string;
    error?: string;
}

export interface ImageExpose {
}

export type ImageInstance = ComponentPublicInstance<Image, ImageProps, ImageExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
