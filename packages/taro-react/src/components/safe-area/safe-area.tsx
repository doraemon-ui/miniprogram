import { createHostComponent } from '@/hooks/hostComponent'
import type { SafeAreaProps, SafeAreaExpose } from './types'

export const SafeArea = createHostComponent<SafeAreaProps, SafeAreaExpose>('dora-safe-area')

SafeArea.displayName = 'DoraSafeArea'
