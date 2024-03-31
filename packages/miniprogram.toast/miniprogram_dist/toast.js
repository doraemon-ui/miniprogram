/**
 * @doraemon-ui/miniprogram.toast.
 * © 2021 - 2024 Doraemon UI.
 * Built on 2024-03-31, 17:38:47.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.20.
 */
import { getCurrentPage, findComponentNode, usePopupStateHOC, isObject, isString, isTrue, isFalse, } from '@doraemon-ui/miniprogram.shared';
/**
 * 预设的图标
 *
 * @export
 */
export const presetIconRecord = {
    success: 'checkmark-circle-outline',
    error: 'close-circle-outline',
    warning: 'alert',
    loading: 'loading-outline',
};
/**
 * 默认属性
 */
const defaultProps = {
    duration: 1500,
};
const mergeProps = (p) => {
    return Object.assign({}, defaultProps, typeof p === 'string' ? { text: p } : p);
};
const mergeOptions = (selector, instance) => {
    let opts = {
        selector: '#dora-toast',
        instance: getCurrentPage(),
    };
    if (isString(selector)) {
        opts.selector = selector;
        if (instance) {
            opts.instance = instance;
        }
    }
    else if (isObject(selector)) {
        opts = {
            ...opts,
            ...selector,
        };
    }
    return opts;
};
const destroyFns = new Map();
function clear() {
    for (const [close] of destroyFns) {
        close();
        destroyFns.delete(close);
    }
}
function mountComponent(props, container, statePropName = 'visible') {
    const { render, destroy, update } = usePopupStateHOC(statePropName)(container);
    const close = () => {
        if (isTrue(container[statePropName])) {
            destroy(props.onClose);
            if (destroyFns.has(close)) {
                destroyFns.delete(close);
            }
        }
    };
    // always clear destroyFns
    clear();
    destroyFns.set(close, true);
    if (isFalse(container[statePropName])) {
        render(props);
    }
    // rewrite close
    container.onClose = () => {
        close();
    };
    container.onClosed = () => {
        props.onClosed?.();
    };
    return {
        destroy: close,
        update,
    };
}
let _toast = null;
function show(p, selector, instance) {
    const props = mergeProps(p);
    const options = mergeOptions(selector, instance);
    const comp = findComponentNode(options.selector, options.instance);
    const { destroy } = mountComponent(props, comp);
    // set auto close
    if (_toast) {
        clearTimeout(_toast);
        _toast = null;
    }
    if (props.duration > 0) {
        _toast = setTimeout(() => destroy(), props.duration);
    }
    return () => destroy();
}
function success(p, selector, instance) {
    const props = mergeProps(p);
    return new Promise((resolve) => {
        show.call(null, {
            ...props,
            icon: 'success',
            onClose: () => {
                resolve();
            },
        }, selector, instance);
    });
}
function warning(p, selector, instance) {
    const props = mergeProps(p);
    return new Promise((resolve) => {
        show.call(null, {
            ...props,
            icon: 'warning',
            onClose: () => {
                resolve();
            },
        }, selector, instance);
    });
}
function error(p, selector, instance) {
    const props = mergeProps(p);
    return new Promise((resolve) => {
        show.call(null, {
            ...props,
            icon: 'error',
            onClose: () => {
                resolve();
            },
        }, selector, instance);
    });
}
function info(p, selector, instance) {
    const props = mergeProps(p);
    return new Promise((resolve) => {
        show.call(null, {
            ...props,
            icon: undefined,
            onClose: () => {
                resolve();
            },
        }, selector, instance);
    });
}
function loading(p, selector, instance) {
    const props = mergeProps(p);
    return new Promise((resolve) => {
        show.call(null, {
            ...props,
            icon: 'loading',
            onClose: () => {
                resolve();
            },
        }, selector, instance);
    });
}
export { show, success, warning, error, info, loading, clear, };
