import type { ListProps, ListItemProps } from './components/list'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'dora-list': ListProps
      'dora-list-item': ListItemProps
    }
  }
}

export {}
