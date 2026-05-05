import { createHostComponent } from '../../hooks/hostComponent'
import type { SearchBarProps, SearchBarExpose } from './types'

export const SearchBar = createHostComponent<SearchBarProps, SearchBarExpose>('dora-search-bar',
{
  prefixCls: 'dora-search-bar',
  defaultValue: '',
  value: '',
  placeholder: '搜索',
  placeholderStyle: null,
  placeholderClass: 'input-placeholder',
  disabled: false,
  maxlength: 140,
  cursorSpacing: 11,
  focus: false,
  confirmType: 'search',
  confirmHold: false,
  cursor: -1,
  selectionStart: -1,
  selectionEnd: -1,
  adjustPosition: true,
  clear: false,
  cancelText: '取消',
  showCancel: false,
  controlled: false,
  onlyShowClearWhenFocus: true,
})

SearchBar.displayName = 'DoraSearchBar'
