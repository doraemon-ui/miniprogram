import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { NavbarProps, NavbarExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
export const Navbar = createHostComponent<NavbarProps, NavbarExpose>('dora-navbar',
{
  prefixCls: 'dora-navbar',
  theme: 'light',
  title: '',
  leftText: '',
  rightText: '',
})

Navbar.displayName = 'DoraNavbar'

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-navbar', {
  prefixCls: '',
  theme: '',
  title: '',
  leftText: '',
  rightText: '',
  onClick: '',
})
