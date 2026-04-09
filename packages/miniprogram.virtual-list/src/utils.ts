export const mapVirtualToProps = (
  { items, itemHeight }: { items: any[]; itemHeight: number },
  { startIndex, endIndex }: { startIndex: number; endIndex: number },
) => {
  const visibleItems = endIndex > -1 ? items.slice(startIndex, endIndex + 1) : []
  const height = items.length * itemHeight
  return {
    virtual: {
      items: visibleItems,
      style: `box-sizing:border-box;width:100%;height:${height}px;`,
    },
  }
}

export const getVisibleItemBounds = (viewTop: number, viewHeight: number, itemCount: number, itemHeight: number, itemBuffer: number) => {
  const listViewTop = Math.max(0, viewTop)
  const startIndex = Math.max(0, Math.floor(listViewTop / itemHeight))
  const endIndex = Math.min(startIndex + Math.ceil(viewHeight / itemHeight) + itemBuffer - 1, itemCount)
  return { startIndex, endIndex }
}

export const debounce = <T extends (...args: any[]) => void>(fn: T, wait = 0) => {
  let timer: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), wait)
  }
}
