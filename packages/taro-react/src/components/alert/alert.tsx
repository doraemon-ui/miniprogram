import { createHostComponent } from '@/hooks/hostComponent'
import type { AlertProps, AlertExpose } from './types'

export const Alert = createHostComponent<AlertProps, AlertExpose>('dora-alert')

Alert.displayName = 'DoraAlert'
