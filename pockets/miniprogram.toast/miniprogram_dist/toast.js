/**
 * @doraemon-ui/miniprogram.toast.
 * © 2021 - 2021 Doraemon UI.
 * Built on 2021-12-05, 19:24:22.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.17.
 */
import { getCurrentDOM, findComponentNode, isObject, isString, isTrue, } from '@doraemon-ui/miniprogram.shared';
/**
 * 预设的图标
 *
 * @export
 */
export const ToastIconRecord = {
    success: 'checkmark-circle-outline',
    error: 'close-circle-outline',
    warn: 'alert',
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
const mergeOptions = (selector, inst) => {
    let opts = {
        selector: '#dora-toast',
        inst: getCurrentDOM(),
    };
    if (isString(selector)) {
        opts.selector = selector;
        if (inst) {
            opts.inst = inst;
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
/**
 * 缓存组件的实例对象
 */
const containers = [];
/**
 * 卸载指定的组件
 *
 * @param {Doraemon} container 组件的实例对象
 * @param {() => void} [callback] 卸载后的回调函数
 */
function unmount(container, callback) {
    const unmountResult = container._renderProxy;
    if (unmountResult && isTrue(unmountResult.data.visible)) {
        unmountResult.setData({ visible: false }, () => {
            callback?.();
        });
    }
}
/**
 * 卸载所有的组件
 */
function clear() {
    while (containers.length > 0) {
        const container = containers.pop();
        if (!container)
            break;
        unmount(container);
    }
}
let _toast = null;
function show(p, selector, inst) {
    const props = mergeProps(p);
    const options = mergeOptions(selector, inst);
    const comp = findComponentNode(options.selector, options.inst);
    const { onClose, onClosed, ...restProps } = props;
    // always clear containers
    clear();
    containers.push(comp);
    comp._renderProxy.setData({ ...restProps, visible: true });
    comp.onClose = function handleClose() {
        unmount(comp, onClose);
    };
    comp.onPopupClosed = function handleClosed() {
        onClosed?.();
    };
    // set auto close
    if (_toast) {
        clearTimeout(_toast);
        _toast = null;
    }
    if (props.duration > 0) {
        _toast = setTimeout(() => unmount(comp, onClose), props.duration);
    }
    return () => unmount(comp, onClose);
}
function success(p, selector, inst) {
    const props = mergeProps(p);
    return new Promise((resolve) => {
        show.call(null, {
            ...props,
            icon: 'success',
            onClose: () => {
                resolve();
            },
        }, selector, inst);
    });
}
function warn(p, selector, inst) {
    const props = mergeProps(p);
    return new Promise((resolve) => {
        show.call(null, {
            ...props,
            icon: 'warn',
            onClose: () => {
                resolve();
            },
        }, selector, inst);
    });
}
function error(p, selector, inst) {
    const props = mergeProps(p);
    return new Promise((resolve) => {
        show.call(null, {
            ...props,
            icon: 'error',
            onClose: () => {
                resolve();
            },
        }, selector, inst);
    });
}
function info(p, selector, inst) {
    const props = mergeProps(p);
    return new Promise((resolve) => {
        show.call(null, {
            ...props,
            icon: undefined,
            onClose: () => {
                resolve();
            },
        }, selector, inst);
    });
}
export { show, success, warn, error, info, clear, };
