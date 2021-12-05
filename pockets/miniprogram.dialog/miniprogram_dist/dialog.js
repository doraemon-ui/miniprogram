/**
 * @doraemon-ui/miniprogram.dialog.
 * © 2021 - 2021 Doraemon UI.
 * Built on 2021-12-05, 14:17:41.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.17.
 */
import { getCurrentDOM, findComponentNode, } from '@doraemon-ui/miniprogram.shared';
function show(props, selector, inst) {
    let opts = {
        selector: '#dora-dialog',
        inst: getCurrentDOM(),
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
    const vm = comp._renderProxy;
    const { onClose, onClosed, ...restProps } = props;
    vm.setData({ ...restProps, visible: true });
    comp.onClose = function handleClose() {
        if (!vm.data.visible) {
            return;
        }
        vm.setData({ visible: false }, () => {
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
