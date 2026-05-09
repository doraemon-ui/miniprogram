export const tabsProps = {
  prefixCls: {
    type: String,
    default: 'dora-tabs',
  },
  defaultCurrent: {
    type: String,
    default: '',
  },
  current: {
    type: String,
    default: '',
  },
  scroll: {
    type: Boolean,
    default: false,
  },
  controlled: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: 'positive',
  },
  direction: {
    type: String,
    default: 'horizontal',
  },
  justify: {
    type: String,
    default: 'space-around',
  },
  activeLineMode: {
    type: String,
    default: 'auto',
  },
}
