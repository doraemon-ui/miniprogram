/**
 * @doraemon-ui/miniprogram.toptips.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:41:31.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { findComponentNode, getCurrentPage } from '@doraemon-ui/miniprogram.shared';

const mergeOptions = (selector, instance)=>{
    const options = {
        selector: '#dora-toptips',
        instance: getCurrentPage()
    };
    if (typeof selector === 'string') {
        options.selector = selector;
        if (instance) options.instance = instance;
    } else if (selector && typeof selector === 'object') {
        if (selector.selector) options.selector = selector.selector;
        if (selector.instance) options.instance = selector.instance;
    }
    return options;
};
function show(props = {}, selector, instance) {
    const opts = mergeOptions(selector, instance);
    const comp = findComponentNode(opts.selector, opts.instance);
    return comp.show(props);
}

export { show };
