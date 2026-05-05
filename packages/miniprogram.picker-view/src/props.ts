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
    default: null,
  },
  indicatorStyle: {
    type: null,
    default: null,
  },
  indicatorClass: {
    type: String,
    default: '',
  },
  maskStyle: {
    type: null,
    default: null,
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
