/**
 * @doraemon-ui/miniprogram.gallery.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-07-02, 19:40:39.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.65.
 */

import { findComponentNode, getCurrentPage, isString, isObject, usePopupStateHOC, isFalse, isTrue } from '@doraemon-ui/miniprogram.shared';

const mergeOptions = (selector, instance)=>{
    let opts = {
        selector: '#dora-gallery',
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
    container.onClose = ()=>{
        close();
    };
    container.onClosed = ()=>{
        props.onClosed?.();
    };
    container.onCancel = ()=>{
        props.onCancel?.();
    };
    container.onChange = (detail)=>{
        props.onChange?.(detail);
    };
    container.onClick = (current, urls)=>{
        return props.onClick?.(current, urls);
    };
    container.onDelete = (current, urls)=>{
        return props.onDelete?.(current, urls);
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
    return ()=>destroy();
}

export { clear, show };
