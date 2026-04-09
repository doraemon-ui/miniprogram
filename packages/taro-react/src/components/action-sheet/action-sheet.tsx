import { createHostComponent } from '@/hooks/hostComponent'
import type { ActionSheetProps, ActionSheetExpose } from './types'

export const ActionSheet = createHostComponent<ActionSheetProps, ActionSheetExpose>('dora-action-sheet')

ActionSheet.displayName = 'DoraActionSheet'
