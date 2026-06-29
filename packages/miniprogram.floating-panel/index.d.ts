import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance, TouchEvent } from '@doraemon-ui/miniprogram.core-js';

declare class FloatingPanel extends Doraemon {
    prefixCls: string;
    defaultAnchors: number[];
    wrapStyle: string;
    possibles: number[];
    moving: boolean;
    startY: number;
    moveY: number;
    endY: number;
    lastY: number;
    bounds: FloatingPanelBounds;
    get classes(): {
        wrap: string;
        hd: string;
        bd: string;
        bar: string;
        mask: string;
    };
    buildWrapStyle(y: number, duration?: number): string;
    setTransform(y: number, duration?: number): void;
    setHeight(height: number, options?: {
        immediate?: boolean;
    }): void;
    onTouchStart(e: TouchEvent): void;
    onTouchMove(e: TouchEvent): void;
    onTouchEnd(e: TouchEvent): void;
    mounted(): void;
}

export { FloatingPanel };

export interface FloatingPanelBounds {
    top: number;
    bottom: number;
}

export interface FloatingPanelProps {
    prefixCls?: string;
    defaultAnchors?: number[];
}

export interface FloatingPanelExpose {
    setHeight(height: number, options?: {
        immediate?: boolean;
    }): void;
}

export type FloatingPanelInstance = ComponentPublicInstance<FloatingPanel, FloatingPanelProps, FloatingPanelExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
