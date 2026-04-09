/**
 * @doraemon-ui/miniprogram.textarea.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-06, 00:12:41.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
export const nativeTextareaProps = {
    placeholder: { type: String, default: '' },
    placeholderStyle: { type: null, default: '' },
    placeholderClass: { type: String, default: 'textarea-placeholder' },
    disabled: { type: Boolean, default: false },
    maxlength: { type: Number, default: 140 },
    autoHeight: { type: Boolean, default: false },
    fixed: { type: Boolean, default: false },
    cursorSpacing: { type: Number, default: 11 },
    focus: { type: Boolean, default: false },
    cursor: { type: Number, default: -1 },
    showConfirmBar: { type: Boolean, default: true },
    selectionStart: { type: Number, default: -1 },
    selectionEnd: { type: Number, default: -1 },
    adjustPosition: { type: Boolean, default: true },
    holdKeyboard: { type: Boolean, default: false },
    disableDefaultPadding: { type: Boolean, default: false },
    confirmType: { type: String, default: 'return' },
    confirmHold: { type: Boolean, default: false },
};
