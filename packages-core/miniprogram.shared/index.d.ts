import type { ComponentPublicInstance, CSSStylePropertiesWithVars, Doraemon, TouchEvent } from '@doraemon-ui/miniprogram.core-js';

export interface ControlledStateOptions {
    value?: string;
    defaultValue?: string;
    controlled?: string;
}

export type ControlledStateValue<T> = T | ((origin: T) => T);

export declare function useControlledState(valueOrOptions: string | ControlledStateOptions): {
    ControlledState: (override?: string | ControlledStateOptions) => PropertyDecorator;
    setControlledState: <Value>(instance: Doraemon, nextValue: ControlledStateValue<Value>, condition?: boolean) => void;
};

/**
 * 判断小程序环境
 *
 * @export
 * @return {*}  {boolean}
 */
export declare function canUseMP(): boolean;

/**
 * MiniprogramIAnyObject类型定义
 */
export type MiniprogramIAnyObject = WechatMiniprogram.IAnyObject;

/**
 * MiniprogramPageInstance类型定义
 */
export type MiniprogramPageInstance = WechatMiniprogram.Page.Instance<MiniprogramIAnyObject, MiniprogramIAnyObject>;

/**
 * MiniprogramComponentInstance类型定义
 */
export type MiniprogramComponentInstance = WechatMiniprogram.Component.Instance<MiniprogramIAnyObject, MiniprogramIAnyObject, MiniprogramIAnyObject, MiniprogramIAnyObject>;

/**
 * MiniprogramPublicInstance类型定义
 */
export type MiniprogramPublicInstance = MiniprogramPageInstance | MiniprogramComponentInstance;

/**
 * MiniprogramElement类型定义
 */
export type MiniprogramElement = WechatMiniprogram.NodesRef;

/**
 * MiniprogramCanvas类型定义
 */
export type MiniprogramCanvas = WechatMiniprogram.Canvas;

export type MiniprogramCanvasRenderingContext2D = WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D;

/**
 * MiniprogramCustomEvent类型定义
 */
export type MiniprogramCustomEvent<D extends MiniprogramIAnyObject = MiniprogramIAnyObject, M extends MiniprogramIAnyObject = MiniprogramIAnyObject, C extends MiniprogramIAnyObject = MiniprogramIAnyObject, T extends MiniprogramIAnyObject = C> = WechatMiniprogram.CustomEvent<D, M, C, T>;

/**
 * MiniprogramButtonGetUserInfo类型定义
 */
export type MiniprogramButtonGetUserInfo = WechatMiniprogram.ButtonGetUserInfo['detail'];

/**
 * MiniprogramButtonContact类型定义
 */
export type MiniprogramButtonContact = WechatMiniprogram.ButtonContact['detail'];

/**
 * MiniprogramButtonGetPhoneNumber类型定义
 */
export type MiniprogramButtonGetPhoneNumber = WechatMiniprogram.ButtonGetPhoneNumber['detail'];

/**
 * MiniprogramButtonError类型定义
 */
export type MiniprogramButtonError = WechatMiniprogram.ButtonError['detail'];

/**
 * MiniprogramButtonOpenSetting类型定义
 */
export type MiniprogramButtonOpenSetting = WechatMiniprogram.ButtonOpenSetting['detail'];

/**
 * MiniprogramButtonLaunchApp类型定义
 */
export type MiniprogramButtonLaunchApp = WechatMiniprogram.ButtonLaunchApp['detail'];

/**
 * MiniprogramButtonChooseAvatar类型定义
 */
export type MiniprogramButtonChooseAvatar = WechatMiniprogram.CustomEvent['detail'];

/**
 * 矩形对象的类型
 *
 * @export
 * @interface MiniprogramDOMRect
 */
export interface MiniprogramDOMRect {
    /**
     * 节点的宽度
     */
    width: number;
    /**
     * 节点的高度
     */
    height: number;
    /**
     * 节点的上边界坐标
     */
    top: number;
    /**
     * 节点的右边界坐标
     */
    right: number;
    /**
     * 节点的下边界坐标
     */
    bottom: number;
    /**
     * 节点的左边界坐标
     */
    left: number;
    /**
     * 同 left
     */
    x: number;
    /**
     * 同 top
     */
    y: number;
    /**
     * 节点的 ID
     */
    id: string;
    /**
     * 节点的 dataset
     */
    dataset: Record<string, any>;
}

/**
 * 微信开放能力的类型
 *
 * @export
 */
export type NativeButtonOpenType = 'contact' | 'liveActivity' | 'share' | 'getPhoneNumber' | 'getRealtimePhoneNumber' | 'getUserInfo' | 'launchApp' | 'openSetting' | 'feedback' | 'chooseAvatar' | 'agreePrivacyAuthorization';

/**
 * 原生按钮组件的类型
 *
 * @export
 * @interface NativeButtonProps
 */
