import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance, TouchEvent } from '@doraemon-ui/miniprogram.core-js';

import type { ClassNames } from '@doraemon-ui/miniprogram.animation-group';

import type { MiniprogramPublicInstance } from '@doraemon-ui/miniprogram.shared';

declare class Notification extends Doraemon {
    prefixCls: string;
    classNames: ClassNames;
    visible: boolean;
    image: string;
    title: string;
    titleRightText: string;
    closable: boolean;
    swipeToClose: boolean;
    subtitle: string;
    text: string;
    duration: number;
    data: Record<string, unknown> | null;
    notificationVisible: boolean;
    notificationWrapStyle: Partial<CSSStyleDeclaration> | null;
    _closeTimer: ReturnType<typeof setTimeout> | null;
    _isTouched: boolean;
    _isMoved: boolean;
    _isScrolling?: boolean;
    _touchesDiff: number;
    _touchStartTime: number;
    _notificationHeight: number;
    _touchesStart: {
        x: number;
        y: number;
    };
    get classes(): {
        wrap: string;
        content: string;
        hd: string;
        icon: string;
        image: string;
        bd: string;
        header: string;
        title: string;
        titleRightText: string;
        closeButton: string;
        subtitle: string;
        text: string;
        ft: string;
    };
    onVisibleChange(visible: boolean): void;
    onDurationChange(): void;
    setNotificationVisible(notificationVisible: boolean): void;
    clearCloseTimer(): void;
    scheduleClose(): void;
    onTap(): void;
    updateNotificationHeight(): Promise<void>;
    updateWrapStyle(transform?: string, transition?: string): void;
    onTouchStart(e: TouchEvent): void;
    onTouchMove(e: TouchEvent): void;
    onTouchEnd(): void;
    onCloseTap(): void;
    onClick(data: Record<string, unknown> | null): void;
    onClose(data: Record<string, unknown> | null): void;
    onClosed(): void;
    mounted(): void;
    destroyed(): void;
}

export { Notification };

export interface NotificationProps {
    prefixCls?: string;
    visible?: boolean;
    classNames?: string;
    image?: string;
    title?: string;
    titleRightText?: string;
    closable?: boolean;
    swipeToClose?: boolean;
    subtitle?: string;
    text?: string;
    duration?: number;
    data?: Record<string, unknown> | null;
}

export interface NotificationExpose {
    onClick?: (data?: Record<string, unknown> | null) => void;
    onClose?: (data?: Record<string, unknown> | null) => void;
    onClosed?: () => void;
}

export interface NotificationShowOptions {
    selector?: string;
    instance?: MiniprogramPublicInstance;
}

export interface NotificationDestroyHandle {
    (): void;
    then: (onfulfilled?: () => void, onrejected?: (reason: unknown) => void) => Promise<void>;
    promise: Promise<void>;
}

export type NotificationShowProps = Omit<NotificationProps, 'visible'> & NotificationExpose;

export type NotificationInstance = ComponentPublicInstance<Notification, NotificationProps, NotificationExpose>;

export type { NotificationDestroyHandle, NotificationProps, NotificationShowOptions, NotificationShowProps };

declare function clear(): void;

declare function show(props?: NotificationShowProps, options?: NotificationShowOptions): NotificationDestroyHandle;

declare function show(props?: NotificationShowProps, selector?: string, instance?: MiniprogramPublicInstance): NotificationDestroyHandle;

export { show, clear };

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
