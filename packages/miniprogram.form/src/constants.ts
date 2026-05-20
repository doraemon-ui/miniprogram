export const FIELD_META_PROP = '__dataFieldMeta'
export const FIELD_DATA_PROP = '__dataFieldData'
export const DEFAULT_TRIGGER = 'onChange'

export function toFormEventName(trigger?: string) {
  if (!trigger) return DEFAULT_TRIGGER
  if (/^on[A-Z]/.test(trigger)) return trigger
  return `on${trigger.charAt(0).toUpperCase()}${trigger.slice(1)}`
}
