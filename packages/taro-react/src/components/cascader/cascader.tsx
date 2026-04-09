import { createHostComponent } from '@/hooks/hostComponent'
import type { CascaderProps, CascaderExpose } from './types'

export const Cascader = createHostComponent<CascaderProps, CascaderExpose>('dora-cascader')

Cascader.displayName = 'DoraCascader'
