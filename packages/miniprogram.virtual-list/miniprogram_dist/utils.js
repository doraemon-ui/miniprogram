/**
 * @doraemon-ui/miniprogram.virtual-list.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:41:44.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

const mapVirtualToProps = ({ items, itemHeight }, { startIndex, endIndex })=>{
    const visibleItems = endIndex > -1 ? items.slice(startIndex, endIndex + 1) : [];
    const height = items.length * itemHeight;
    return {
        virtual: {
            items: visibleItems,
            style: `box-sizing:border-box;width:100%;height:${height}px;`
        }
    };
};
const getVisibleItemBounds = (viewTop, viewHeight, itemCount, itemHeight, itemBuffer)=>{
    const listViewTop = Math.max(0, viewTop);
    const startIndex = Math.max(0, Math.floor(listViewTop / itemHeight));
    const endIndex = Math.min(startIndex + Math.ceil(viewHeight / itemHeight) + itemBuffer - 1, itemCount);
    return {
        startIndex,
        endIndex
    };
};
const debounce = (fn, wait = 0)=>{
    let timer = null;
    return (...args)=>{
        if (timer) clearTimeout(timer);
        timer = setTimeout(()=>fn(...args), wait);
    };
};

export { debounce, getVisibleItemBounds, mapVirtualToProps };
