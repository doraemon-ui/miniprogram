/**
 * @doraemon-ui/miniprogram.tabs.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-06-27, 16:55:35.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.41.
 */

const tabsProps = {
    prefixCls: {
        type: String,
        default: 'dora-tabs'
    },
    defaultCurrent: {
        type: String,
        default: ''
    },
    current: {
        type: String,
        default: ''
    },
    scroll: {
        type: Boolean,
        default: false
    },
    controlled: {
        type: Boolean,
        default: false
    },
    color: {
        type: String,
        default: 'positive'
    },
    direction: {
        type: String,
        default: 'horizontal'
    },
    justify: {
        type: String,
        default: 'space-around'
    },
    activeLineMode: {
        type: String,
        default: 'auto'
    }
};

export { tabsProps };