export interface NativeButtonProps {
    /**
     * 按钮的大小
     */
    size?: 'default' | 'mini';
    /**
     * 按钮的样式类型
     */
    type?: 'default' | 'primary' | 'warn';
    /**
     * 按钮是否镂空，背景色透明
     */
    plain?: boolean;
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * 名称前是否带 loading 图标
     */
    loading?: boolean;
    /**
     * 用于 form 组件，点击分别会触发 form 组件的 submit/reset 事件
     */
    formType?: 'submit' | 'reset';
    /**
     * 微信开放能力
     */
    openType?: NativeButtonOpenType;
    /**
     * 指定按钮按下去的样式类。当 hover-class="none" 时，没有点击态效果
     */
    hoverClass?: string;
    /**
     * 指定是否阻止本节点的祖先节点出现点击态
     */
    hoverStopPropagation?: boolean;
    /**
     * 按住后多久出现点击态，单位毫秒
     */
    hoverStartTime?: number;
    /**
     * 手指松开后点击态保留时间，单位毫秒
     */
    hoverStayTime?: number;
    /**
     * 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文
     */
    lang?: 'en' | 'zh_CN' | 'zh_TW';
    /**
     * 会话来源，open-type="contact"时有效
     */
    sessionFrom?: string;
    /**
     * 会话内消息卡片标题，open-type="contact"时有效
     */
    sendMessageTitle?: string;
    /**
     * 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
     */
    sendMessagePath?: string;
    /**
     * 会话内消息卡片图片，open-type="contact"时有效
     */
    sendMessageImg?: string;
    /**
     * 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
     */
    appParameter?: string;
    /**
     * 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，open-type="contact"时有效
     */
    showMessageCard?: boolean;
    /**
     * 当手机号快速验证或手机号实时验证额度用尽时，是否对用户展示“申请获取你的手机号，但该功能使用次数已达当前小程序上限，暂时无法使用”的提示，默认展示，open-type="getPhoneNumber" 或 open-type="getRealtimePhoneNumber" 时有效
     */
    phoneNumberNoQuotaToast?: boolean;
    /**
     * 转发的文本消息是否要带小程序入口
     */
    needShowEntrance?: boolean;
    /**
     * 从消息小程序入口打开小程序的路径，默认为聊天工具启动路径
     */
    entrancePath?: string;
    /**
     * 新的一次性订阅消息下发机制回调，open-type=liveActivity时有效
     */
    createliveactivity?: boolean;
}

/**
 * 按钮的事件
 */
export type NativeButtonEvent = 'click' | 'getuserinfo' | 'contact' | 'createliveactivity' | 'getphonenumber' | 'getrealtimephonenumber' | 'error' | 'opensetting' | 'launchapp' | 'chooseavatar' | 'agreeprivacyauthorization';

/**
 * 默认事件的类型
 *
 * @export
 */
export type DefaultButtonHandle<Button = NativeButtonProps, Detail = MiniprogramCustomEvent['detail'], Method = NativeButtonEvent> = (event: {
    /**
     * 触发事件的方法
     */
    method?: Method;
    /**
     * 按钮组件
     */
    button?: Button;
    /**
     * 索引值
     */
    index?: number;
    /**
     * 回调的 detail 数据
     */
    detail?: Detail;
}) => void | Promise<void>;

/**
 * 原生按钮组件的事件类型
 *
 * @export
 * @interface NativeButtonHandle
 * @template Button
 */
export interface NativeButtonHandle<Button = NativeButtonProps> {
    /**
     * 点击事件
     */
    onClick?: DefaultButtonHandle<Button>;
    /**
     * 获取用户信息回调
     */
    onGetUserInfo?: DefaultButtonHandle<Button>;
    /**
     * 客服消息回调
     */
    onContact?: DefaultButtonHandle<Button>;
    /**
     * 获取用户手机号回调
     */
    onGetPhoneNumber?: DefaultButtonHandle<Button>;
    /**
     * 打开 APP 成功的回调
     */
    onLaunchApp?: DefaultButtonHandle<Button>;
    /**
     * 当使用开放能力时，发生错误的回调
     */
    onError?: DefaultButtonHandle<Button>;
    /**
     * 在打开授权设置页后回调
     */
    onOpenSetting?: DefaultButtonHandle<Button>;
    /**
     * 获取用户头像回调
     */
    onChooseAvatar?: DefaultButtonHandle<Button>;
    /**
     * 新的一次性订阅消息下发机制回调
     */
    onCreateLiveActivity?: DefaultButtonHandle<Button>;
    /**
     * 手机号实时验证回调
     */
    onGetRealtimePhoneNumber?: DefaultButtonHandle<Button>;
    /**
     * 用户同意隐私协议事件回调
     */
    onAgreePrivacyAuthorization?: DefaultButtonHandle<Button>;
}

/**
 * ------------------------------------------------------------------
 * ⚠️ AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 * ------------------------------------------------------------------
 * This file is generated by:
 * packages-core/style/build-color.ts
 *
 * Any manual changes will be overwritten.
 * ------------------------------------------------------------------
 */
export type PresetColor = 'light' | 'stable' | 'positive' | 'calm' | 'balanced' | 'energized' | 'assertive' | 'royal' | 'dark';

/**
 * 当前的主题
 *
 * auto: 跟随系统, dark: 深色模式, light 浅色模式
 *
 * @export
 * @type {('auto' | 'dark' | 'light')}
 */
export type DarkMode = 'auto' | 'dark' | 'light';

/**
 * 获取自定义组件的实例
 *
 * @export
 * @template T
 * @param {string} selector
 * @param {MiniprogramPublicInstance} [instance=getCurrentPage()]
 * @return {*}  {(T | null)}
 */
