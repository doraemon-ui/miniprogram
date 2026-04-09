import { createHostComponent } from '@/hooks/hostComponent'
import type { LoadingProps, LoadingExpose } from './types'

export const Loading = createHostComponent<LoadingProps, LoadingExpose>('dora-loading')

Loading.displayName = 'DoraLoading'
