import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

declare class DemoBlock extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof DemoBlock
     */
    prefixCls: string;
    title: string;
    bordered: boolean;
    padding: string;
    background: string;
    direction: string;
    align: string;
    get classes(): {
        wrap: string;
        hd: string;
        bd: string;
    };
    get bodyStyle(): string;
}

export { DemoBlock };

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
