import { createHostComponent } from '../../hooks/hostComponent'
import type { CascaderProps, CascaderExpose } from './types'

export const Cascader = createHostComponent<CascaderProps, CascaderExpose>('dora-cascader',
{
  prefixCls: 'dora-cascader',
  defaultValue: [],
  value: [],
  controlled: false,
  title: '',
  cancelText: '取消',
  confirmText: '确定',
  options: [],
  full: false,
  height: 'auto',
  chooseTitle: '请选择',
  visible: false,
  skipAnimation: false,
  defaultFieldNames: {},
})

Cascader.displayName = 'DoraCascader'
