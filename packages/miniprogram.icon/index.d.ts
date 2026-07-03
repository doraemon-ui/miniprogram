import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

export declare const PRESET_MP_ICON_MAP: Record<MpIconType, string>;

declare class Icon extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Icon
     */
    prefixCls: string;
    /**
     * 是否隐藏
     *
     * @type {boolean}
     * @memberof Icon
     */
    hidden: boolean;
    /**
     * 图标类型
     *
     * @type {(IconType | MpIconType)}
     * @memberof Icon
     */
    type: IconType | MpIconType;
    /**
     * 图标尺寸
     *
     * @type {(string | number)}
     * @memberof Icon
     */
    size: string | number;
    /**
     * 图标颜色
     *
     * @type {string}
     * @memberof Icon
     */
    color: string;
    get classes(): {
        wrap: string;
    };
    get containerStyle(): string;
    onClick(): void;
}

export { Icon };

/**
 * 基于 iconfont/doraemon-ui-icons/iconfont.css 自动生成，请勿手动编辑。
 */
export type IconType = 'add' | 'add-circle' | 'add-circle-outline' | 'alert' | 'alert-circle' | 'alert-circle-outline' | 'arrow-back-circle' | 'arrow-back-circle-outline' | 'arrow-back-outline' | 'arrow-down-circle' | 'arrow-down-circle-outline' | 'arrow-down-outline' | 'arrow-forward-circle' | 'arrow-forward-circle-outline' | 'arrow-forward-outline' | 'arrow-up-circle' | 'arrow-up-circle-outline' | 'arrow-up-outline' | 'checkmark' | 'checkmark-circle' | 'checkmark-circle-outline' | 'chevron-back' | 'chevron-back-circle' | 'chevron-back-circle-outline' | 'chevron-down' | 'chevron-down-circle' | 'chevron-down-circle-outline' | 'chevron-forward' | 'chevron-forward-circle' | 'chevron-forward-circle-outline' | 'chevron-up' | 'chevron-up-circle' | 'chevron-up-circle-outline' | 'close' | 'close-circle' | 'close-circle-outline' | 'dora-avatar' | 'dora-bell' | 'dora-hopter' | 'download' | 'download-outline' | 'heart' | 'heart-half' | 'heart-half-outline' | 'heart-outline' | 'help' | 'help-circle' | 'help-circle-outline' | 'information' | 'information-circle' | 'information-circle-outline' | 'loading-3-quarters-outline' | 'loading-outline' | 'moon' | 'moon-outline' | 'remove' | 'remove-circle' | 'remove-circle-outline' | 'search' | 'search-circle' | 'search-circle-outline' | 'star' | 'star-half' | 'star-outline' | 'sunny' | 'sunny-outline' | 'trash' | 'trash-outline' | 'upload' | 'upload-outline';

/**
 * 基于 iconfont/miniprogram-icons/iconfont.css 自动生成，请勿手动编辑。
 */
export type MpIconType = 'back' | 'cancel' | 'circle' | 'clear' | 'delete' | 'download' | 'info' | 'info_circle' | 'safe_success' | 'safe_warn' | 'search' | 'success' | 'success_circle' | 'success_no_circle' | 'waiting' | 'waiting_circle' | 'warn';

/**
 * IconProps接口定义
 */
export interface IconProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 是否隐藏
     *
     * @type {boolean}
     */
    hidden?: boolean;
    /**
     * 图标类型
     *
     * @type {(IconType | MpIconType)}
     */
    type?: IconType | MpIconType;
    /**
     * 图标尺寸
     *
     * @type {(string | number)}
     */
    size?: string | number;
    /**
     * 图标颜色
     *
     * @type {string}
     */
    color?: string;
}

/**
 * IconExpose接口定义
 */
export interface IconExpose {
}

/**
 * IconInstance类型定义
 */
export type IconInstance = ComponentPublicInstance<Icon, IconProps, IconExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
