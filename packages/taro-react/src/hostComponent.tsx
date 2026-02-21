import React from 'react'

export type HostComponentProps = {
  className?: string

  style?: React.CSSProperties

  children?: React.ReactNode
}

function styleToString(style?: React.CSSProperties): string {
  if (!style) return ''

  return Object.entries(style)
    .map(([k, v]) => `${k.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())}:${v}`)
    .join(';')
}

class HostComponent<Props extends HostComponentProps, Expose> extends React.Component<
  Props & {
    compName: string
    forwardedRef?: React.Ref<Expose>
  }
> {
  private nativeRef = React.createRef<Expose>()

  componentDidMount() {
    this._attachRef()
  }

  componentDidUpdate() {
    this._attachRef()
  }

  _attachRef() {
    const { forwardedRef } = this.props

    if (!forwardedRef) return

    if (typeof forwardedRef === 'function') {
      forwardedRef(this.nativeRef.current)
    } else {
      ;(forwardedRef as React.MutableRefObject<Expose | null>).current = this.nativeRef.current
    }
  }

  _transformProps(props: Record<string, any>) {
    const result: Record<string, any> = {}

    Object.keys(props).forEach((key) => {
      const value = props[key]

      if (key.startsWith('on') && typeof value === 'function') {
        const eventName = key[2].toLowerCase() + key.slice(3)

        result[`bind${eventName}`] = value
      } else {
        result[key] = value
      }
    })

    return result
  }

  render() {
    const { compName, className, style, children, forwardedRef, ...rest } = this.props

    const nativeProps = this._transformProps(rest)
    console.log('nativeProps====', nativeProps)
    const Comp = compName as any
    return (
      <Comp ref={this.nativeRef} dora-class={className} dora-style={styleToString(style)} {...nativeProps}>
        {React.Children.toArray(children)}
      </Comp>
    )
    // return React.createElement(
    //   compName,
    //   {
    //     ref: this.nativeRef,
    //     "dora-class": className,
    //     "dora-style": styleToString(style),
    //     ...nativeProps,
    //   },
    //   React.Children.toArray(children),
    // );
  }
}

export function createHostComponent<Props extends HostComponentProps, Expose>(compName: string) {
  return React.forwardRef<Expose, Props>((props, ref) =>
    React.createElement(HostComponent, {
      ...props,
      compName,
      forwardedRef: ref,
    }),
  )
}
