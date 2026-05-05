import { createHostComponent } from '../../hooks/hostComponent'
import type { PopupSelectProps, PopupSelectExpose } from './types'

export const PopupSelect = createHostComponent<PopupSelectProps, PopupSelectExpose>('dora-popup-select',
{
  prefixCls: 'dora-popup-select',
  classNames: 'dora-animate--fadeIn',
  virtualized: false,
  notFoundContent: { icon: '', title: '', text: '暂无数据' },
  value: '',
  options: [],
  iconPosition: '',
  multiple: false,
  max: -1,
  toolbar: { title: '请选择', cancelText: '取消', confirmText: '确定' },
  visible: false,
  defaultVisible: false,
  controlled: false,
})

PopupSelect.displayName = 'DoraPopupSelect'
