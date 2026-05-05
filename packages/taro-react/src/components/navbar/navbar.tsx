import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { NavbarProps, NavbarExpose } from './types'

export const Navbar = createHostComponent<NavbarProps, NavbarExpose>('dora-navbar')

Navbar.displayName = 'DoraNavbar'

// Props registry for Taro WXML template generator
React.createElement('dora-navbar', {
  prefixCls: '',
  theme: '',
  title: '',
  leftText: '',
  rightText: '',
  onClick: undefined,
})
