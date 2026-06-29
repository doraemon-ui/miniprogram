/**
 * @doraemon-ui/miniprogram.form.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-06-27, 16:55:47.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.41.
 */

const FIELD_META_PROP = '__dataFieldMeta';
const FIELD_DATA_PROP = '__dataFieldData';
const DEFAULT_TRIGGER = 'onChange';
function toFormEventName(trigger) {
    if (!trigger) return DEFAULT_TRIGGER;
    if (/^on[A-Z]/.test(trigger)) return trigger;
    return `on${trigger.charAt(0).toUpperCase()}${trigger.slice(1)}`;
}

export { DEFAULT_TRIGGER, FIELD_DATA_PROP, FIELD_META_PROP, toFormEventName };
