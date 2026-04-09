/**
 * @doraemon-ui/miniprogram.date-picker.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-05, 22:15:13.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
export function formatDate(date, fmt) {
    const d = date instanceof Date ? date : new Date(date);
    const o = {
        'M+': d.getMonth() + 1,
        'd+': d.getDate(),
        'h+': d.getHours(),
        'm+': d.getMinutes(),
        's+': d.getSeconds(),
        'q+': Math.floor((d.getMonth() + 3) / 3),
        S: d.getMilliseconds(),
    };
    let out = fmt;
    if (/(y+)/.test(out)) {
        out = out.replace(RegExp.$1, `${d.getFullYear()}`.substring(4 - RegExp.$1.length));
    }
    Object.keys(o).forEach((k) => {
        if (new RegExp(`(${k})`).test(out)) {
            out = out.replace(RegExp.$1, RegExp.$1.length === 1 ? `${o[k]}` : `00${o[k]}`.substring(`${o[k]}`.length));
        }
    });
    return out;
}
