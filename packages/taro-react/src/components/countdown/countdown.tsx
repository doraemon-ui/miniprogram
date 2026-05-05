import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { CountdownProps, CountdownExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Countdown = createHostComponent<CountdownProps, CountdownExpose>('dora-countdown')

Countdown.displayName = 'DoraCountdown'
