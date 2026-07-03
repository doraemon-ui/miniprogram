/**
 * @doraemon-ui/miniprogram.form.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-07-02, 20:47:02.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.66.
 */

let warning = function(condition, format, ...args) {};
{
    const printWarning = (format, ...args)=>{
        let argIndex = 0;
        const message = `Warning: ${format.replace(/%s/g, ()=>String(args[argIndex++]))}`;
        if (typeof console !== 'undefined' && console.error) {
            console.error(message);
        }
        try {
            throw new Error(message);
        } catch (_e) {}
    };
    warning = (condition, format, ...args)=>{
        if (format === undefined) {
            throw new Error('`warning(condition, format, ...args)` requires a warning message argument');
        }
        if (!condition) {
            printWarning(format, ...args);
        }
    };
}
var warning$1 = warning;

export { warning$1 as default };
