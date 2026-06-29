import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance, CustomEvent } from '@doraemon-ui/miniprogram.core-js';

import type { NativeRouteOpenType, PresetColor } from '@doraemon-ui/miniprogram.shared';

declare class Footer extends Doraemon {
    prefixCls: string;
    color: PresetColor;
    label: string;
    content: string;
    links: FooterLinkItem[];
    chips: FooterChipItem[];
    get classes(): {
        wrap: string;
        label: string;
        content: string;
        links: string;
        link: string;
        chips: string;
        chip: string;
        chipLink: string;
    };
    onLinkClick(e: CustomEvent<unknown, unknown, {
        index: number;
    }>): void;
    onChipClick(e: CustomEvent<unknown, unknown, {
        index: number;
    }>): void;
}

export { Footer };

export interface FooterLinkItem {
    text: string;
    url?: string;
    openType?: NativeRouteOpenType;
    delta?: number;
    urlParams?: Record<string, any>;
}

export interface FooterChipItem {
    text: string;
    type?: 'default' | 'link';
}

export interface FooterLinkClickDetail {
    item: FooterLinkItem;
    index: number;
}

export interface FooterChipClickDetail {
    item: FooterChipItem;
    index: number;
}

export interface FooterProps {
    prefixCls?: string;
    color?: PresetColor;
    label?: string;
    content?: string;
    links?: FooterLinkItem[];
    chips?: FooterChipItem[];
}

export interface FooterExpose {
}

export type FooterInstance = ComponentPublicInstance<Footer, FooterProps, FooterExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
