import { createHostComponent } from '@/hooks/hostComponent'
import type { CascaderViewProps, CascaderViewExpose } from './types'

export const CascaderView = createHostComponent<CascaderViewProps, CascaderViewExpose>('dora-cascader-view')

CascaderView.displayName = 'DoraCascaderView'
