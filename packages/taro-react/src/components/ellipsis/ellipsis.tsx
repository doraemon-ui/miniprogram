import { createHostComponent } from '@/hooks/hostComponent'
import type { EllipsisProps, EllipsisExpose } from './types'

export const Ellipsis = createHostComponent<EllipsisProps, EllipsisExpose>('dora-ellipsis')

Ellipsis.displayName = 'DoraEllipsis'
