import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

import type { MiniprogramDOMRect } from '@doraemon-ui/miniprogram.shared';

import type { BackdropInstance } from '@doraemon-ui/miniprogram.backdrop';

declare class Popover extends Doraemon {
    prefixCls: string;
    classNames: string;
    color: PopoverColor;
    title: string;
    content: string;
    placement: PopoverPlacement;
    trigger: PopoverTrigger;
    bodyStyle: string | Partial<CSSStyleDeclaration>;
    defaultVisible: boolean;
    visible: boolean;
    controlled: boolean;
    mask: boolean;
    maskClosable: boolean;
    useSlot: boolean;
    slotRect: MiniprogramDOMRect | null;
    relativeRect: MiniprogramDOMRect | null;
    extStyle: string;
    popoverStyle: string;
    popoverVisible: boolean;
    _backdrop?: BackdropInstance;
    get classes(): {
        wrap: string;
        content: string;
        arrow: string;
        inner: string;
        title: string;
        innerContent: string;
        element: string;
    };
    onBodyStyleChange(newVal: string | Partial<CSSStyleDeclaration>): void;
    onVisibleChange(newVal: boolean): void;
    updated(popoverVisible: boolean): void;
    getPopoverStyle(): void;
    onEnter(): void;
    onChange(): void;
    onClick(): void;
    setBackdropVisible(visible: boolean): void;
    onMaskClick(): void;
    created(): void;
    mounted(): void;
}

export { Popover };

export type PopoverPlacement = 'topLeft' | 'top' | 'topRight' | 'rightTop' | 'right' | 'rightBottom' | 'bottomRight' | 'bottom' | 'bottomLeft' | 'leftBottom' | 'left' | 'leftTop';

export type PopoverColor = 'light' | 'dark';

export type PopoverTrigger = 'click';

export interface PopoverProps {
    prefixCls?: string;
    classNames?: string;
    color?: PopoverColor;
    title?: string;
    content?: string;
    placement?: PopoverPlacement;
    trigger?: PopoverTrigger;
    bodyStyle?: string | Partial<CSSStyleDeclaration>;
    defaultVisible?: boolean;
    visible?: boolean;
    controlled?: boolean;
    mask?: boolean;
    maskClosable?: boolean;
    useSlot?: boolean;
    slotRect?: MiniprogramDOMRect | null;
    relativeRect?: MiniprogramDOMRect | null;
}

export interface PopoverExpose {
    onChange?: () => void;
}

export type PopoverInstance = ComponentPublicInstance<Popover, PopoverProps, PopoverExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
