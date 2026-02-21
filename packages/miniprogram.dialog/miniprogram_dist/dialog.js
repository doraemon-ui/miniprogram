/**
 * @doraemon-ui/miniprogram.dialog.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-02-22, 00:38:00.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
import { getCurrentPage, findComponentNode, usePopupStateHOC, isObject, isString, isTrue, isFalse, } from '@doraemon-ui/miniprogram.shared';
const mergeOptions = (selector, instance) => {
    let opts = {
        selector: '#dora-dialog',
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
function show(props, selector, instance) {
    const options = mergeOptions(selector, instance);
    const comp = findComponentNode(options.selector, options.instance);
    const { destroy } = mountComponent(props, comp);
    return () => destroy();
}
function alert(props, selector, instance) {
    const { confirmText, confirmType, onConfirm, ...restProps } = props;
    return new Promise((resolve) => {
        show.call(null, {
            ...restProps,
            buttonClosable: true,
            buttons: [
                {
                    type: confirmType ?? 'balanced',
                    text: confirmText ?? '确定',
                    onClick(...args) {
                        onConfirm?.(...args);
                    },
                },
            ],
            onClose: () => {
                resolve();
            },
        }, selector, instance);
    });
}
function confirm(props, selector, instance) {
    const { confirmText, confirmType, onConfirm, cancelText, cancelType, onCancel, ...restProps } = props;
    return new Promise((resolve) => {
        show.call(null, {
            ...restProps,
            buttonClosable: true,
            buttons: [
                {
                    type: cancelType ?? 'dark',
                    text: cancelText ?? '取消',
                    async onClick(...args) {
                        await onCancel?.(...args);
                        resolve(false);
                    },
                },
                {
                    type: confirmType ?? 'balanced',
                    text: confirmText ?? '确定',
                    async onClick(...args) {
                        await onConfirm?.(...args);
                        resolve(true);
                    },
                },
            ],
            onClose: () => {
                restProps.onClose?.();
                resolve(false);
            },
        }, selector, instance);
    });
}
export { show, alert, confirm, clear };
