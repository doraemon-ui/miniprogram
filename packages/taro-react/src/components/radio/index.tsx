import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import { Radio } from './radio'
import type { RadioProps, RadioExpose } from './types'
import RadioGroup from '../radio-group'

export type { RadioProps, RadioExpose }

type CompoundedComponent = ForwardRefExoticComponent<RadioProps & RefAttributes<RadioExpose>> & {
  Group: typeof RadioGroup
}

const InnerRadio = Radio as CompoundedComponent

InnerRadio.Group = RadioGroup

export default InnerRadio
