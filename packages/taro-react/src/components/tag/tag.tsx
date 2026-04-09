import { createHostComponent } from '@/hooks/hostComponent'
import type { TagProps, TagExpose } from './types'

export const Tag = createHostComponent<TagProps, TagExpose>('dora-tag')

Tag.displayName = 'DoraTag'
