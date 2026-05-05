import { createHostComponent } from '../../hooks/hostComponent'
import type { NavbarProps, NavbarExpose } from './types'

export const Navbar = createHostComponent<NavbarProps, NavbarExpose>('dora-navbar',
{
  prefixCls: 'dora-navbar',
  theme: 'light',
  title: '',
  leftText: '',
  rightText: '',
})

Navbar.displayName = 'DoraNavbar'
