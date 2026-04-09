export const checkboxGroupProps = {
  prefixCls: {
    type: String,
    default: 'dora-checkbox-group',
  },
  cellGroupPrefixCls: {
    type: String,
    default: 'dora-list',
  },
  value: {
    type: Array,
    default: () => [],
  },
  name: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
  mode: {
    type: String,
    default: 'default',
  },
  bodyStyle: {
    type: null,
    default: '',
  },
  hasLine: {
    type: Boolean,
    default: true,
  },
  withListComponent: {
    type: Boolean,
    default: true,
  },
  iconPosition: {
    type: String,
    default: 'left',
  },
  iconSize: {
    type: String,
    default: '',
  },
  iconOn: {
    type: String,
    default: '',
  },
  iconOff: {
    type: String,
    default: '',
  },
}
