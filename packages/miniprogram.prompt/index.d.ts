import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance, CustomEvent } from '@doraemon-ui/miniprogram.core-js';

import type { ClassNames } from '@doraemon-ui/miniprogram.animation-group';

import type { ButtonProps } from '@doraemon-ui/miniprogram.button';

declare const defaultIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAHdElNRQfgCxwAHyE2vHbUAAACWUlEQVRo3u2ZP2gTcRTHP7EpBTOJWrDSxdZBxE0yCC3UdilqUBCs4B8ogVfr0EnQ6lAEsylIXR6moFA1g6IoSAct7WhxUBQFsS5aLDgWcWitLjG5y11zufxyl8Hfd8n7vd+79z738svvfkfAysrqf1fC3609jHGYtnDJJBEuHiDpU7yNAkfj6sAmH990fOV9ADTN8fjK+3VA4izvB9AfL4B3EbY67E75Vn9qHeSCHAzfgQZJIU+f7moaAPvpAC7FAKAnPJ6EprkOQFbP6OZIAbSdgna5PEf4wSt6i8O7/NRx3RZdB84B4y7PGFsrYq7RExGAppgAhnV72ScDdDFVGi7ST4s8jqoD/77/UadTvkiW0wB8pltmZX3jBEYAmizd6YSmKiYfATAStLGadWDAYQ+5p+QXF4G5oBQGANrObccwr50VAXmG5HdQFs8RQpfoKA023Ip1N5c563E/5Qrvwj3NkqGiAU2Q5gYHfCczZPio55mvtuyMADTDHbZUDdnDLOhJKbiu+1O23Qe3sGsgFVC+HFejQgLIA1ro40OVkGUO0SpTtWYM/SuQdZljL/t44jM5T5od8lzWas8XehECCLznmO7kDc6HTLcshs9lsA/IEsOO4Wg95U13whmHPV1fCiMAWWWkaOZkpQkAwP3i52S9CQwBZIUccE+WmwQA3AKu1n+5MYB8JyufmggAte96EQGYyQJYAAtgASyA90y46rC/ahM68DLiigtBAFHfdC4AQBZ4GGH5tzwL6gCc8n3paIRe01v52trQ/wuqaI0X3JQZ80RWVlYN11+uNXxr6IunHwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNi0xMS0yOFQwMDozMTozMyswODowMBHRiXcAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTYtMTEtMjhUMDA6MzE6MzMrMDg6MDBgjDHLAAAAAElFTkSuQmCC";

declare class Prompt extends Doraemon {
    prefixCls: string;
    classNames: ClassNames;
    icon: string;
    title: string;
    text: string;
    buttons: PromptButton[];
    visible: boolean;
    wrapStyle: string | Partial<CSSStyleDeclaration>;
    get classes(): {
        wrap: string;
        button: PromptClassItem[];
        bd: string;
        icon: string;
        title: string;
        text: string;
        buttons: string;
    };
    onClick(e: CustomEvent<{
        index: number;
    }>): void;
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
}

export { Prompt, defaultIcon };

export interface PromptButton extends Omit<ButtonProps, 'prefixCls'> {
    /**
     * 按钮文案
     */
    text?: string;
    /**
     * 自定义按钮类名
     */
    className?: string;
}

/**
 * PromptProps接口定义
 */
export interface PromptProps {
    /**
     * 自定义类名前缀
     */
    prefixCls?: string;
    /**
     * 动画类名
     */
    classNames?: ClassNames;
    /**
     * 图标
     */
    icon?: string;
    /**
     * 标题
     */
    title?: string;
    /**
     * 描述文案
     */
    text?: string;
    /**
     * 按钮列表
     */
    buttons?: PromptButton[];
    /**
     * 是否显示
     */
    visible?: boolean;
    /**
     * 外层样式
     */
    wrapStyle?: string | Partial<CSSStyleDeclaration>;
}

/**
 * PromptExpose接口定义
 */
export interface PromptExpose {
}

export interface PromptClassItem {
    wrap: string;
    hover: string;
}

/**
 * PromptInstance类型定义
 */
export type PromptInstance = ComponentPublicInstance<Prompt, PromptProps, PromptExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
