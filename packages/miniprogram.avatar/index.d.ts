import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

declare class Avatar extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Avatar
     */
    prefixCls: string;
    /**
     * 头像形状
     *
     * @type {('circle' | 'square')}
     * @default 'circle'
     * @memberof Avatar
     */
    shape: 'circle' | 'square';
    /**
     * 头像尺寸
     *
     * @type {('small' | 'default' | 'large')}
     * @default 'default'
     * @memberof Avatar
     */
    size: 'small' | 'default' | 'large';
    /**
     * 图片地址
     *
     * @type {string}
     * @default ''
     * @memberof Avatar
     */
    src: string;
    /**
     * 自定义样式
     *
     * @type {(string | Partial<CSSStyleDeclaration>)}
     * @default ''
     * @memberof Avatar
     */
    bodyStyle: string | Partial<CSSStyleDeclaration>;
    /**
     * 是否自动缩放文字以适应头像尺寸
     *
     * @type {boolean}
     * @default false
     * @memberof Avatar
     */
    scale: boolean;
    /**
     * 转换后的内联样式
     *
     * @type {string}
     * @memberof Avatar
     */
    extStyle: string;
    /**
     * 文字缩放样式
     *
     * @type {string}
     * @memberof Avatar
     */
    childrenStyle: string;
    /**
     * 计算头像的 CSS 类名
     *
     * @description 根据组件属性动态生成头像的包裹类名和文字容器类名
     * @readonly
     * @memberof Avatar
     */
    get classes(): {
        wrap: string;
        string: string;
        image: string;
    };
    /**
     * 自动缩放文字以适应头像尺寸
     *
     * @description 测量头像容器和文字元素的宽度，当文字超出容器时自动缩放
     * @memberof Avatar
     */
    setScale(): void;
    /**
     * 监听 bodyStyle 属性变化，转换为 CSS 字符串
     *
     * @param {(string | Partial<CSSStyleDeclaration>)} newVal 新的样式值
     * @memberof Avatar
     */
    onBodyStyleChanged(newVal: string | Partial<CSSStyleDeclaration>): void;
    /**
     * 组件挂载完成生命周期
     *
     * @description 当无图片且开启了缩放时，自动计算文字缩放比例
     * @memberof Avatar
     */
    mounted(): void;
}

export { Avatar };

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;

/**
 * AvatarProps接口定义
 */
export interface AvatarProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 头像形状
     *
     * @type {('circle' | 'square')}
     */
    shape?: 'circle' | 'square';
    /**
     * 头像尺寸
     *
     * @type {('small' | 'default' | 'large')}
     */
    size?: 'small' | 'default' | 'large';
    /**
     * 图片地址
     *
     * @type {string}
     */
    src?: string;
    /**
     * 自定义样式
     *
     * @type {(string | Partial<CSSStyleDeclaration>)}
     */
    bodyStyle?: string | Partial<CSSStyleDeclaration>;
    /**
     * 是否自动缩放文字以适应头像尺寸
     *
     * @type {boolean}
     */
    scale?: boolean;
}

/**
 * AvatarExpose接口定义
 */
export interface AvatarExpose {
}

/**
 * AvatarInstance类型定义
 */
export type AvatarInstance = ComponentPublicInstance<Avatar, AvatarProps, AvatarExpose>;
