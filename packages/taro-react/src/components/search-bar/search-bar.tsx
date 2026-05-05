import React from 'react'
import { createHostComponent } from '@/hooks/hostComponent'
import type { SearchBarProps, SearchBarExpose } from './types'

export const SearchBar = createHostComponent<SearchBarProps, SearchBarExpose>('dora-search-bar')

SearchBar.displayName = 'DoraSearchBar'

// Props registry for Taro WXML template generator
React.createElement('dora-search-bar', {
  prefixCls: '',
  defaultValue: '',
  value: '',
  placeholder: '',
  placeholderStyle: null,
  placeholderClass: '',
  disabled: false,
  maxlength: 0,
  cursorSpacing: 0,
  focus: false,
  confirmType: '',
  confirmHold: false,
  cursor: 0,
  selectionStart: 0,
  selectionEnd: 0,
  adjustPosition: false,
  clear: false,
  cancelText: '',
  showCancel: false,
  controlled: false,
  onlyShowClearWhenFocus: false,
  onChange: undefined,
  onFocus: undefined,
  onBlur: undefined,
  onConfirm: undefined,
  onClear: undefined,
  onCancel: undefined,
})
