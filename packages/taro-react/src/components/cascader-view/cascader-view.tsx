import { createHostComponent } from '../../hooks/hostComponent'
import type { CascaderViewProps, CascaderViewExpose } from './types'

export const CascaderView = createHostComponent<CascaderViewProps, CascaderViewExpose>('dora-cascader-view',
{
  prefixCls: 'dora-cascader-view',
  defaultValue: [],
  value: [],
  controlled: false,
  options: [],
  full: false,
  placeholder: '请选择',
  height: 'auto',
  skipAnimation: false,
  defaultFieldNames: {},
})

CascaderView.displayName = 'DoraCascaderView'
