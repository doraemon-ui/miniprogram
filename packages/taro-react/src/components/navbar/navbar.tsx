import { createHostComponent } from '@/hooks/hostComponent'
import type { NavbarProps, NavbarExpose } from './types'

export const Navbar = createHostComponent<NavbarProps, NavbarExpose>('dora-navbar')

Navbar.displayName = 'DoraNavbar'
