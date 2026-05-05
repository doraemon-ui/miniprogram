import { createHostComponent } from '../../hooks/hostComponent'
import type { SelectProps, SelectExpose } from './types'

export const Select = createHostComponent<SelectProps, SelectExpose>('dora-select',
{
  prefixCls: 'dora-select',
  value: '',
  options: [],
  multiple: false,
  max: -1,
  notFoundContent: { icon: '', title: '', text: '暂无数据' },
  virtualized: false,
  toolbar: { title: '请选择', cancelText: '取消', confirmText: '确定' },
})

Select.displayName = 'DoraSelect'
