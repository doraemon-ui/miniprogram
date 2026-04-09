import type { SearchBarProps as NativeSearchBarProps, SearchBarExpose as NativeSearchBarExpose } from '@doraemon-ui/miniprogram.search-bar'
import type { BasicComponent } from '@/types'

export interface SearchBarProps extends NativeSearchBarProps, BasicComponent {}

export interface SearchBarExpose extends NativeSearchBarExpose {}