export declare function findComponentNode<T = MiniprogramComponentInstance>(selector: string, instance?: MiniprogramPublicInstance): T | null;

/**
 * 获取当前页面的实例
 *
 * @export
 * @return {*}  {(MiniprogramPublicInstance | null)}
 */
export declare function getCurrentPage(): MiniprogramPublicInstance | null;

export declare const miniprogramThis: any;

export declare function getCanvasRef(canvasId: string, vm: MiniprogramPublicInstance): Promise<MiniprogramCanvas>;

export declare function createImage({ imageWidth, imageHeight, imageUrl }: {
    imageWidth: any;
    imageHeight: any;
    imageUrl: any;
}, canvas: MiniprogramCanvas): Promise<unknown>;

/**
 * 把当前画布指定区域的内容导出生成指定大小的图片
 */
export declare function toDataURL({ width, height, type, quality }: {
    width: any;
    height: any;
    type?: string;
    quality?: number;
}, canvas: MiniprogramCanvas): Promise<string>;

export declare function downloadImage(imageUrl: string): Promise<string>;

/**
 * 查询节点信息的对象
 *
 * @param {MiniprogramPublicInstance} [instance=getCurrentPage()] 小程序页面或组件的实例对象
 * @return {*}
 */
declare function useQuery(instance?: MiniprogramPublicInstance): WechatMiniprogram.SelectorQuery;

/**
 * 获取匹配指定选择器的第一个元素
 *
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/wxml/SelectorQuery.select.html
 * @param {string} selector 在当前页面下选择第一个匹配选择器 selector 的节点
 * @param {MiniprogramPublicInstance} instance 小程序页面或组件的实例对象
 * @return {*}  {(MiniprogramElement | null)}
 */
declare function useSelector(selector: string, instance?: MiniprogramPublicInstance): MiniprogramElement | null;

/**
 * 获取匹配指定选择器的所有元素
 *
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/wxml/SelectorQuery.selectAll.html
 * @param {string} selector 在当前页面下选择匹配选择器 selector 的所有节点。
 * @param {MiniprogramPublicInstance} instance 小程序页面或组件的实例对象
 * @return {*}  {(MiniprogramElement | null)}
 */
declare function useSelectorAll(selector: string, instance?: MiniprogramPublicInstance): MiniprogramElement | null;

/**
 * NodeRef类型定义
 */
export type NodeRef = {
    /**
     * borderRightWidth
     * @type {number}
     */
    borderRightWidth: number;
    /**
     * borderLeftWidth
     * @type {number}
     */
    borderLeftWidth: number;
    /**
     * borderTopWidth
     * @type {number}
     */
    borderTopWidth: number;
    /**
     * borderBottomWidth
     * @type {number}
     */
    borderBottomWidth: number;
    /**
     * width
     * @type {number}
     */
    width: number;
    /**
     * height
     * @type {number}
     */
    height: number;
    /**
     * id
     * @type {string}
     */
    id: string;
    /**
     * dataset
     * @type {Record<string, any>}
     */
    dataset: Record<string, any>;
    /**
     * mark
     * @type {Record<string, any>}
     */
    mark: Record<string, any>;
    /**
     * top
     * @type {number}
     */
    top: number;
    /**
     * right
     * @type {number}
     */
    right: number;
    /**
     * bottom
     * @type {number}
     */
    bottom: number;
    /**
     * left
     * @type {number}
     */
    left: number;
    /**
     * scrollHeight
     * @type {number}
     */
    scrollHeight: number;
    /**
     * scrollLeft
     * @type {number}
     */
    scrollLeft: number;
    /**
     * scrollTop
     * @type {number}
     */
    scrollTop: number;
    /**
     * scrollWidth
     * @type {number}
     */
    scrollWidth: number;
    /**
     * node
     * @type {Record<string, any>}
     */
    node: Record<string, any>;
};

/**
 * MiniprogramScrollOffset接口定义
 */
export interface MiniprogramScrollOffset {
    /**
     * 节点的 ID
     */
    id: string;
    /**
     * 节点的 dataset
     */
    dataset: Record<string, any>;
    /**
     * scrollLeft
     * @type {number}
     */
    scrollLeft: number;
    /**
     * scrollTop
     * @type {number}
     */
    scrollTop: number;
}

/**
 * MiniprogramNodeRef接口定义
 */
export interface MiniprogramNodeRef extends MiniprogramDOMRect, MiniprogramScrollOffset {
    /**
     * mark
     * @type {Record<string, any>}
     */
    mark: Record<string, any>;
    /**
     * offsetWidth
     * @type {number}
     */
    offsetWidth: number;
    /**
     * offsetHeight
     * @type {number}
     */
    offsetHeight: number;
    /**
     * clientLeft
     * @type {number}
     */
    clientLeft: number;
    /**
     * clientTop
     * @type {number}
     */
    clientTop: number;
    /**
     * clientWidth
     * @type {number}
     */
    clientWidth: number;
    /**
     * clientHeight
     * @type {number}
     */
    clientHeight: number;
    /**
     * scrollHeight
     * @type {number}
     */
    scrollHeight: number;
    /**
     * scrollWidth
     * @type {number}
     */
    scrollWidth: number;
    /**
     * node
     * @type {Record<string, any>}
     */
    node: Record<string, any>;
}

