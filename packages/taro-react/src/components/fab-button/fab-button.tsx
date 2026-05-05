import { createHostComponent } from '../../hooks/hostComponent'
import type { FabButtonProps, FabButtonExpose } from './types'

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
