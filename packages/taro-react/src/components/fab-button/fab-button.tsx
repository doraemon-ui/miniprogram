import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { FabButtonProps, FabButtonExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const FabButton = createHostComponent<FabButtonProps, FabButtonExpose>('dora-fab-button',
{
  prefixCls: 'dora-fab-button',
  hoverClass: 'default',
  theme: 'balanced',
  position: 'bottomRight',
  action: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAHdElNRQfhBAQLCR5MtjrbAAAAjUlEQVRo3u3ZMRKAIAxEUbDirp4nXnctFFDHBtDQ/O1Nnk6aHUMgZCBKMkmmNAtgOmL9M+IQQGVM95zljy8DAAAAAAAAAAAAAACALsDZcppSx7Q+WdtUvA5xffUtrjeA8/qQ21S9gc15/3Nfzw0M5O0G2kM5BQAAAAAAAAAAAAAAQGk33q0qZ/p/Q/JFdmei9usomnwIAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA0LTA0VDExOjA5OjMwKzA4OjAw1U4c3wAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wNC0wNFQxMTowOTozMCswODowMKQTpGMAAAAASUVORK5CYII=',
  actionRotate: true,
  hideShadow: false,
  backdrop: false,
  buttons: [],
  direction: 'horizontal',
  spaceBetween: 10,
  duration: 300,
  scale: 0.9,
  reverse: false,
  sAngle: 0,
  eAngle: 360,
  defaultVisible: false,
  visible: false,
  controlled: false,
})

FabButton.displayName = 'DoraFabButton'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-fab-button', {
  prefixCls: '',
  hoverClass: '',
  theme: '',
  position: '',
  action: '',
  actionRotate: '',
  hideShadow: '',
  backdrop: '',
  buttons: '',
  direction: '',
  spaceBetween: '',
  duration: '',
  scale: '',
  reverse: '',
  sAngle: '',
  eAngle: '',
  defaultVisible: '',
  visible: '',
  controlled: '',
  onChange: '',
  onClick: '',
})