declare function useRef(selector: string, instance?: MiniprogramPublicInstance): Promise<MiniprogramNodeRef>;

declare function useRef(selector: string[], instance?: MiniprogramPublicInstance): Promise<MiniprogramNodeRef[]>;

declare function useRefAll(selector: string, instance?: MiniprogramPublicInstance): Promise<MiniprogramNodeRef[]>;

declare function useRefAll(selector: string[], instance?: MiniprogramPublicInstance): Promise<MiniprogramNodeRef[][]>;

declare function useRect(selector: string, instance?: MiniprogramPublicInstance): Promise<MiniprogramDOMRect>;

declare function useRect(selector: string[], instance?: MiniprogramPublicInstance): Promise<MiniprogramDOMRect[]>;

declare function useRectAll(selector: string, instance?: MiniprogramPublicInstance): Promise<MiniprogramDOMRect[]>;

declare function useRectAll(selector: string[], instance?: MiniprogramPublicInstance): Promise<MiniprogramDOMRect[][]>;

/**
 * 添加节点的滚动位置查询请求。以像素为单位。节点必须是 scroll-view 或者 viewport，返回 NodesRef 对应的 SelectorQuery。
 *
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/wxml/NodesRef.scrollOffset.html
 * @param {MiniprogramPublicInstance} [instance] 小程序页面或组件的实例对象
 * @return {*}  {Promise<MiniprogramScrollOffset>}
 */
declare function useScrollOffset(instance?: MiniprogramPublicInstance): Promise<MiniprogramScrollOffset>;

declare function useComputedStyle(selector: string, instance?: MiniprogramPublicInstance): Promise<{
    [key in keyof Partial<CSSStyleDeclaration>]: any;
}>;

export { useQuery, useSelector, useSelectorAll, useRef, useRefAll, useRect, useRectAll, useScrollOffset, useComputedStyle };

/**
 * TouchPoint类型定义
 */
export type TouchPoint = {
    /**
     * x
     * @type {number}
     */
    x: number;
    /**
     * y
     * @type {number}
     */
    y: number;
};

/**
 * 获取触摸点位置信息
 */
export declare function getTouchPoints(nativeEvent: TouchEvent, index?: number): TouchPoint;

/**
 * 获取触摸点个数
 */
export declare function getPointsNumber(e: TouchEvent): number;

/**
 * 判断是否为同一点
 */
export declare function isEqualPoints(p1: TouchPoint, p2: TouchPoint): boolean;

/**
 * 判断是否为相近的两点
 */
export declare function isNearbyPoints(p1: TouchPoint, p2: TouchPoint, DOUBLE_TAP_RADIUS?: number): boolean;

/**
 * 获取两点之间的距离
 */
export declare function getPointsDistance(p1: TouchPoint, p2: TouchPoint): number;

/**
 * SwipeDirection类型定义
 */
export type SwipeDirection = 'Left' | 'Right' | 'Up' | 'Down';

/**
 * 获取触摸移动方向
 */
export declare function getSwipeDirection(x1: number, x2: number, y1: number, y2: number): SwipeDirection;

/**
 * ## 拍摄或从手机相册中选择图片或视频。
 *
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.chooseMedia.html
 * @export
 * @param {*} options
 * @return {*}
 */
export declare function chooseMedia(options: any): any;

export declare function uploadFile(options: any): any;

export declare function getSystemInfoSync(keys?: ('window' | 'device' | 'appBase')[]): Record<string, any>;

export declare function vibrateShort(options: {
    type: string;
}): any;

export declare function getMenuButtonBoundingClientRectSync(): {
    bottom: number;
    height: number;
    left: number;
    right: number;
    top: number;
    width: number;
};

export declare function nextTick(cb: () => void): any;

/**
 * NativeRouteOpenType类型定义
 */
export type NativeRouteOpenType = 'navigateTo' | 'redirectTo' | 'switchTab' | 'navigateBack' | 'reLaunch';

/**
 * NativeRouteProps接口定义
 */
export interface NativeRouteProps {
    /**
     * 页面的路径
     */
    url?: string;
    /**
     * 拼接到 url 路径后的参数
     */
    urlParams?: Record<string, any>;
    /**
     * 跳转方式
     */
    openType?: NativeRouteOpenType;
    /**
     * 返回的页面数，如果 delta 大于现有页面数，则返回到首页。open-type="navigateBack"时有效
     */
    delta?: number;
}

/**
 * openType 属性可选值为 navigateTo、redirectTo、switchTab、navigateBack、reLaunch
 */
export declare const NATIVE_ROUTES: NativeRouteOpenType[];

/**
 * 跳转到指定的页面
 *
 * @export
 * @param {NativeRouteProps} props 参数对象
 * @param {*} vm 小程序页面或组件的实例对象
 * @return {*}
 */
export declare function useNativeRoute(props: NativeRouteProps, vm: any): Promise<unknown>;

/**
 * PopupStateFunc类型定义
 */
export type PopupStateFunc<Props extends Record<string, any>> = {
    render: (props: Props, callback?: () => void) => void;
    destroy: (callback?: () => void) => void;
    update: (props: Props, callback?: () => void) => void;
};

