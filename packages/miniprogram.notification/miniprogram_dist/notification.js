/**
 * @doraemon-ui/miniprogram.notification.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-07-02, 20:47:09.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.66.
 */

import { findComponentNode, getCurrentPage, isString, isObject, usePopupStateHOC, customPromise, isFalse, isTrue } from '@doraemon-ui/miniprogram.shared';

const mergeOptions = (selector, instance)=>{
    let opts = {
        selector: '#dora-notification',
        instance: getCurrentPage()
    };
    if (isString(selector)) {
        opts.selector = selector;
        if (instance) {
            opts.instance = instance;
        }
    } else if (isObject(selector)) {
        opts = {
            ...opts,
            ...selector
        };
    }
    return opts;
};
const destroyFns = new Map();
function clear() {
    for (const [close] of destroyFns){
        close();
        destroyFns.delete(close);
    }
}
function mountComponent(props, container, statePropName = 'visible') {
    const { render, destroy, update } = usePopupStateHOC(statePropName)(container);
    const close = ()=>{
        if (isTrue(container[statePropName])) {
            destroy(()=>{
                props.onClose?.(props.data);
            });
            if (destroyFns.has(close)) {
                destroyFns.delete(close);
            }
        }
    };
    const { promise: closePromise, resolve } = customPromise();
    close.then = (onfulfilled, onrejected)=>closePromise.then(onfulfilled, onrejected);
    close.promise = closePromise;
    destroyFns.set(close, true);
    if (isFalse(container[statePropName])) {
        render(props);
    }
    // rewrite close
    container.onClose = (data)=>{
        close();
    };
    container.onClosed = ()=>{
        props.onClosed?.();
        resolve();
    };
    container.onClick = (data)=>{
        props.onClick?.(data);
    };
    return {
        destroy: close,
        update
    };
}
function show(props, selector, instance) {
    const options = mergeOptions(selector, instance);
    const comp = findComponentNode(options.selector, options.instance);
    const { destroy } = mountComponent(props, comp);
    return destroy;
}

export { clear, show };
