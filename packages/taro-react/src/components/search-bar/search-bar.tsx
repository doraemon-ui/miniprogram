import { createHostComponent } from '@/hooks/hostComponent'
import type { SearchBarProps, SearchBarExpose } from './types'

export const SearchBar = createHostComponent<SearchBarProps, SearchBarExpose>('dora-search-bar')

SearchBar.displayName = 'DoraSearchBar'
