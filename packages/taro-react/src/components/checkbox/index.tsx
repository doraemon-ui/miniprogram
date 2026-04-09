import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import { Checkbox } from './checkbox'
import type { CheckboxProps, CheckboxExpose } from './types'
import CheckboxGroup from '../checkbox-group'

export type { CheckboxProps, CheckboxExpose }

type CompoundedComponent = ForwardRefExoticComponent<CheckboxProps & RefAttributes<CheckboxExpose>> & {
  Group: typeof CheckboxGroup
}

const InnerCheckbox = Checkbox as CompoundedComponent

InnerCheckbox.Group = CheckboxGroup

export default InnerCheckbox
