import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

import type { DarkMode } from '@doraemon-ui/miniprogram.shared';

declare class DemoPage extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof DemoPage
     */
    prefixCls: string;
    /**
     * 当前的主题
     *
     * @type {string}
     * @memberof DemoPage
     */
    darkmode: DarkMode;
    fixed: boolean;
    clickable: boolean;
    spacing: boolean;
    title: string;
    desc: string;
    get classes(): {
        wrap: string;
        hd: string;
        title: string;
        desc: string;
        darkmode: string;
        bd: string;
    };
    onWatchDarmode(darkmode: DarkMode): void;
    isAuto: boolean;
    isManual: boolean;
    isRegister: boolean;
    curTheme: DarkMode;
    sysTheme: SysTheme;
    onIconClick(): void;
    setTheme(curTheme: DarkMode): void;
    onThemeChange(theme?: SysTheme): void;
    onDarkmodeChange(darkmode: DarkMode): void;
    mounted(): void;
}

export { DemoPage };

export type SysTheme = Exclude<DarkMode, 'auto'>;

export interface PresetTheme {
    /**
     * 窗口的背景色
     */
    backgroundColor: string;
    /**
     * 下拉 loading 的样式，仅支持 dark / light
     */
    backgroundTextStyle: SysTheme;
    /**
     * 导航栏背景颜色，如 #000000
     */
    navigationBarBackgroundColor: string;
    /**
     * 导航栏标题、状态栏颜色，仅支持 black / white
     */
    navigationBarTextStyle: 'black' | 'white';
}

/**
 * DemoPage props
 */
export interface DemoPageProps {
    prefixCls?: string;
    darkmode?: DarkMode;
    clickable?: boolean;
    spacing?: boolean;
    title?: string;
    desc?: string;
}

/**
 * DemoPage exposed
 */
export interface DemoPageExpose {
    isAuto?: boolean;
    isManual?: boolean;
    onIconClick?: () => void;
}

export type DemoPageInstance = ComponentPublicInstance<DemoPage, DemoPageProps, DemoPageExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