export declare function usePopupStateHOC<Instance extends ComponentPublicInstance, Props = Instance['$props'] & Instance['$data']>(statePropName?: string): (container: Instance) => PopupStateFunc<Props>;

/**
 * Generate preset color class names.
 *
 * Priority:
 * 1. Return preset color classes when `color` matches a built-in semantic token
 * 2. Return `null` for custom colors or empty values so callers can handle inline styles separately
 *
 * Example:
 * ```ts
 * useColorCls('positive')
 * // => { 'dora-color': true, 'dora-color--positive': true }
 *
 * useColorCls('#1677ff')
 * // => null
 * ```
 *
 * @param color Semantic preset color name
 * @returns Preset color class map or `null` when no preset color matches
 */
export declare function useColorCls(color?: string): Record<string, boolean> | null;

/**
 * Generate CSS variable root class name.
 *
 * Priority:
 * 1. Always append the shared `--css-var` suffix to the component prefix class
 * 2. Keep the output stable so components can opt into CSS variable styles consistently
 *
 * Example:
 * ```ts
 * useCSSVarCls('dora-button')
 * // => 'dora-button--css-var'
 * ```
 *
 * @param prefixCls Component prefix class name
 * @returns Root class name used for CSS variable styles
 */
export declare function useCSSVarCls(prefixCls: string): string;

/**
 * Generate external class names for semantic slots.
 *
 * Priority:
 * 1. Prefix each semantic name with the shared `dora-` namespace
 * 2. Suffix each generated class with `-class` to match miniprogram externalClasses conventions
 *
 * Example:
 * ```ts
 * useExternalCls(['root', 'hover'])
 * // => ['dora-root-class', 'dora-hover-class']
 * ```
 *
 * @param semanticName Semantic slot names
 * @returns External class names in the same order as the input names
 */
export declare function useExternalCls<const T extends string[]>(semanticName: T): {
    [K in keyof T]: `dora-${T[K]}-class`;
};

/**
 * Generate hover class name.
 *
 * Priority:
 * 1. Use external `hoverClass` when provided and not equal to `default`
 * 2. Fallback to internal BEM modifier class
 *
 * Example:
 * ```ts
 * useHoverCls('dora-button', '')
 * // => 'dora-button--hover'
 *
 * useHoverCls('dora-button', 'custom-hover')
 * // => 'custom-hover'
 *
 * useHoverCls('dora-button', '', 'active')
 * // => 'dora-button--active'
 * ```
 *
 * @param prefixCls Component prefix class name
 * @param hoverClass Custom hover class name
 * @param modifier BEM modifier name for hover state
 * @returns Resolved hover class name
 */
export declare function useHoverCls(prefixCls: string, hoverClass: string, modifier?: string): string;

export type AnyObject = Record<string, any>;

export type ValidChar = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z';

export type SemanticSchema = {
    _default?: string;
} & {
    [key: `${ValidChar}${string}`]: SemanticSchema;
};

type RemoveString<T> = T extends string ? never : T;

export type RemoveClassNamesString<T> = {
    [K in keyof T]: string | Record<string, any> extends T[K] ? RemoveString<T[K]> : T[K];
};

export type DeepClassNameType<T> = {
    [K in keyof T]?: string extends T[K] ? string | DeepClassNameType<T[K]> : DeepClassNameType<T[K]>;
};

type CSS = CSSStylePropertiesWithVars;

type IsAny<T> = 0 extends 1 & T ? true : false;

export type SemanticStyleValue = CSS | string;

export type SemanticStyleNode = SemanticStyleValue | SemanticStyles;

export type SemanticStyles = {
    [key: string]: SemanticStyleNode | undefined;
};

export type DeepStylesType<T> = IsAny<T> extends true ? SemanticStyles : string extends NonNullable<T> ? SemanticStyleValue : CSS extends NonNullable<T> ? SemanticStyleValue : {
    [K in keyof NonNullable<T>]?: DeepStylesType<NonNullable<T>[K]>;
};

export type DeepStylesStringType<T> = IsAny<T> extends true ? Record<string, any> : string extends NonNullable<T> ? string : CSS extends NonNullable<T> ? string : {
    [K in keyof NonNullable<T>]?: DeepStylesStringType<NonNullable<T>[K]>;
};

export type GenerateSemantic<T extends {
    classNames?: any;
    styles?: any;
}, Props> = {
    classNames: DeepClassNameType<T['classNames']>;
    classNamesNoString: RemoveClassNamesString<DeepClassNameType<T['classNames']>>;
    classNamesFn: (info: {
        props: Props;
    }) => DeepClassNameType<T['classNames']>;
    classNamesAndFn: DeepClassNameType<T['classNames']> | ((info: {
        props: Props;
    }) => DeepClassNameType<T['classNames']>);
    styles: DeepStylesType<T['styles']>;
    stylesFn: (info: {
        props: Props;
    }) => DeepStylesType<T['styles']>;
    stylesAndFn: DeepStylesType<T['styles']> | ((info: {
        props: Props;
    }) => DeepStylesType<T['styles']>);
};

type MaybeFn<T, P> = T | ((info: {
    props: P;
}) => T) | undefined;

