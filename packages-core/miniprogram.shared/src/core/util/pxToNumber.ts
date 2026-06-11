export function pxToNumber(value: string | number) {
  if (!value) return 0
  if (typeof value === 'number') return value
  const match = value.match(/^\d*(\.\d*)?/)
  return match ? Number(match[0]) : 0
}
