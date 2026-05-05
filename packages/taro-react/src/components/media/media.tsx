import { createHostComponent } from '../../hooks/hostComponent'
import type { MediaProps, MediaExpose } from './types'

export const Media = createHostComponent<MediaProps, MediaExpose>('dora-media',
{
  prefixCls: 'dora-media',
  thumb: '',
  thumbStyle: null,
  title: '',
  label: '',
  align: 'center',
})

Media.displayName = 'DoraMedia'
