export declare function dogShit(title: string, chapter?: number, paragraph?: number): string;

/**
 * 获取 “哆啦A梦” 中出现 20 次以上的常用道具
 *
 * @export
 * @param {number} [index]
 * @return {*}  {string}
 */
export declare function high(index?: number): string;

/**
 * 获取 “哆啦A梦” 中出现 5 次以上的常用道具
 *
 * @export
 * @param {number} [index]
 * @return {*}  {string}
 */
export declare function medium(index?: number): string;

/**
 * 获取 “哆啦A梦” 中出现 1 次以上的常用道具
 *
 * @export
 * @param {number} [index]
 * @return {*}  {string}
 */
export declare function low(index?: number): string;

export default function doraQuote(index?: number): string;

export { doraProp, doraQuote };

declare const _default: {
    doraQuote: typeof doraQuote;
    high: typeof high;
    medium: typeof medium;
    low: typeof low;
    dogShit: typeof dogShit;
};

export default _default;
