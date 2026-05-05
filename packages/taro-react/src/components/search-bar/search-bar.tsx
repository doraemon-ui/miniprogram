import React from 'react'
import { createHostComponent } from '../../hooks/hostComponent'
import type { SearchBarProps, SearchBarExpose } from './types'

// NOTE: Props are intentionally duplicated inline instead of extracted to _defaultProps.
// TaroNormalModulesPlugin scans React.createElement() args at AST level and cannot
// resolve spread operators (..._defaultProps), so props must be literal object
// expressions in both createHostComponent and React.createElement for Taro to detect them.
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

// Props registry for Taro WXML template generator.
// Values are all '' because TaroNormalModulesPlugin only scans key names.
React.createElement('dora-search-bar', {
  prefixCls: '',
  defaultValue: '',
  value: '',
  placeholder: '',
  placeholderStyle: '',
  placeholderClass: '',
  disabled: '',
  maxlength: '',
  cursorSpacing: '',
  focus: '',
  confirmType: '',
  confirmHold: '',
  cursor: '',
  selectionStart: '',
  selectionEnd: '',
  adjustPosition: '',
  clear: '',
  cancelText: '',
  showCancel: '',
  controlled: '',
  onlyShowClearWhenFocus: '',
  onChange: '',
  onFocus: '',
  onBlur: '',
  onConfirm: '',
  onClear: '',
  onCancel: '',
})
