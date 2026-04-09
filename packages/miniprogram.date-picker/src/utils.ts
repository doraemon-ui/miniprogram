export function formatDate(date: number | string | Date, fmt: string) {
  const d = date instanceof Date ? date : new Date(date)
  const o: Record<string, number> = {
    'M+': d.getMonth() + 1,
    'd+': d.getDate(),
    'h+': d.getHours(),
    'm+': d.getMinutes(),
    's+': d.getSeconds(),
    'q+': Math.floor((d.getMonth() + 3) / 3),
    S: d.getMilliseconds(),
  }
  let out = fmt
  if (/(y+)/.test(out)) {
    out = out.replace(RegExp.$1, `${d.getFullYear()}`.substring(4 - RegExp.$1.length))
  }
  Object.keys(o).forEach((k) => {
    if (new RegExp(`(${k})`).test(out)) {
      out = out.replace(RegExp.$1, RegExp.$1.length === 1 ? `${o[k]}` : `00${o[k]}`.substring(`${o[k]}`.length))
    }
  })
  return out
}
