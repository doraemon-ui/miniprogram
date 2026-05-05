import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { ListProps, ListExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const List = createHostComponent<ListProps, ListExpose>('dora-list',
{
  prefixCls: 'dora-list',
  title: '',
  label: '',
  mode: 'default',
  hasLine: true,
  wrapStyle: null,
  bodyStyle: null,
})

List.displayName = 'DoraList'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-list', {
  prefixCls: '',
  title: '',
  label: '',
  mode: '',
  hasLine: '',
  wrapStyle: '',
  bodyStyle: '',
})
