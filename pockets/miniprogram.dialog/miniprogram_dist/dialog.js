/**
 * @doraemon-ui/miniprogram.dialog.
 * © 2021 - 2021 Doraemon UI.
 * Built on 2021-11-21, 21:20:54.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.17.
 */
function open(props, selector, inst) {
    let opts = {
        selector: '#dora-dialog',
        inst: getCurrentPages()[getCurrentPages().length - 1],
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
    const comp = opts.inst.selectComponent(opts.selector);
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
        open.call(null, {
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
        open.call(null, {
            ...restProps,
            buttonClosable: true,
            buttons: [{
                    type: cancelType ?? 'xxxxxxx',
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
export { open, alert, confirm, };
