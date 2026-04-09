import { createHostComponent } from '@/hooks/hostComponent'
import type { RefresherProps, RefresherExpose } from './types'

export const Refresher = createHostComponent<RefresherProps, RefresherExpose>('dora-refresher')

Refresher.displayName = 'DoraRefresher'
