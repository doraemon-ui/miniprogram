import { createHostComponent } from '@/hooks/hostComponent'
import type { ToastProps, ToastExpose } from './types'

export const Toast = createHostComponent<ToastProps, ToastExpose>('dora-toast')

Toast.displayName = 'DoraToast'
