import { createHostComponent } from '../../hooks/hostComponent'
import type { ResultProps, ResultExpose } from './types'

export const Result = createHostComponent<ResultProps, ResultExpose>('dora-result',
{
  prefixCls: 'dora-result',
  icon: '',
  title: '',
  label: '',
  buttons: [],
  extra: '',
  fixed: false,
})

Result.displayName = 'DoraResult'
