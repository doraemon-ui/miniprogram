import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { TimelineProps, TimelineExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Timeline = createHostComponent<TimelineProps, TimelineExpose>('dora-timeline',
{
  prefixCls: 'dora-timeline',
  pending: false,
  position: 'left',
})

Timeline.displayName = 'DoraTimeline'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-timeline', {
  prefixCls: '',
  pending: '',
  position: '',
})
