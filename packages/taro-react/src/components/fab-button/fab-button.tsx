import { createHostComponent } from '@/hooks/hostComponent'
import type { FabButtonProps, FabButtonExpose } from './types'

export const FabButton = createHostComponent<FabButtonProps, FabButtonExpose>('dora-fab-button')

FabButton.displayName = 'DoraFabButton'
