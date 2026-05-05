import { createHostComponent } from '../../hooks/hostComponent'
import type { ActionSheetProps, ActionSheetExpose } from './types'

export const ActionSheet = createHostComponent<ActionSheetProps, ActionSheetExpose>('dora-action-sheet',
{
  prefixCls: 'dora-action-sheet',
  theme: 'ios',
  titleText: '',
  buttons: [],
  cancelText: '取消',
  destructiveText: '',
  visible: false,
})

ActionSheet.displayName = 'DoraActionSheet'