/**
 * Fill semantic object structure by schema.
 *
 * Priority:
 * 1. Preserve existing values from `value`
 * 2. Initialize missing schema branches so downstream merges always receive a complete shape
 *
 * Example:
 * ```ts
 * fillObjectBySchema({}, {
 *   header: { _default: 'root' },
 *   body: { _default: 'root' },
 * })
 * // => { header: {}, body: {} }
 * ```
 *
 * @param value Current semantic object
 * @param schema Semantic schema definition
 * @returns Object expanded to match the schema structure
 */
export declare function fillObjectBySchema<T extends AnyObject = AnyObject>(value: T | undefined, schema?: SemanticSchema): T;

/**
 * Merge semantic class name objects.
 *
 * Priority:
 * 1. Merge nested schema keys recursively
 * 2. Convert schema-backed string values into the schema `_default` slot
 * 3. Flatten non-schema keys with shared class name concatenation
 *
 * Example:
 * ```ts
 * mergeClassNames(
 *   { header: { _default: 'root', icon: {} } },
 *   { header: 'base' },
 *   { header: 'extra' },
 * )
 * // => { header: { root: 'base extra' } }
 * ```
 *
 * @param schema Semantic schema definition
 * @param classNameList Semantic class name sources
 * @returns Merged semantic class name object
 */
export declare function mergeClassNames<Name extends string, SemanticClassNames extends Partial<Record<Name, any>>>(schema?: SemanticSchema, ...classNameList: (SemanticClassNames | undefined)[]): SemanticClassNames;

/**
 * Merge semantic style objects.
 *
 * Priority:
 * 1. Ignore empty style sources
 * 2. Merge object styles by key with later values taking precedence
 * 3. Concatenate style strings when either side is already serialized
 *
 * Example:
 * ```ts
 * mergeStyles({ root: { color: 'red' } }, { root: { fontSize: 12 } })
 * // => { root: { color: 'red', fontSize: 12 } }
 * ```
 *
 * @param styles Semantic style sources
 * @returns Merged semantic style object
 */
export declare function mergeStyles<StylesType extends AnyObject>(...styles: (DeepStylesType<StylesType> | SemanticStyles | undefined)[]): SemanticStyles;

/**
 * Resolve a semantic class/style value that may be static or derived from props.
 *
 * @param value Static value or value factory
 * @param info Runtime props info passed to the factory
 * @returns Resolved semantic class/style value
 */
export declare function resolveStyleOrClass<T = any, Props = any>(value: T | ((config: {
    props: Props;
}) => T), info: {
    props: Props;
}): T;

/**
 * Resolve and merge semantic class name sources.
 *
 * @param classNamesList Semantic class name sources or factories
 * @param info Runtime props info passed to factories
 * @param schema Semantic schema definition for nested structures
 * @returns Merged semantic class names
 */
export declare function useMergeSemanticClassNames<ClassNamesType = any, Props = any>(classNamesList: MaybeFn<ClassNamesType, Props>[], info: {
    props: Props;
}, schema?: SemanticSchema): Partial<Record<string, any>>;

/**
 * Resolve and merge semantic style sources.
 *
 * @param stylesList Semantic style sources or factories
 * @param info Runtime props info passed to factories
 * @returns Merged semantic styles
 */
export declare function useMergeSemanticStyles<StylesType = any, Props = any>(stylesList: MaybeFn<DeepStylesType<StylesType> | SemanticStyles, Props>[], info: {
    props: Props;
}): DeepStylesType<StylesType>;

/**
 * Resolve, merge, and stringify semantic style sources.
 *
 * @param stylesList Semantic style sources or factories
 * @param info Runtime props info passed to factories
 * @returns Merged semantic styles as serialized css strings
 */
export declare function useMergeSemanticStylesString<StylesType = any, Props = any>(stylesList: MaybeFn<DeepStylesType<StylesType> | SemanticStyles, Props>[], info: {
    props: Props;
}): DeepStylesStringType<StylesType>;

/**
 * Merge semantic class names and styles from multiple sources.
 *
 * Priority:
 * 1. Resolve function inputs with runtime props
 * 2. Merge class names and styles independently
 * 3. Fill the merged result with `schema` when nested semantic structure is required
 *
 * Example:
 * ```ts
 * useMergeSemantic(
 *   [{ root: 'base' }],
 *   [{ root: { color: 'red' } }],
 *   { props: {} },
 * )
 * // => [{ root: 'base' }, { root: { color: 'red' } }]
 * ```
 *
 * @param classNamesList Semantic class name sources or factories
 * @param stylesList Semantic style sources or factories
 * @param info Runtime props info passed to factories
 * @param schema Semantic schema definition for nested structures
 * @returns Tuple of merged class names and merged styles
 */
export declare function useMergeSemantic<ClassNamesType = any, StylesType = any, Props = any>(classNamesList: MaybeFn<ClassNamesType, Props>[], stylesList: MaybeFn<DeepStylesType<StylesType> | SemanticStyles, Props>[], info: {
    props: Props;
}, schema?: SemanticSchema): [
    Required<RemoveClassNamesString<NonNullable<ClassNamesType>>>,
    Required<DeepStylesType<NonNullable<StylesType>>>
];

export interface RGB {
    r: number;
    g: number;
    b: number;
    a: number;
}

export interface HSL {
    h: number;
    s: number;
    l: number;
    a: number;
}

