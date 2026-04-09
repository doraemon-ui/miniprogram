import React, { Component, Children, createRef, forwardRef, createElement } from 'react'
import type { CSSProperties, Ref, MutableRefObject } from 'react'
import type { BasicComponent } from '@/types'

function styleToString(style?: CSSProperties): string {
  if (!style) return ''

  return Object.entries(style)
    .map(([k, v]) => `${k.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())}:${v}`)
    .join(';')
}

class HostComponent<Props extends BasicComponent, Expose> extends Component<
  Props & {
    compName: string
    forwardedRef?: Ref<Expose>
  }
> {
  private nativeRef = createRef<Expose>()

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
      ;(forwardedRef as MutableRefObject<Expose | null>).current = this.nativeRef.current
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
        {Children.toArray(children)}
      </Comp>
    )
  }
}

export function createHostComponent<Props extends BasicComponent, Expose>(compName: string) {
  return forwardRef<Expose, Props>((props, ref) =>
    createElement(HostComponent, {
      ...props,
      compName,
      forwardedRef: ref,
    }),
  )
}
