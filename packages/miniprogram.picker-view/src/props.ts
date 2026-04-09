export const props = {
  prefixCls: {
    type: String,
    default: 'dora-picker-view',
  },
  defaultValue: {
    type: String,
    default: '',
  },
  value: {
    type: String,
    default: '',
  },
  controlled: {
    type: Boolean,
    default: false,
  },
  itemHeight: {
    type: Number,
    default: 34,
  },
  itemStyle: {
    type: null,
    default: '',
  },
  indicatorStyle: {
    type: null,
    default: '',
  },
  indicatorClass: {
    type: String,
    default: '',
  },
  maskStyle: {
    type: null,
    default: '',
  },
  maskClass: {
    type: String,
    default: '',
  },
  labelAlign: {
    type: String,
    default: 'center',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array,
    default: [],
  },
  defaultFieldNames: {
    type: Object,
    default: {
      label: 'label',
      value: 'value',
      disabled: 'disabled',
    },
  },
}
