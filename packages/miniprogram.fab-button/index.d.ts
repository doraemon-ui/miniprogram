import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance, CustomEvent } from '@doraemon-ui/miniprogram.core-js';

import type { NativeButtonProps, PresetColor } from '@doraemon-ui/miniprogram.shared';

declare class FabButton extends Doraemon {
    prefixCls: string;
    hoverClass: string;
    color: PresetColor;
    position: FabButtonPosition;
    action: string;
    actionRotate: boolean;
    hideShadow: boolean;
    backdrop: boolean;
    buttons: FabButtonOption[];
    direction: FabButtonDirection;
    spaceBetween: number;
    duration: number;
    scale: number;
    reverse: boolean;
    sAngle: number;
    eAngle: number;
    defaultVisible: boolean;
    visible: boolean;
    controlled: boolean;
    buttonStyle: string[];
    buttonVisible: boolean;
    get classes(): {
        wrap: string;
        action: string;
        text: string;
        button: ButtonClassItem[];
        icon: string;
        label: string;
        backdrop: string;
        hover: string;
    };
    onVisibleChange(newVal: boolean): void;
    forceUpdateButtonStyle(): void;
    updated(buttonVisible: boolean): void;
    onChange(buttonVisible: boolean): void;
    onToggle(): void;
    onTap(e: CustomEvent<{}, {}, {
        index: number;
        value: FabButtonOption;
    }>): void;
    updateButtonStyle(isReset: boolean): void;
    getCircleStyle(index: number, radius: number): string;
    onGetUserInfo(e: CustomEvent): {
        [x: string]: any;
    };
    onContact(e: CustomEvent): {
        [x: string]: any;
    };
    onGetPhoneNumber(e: CustomEvent): {
        [x: string]: any;
    };
    onLaunchApp(e: CustomEvent): {
        [x: string]: any;
    };
    onChooseAvatar(e: CustomEvent): {
        [x: string]: any;
    };
    onOpenSetting(e: CustomEvent): {
        [x: string]: any;
    };
    onCreateLiveActivity(e: CustomEvent): {
        [x: string]: any;
    };
    onGetRealtimePhoneNumber(e: CustomEvent): {
        [x: string]: any;
    };
    onAgreePrivacyAuthorization(e: CustomEvent): {
        [x: string]: any;
    };
    onError(e: CustomEvent): {
        [x: string]: any;
    };
    mounted(): void;
}

export { FabButton };

/**
 * FabButtonPosition类型定义
 */
export type FabButtonPosition = 'bottomRight' | 'bottomLeft' | 'topRight' | 'topLeft';

/**
 * FabButtonDirection类型定义
 */
export type FabButtonDirection = 'horizontal' | 'vertical' | 'circle';

/**
 * FabButtonOption接口定义
 */
export type FabButtonOption = Omit<NativeButtonProps, 'size' | 'type' | 'plain' | 'loading' | 'formType'> & {
    /**
     * value
     * @type {unknown}
     */
    value?: unknown;
    /**
     * label
     * @type {string}
     */
    label?: string;
    /**
     * hideShadow
     * @type {boolean}
     */
    hideShadow?: boolean;
    /**
     * className
     * @type {string}
     */
    className?: string;
};

/**
 * FabButtonProps接口定义
 */
export interface FabButtonProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * hoverClass
     * @type {string}
     */
    hoverClass?: string;
    /**
     * color
     * @type {PresetColor}
     */
    color?: PresetColor;
    /**
     * position
     * @type {FabButtonPosition}
     */
    position?: FabButtonPosition;
    /**
     * action
     * @type {string}
     */
    action?: string;
    /**
     * actionRotate
     * @type {boolean}
     */
    actionRotate?: boolean;
    /**
     * hideShadow
     * @type {boolean}
     */
    hideShadow?: boolean;
    /**
     * backdrop
     * @type {boolean}
     */
    backdrop?: boolean;
    /**
     * buttons
     * @type {FabButtonOption[]}
     */
    buttons?: FabButtonOption[];
    /**
     * direction
     * @type {FabButtonDirection}
     */
    direction?: FabButtonDirection;
    /**
     * spaceBetween
     * @type {number}
     */
    spaceBetween?: number;
    /**
     * duration
     * @type {number}
     */
    duration?: number;
    /**
     * scale
     * @type {number}
     */
    scale?: number;
    /**
     * reverse
     * @type {boolean}
     */
    reverse?: boolean;
    /**
     * sAngle
     * @type {number}
     */
    sAngle?: number;
    /**
     * eAngle
     * @type {number}
     */
    eAngle?: number;
    /**
     * defaultVisible
     * @type {boolean}
     */
    defaultVisible?: boolean;
    /**
     * visible
     * @type {boolean}
     */
    visible?: boolean;
    /**
     * controlled
     * @type {boolean}
     */
    controlled?: boolean;
}

/**
 * FabButtonExpose接口定义
 */
export interface FabButtonExpose {
}

/**
 * FabButtonClassItem接口定义
 */
export interface FabButtonClassItem {
    /**
     * wrap
     * @type {string}
     */
    wrap: string;
    /**
     * hover
     * @type {string}
     */
    hover: string;
}

/**
 * FabButtonInstance类型定义
 */
export type FabButtonInstance = ComponentPublicInstance<FabButton, FabButtonProps, FabButtonExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
