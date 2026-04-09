import { createHostComponent } from '@/hooks/hostComponent'
import type { ToptipsProps, ToptipsExpose } from './types'

export const Toptips = createHostComponent<ToptipsProps, ToptipsExpose>('dora-toptips')

Toptips.displayName = 'DoraToptips'
