import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import { Steps } from './steps'
import type { StepsProps, StepsExpose } from './types'
import Step from '../step'

export type { StepsProps, StepsExpose }

type CompoundedComponent = ForwardRefExoticComponent<StepsProps & RefAttributes<StepsExpose>> & {
  Step: typeof Step
}

const InnerSteps = Steps as CompoundedComponent

InnerSteps.Step = Step

export default InnerSteps
