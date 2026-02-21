import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

export type PopupStateFunc<Props extends Record<string, any>> = {
  render: (props: Props, callback?: () => void) => void
  destroy: (callback?: () => void) => void
  update: (props: Props, callback?: () => void) => void
}

export function usePopupStateHOC<Instance extends ComponentPublicInstance, Props = Instance['$props'] & Instance['$data']>(
  statePropName: string = 'visible',
) {
  return (container: Instance): PopupStateFunc<Props> => {
    const render = (props: Props, callback?: () => void) => {
      Object.assign(container, props)
      container.$nextTick(() => callback?.())
    }

    const update = (props: Props, callback?: () => void) => {
      if (props[statePropName] !== undefined) {
        delete props[statePropName]
      }
      render(props, callback)
    }

    const open = (props: Props, callback?: () => void) => {
      render({ ...props, [statePropName]: true }, callback)
    }

    const close = (callback?: () => void) => render({ [statePropName]: false } as Props, callback)

    return {
      render: open,
      destroy: close,
      update,
    }
  }
}
