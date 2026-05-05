import { createHostComponent } from '../../hooks/hostComponent'
import type { TagProps, TagExpose } from './types'

export const Tag = createHostComponent<TagProps, TagExpose>('dora-tag',
{
  prefixCls: 'dora-tag',
  hoverClass: 'default',
  color: '',
  closable: false,
  defaultVisible: true,
  visible: true,
  controlled: false,
})

Tag.displayName = 'DoraTag'
