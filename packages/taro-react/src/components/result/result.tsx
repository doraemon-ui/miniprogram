import { createHostComponent } from '@/hooks/hostComponent'
import type { ResultProps, ResultExpose } from './types'

export const Result = createHostComponent<ResultProps, ResultExpose>('dora-result')

Result.displayName = 'DoraResult'
