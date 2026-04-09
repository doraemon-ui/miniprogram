import { createHostComponent } from '@/hooks/hostComponent'
import type { IconProps, IconExpose } from './types'

export const Icon = createHostComponent<IconProps, IconExpose>('dora-icon')

Icon.displayName = 'DoraIcon'