export interface HSV {
    h: number;
    s: number;
    v: number;
    a: number;
}

export type OptionalA<T extends {
    a: number;
}> = Omit<T, 'a'> & {
    a?: number;
};

export type ColorInput = string | OptionalA<RGB> | OptionalA<HSL> | OptionalA<HSV>;

export declare class FastColor {
    /**
     * All FastColor objects are valid. So isValid is always true. This property is kept to be compatible with TinyColor.
     */
    isValid: boolean;
    /**
     * Red, R in RGB
     */
    r: number;
    /**
     * Green, G in RGB
     */
    g: number;
    /**
     * Blue, B in RGB
     */
    b: number;
    /**
     * Alpha/Opacity, A in RGBA/HSLA
     */
    a: number;
    private _h?;
    private _hsl_s?;
    private _hsv_s?;
    private _l?;
    private _v?;
    private _max?;
    private _min?;
    private _brightness?;
    constructor(input: ColorInput);
    setR(value: number): this;
    setG(value: number): this;
    setB(value: number): this;
    setA(value: number): this;
    setHue(value: number): this;
    /**
     * Returns the perceived luminance of a color, from 0-1.
     * @see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
     */
    getLuminance(): number;
    getHue(): number;
    /**
     * @deprecated should use getHSVSaturation or getHSLSaturation instead
     */
    getSaturation(): number;
    getHSVSaturation(): number;
    getHSLSaturation(): number;
    getLightness(): number;
    getValue(): number;
    /**
     * Returns the perceived brightness of the color, from 0-255.
     * Note: this is not the b of HSB
     * @see http://www.w3.org/TR/AERT#color-contrast
     */
    getBrightness(): number;
    darken(amount?: number): this;
    lighten(amount?: number): this;
    /**
     * Mix the current color a given amount with another color, from 0 to 100.
     * 0 means no mixing (return current color).
     */
    mix(input: ColorInput, amount?: number): this;
    /**
     * Mix the color with pure white, from 0 to 100.
     * Providing 0 will do nothing, providing 100 will always return white.
     */
    tint(amount?: number): this;
    /**
     * Mix the color with pure black, from 0 to 100.
     * Providing 0 will do nothing, providing 100 will always return black.
     */
    shade(amount?: number): this;
    onBackground(background: ColorInput): this;
    isDark(): boolean;
    isLight(): boolean;
    equals(other: FastColor): boolean;
    clone(): this;
    toHexString(): string;
    /** CSS support color pattern */
    toHsl(): HSL;
    /** CSS support color pattern */
    toHslString(): string;
    /** Same as toHsb */
    toHsv(): HSV;
    toRgb(): RGB;
    toRgbString(): string;
    toString(): string;
    /** Return a new FastColor object with one channel changed */
    private _sc;
    private _c;
    private getMax;
    private getMin;
    private fromHexString;
    private fromHsl;
    private fromHsv;
    private fromHsvString;
    private fromHslString;
    private fromRgbString;
}

export declare function buildURL(url: string, params?: Record<string, any>): string;

export declare const isPresetColor: (color?: string) => color is PresetColor;

export declare const getPresetColor: (color?: string) => string;

export declare function customPromise<T>(): {
    promise: Promise<T>;
    readonly promiseState: "pending" | "fulfilled" | "rejected";
    resolve: (value: T | PromiseLike<T>) => void;
    reject: (reason?: unknown) => void;
};

export declare function getDefaultContext(props: object, fields?: string[]): {};

/**
 * Normalize font-size value.
 *
 * Rules:
 * - number -> append `px`
 * - numeric string -> append `px`
 * - other css units/value -> keep original
 *
 * Examples:
 * ```ts
 * getFontSize(16)           => '16px'
 * getFontSize('16')         => '16px'
 * getFontSize('1.5rem')     => '1.5rem'
 * getFontSize('20px')       => '20px'
 * getFontSize('20rpx')      => '20rpx'
 * getFontSize('var(--x)')   => 'var(--x)'
 * getFontSize('')           => ''
 */
export declare function getFontSize(size: string | number): string;

export declare function isDate(obj: any): boolean;

export declare function isDef(v: any): boolean;

export declare function isFalse(v: any): boolean;

export declare function isFunction(value: unknown): value is (...args: any[]) => any;

export declare function isObject(obj: any): boolean;

export declare function isPromise(val: any): boolean;

export declare function isString(v: any): boolean;

export declare function isTrue(v: any): boolean;

export declare function isUndef(v: any): boolean;

export declare function noop(...args: any[]): void;

export declare function omit<T extends object, K extends keyof T>(obj: T, fields: K[]): Omit<T, K>;

export declare function pxToNumber(value: string | number): number;

export declare function sleep(time: number): Promise<void>;

export { decorators, dom, hooks, util };

