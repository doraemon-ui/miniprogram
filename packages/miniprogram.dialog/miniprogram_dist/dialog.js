/**
 * @doraemon-ui/miniprogram.dialog.
 * © 2021 - 2024 Doraemon UI.
 * Built on 2024-03-21, 23:54:14.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.20.
 */
import { Doraemon } from '@doraemon-ui/miniprogram.core-js';
import { getCurrentPage, findComponentNode, } from '@doraemon-ui/miniprogram.shared';
const { getCurrentInstance } = Doraemon.util;
function show(props, selector, inst) {
    let opts = {
        selector: '#dora-dialog',
        inst: getCurrentPage(),
    };
    if (typeof selector === 'string') {
        opts.selector = selector;
        if (inst) {
            opts.inst = inst;
        }
    }
    else if (typeof selector === 'object') {
        opts = {
            ...opts,
            ...selector,
        };
    }
    const comp = findComponentNode(opts.selector, opts.inst);
    const instance = getCurrentInstance(comp);
    const { onClose, onClosed, ...restProps } = props;
    instance.setData({ ...restProps, visible: true });
    comp.onClose = function handleClose() {
        if (!instance.data.visible) {
            return;
        }
        instance.setData({ visible: false }, () => {
            onClose?.();
        });
    };
    comp.onPopupClosed = function handleClosed() {
        onClosed?.();
    };
    return comp.onClose.bind(comp);
}
function alert(props, selector, inst) {
    const { confirmText, confirmType, onConfirm, ...restProps } = props;
    return new Promise((resolve) => {
        show.call(null, {
            ...restProps,
            buttonClosable: true,
            buttons: [{
                    type: confirmType ?? 'balanced',
                    text: confirmText ?? '确定',
                    onClick(...args) {
                        onConfirm?.(...args);
                    },
                }],
            onClose: () => {
                resolve();
            },
        }, selector, inst);
    });
}
function confirm(props, selector, inst) {
    const { confirmText, confirmType, onConfirm, cancelText, cancelType, onCancel, ...restProps } = props;
    return new Promise((resolve) => {
        show.call(null, {
            ...restProps,
            buttonClosable: true,
            buttons: [{
                    type: cancelType ?? 'dark',
                    text: cancelText ?? '取消',
                    async onClick(...args) {
                        await onCancel?.(...args);
                        resolve(false);
                    },
                }, {
                    type: confirmType ?? 'balanced',
                    text: confirmText ?? '确定',
                    async onClick(...args) {
                        await onConfirm?.(...args);
                        resolve(true);
                    },
                }],
            onClose: () => {
                restProps.onClose?.();
                resolve(false);
            },
        }, selector, inst);
    });
}
export { show, alert, confirm, };
