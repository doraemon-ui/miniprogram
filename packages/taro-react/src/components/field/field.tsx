import { createHostComponent } from '@/hooks/hostComponent'
import type { FieldProps, FieldExpose } from './types'

export const Field = createHostComponent<FieldProps, FieldExpose>('dora-field')

Field.displayName = 'DoraField'
