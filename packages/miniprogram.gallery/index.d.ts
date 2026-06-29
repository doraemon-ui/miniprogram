import type { MiniprogramPublicInstance } from '@doraemon-ui/miniprogram.shared';

import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance, CustomEvent, TouchEvent } from '@doraemon-ui/miniprogram.core-js';

import type { ClassNames } from '@doraemon-ui/miniprogram.animation-group';

export type { GalleryProps, GalleryShowOptions, GalleryShowProps };

declare function clear(): void;

declare function show(props?: GalleryShowProps, options?: GalleryShowOptions): () => void;

declare function show(props?: GalleryShowProps, selector?: string, instance?: MiniprogramPublicInstance): () => void;

export { show, clear };

declare class Gallery extends Doraemon {
    prefixCls: string;
    classNames: ClassNames;
    visible: boolean;
    indicatorDots: boolean;
    indicatorColor: string;
    indicatorActiveColor: string;
    autoplay: boolean;
    interval: number;
    duration: number;
    circular: boolean;
    vertical: boolean;
    icon: string;
    showDelete: boolean;
    allowScale: boolean;
    current: number;
    urls: Array<string | GalleryItem>;
    galleryVisible: boolean;
    images: GalleryImage[];
    transition: string;
    _allowItemClick: boolean;
    _touching: boolean;
    _isRendered: boolean;
    _prevDistance: number;
    get classes(): {
        wrap: string;
        swiper: string;
        item: string;
        img: string;
        remark: string;
        opr: string;
        del: string;
        icon: string;
    };
    onPropsChange(): void;
    syncFromProps(): void;
    hide(): void;
    /** May be rewritten */
    onCancel(): void;
    /** May be rewritten */
    onClose(): void;
    /** May be rewritten */
    onClosed(): void;
    onItemClick(e: CustomEvent<{}, {}, {
        index: number;
    }>): void;
    /** May be rewritten */
    onClick(current: number, urls: Array<string | GalleryItem>): boolean | void;
    onTouchStart(e: TouchEvent): void;
    onTouchMove(e: TouchEvent<{}, {}, {
        index: number;
        touch: GalleryImage['touch'];
    }>): void;
    onTouchEnd(e: TouchEvent<{}, {}, {
        index: number;
        touch: GalleryImage['touch'];
    }>): void;
    onItemDelete(): void;
    /** May be rewritten */
    onDelete(current: number, urls: Array<string | GalleryItem>): boolean | void;
    onSwiperChange(e: CustomEvent<{
        current: number;
        source: string;
    }>): void;
    /** May be rewritten */
    onChange(detail: {
        current: number;
        source: string;
    }): void;
    mounted(): void;
}

export { Gallery };

export interface GalleryItem {
    image: string;
    remark?: string;
}

export type GalleryImage = GalleryItem & {
    touch: {
        scale: number;
        offset: [number, number];
    };
};

export type GalleryShowProps = Omit<GalleryProps, 'visible'> & GalleryExpose;

export interface GalleryShowOptions {
    selector?: string;
    instance?: MiniprogramPublicInstance;
}

export interface GalleryProps {
    prefixCls?: string;
    visible?: boolean;
    current?: number;
    urls?: Array<string | GalleryItem>;
    classNames?: string;
    indicatorDots?: boolean;
    indicatorColor?: string;
    indicatorActiveColor?: string;
    autoplay?: boolean;
    interval?: number;
    duration?: number;
    circular?: boolean;
    vertical?: boolean;
    showDelete?: boolean;
    allowScale?: boolean;
    icon?: string;
}

export interface GalleryExpose {
    onDelete?: (current: number, urls: Array<string | GalleryItem>) => boolean | void;
    onClick?: (current: number, urls: Array<string | GalleryItem>) => boolean | void;
    onChange?: (detail: {
        current: number;
        source: string;
    }) => void;
    onCancel?: () => void;
    onClose?: () => void;
    onClosed?: () => void;
}

export type GalleryInstance = ComponentPublicInstance<Gallery, GalleryProps, GalleryExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