declare const _default: {
    FastColor: typeof FastColor;
    buildURL: typeof buildURL;
    isPresetColor: (color?: string) => color is PresetColor;
    customPromise: typeof customPromise;
    getFontSize: typeof getFontSize;
    getDefaultContext: typeof getDefaultContext;
    isDate: typeof isDate;
    isDef: typeof isDef;
    isFalse: typeof isFalse;
    isFunction: typeof isFunction;
    isObject: typeof isObject;
    isPromise: typeof isPromise;
    isString: typeof isString;
    isTrue: typeof isTrue;
    isUndef: typeof isUndef;
    noop: typeof noop;
    omit: typeof omit;
    pxToNumber: typeof pxToNumber;
    sleep: typeof sleep;
    useColorCls: typeof useColorCls;
    useCSSVarCls: typeof useCSSVarCls;
    useExternalCls: typeof useExternalCls;
    useHoverCls: typeof useHoverCls;
    fillObjectBySchema: typeof fillObjectBySchema;
    mergeClassNames: typeof mergeClassNames;
    mergeStyles: typeof mergeStyles;
    resolveStyleOrClass: typeof resolveStyleOrClass;
    useMergeSemantic: typeof useMergeSemantic;
    useMergeSemanticClassNames: typeof useMergeSemanticClassNames;
    useMergeSemanticStyles: typeof useMergeSemanticStyles;
    useMergeSemanticStylesString: typeof useMergeSemanticStylesString;
    canUseMP: typeof canUseMP;
    findComponentNode: typeof findComponentNode;
    getCurrentPage: typeof getCurrentPage;
    miniprogramThis: any;
    getCanvasRef: typeof getCanvasRef;
    downloadImage: typeof downloadImage;
    createImage: typeof createImage;
    toDataURL: typeof toDataURL;
    useQuery: typeof useQuery;
    useSelector: typeof useSelector;
    useSelectorAll: typeof useSelectorAll;
    useRef: typeof useRef;
    useRefAll: typeof useRefAll;
    useRect: typeof useRect;
    useRectAll: typeof useRectAll;
    useScrollOffset: typeof useScrollOffset;
    useComputedStyle: typeof useComputedStyle;
    getTouchPoints: typeof getTouchPoints;
    getPointsNumber: typeof getPointsNumber;
    isEqualPoints: typeof isEqualPoints;
    isNearbyPoints: typeof isNearbyPoints;
    getPointsDistance: typeof getPointsDistance;
    getSwipeDirection: typeof getSwipeDirection;
    getSystemInfoSync: typeof getSystemInfoSync;
    getMenuButtonBoundingClientRectSync: typeof getMenuButtonBoundingClientRectSync;
    useNativeRoute: typeof useNativeRoute;
    usePopupStateHOC: typeof usePopupStateHOC;
    useControlledState: typeof useControlledState;
    decorators: {
        useControlledState: typeof useControlledState;
    };
    dom: {
        canUseMP: typeof canUseMP;
        findComponentNode: typeof findComponentNode;
        getCurrentPage: typeof getCurrentPage;
        miniprogramThis: any;
        getCanvasRef: typeof getCanvasRef;
        downloadImage: typeof downloadImage;
        createImage: typeof createImage;
        toDataURL: typeof toDataURL;
        useQuery: typeof useQuery;
        useSelector: typeof useSelector;
        useSelectorAll: typeof useSelectorAll;
        useRef: typeof useRef;
        useRefAll: typeof useRefAll;
        useRect: typeof useRect;
        useRectAll: typeof useRectAll;
        useScrollOffset: typeof useScrollOffset;
        useComputedStyle: typeof useComputedStyle;
        getTouchPoints: typeof getTouchPoints;
        getPointsNumber: typeof getPointsNumber;
        isEqualPoints: typeof isEqualPoints;
        isNearbyPoints: typeof isNearbyPoints;
        getPointsDistance: typeof getPointsDistance;
        getSwipeDirection: typeof getSwipeDirection;
        getSystemInfoSync: typeof getSystemInfoSync;
        getMenuButtonBoundingClientRectSync: typeof getMenuButtonBoundingClientRectSync;
        useNativeRoute: typeof useNativeRoute;
        usePopupStateHOC: typeof usePopupStateHOC;
    };
    hooks: {
        useColorCls: typeof useColorCls;
        useCSSVarCls: typeof useCSSVarCls;
        useExternalCls: typeof useExternalCls;
        useHoverCls: typeof useHoverCls;
        fillObjectBySchema: typeof fillObjectBySchema;
        mergeClassNames: typeof mergeClassNames;
        mergeStyles: typeof mergeStyles;
        resolveStyleOrClass: typeof resolveStyleOrClass;
        useMergeSemantic: typeof useMergeSemantic;
        useMergeSemanticClassNames: typeof useMergeSemanticClassNames;
        useMergeSemanticStyles: typeof useMergeSemanticStyles;
        useMergeSemanticStylesString: typeof useMergeSemanticStylesString;
    };
    util: {
        FastColor: typeof FastColor;
        buildURL: typeof buildURL;
        isPresetColor: (color?: string) => color is PresetColor;
        customPromise: typeof customPromise;
        getFontSize: typeof getFontSize;
        getDefaultContext: typeof getDefaultContext;
        isDate: typeof isDate;
        isDef: typeof isDef;
        isFalse: typeof isFalse;
        isFunction: typeof isFunction;
        isObject: typeof isObject;
        isPromise: typeof isPromise;
        isString: typeof isString;
        isTrue: typeof isTrue;
        isUndef: typeof isUndef;
        noop: typeof noop;
        omit: typeof omit;
        pxToNumber: typeof pxToNumber;
        sleep: typeof sleep;
    };
};

export default _default;
