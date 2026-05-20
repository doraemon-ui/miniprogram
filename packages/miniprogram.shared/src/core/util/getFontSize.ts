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
export function getFontSize(size: string | number): string {
  if (typeof size === 'number') {
    return `${size}px`
  }

  if (size.trim() !== '' && !isNaN(Number(size))) {
    return `${size}px`
  }

  return size
}
